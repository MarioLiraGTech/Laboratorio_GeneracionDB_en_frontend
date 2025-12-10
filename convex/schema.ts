import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    Schema: defineTable({
        name: v.string(),
        createDate: v.number(),
        updateData: v.number(),
        logicalDelete: v.boolean(),
    })
    .index("by_name", ["name"])
    ,

    Table: defineTable({
        name:v.string(),
        idSchema: v.id("Schema"),
        createDate: v.number(),
        updateData: v.number(),
        logicalDelete: v.boolean(),
    })
    .index("by_schema", ["idSchema"])
    .index("by_name", ["name"])
    ,

    ParameterFields: defineTable({
        name: v.string(),
        optional: v.boolean(),
        idTable: v.id("Table"),
        type: v.union(
            v.literal("Number"),
            v.literal("Date"),
            v.literal("Text"),
            v.literal("Relation"),
            v.literal("Boolean"),
            v.literal("Options"),
        ),
        optionsConfig: v.optional(
            v.array(v.string()) 
        ),
        targetTableId: v.optional(v.id("Table")),
        createDate: v.number(),
        updateData: v.number(),
        logicalDelete: v.boolean(),
    })
    .index("by_Table", ["idTable"])
    ,

    Row: defineTable({
        idTable: v.id("Table"),
        createDate: v.number(),
        logicalDelete: v.boolean(),
    }).index("by_table", ["idTable"]),

    Storage: defineTable({
        content: v.any(),
        idParameterFields: v.id("ParameterFields"),
        idRow: v.id("Row"),
    })
    .index("by_row", ["idRow"])
    .index("by_field", ["idParameterFields"]),
});