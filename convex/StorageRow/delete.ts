import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteRow = mutation({
  args: { 
    idRow: v.id("Row") 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.idRow, {
      logicalDelete: true,
    });
  },
});


export const restoreRow = mutation({
  args: { 
    idRow: v.id("Row") 
  },
  handler: async (ctx, args) => {
    const row = await ctx.db.get(args.idRow);
    if (!row) {
      throw new Error("La fila no existe.");
    }

    const table = await ctx.db.get(row.idTable);
    if (table && table.logicalDelete) {
      throw new Error("No puedes restaurar esta fila porque la Tabla principal está eliminada.");
    }

    await ctx.db.patch(args.idRow, {
      logicalDelete: false,
    });

    return args.idRow;
  },
});