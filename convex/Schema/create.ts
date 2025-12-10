import { mutation, query } from "./../_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(), // Solo pedimos el nombre, el resto es automático
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const newSchemaId = await ctx.db.insert("Schema", {
      name: args.name,
      createDate: now,
      updateData: now, // Nota: Mantuve tu nombre de variable "updateData"
      logicalDelete: false, // Nace vivo
    });

    return newSchemaId;
  },
});