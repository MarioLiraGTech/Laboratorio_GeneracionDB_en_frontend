import { mutation, query } from "./../_generated/server";
import { v } from "convex/values";

// A. Obtener todos los Schemas
export const list = query({
  args: {}, 
  handler: async (ctx) => {
    return await ctx.db
      .query("Schema")
      .collect();
  },
});

// B. Obtener un Schema específico por ID
export const getById = query({
  args: { id: v.id("Schema") },
  handler: async (ctx, args) => {
    const schema = await ctx.db.get(args.id);
    
    if (schema?.logicalDelete) {
      return null;
    }

    return schema;
  },
});