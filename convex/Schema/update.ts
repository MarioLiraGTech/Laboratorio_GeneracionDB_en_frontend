import { mutation, query } from "./../_generated/server";
import { v } from "convex/values";

export const update = mutation({
  args: {
    id: v.id("Schema"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      updateData: Date.now(),
    });
  },
});