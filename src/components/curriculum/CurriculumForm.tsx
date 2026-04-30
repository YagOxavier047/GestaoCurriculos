'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { curriculumSchema, type CurriculumFormData } from '@/lib/validations/curriculumSchema';
import { useCurriculos } from '@/hooks/useCurriculos';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const generateId = (prefix: string): string => {
  if (typeof window !== 'undefined') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  return `${prefix}-fallback`;
};

export function CurriculumForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;
  
  // Estado de hidratação para evitar acesso a APIs do navegador no SSR
  const [isHydrated, setIsHydrated] = useState(false);
  
  const { addCurriculo, getById, updateCurriculo } = useCurriculos();

  // Inicializa o form com valores padrão SEM crypto.randomUUID() no corpo do componente
  const { register, control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CurriculumFormData>({
    resolver: yupResolver(curriculumSchema),
    defaultValues: {
      experiencias: [{ id: 'temp-exp-1', empresa: '', cargo: '', periodo: '', descricao: '' }],
      formacoes: [{ id: 'temp-edu-1', instituicao: '', curso: '', conclusao: '' }]
    }
  });

  // Efeito para hidratação e carregamento de dados
  useEffect(() => {
    queueMicrotask(() => {
      setIsHydrated(true);
    });
  }, []);

  // Efeito para carregar currículo existente (só executa no cliente)
  useEffect(() => {
    if (!isHydrated || !id) return;

    const existingCurriculo = getById(id);
    if (!existingCurriculo) {
      toast.error('Currículo não encontrado para edição');
      return;
    }

    reset({
      nome: existingCurriculo.nome,
      email: existingCurriculo.email,
      cpf: existingCurriculo.cpf,
      telefone: existingCurriculo.telefone,
      dataNascimento: existingCurriculo.dataNascimento,
      cargoPretendido: existingCurriculo.cargoPretendido,
      resumo: existingCurriculo.resumo,
      experiencias: existingCurriculo.experiencias.map((exp) => ({
        id: exp.id || generateId('exp'),
        empresa: exp.empresa,
        cargo: exp.cargo,
        periodo: exp.periodo,
        descricao: exp.descricao,
      })),
      formacoes: existingCurriculo.formacoes.map((edu) => ({
        id: edu.id || generateId('edu'),
        instituicao: edu.instituicao,
        curso: edu.curso,
        conclusao: edu.conclusao,
      })),
    });
  }, [isHydrated, id, getById, reset]);

  const { fields: expFields, append: addExp, remove: removeExp } = useFieldArray({ control, name: 'experiencias' });
  const { fields: eduFields, append: addEdu, remove: removeEdu } = useFieldArray({ control, name: 'formacoes' });

  const onSubmit = async (data: CurriculumFormData) => {
    try {
      // Garante que estamos no ambiente cliente antes de salvar
      if (typeof window === 'undefined') {
        toast.error('Ambiente não suportado para salvar dados');
        return;
      }

      const success = id ? updateCurriculo(id, data) : addCurriculo(data);
      if (!success) {
        return;
      }

      toast.success(id ? 'Currículo atualizado com sucesso!' : 'Currículo cadastrado com sucesso!');
      reset({
        experiencias: [{ id: generateId('exp'), empresa: '', cargo: '', periodo: '', descricao: '' }],
        formacoes: [{ id: generateId('edu'), instituicao: '', curso: '', conclusao: '' }]
      });
      router.push('/sistema/curriculos/visualizar');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar currículo';
      toast.error(message);
    }
  };

  // Enquanto não hidratar, mostra loading para evitar mismatch entre SSR e cliente
  if (!isHydrated) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-10 bg-slate-200 rounded"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      {/* Dados Pessoais */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Dados Pessoais</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Nome *</label>
            <Input {...register('nome')} placeholder="Seu nome completo" />
            {errors.nome && <span className="text-red-500 text-xs">{errors.nome.message}</span>}
          </div>
          
          <div>
            <label className="text-sm font-medium">E-mail *</label>
            <Input type="email" {...register('email')} placeholder="seu@email.com" />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">CPF *</label>
            <Input {...register('cpf')} placeholder="000.000.000-00" />
            {errors.cpf && <span className="text-red-500 text-xs">{errors.cpf.message}</span>}
          </div>
          
          <div>
            <label className="text-sm font-medium">Telefone *</label>
            <Input {...register('telefone')} placeholder="(00) 00000-0000" />
            {errors.telefone && <span className="text-red-500 text-xs">{errors.telefone.message}</span>}
          </div>
          
          <div>
            <label className="text-sm font-medium">Data de Nascimento *</label>
            <Input type="date" {...register('dataNascimento')} />
            {errors.dataNascimento && <span className="text-red-500 text-xs">{errors.dataNascimento.message}</span>}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Cargo Pretendido *</label>
          <Input {...register('cargoPretendido')} placeholder="Ex: Desenvolvedor Full Stack" />
          {errors.cargoPretendido && <span className="text-red-500 text-xs">{errors.cargoPretendido.message}</span>}
        </div>

        <div>
          <label className="text-sm font-medium">Resumo Profissional *</label>
          <Textarea {...register('resumo')} placeholder="Fale sobre você, suas habilidades e objetivos..." rows={4} />
          {errors.resumo && <span className="text-red-500 text-xs">{errors.resumo.message}</span>}
        </div>
      </section>

      {/* Experiências Profissionais - Field Array Dinâmico */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Experiência Profissional</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => addExp({ 
              id: generateId('exp'), 
              empresa: '', 
              cargo: '', 
              periodo: '', 
              descricao: '' 
            })}
          >
            <Plus className="w-4 h-4 mr-1" /> Adicionar Experiência
          </Button>
        </div>
        
        {expFields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Experiência #{index + 1}</span>
              {expFields.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeExp(index)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Input {...register(`experiencias.${index}.empresa`)} placeholder="Empresa *" />
                {errors.experiencias?.[index]?.empresa && (
                  <span className="text-red-500 text-xs">{errors.experiencias[index]?.empresa?.message}</span>
                )}
              </div>
              <div>
                <Input {...register(`experiencias.${index}.cargo`)} placeholder="Cargo *" />
                {errors.experiencias?.[index]?.cargo && (
                  <span className="text-red-500 text-xs">{errors.experiencias[index]?.cargo?.message}</span>
                )}
              </div>
            </div>
            
            <div>
              <Input {...register(`experiencias.${index}.periodo`)} placeholder="Período (ex: Jan/2020 - Dez/2022) *" />
              {errors.experiencias?.[index]?.periodo && (
                <span className="text-red-500 text-xs">{errors.experiencias[index]?.periodo?.message}</span>
              )}
            </div>
            
            <div>
              <Textarea {...register(`experiencias.${index}.descricao`)} placeholder="Principais atividades..." rows={3} />
              {errors.experiencias?.[index]?.descricao && (
                <span className="text-red-500 text-xs">{errors.experiencias[index]?.descricao?.message}</span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Formação Acadêmica - Field Array Dinâmico */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Formação Acadêmica</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => addEdu({ 
              id: generateId('edu'), 
              instituicao: '', 
              curso: '', 
              conclusao: '' 
            })}
          >
            <Plus className="w-4 h-4 mr-1" /> Adicionar Formação
          </Button>
        </div>
        
        {eduFields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Formação #{index + 1}</span>
              {eduFields.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeEdu(index)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Input {...register(`formacoes.${index}.instituicao`)} placeholder="Instituição *" />
                {errors.formacoes?.[index]?.instituicao && (
                  <span className="text-red-500 text-xs">{errors.formacoes[index]?.instituicao?.message}</span>
                )}
              </div>
              <div>
                <Input {...register(`formacoes.${index}.curso`)} placeholder="Curso/Formação *" />
                {errors.formacoes?.[index]?.curso && (
                  <span className="text-red-500 text-xs">{errors.formacoes[index]?.curso?.message}</span>
                )}
              </div>
            </div>
            
            <div>
              <Input {...register(`formacoes.${index}.conclusao`)} placeholder="Data de Conclusão (ex: 12/2022) *" />
              {errors.formacoes?.[index]?.conclusao && (
                <span className="text-red-500 text-xs">{errors.formacoes[index]?.conclusao?.message}</span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Botões */}
      <div className="flex flex-col gap-2 pt-4 border-t sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? 'Salvando...' : (id ? 'Atualizar Currículo' : 'Salvar Currículo')}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}