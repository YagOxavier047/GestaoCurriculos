import { Suspense } from 'react';
import CadastrarCurriculoPageClient from '@/components/curriculum/CadastrarCurriculoPageClient';

export default function CadastrarCurriculoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-16 lg:py-20 px-4 sm:px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    }>
      <CadastrarCurriculoPageClient />
    </Suspense>
  );
}
