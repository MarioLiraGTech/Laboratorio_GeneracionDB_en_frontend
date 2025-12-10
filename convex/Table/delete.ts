import { v } from "convex/values";
import { mutation } from "../_generated/server";


export const softDelete = mutation({
  args: { id: v.id("Table") },
  handler: async (ctx, args) => {
    const now = Date.now();

    await ctx.db.patch(args.id, {
      logicalDelete: true,
      updateData: now,
    });
  },
});

export const restore = mutation({
  args: { id: v.id("Table") },
  handler: async (ctx, args) => {
    const table = await ctx.db.get(args.id);
    
    if (!table) {
      throw new Error("La tabla no existe.");
    }

    await ctx.db.patch(args.id, {
      logicalDelete: false,
      updateData: Date.now(),
    });
  },
});