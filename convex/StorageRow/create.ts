import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { validateType } from "./helper";

export const createRow = mutation({
  args: {
    idTable: v.id("Table"),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const inputData = args.data as Record<string, unknown>;

    const fields = await ctx.db
      .query("ParameterFields")
      .withIndex("by_Table", (q) => q.eq("idTable", args.idTable))
      .filter((q) => q.eq(q.field("logicalDelete"), false))
      .collect();

    for (const field of fields) {
      const value = inputData[field.name];

      if (!field.optional && (value === undefined || value === null || value === "")) {
        throw new Error(`El campo '${field.name}' es obligatorio.`);
      }

      if (value !== undefined && value !== null) {
        validateType(field, value);
      }
    }

    const rowId = await ctx.db.insert("Row", {
      idTable: args.idTable,
      createDate: Date.now(),
      logicalDelete: false,
    });

    const storagePromises = fields.map((field) => {
      const value = inputData[field.name];
      
      if (value !== undefined && value !== null) {
        return ctx.db.insert("Storage", {
          idRow: rowId,
          idParameterFields: field._id,
          content: value,
        });
      }
      return null;
    });

    await Promise.all(storagePromises);

    return rowId;
  },
});