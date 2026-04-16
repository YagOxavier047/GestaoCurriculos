'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface Experience {
  id: string;
  empresa: string;
  cargo: string;
  periodo: string;
  descricao: string;
}

interface ExperienceFieldArrayProps {
  fields: Experience[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export function ExperienceFieldArray({
  fields,
  onAdd,
  onRemove,
}: ExperienceFieldArrayProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Experiência Profissional</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
        >
          <Plus className="w-4 h-4 mr-1" /> Adicionar
        </Button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border rounded-lg space-y-3 bg-muted/30"
        >
          <div className="flex justify-between">
            <span className="text-sm font-medium">Experiência #{index + 1}</span>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Input placeholder="Empresa" defaultValue={field.empresa} />
            <Input placeholder="Cargo" defaultValue={field.cargo} />
            <Input placeholder="Período" defaultValue={field.periodo} />
            <Input placeholder="Descrição" defaultValue={field.descricao} />
          </div>
        </div>
      ))}
    </div>
  );
}
