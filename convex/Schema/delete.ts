import { mutation, query } from "./../_generated/server";
import { v } from "convex/values";

//Borrado logico
export const remove = mutation({
  args: { id: v.id("Schema") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      logicalDelete: true,
      updateData: Date.now(),
    });
  },
});

//Restauracion logica
export const restore = mutation({
  args: { id: v.id("Schema") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      logicalDelete: false,
      updateData: Date.now(),
    });
  },
});