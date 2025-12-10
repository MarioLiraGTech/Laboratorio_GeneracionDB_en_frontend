"use client";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { DynamicTable } from "@/components/dynamic-table/DataTable";
import { CreateFieldModal } from "@/components/dynamic-table/CreateFieldModal";
import { CreateRowModal } from "@/components/dynamic-table/CreateRowModal";

export default function TablePage() {
  const params = useParams();
  const tableId = params.tableId as Id<"Table">;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold">Gestor de Datos</h1>
           <p className="text-gray-500">Administra la tabla y su estructura</p>
        </div>
        <div className="flex space-x-2">
           <CreateFieldModal tableId={tableId} />
           <CreateRowModal tableId={tableId} />
        </div>
      </div>

      <DynamicTable tableId={tableId} />
    </div>
  );
}
