import { v } from "convex/values";
import { query } from "../_generated/server";

export const listByTable = query({
  args: { idTable: v.id("Table") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ParameterFields")
      .withIndex("by_Table", (q) => q.eq("idTable", args.idTable))
      .filter((q) => q.eq(q.field("logicalDelete"), false))
      .collect();
  },
});