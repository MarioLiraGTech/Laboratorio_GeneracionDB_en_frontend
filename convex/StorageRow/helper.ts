import { Doc, Id } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

export function validateType(field: Doc<"ParameterFields">, value: unknown) {
  switch (field.type) {
    case "Number":
      if (typeof value !== "number") {
        throw new Error(`El campo '${field.name}' debe ser un número.`);
      }
      break;
      
    case "Text":
      if (typeof value !== "string") {
        throw new Error(`El campo '${field.name}' debe ser texto.`);
      }
      break;

    case "Boolean":
      if (typeof value !== "boolean") {
        throw new Error(`El campo '${field.name}' debe ser booleano.`);
      }
      break;

    case "Date":
      if (typeof value !== "number") {
        throw new Error(`El campo '${field.name}' debe ser una fecha (timestamp).`);
      }
      break;

    case "Options":
      if (field.optionsConfig && Array.isArray(field.optionsConfig)) {
        const stringValue = value as string;

        const isValid = field.optionsConfig.some((opt: string) => opt === stringValue);

        if (!isValid) {
          throw new Error(`El valor '${stringValue}' no es válido para las opciones: ${field.optionsConfig.join(", ")}`);
        }
      }
      break;
  }
}

export async function getRowObject(ctx: QueryCtx, rowId: Id<"Row">) {
  const row = await ctx.db.get(rowId);
  if (!row) return null;

  const fields = await ctx.db
    .query("ParameterFields")
    .withIndex("by_Table", (q) => q.eq("idTable", row.idTable))
    .collect();

  const cells = await ctx.db
    .query("Storage")
    .withIndex("by_row", (q) => q.eq("idRow", rowId))
    .collect();

  const fieldMap = new Map<string, string>();
  fields.forEach((f) => fieldMap.set(f._id, f.name));

  const objectResult: Record<string, unknown> = { _id: row._id };
  
  cells.forEach((cell) => {
    const fieldName = fieldMap.get(cell.idParameterFields);
    if (fieldName) {
      objectResult[fieldName] = cell.content;
    }
  });

  return objectResult;
}