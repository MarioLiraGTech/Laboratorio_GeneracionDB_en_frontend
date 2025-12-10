"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function CreateRowModal({ tableId }: { tableId: Id<"Table"> }) {
  const structure = useQuery(api.StorageRow.read.getTableStructure, { idTable: tableId });
  const createRow = useMutation(api.StorageRow.create.createRow);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Record<string, any>>({});

  const handleSave = async () => {
    try {
      await createRow({ idTable: tableId, data });
      setOpen(false);
      setData({});
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  if (!structure) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Nuevo Registro</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <h2 className="text-lg font-bold mb-4">Crear {structure.tableName}</h2>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
          {structure.columns.map((col: any) => (
            <div key={col.id} className="grid gap-2">
              <Label>
                {col.label} {col.required && <span className="text-red-500">*</span>}
              </Label>
              
              {/* Input Dinámico */}
              {col.type === "Boolean" ? (
                <div className="flex items-center space-x-2">
                   <Switch 
                     checked={!!data[col.key]}
                     onCheckedChange={(checked) => setData({...data, [col.key]: checked})}
                   />
                   <span>{data[col.key] ? "Sí" : "No"}</span>
                </div>
              ) : col.type === "Options" ? (
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  onChange={(e) => setData({...data, [col.key]: e.target.value})}
                  value={data[col.key] || ""}
                >
                  <option value="">Seleccione...</option>
                  {col.options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : col.type === "Number" ? (
                 <Input 
                  type="number" 
                  onChange={(e) => setData({...data, [col.key]: Number(e.target.value)})}
                />
              ) : (
                <Input 
                  type="text" 
                  onChange={(e) => setData({...data, [col.key]: e.target.value})}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}