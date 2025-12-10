import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { validateType } from "./helper";

export const updateRow = mutation({
  args: {
    idRow: v.id("Row"),
    idTable: v.id("Table"),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const inputData = args.data as Record<string, unknown>;

    const row = await ctx.db.get(args.idRow);
    if (!row || row.logicalDelete) {
      throw new Error("La fila no existe o ha sido eliminada.");
    }

    const fields = await ctx.db
      .query("ParameterFields")
      .withIndex("by_Table", (q) => q.eq("idTable", args.idTable))
      .filter((q) => q.eq(q.field("logicalDelete"), false))
      .collect();

    const existingCells = await ctx.db
      .query("Storage")
      .withIndex("by_row", (q) => q.eq("idRow", args.idRow))
      .collect();

    const updatePromises = Object.keys(inputData).map(async (fieldName) => {
      const newValue = inputData[fieldName];

      const fieldDef = fields.find((f) => f.name === fieldName);
      
      if (!fieldDef) return; 

      if (newValue !== undefined && newValue !== null) {
        validateType(fieldDef, newValue);
      }

      const existingCell = existingCells.find(
        (cell) => cell.idParameterFields === fieldDef._id
      );

      if (existingCell) {
        if (newValue === undefined || newValue === null || newValue === "") {
             await ctx.db.patch(existingCell._id, { content: newValue });
        } else {
             await ctx.db.patch(existingCell._id, { content: newValue });
        }
      } else {
        if (newValue !== undefined && newValue !== null && newValue !== "") {
          await ctx.db.insert("Storage", {
            idRow: args.idRow,
            idParameterFields: fieldDef._id,
            content: newValue,
          });
        }
      }
    });

    await Promise.all(updatePromises);

    return args.idRow;
  },
});