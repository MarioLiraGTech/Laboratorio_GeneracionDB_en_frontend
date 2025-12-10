"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface DynamicTableProps {
  tableId: Id<"Table">;
}

export function DynamicTable({ tableId }: DynamicTableProps) {
  const structure = useQuery(api.StorageRow.read.getTableStructure, { idTable: tableId });
  const rows = useQuery(api.StorageRow.read.listRows, { 
    idTable: tableId, 
    populateRelations: true 
  });
  
  const deleteRow = useMutation(api.StorageRow.delete.deleteRow);

  if (!structure || !rows) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {structure.columns.map((col: any) => (
              <TableHead key={col.id}>{col.label}</TableHead>
            ))}
            <TableHead className="w-[50px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={structure.columns.length + 1} className="text-center h-24">
                No hay datos. ¡Crea el primer registro!
              </TableCell>
            </TableRow>
          )}
          
          {rows.map((row: any) => (
            <TableRow key={row._id}>
              {structure.columns.map((col: any) => (
                <TableCell key={col.id}>
                  <CellRenderer value={row[col.key]} type={col.type} />
                </TableCell>
              ))}
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => deleteRow({ idRow: row._id })}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CellRenderer({ value, type }: { value: any; type: string }) {
  if (value === undefined || value === null) return <span className="text-gray-300">-</span>;

  switch (type) {
    case "Boolean":
      return value ? <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded text-xs">Sí</span> 
                   : <span className="text-red-600 bg-red-100 px-2 py-0.5 rounded text-xs">No</span>;
    case "Relation":
      return typeof value === 'object' ? (
        <span className="text-blue-600 font-medium">
           📄 {value.name || value.email || value.titulo || "Registro Relacionado"}
        </span>
      ) : <span className="text-xs text-gray-400">{String(value).substring(0,8)}...</span>;
    case "Date":
        return new Date(value).toLocaleDateString();
    default:
      return <span>{String(value)}</span>;
  }
}