"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function CreateFieldModal({ tableId }: { tableId: Id<"Table"> }) {
  const createField = useMutation(api.ParameterFields.create.create);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "Text" as any,
    optional: false,
    optionsString: "",
  });

  const handleSubmit = async () => {
    const optionsConfig = formData.type === "Options" 
      ? formData.optionsString.split(",").map(s => s.trim()) 
      : undefined;

    await createField({
      idTable: tableId,
      name: formData.name,
      type: formData.type,
      optional: formData.optional,
      optionsConfig: optionsConfig,
    });
    setOpen(false);
    setFormData({ ...formData, name: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ Nueva Columna</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Agregar Campo</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label>Nombre del Campo</Label>
            <Input 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Tipo de Dato</Label>
            <Select 
              value={formData.type} 
              onValueChange={(val: any) => setFormData({...formData, type: val})}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Text">Texto</SelectItem>
                <SelectItem value="Number">Número</SelectItem>
                <SelectItem value="Boolean">Booleano (Sí/No)</SelectItem>
                <SelectItem value="Date">Fecha</SelectItem>
                <SelectItem value="Options">Opciones (Dropdown)</SelectItem>
                <SelectItem value="Relation">Relación</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === "Options" && (
            <div className="grid gap-2">
              <Label>Opciones (separadas por coma)</Label>
              <Input 
                placeholder="Rojo, Verde, Azul"
                value={formData.optionsString}
                onChange={(e) => setFormData({...formData, optionsString: e.target.value})}
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="opt" 
              checked={formData.optional}
              onCheckedChange={(c) => setFormData({...formData, optional: c as boolean})}
            />
            <Label htmlFor="opt">Es opcional</Label>
          </div>
          
          <Button onClick={handleSubmit}>Guardar Campo</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}