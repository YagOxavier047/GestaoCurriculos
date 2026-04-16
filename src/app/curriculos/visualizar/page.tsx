'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useCurriculos } from '@/hooks/useCurriculos';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, User, Briefcase, PlusCircle, Eye } from 'lucide-react';

export default function VisualizarPage() {
  const { curriculos, loading } = useCurriculos();
  const [busca, setBusca] = useState('');
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSimulatedLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const resultadosFiltrados = useMemo(() => {
    if (!busca) return curriculos;
    const termo = busca.toLowerCase();
    return curriculos.filter(
      (curriculo) =>
        curriculo.nome.toLowerCase().includes(termo) ||
        curriculo.cargoPretendido.toLowerCase().includes(termo)
    );
  }, [curriculos, busca]);

  if (!loading && !isSimulatedLoading && curriculos.length === 0) {
    return (
      <div className="container py-16 text-center space-y-6 flex flex-col items-center">
        <div className="bg-muted p-6 rounded-full">
          <FileText className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Nenhum currículo encontrado</h2>
          <p className="text-muted-foreground">
            {busca ? `Não encontramos resultados para "${busca}".` : 'O sistema está vazio. Cadastre o primeiro currículo!'}
          </p>
        </div>
        {!busca && (
          <Button asChild>
            <Link href="/curriculos/cadastrar">
              <PlusCircle className="mr-2 h-4 w-4" /> Criar meu primeiro currículo
            </Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-end md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Currículos Cadastrados</h1>
          <p className="text-muted-foreground mt-1">Gerencie e visualize os perfis dos candidatos.</p>
        </div>
        
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou cargo..."
            className="pl-9"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {isSimulatedLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-[250px]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isSimulatedLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultadosFiltrados.map((curriculo) => (
            <Card key={curriculo.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={curriculo.foto} alt={curriculo.nome} />
                  <AvatarFallback>
                    {curriculo.nome.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg leading-none">{curriculo.nome}</CardTitle>
                  <Badge variant="secondary" className="mt-1">{curriculo.cargoPretendido}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-2">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {curriculo.resumo}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Briefcase className="h-3 w-3" />
                  {curriculo.experiencias.length} experiências
                  <span className="mx-1">•</span>
                  <User className="h-3 w-3" />
                  {curriculo.formacoes.length} formações
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href={`/curriculos/visualizar/${curriculo.id}`}>
                    <Eye className="h-4 w-4" /> Visualizar Detalhes
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {!isSimulatedLoading && resultadosFiltrados.length === 0 && curriculos.length > 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhum currículo corresponde à sua busca.</p>
        </div>
      )}
    </div>
  );
}