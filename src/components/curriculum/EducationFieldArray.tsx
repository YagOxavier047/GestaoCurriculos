'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  instituicao: string;
  curso: string;
  conclusao: string;
}

interface EducationFieldArrayProps {
  fields: Education[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export function EducationFieldArray({
  fields,
  onAdd,
  onRemove,
}: EducationFieldArrayProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Formação Acadêmica</h3>
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
            <span className="text-sm font-medium">Formação #{index + 1}</span>
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
          <div className="grid md:grid-cols-3 gap-3">
            <Input placeholder="Instituição" defaultValue={field.instituicao} />
            <Input placeholder="Curso" defaultValue={field.curso} />
            <Input placeholder="Conclusão" defaultValue={field.conclusao} />
          </div>
        </div>
      ))}
    </div>
  );
}
