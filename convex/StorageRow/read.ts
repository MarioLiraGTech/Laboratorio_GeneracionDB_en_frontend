import { v } from "convex/values";
import { query } from "../_generated/server";
import { Doc } from "../_generated/dataModel";
import { getRowObject } from "./helper";

export const getTableStructure = query({
  args: { 
    idTable: v.id("Table") 
  },
  handler: async (ctx, args) => {
    const table = await ctx.db.get(args.idTable);
    if (!table) throw new Error("Tabla no encontrada");

    const fields = await ctx.db
      .query("ParameterFields")
      .withIndex("by_Table", (q) => q.eq("idTable", args.idTable))
      .filter((q) => q.eq(q.field("logicalDelete"), false))
      .collect();

    return {
      tableName: table.name,
      tableId: table._id,
      columns: fields.map(f => ({
        key: f.name,
        label: f.name,
        type: f.type,
        required: !f.optional,
        options: f.optionsConfig,
        id: f._id
      }))
    };
  },
});

export const listRows = query({
  args: { 
    idTable: v.id("Table"),
    populateRelations: v.optional(v.boolean()) 
  },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("Row")
      .withIndex("by_table", (q) => q.eq("idTable", args.idTable))
      .filter((q) => q.eq(q.field("logicalDelete"), false))
      .collect();

    const fields = await ctx.db
      .query("ParameterFields")
      .withIndex("by_Table", (q) => q.eq("idTable", args.idTable))
      .collect();
    
    const fieldMap = new Map<string, Doc<"ParameterFields">>();
    fields.forEach(f => fieldMap.set(f._id, f));

    // 3. Procesar filas
    const result = await Promise.all(
      rows.map(async (row) => {
        const cells = await ctx.db
          .query("Storage")
          .withIndex("by_row", (q) => q.eq("idRow", row._id))
          .collect();

        const rowObject: Record<string, unknown> = { _id: row._id };
        
        await Promise.all(cells.map(async (cell) => {
          const fieldDef = fieldMap.get(cell.idParameterFields);
          
          if (fieldDef) {
            if (
              args.populateRelations === true && 
              fieldDef.type === "Relation" && 
              cell.content
            ) {
               const relatedData = await getRowObject(ctx, cell.content);
               rowObject[fieldDef.name] = relatedData; 
            } else {
               rowObject[fieldDef.name] = cell.content;
            }
          }
        }));

        return rowObject;
      })
    );

    return result;
  },
});