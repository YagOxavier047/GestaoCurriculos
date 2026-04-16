'use client';

import { useState, useMemo } from 'react';
import { useCurriculos } from '@/hooks/useCurriculos';
import { Curriculum } from '@/types/curriculum';
import { CurriculumCard } from '@/components/curriculum/CurriculumCard';
import { SearchBar } from '@/components/curriculum/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ListaCurriculosPage() {
  const { curriculos, loading, exportarJSON, clearAll } = useCurriculos();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtro em tempo real
  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return curriculos;
    return curriculos.filter(c => 
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cargoPretendido.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, curriculos]);

  if (loading) {
    return (
      <div className="container py-8 space-y-4">
        {[1,2,3].map(i => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Meus Currículos</h1>
          <p className="text-slate-600">{filtered.length} currículo(s) disponível(is)</p>
        </div>

        {/* Barra de Ações */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="flex-1">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className="flex gap-2">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold">
              <Link href="/sistema/curiculos/cadastrar">
                <Plus className="w-4 h-4 mr-2" /> Novo Currículo
              </Link>
            </Button>
            {curriculos.length > 0 && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => exportarJSON()}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Download className="w-4 h-4 mr-2" /> Exportar
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        {curriculos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-blue-300 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Nenhum currículo encontrado</h2>
            <p className="text-slate-600 mb-6">Você ainda não criou nenhum currículo. Comece agora!</p>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold">
              <Link href="/sistema/curiculos/cadastrar">
                <Plus className="w-4 h-4 mr-2" /> Criar Meu Primeiro Currículo
              </Link>
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-blue-300 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Nenhum resultado encontrado</h2>
            <p className="text-slate-600">Nenhum currículo corresponde aos termos de busca "&quot;{searchTerm}&quot;"</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filtered.map((curriculo: Curriculum) => (
                <CurriculumCard key={curriculo.id} curriculum={curriculo} />
              ))}
            </div>

            {/* Total de resultados */}
            <div className="text-center text-slate-600 text-sm py-4">
              Mostrando {filtered.length} de {curriculos.length} currículo(s)
            </div>
          </>
        )}

        {/* Botão Limpar Tudo (se houver currículos) */}
        {curriculos.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <Button 
              variant="outline"
              onClick={clearAll}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Remover Todos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}