// src/app/curriculos/visualizar/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCurriculos } from '@/hooks/useCurriculos';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Trash2, Briefcase, GraduationCap, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function DetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const { getById, deleteCurriculo } = useCurriculos();
  
  // Estado para simular o loading do Skeleton
  const [loading, setLoading] = useState(true);
  const id = params.id as string;
  
  const curriculo = getById(id);

  // Simula delay de carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  // Se não encontrou o currículo
  if (!loading && !curriculo) {
    return (
      <div className="container py-20 text-center space-y-6">
        <h2 className="text-2xl font-bold">Currículo não encontrado</h2>
        <Button asChild>
          <Link href="/curriculos/visualizar">Voltar para a lista</Link>
        </Button>
      </div>
    );
  }

  // Skeleton Loading
  if (loading) {
    return (
      <div className="container py-8 space-y-8 max-w-4xl">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-3 flex-1">
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <Skeleton className="h-[200px] w-full rounded-xl" />
      </div>
    );
  }

  // Renderização Real
  return (
    <div className="container py-8 max-w-4xl space-y-8">
      {/* Navegação Superior */}
      <div className="flex justify-between items-center">
        <Link href="/curriculos/visualizar" className="flex items-center gap-2 text-sm hover:underline">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <Button variant="destructive" size="sm" onClick={() => {
          toast.success('Currículo excluído com sucesso!');
          deleteCurriculo(id);
          router.push('/curriculos/visualizar');
        }}>
          <Trash2 className="w-4 h-4 mr-2" /> Excluir
        </Button>
      </div>

      {/* Header do Perfil */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
          <AvatarImage src={curriculo?.foto} alt={curriculo?.nome} />
          <AvatarFallback className="text-2xl">{curriculo?.nome.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{curriculo?.nome}</h1>
          <Badge className="text-base px-4 py-1">{curriculo?.cargoPretendido}</Badge>
          <p className="text-muted-foreground pt-2">{curriculo?.resumo}</p>
        </div>
      </div>

      <Separator />

      <div className="grid md:grid-cols-3 gap-8">
        {/* Coluna da Esquerda: Contato */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Dados de Contato</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="truncate">{curriculo?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{curriculo?.telefone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>CPF: {curriculo?.cpf}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Nasc: {curriculo?.dataNascimento}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna da Direita: Histórico */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Experiências */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <CardTitle>Experiência Profissional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {curriculo?.experiencias?.map((exp, index) => (
                <div key={exp.id || index} className="relative pl-4 border-l-2 border-muted">
                  <h3 className="font-semibold text-lg">{exp.cargo}</h3>
                  <div className="text-sm font-medium text-primary">{exp.empresa}</div>
                  <div className="text-xs text-muted-foreground mb-2">{exp.periodo}</div>
                  <p className="text-sm text-muted-foreground">{exp.descricao}</p>
                </div>
              ))}
              {(!curriculo?.experiencias || curriculo.experiencias.length === 0) && (
                <p className="text-sm text-muted-foreground">Nenhuma experiência registrada.</p>
              )}
            </CardContent>
          </Card>

          {/* Formações */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <CardTitle>Formação Acadêmica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {curriculo?.formacoes?.map((form, index) => (
                <div key={form.id || index}>
                  <h3 className="font-semibold">{form.curso}</h3>
                  <p className="text-sm text-muted-foreground">{form.instituicao}</p>
                  <Badge variant="outline" className="mt-1 text-xs">{form.conclusao}</Badge>
                </div>
              ))}
              {(!curriculo?.formacoes || curriculo.formacoes.length === 0) && (
                <p className="text-sm text-muted-foreground">Nenhuma formação registrada.</p>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}