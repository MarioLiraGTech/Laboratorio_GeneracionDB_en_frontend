import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

export const update = mutation({
  args: {
    id: v.id("ParameterFields"),
    name: v.optional(v.string()),
    optional: v.optional(v.boolean()),
    optionsConfig: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const fieldsToUpdate: Partial<Doc<"ParameterFields">> = { 
        updateData: Date.now() 
    };

    if (args.name !== undefined) fieldsToUpdate.name = args.name;
    if (args.optional !== undefined) fieldsToUpdate.optional = args.optional;
    if (args.optionsConfig !== undefined) fieldsToUpdate.optionsConfig = args.optionsConfig;

    await ctx.db.patch(args.id, fieldsToUpdate);
  },
});