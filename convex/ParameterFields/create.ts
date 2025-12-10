import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    optional: v.boolean(),
    idTable: v.id("Table"),
    type: v.union(
      v.literal("Number"),
      v.literal("Date"),
      v.literal("Text"),
      v.literal("Relation"),
      v.literal("Boolean"),
      v.literal("Options")
    ),
    optionsConfig: v.optional(v.array(v.string())),
    targetTableId: v.optional(v.id("Table")),
  },
  handler: async (ctx, args) => {
    const table = await ctx.db.get(args.idTable);
    if (!table || table.logicalDelete) {
      throw new Error("La tabla a la que intentas agregar campos no existe.");
    }

    // Validations if user choose relation
    if (args.type === "Relation") {
      if (!args.targetTableId) {
        throw new Error("Si el tipo es 'Relation', debes especificar 'targetTableId'.");
      }
      const targetTable = await ctx.db.get(args.targetTableId);
      if (!targetTable) throw new Error("La tabla relacionada no existe.");
    }

    // Validations if user chosse options
    if (args.type === "Options") {
      if (!args.optionsConfig || args.optionsConfig.length === 0) {
        throw new Error("Si el tipo es 'Options', debes enviar al menos una opción en 'optionsConfig'.");
      }
    }

    const now = Date.now();

    const fieldId = await ctx.db.insert("ParameterFields", {
      name: args.name,
      optional: args.optional,
      idTable: args.idTable,
      type: args.type,
      optionsConfig: args.type === "Options" ? args.optionsConfig : undefined,
      targetTableId: args.type === "Relation" ? args.targetTableId : undefined,
      createDate: now,
      updateData: now,
      logicalDelete: false,
    });

    return fieldId;
  },
});