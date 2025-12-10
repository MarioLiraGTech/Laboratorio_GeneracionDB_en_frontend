"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Table as TableIcon, ArrowLeft } from "lucide-react";

export default function SchemaPage() {
  const params = useParams();
  const schemaId = params.schemaId as Id<"Schema">;

  const schema = useQuery(api.Schema.read.getById, { id: schemaId });
  const tables = useQuery(api.Table.read.listBySchema, { idSchema: schemaId });
  const createTable = useMutation(api.Table.create.create);

  const [open, setOpen] = useState(false);
  const [tableName, setTableName] = useState("");

  const handleCreateTable = async () => {
    await createTable({ name: tableName, idSchema: schemaId });
    setOpen(false);
    setTableName("");
  };

  if (!schema) return <div className="p-10">Cargando proyecto...</div>;

  return (
    <div className="container mx-auto py-10">
      <Link href="/dashboard" className="text-sm text-gray-500 hover:text-black flex items-center mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Proyectos
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tablas de: {schema.name}</h1>
          <p className="text-muted-foreground">Administra las estructuras de datos de este proyecto.</p>
        </div>

        {/* Modal para Crear Tabla */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nueva Tabla</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Crear Nueva Tabla</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Nombre de la Tabla</Label>
                <Input value={tableName} onChange={(e) => setTableName(e.target.value)} placeholder="Ej: Usuarios" />
              </div>
              <Button onClick={handleCreateTable}>Crear Tabla</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tables?.map((table) => (
          <Link href={`/dashboard/${schemaId}/${table._id}`} key={table._id}>
            <Card className="hover:bg-slate-50 transition cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {table.name}
                </CardTitle>
                <TableIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription>
                  Creada el {new Date(table.createDate).toLocaleDateString()}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
        {tables?.length === 0 && (
          <div className="col-span-3 text-center py-10 border-2 border-dashed rounded-lg text-gray-400">
            No hay tablas aún. ¡Crea la primera!
          </div>
        )}
      </div>
    </div>
  );
}