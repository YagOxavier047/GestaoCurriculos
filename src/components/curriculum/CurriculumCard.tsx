'use client';

import { Curriculum } from '@/types/curriculum';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye, Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useCurriculos } from '@/hooks/useCurriculos';
import { toast } from 'sonner';

interface CurriculumCardProps {
  curriculum: Curriculum;
}

export function CurriculumCard({ curriculum }: CurriculumCardProps) {
  const { deleteCurriculo } = useCurriculos();

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja deletar este currículo? Esta ação não pode ser desfeita.')) {
      if (deleteCurriculo(curriculum.id)) {
        toast.success('Currículo removido com sucesso!');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const expCount = curriculum.experiencias?.length || 0;
  const eduCount = curriculum.formacoes?.length || 0;

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-blue-100">
      <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
        </div>
      </div>

      <div className="p-6 -mt-12 relative">
        <div className="mb-4">
          <div className="h-20 w-20 bg-gradient-to-br from-blue-100 to-blue-50 border-4 border-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
            {curriculum.foto ? (
              <img src={curriculum.foto} alt={curriculum.nome} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-blue-600">
                {curriculum.nome.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-2">{curriculum.nome}</h3>
          <p className="text-sm font-semibold text-blue-600 mb-2">{curriculum.cargoPretendido}</p>
          <p className="text-sm text-slate-600 line-clamp-2">{curriculum.resumo}</p>
        </div>

        <div className="space-y-2 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Mail className="h-4 w-4 text-blue-500" />
            <span className="truncate">{curriculum.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="h-4 w-4 text-blue-500" />
            <span>{curriculum.telefone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>Enviado em {formatDate(curriculum.createdAt)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-slate-100">
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-blue-600">{expCount}</div>
            <div className="text-xs text-slate-600">Experiências</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-blue-600">{eduCount}</div>
            <div className="text-xs text-slate-600">Formações</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button 
            asChild 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs h-9"
          >
            <Link href={`/sistema/curiculos/visualizar/${curriculum.id}`}>
              <Eye className="w-3 h-3 mr-1" /> Ver
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className="border-blue-200 text-blue-600 hover:bg-blue-50 text-xs h-9"
          >
            <Link href={`/sistema/curiculos/cadastrar?id=${curriculum.id}`}>
              <Edit2 className="w-3 h-3 mr-1" /> Editar
            </Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDelete}
            className="border-red-200 text-red-600 hover:bg-red-50 text-xs h-9"
          >
            <Trash2 className="w-3 h-3 mr-1" /> Deletar
          </Button>
        </div>
      </div>
    </Card>
  );
}
