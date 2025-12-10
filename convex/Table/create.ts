import { v } from "convex/values";
import { mutation } from "../_generated/server";


export const create = mutation({
  args: {
    name: v.string(),
    idSchema: v.id("Schema"),
  },
  handler: async (ctx, args) => {
    const schemaExists = await ctx.db.get(args.idSchema);
    if (!schemaExists || schemaExists.logicalDelete) {
      throw new Error("El Schema especificado no existe o fue eliminado.");
    }

    const now = Date.now();

    const newTableId = await ctx.db.insert("Table", {
      name: args.name,
      idSchema: args.idSchema,
      createDate: now,
      updateData: now,
      logicalDelete: false,
    });

    return newTableId;
  },
});