"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Database } from "lucide-react";

export default function DashboardPage() {
  const schemas = useQuery(api.Schema.read.list);
  const createSchema = useMutation(api.Schema.create.create);
  
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreate = async () => {
    await createSchema({ name });
    setOpen(false);
    setName("");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Proyectos (Schemas)</h1>
          <p className="text-muted-foreground">Selecciona un proyecto para gestionar sus tablas.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nuevo Proyecto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Crear Nuevo Esquema</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Nombre del Proyecto</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: CRM Ventas" />
              </div>
              <Button onClick={handleCreate}>Crear</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schemas?.map((schema) => (
          <Link href={`/dashboard/${schema._id}`} key={schema._id}>
            <Card className="hover:bg-slate-50 transition cursor-pointer border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-blue-500" />
                  {schema.name}
                </CardTitle>
                <CardDescription>
                  Creado el {new Date(schema.createDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {schemas?.length === 0 && <p className="text-gray-500">No tienes proyectos. Crea uno.</p>}
      </div>
    </div>
  );
}