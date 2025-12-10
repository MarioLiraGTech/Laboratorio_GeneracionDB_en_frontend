import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const softDelete = mutation({
  args: { id: v.id("ParameterFields") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      logicalDelete: true,
      updateData: Date.now(),
    });
  },
});

export const restore = mutation({
  args: { id: v.id("ParameterFields") },
  handler: async (ctx, args) => {
    const field = await ctx.db.get(args.id);
    if (!field) throw new Error("Campo no encontrado");

    const parentTable = await ctx.db.get(field.idTable);
    if (parentTable && parentTable.logicalDelete) {
      throw new Error("No puedes restaurar este campo porque su Tabla padre está eliminada.");
    }

    await ctx.db.patch(args.id, {
      logicalDelete: false,
      updateData: Date.now(),
    });
  },
});