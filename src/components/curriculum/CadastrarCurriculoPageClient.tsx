'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { CurriculumForm } from '@/components/curriculum/CurriculumForm';

export default function CadastrarCurriculoPageClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const pageTitle = useMemo(
    () => (id ? 'Editar Currículo' : 'Cadastrar Novo Currículo'),
    [id]
  );

  const pageSubtitle = useMemo(
    () => (id ? 'Atualize os dados do currículo existente.' : 'Preencha todas as informações abaixo para criar seu currículo.'),
    [id]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-16 lg:py-20 px-4 sm:px-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-12 lg:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">{pageTitle}</h1>
          <p className="text-base sm:text-lg text-slate-600">{pageSubtitle}</p>
        </div>
        <CurriculumForm />
      </div>
    </div>
  );
}
