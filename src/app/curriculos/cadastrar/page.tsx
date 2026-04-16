'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCurriculos } from '@/hooks/useCurriculos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: yup.string().length(14, 'CPF deve ter 14 dígitos').required('CPF é obrigatório'),
  telefone: yup.string().min(15, 'Telefone inválido').required('Telefone é obrigatório'),
  dataNascimento: yup.string().required('Data de nascimento é obrigatória'),
  cargoPretendido: yup.string().required('Cargo é obrigatório'),
  resumo: yup.string().min(20, 'Resumo deve ter no mínimo 20 caracteres').required('Resumo é obrigatório'),
  experiencias: yup.array().of(
    yup.object({
      empresa: yup.string().required('Empresa é obrigatória'),
      cargo: yup.string().required('Cargo é obrigatório'),
      periodo: yup.string().required('Período é obrigatório'),
      descricao: yup.string()
    })
  ).required('Pelo menos uma experiência é obrigatória')
}).required();

type FormData = yup.InferType<typeof schema>;

export default function CadastrarPage() {
  const { addCurriculo } = useCurriculos();
  const router = useRouter();
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      experiencias: [{ empresa: '', cargo: '', periodo: '', descricao: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiencias"
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoBase64(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const experienciasComId = data.experiencias.map((exp) => ({
        ...exp,
        id: crypto.randomUUID(),
        descricao: exp.descricao ?? '',
      }));

      await addCurriculo({
        ...data,
        experiencias: experienciasComId,
        foto: fotoBase64 || '',
        formacoes: []
      });
      toast.success('Currículo cadastrado com sucesso!');
      reset();
      router.push('/curriculos/visualizar');
    } catch (error) {
      toast.error('Erro ao salvar currículo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-16 lg:py-20 px-4 sm:px-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Novo Currículo</h1>
          <p className="text-base sm:text-lg text-slate-600 px-2">Preencha suas informações profissionais para criar um currículo completo</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
          
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-6">
              <CardTitle className="text-xl">Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 px-6 pb-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-slate-200">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-blue-50 border-4 border-blue-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                  {fotoBase64 ? (
                    <img src={fotoBase64} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-8 h-8 text-blue-400" />
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <Input type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer border-blue-200 focus:border-blue-500 focus:ring-blue-500 w-full" />
                  <p className="text-xs text-slate-500 mt-3">JPG ou PNG (máx. 5MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium text-sm">Nome Completo *</Label>
                  <Input {...register("nome")} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-10" placeholder="João Silva" />
                  {errors.nome && <span className="text-red-500 text-xs mt-1 block">{errors.nome.message}</span>}
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium text-sm">E-mail *</Label>
                  <Input type="email" {...register("email")} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-10" placeholder="joao@email.com" />
                  {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium text-sm">CPF *</Label>
                  <Input {...register("cpf")} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-10" placeholder="000.000.000-00" />
                  {errors.cpf && <span className="text-red-500 text-xs mt-1 block">{errors.cpf.message}</span>}
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium text-sm">Telefone *</Label>
                  <Input {...register("telefone")} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-10" placeholder="(00) 00000-0000" />
                  {errors.telefone && <span className="text-red-500 text-xs mt-1 block">{errors.telefone.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium text-sm">Data de Nascimento *</Label>
                  <Input type="date" {...register("dataNascimento")} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-10" />
                  {errors.dataNascimento && <span className="text-red-500 text-xs mt-1 block">{errors.dataNascimento.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-medium text-sm">Cargo Pretendido *</Label>
                <Input {...register("cargoPretendido")} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-10" placeholder="Ex: Desenvolvedor Full Stack" />
                {errors.cargoPretendido && <span className="text-red-500 text-xs mt-1 block">{errors.cargoPretendido.message}</span>}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-medium text-sm">Resumo Profissional *</Label>
                <Textarea {...register("resumo")} rows={4} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500" placeholder="Fale sobre você, suas skills e objetivos profissionais..." />
                {errors.resumo && <span className="text-red-500 text-xs mt-1 block">{errors.resumo.message}</span>}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-6 flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Experiências Profissionais</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => append({ empresa: '', cargo: '', periodo: '', descricao: '' })} className="bg-white text-blue-600 hover:bg-blue-50 border-0 ml-4">
                <Plus className="w-4 h-4 mr-1" /> Adicionar
              </Button>
            </CardHeader>
            <CardContent className="pt-8 px-6 pb-8 space-y-5">
              {fields.length === 0 ? (
                <p className="text-slate-500 text-center py-8">Nenhuma experiência adicionada ainda</p>
              ) : (
                fields.map((item, index) => (
                  <div key={item.id} className="p-5 border-2 border-blue-100 rounded-xl bg-blue-50/50 space-y-4 relative hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-blue-700">Experiência #{index + 1}</span>
                      {fields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => remove(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Input placeholder="Empresa *" {...register(`experiencias.${index}.empresa`)} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-10" />
                        {errors.experiencias?.[index]?.empresa && <span className="text-red-500 text-xs mt-1 block">{errors.experiencias[index]?.empresa?.message}</span>}
                      </div>
                      <div>
                        <Input placeholder="Cargo *" {...register(`experiencias.${index}.cargo`)} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-10" />
                        {errors.experiencias?.[index]?.cargo && <span className="text-red-500 text-xs mt-1 block">{errors.experiencias[index]?.cargo?.message}</span>}
                      </div>
                    </div>
                    
                    <div>
                      <Input placeholder="Período (ex: Jan 2020 - Atual) *" {...register(`experiencias.${index}.periodo`)} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-10" />
                      {errors.experiencias?.[index]?.periodo && <span className="text-red-500 text-xs mt-1 block">{errors.experiencias[index]?.periodo?.message}</span>}
                    </div>
                    
                    <div>
                      <Textarea placeholder="Principais atividades, conquistas e responsabilidades..." {...register(`experiencias.${index}.descricao`)} className="border-blue-200 focus:border-blue-500 focus:ring-blue-500" rows={3} />
                      {errors.experiencias?.[index]?.descricao && <span className="text-red-500 text-xs mt-1 block">{errors.experiencias[index]?.descricao?.message}</span>}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-8">
            <Button type="submit" disabled={isSubmitting} className="sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 h-auto rounded-lg shadow-md hover:shadow-lg transition-all">
              {isSubmitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Salvando...
                </>
              ) : (
                'Salvar Currículo'
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              className="sm:flex-1 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold py-3 h-auto rounded-lg transition-all"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}