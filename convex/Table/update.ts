import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const update = mutation({
  args: {
    id: v.id("Table"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      updateData: Date.now(),
    });
  },
});