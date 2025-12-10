import { v } from "convex/values";
import { query } from "../_generated/server";

export const listBySchema = query({
  args: { 
    idSchema: v.id("Schema") 
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("Table")
      .withIndex("by_schema", (q) => q.eq("idSchema", args.idSchema))
      .filter((q) => q.eq(q.field("logicalDelete"), false))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("Table") },
  handler: async (ctx, args) => {
    const table = await ctx.db.get(args.id);
    
    if (table?.logicalDelete) return null;
    
    return table;
  },
});