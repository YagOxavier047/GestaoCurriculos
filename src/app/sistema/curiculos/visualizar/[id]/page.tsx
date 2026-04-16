'use client';

import { useState, useEffect } from 'react';
import { useCurriculos } from '@/hooks/useCurriculos';
import { useParams } from 'next/navigation';
import { Curriculum } from '@/types/curriculum';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, Edit2, Trash2, Download } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function VisualizarCurriculoPage() {
  const params = useParams();
  const { curriculos, loading, deleteCurriculo } = useCurriculos();
  const [curriculo, setCurriculo] = useState<Curriculum | null>(null);

  const id = params.id as string;

  useEffect(() => {
    if (curriculos.length > 0) {
      const found = curriculos.find((c) => c.id === id);
      setCurriculo(found || null);
    }
  }, [curriculos, id]);

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja deletar este currículo?')) {
      deleteCurriculo(id);
      // Redirecionar para lista
      window.location.href = '/sistema/curiculos/visualizar';
    }
  };

  const handleDownloadPdf = async () => {
    if (!curriculo) return;

    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const margin = 18;
    const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    const pageHeight = pdf.internal.pageSize.getHeight();
    const lineHeight = 7;
    let cursorY = margin;

    const addPageIfNeeded = (height: number) => {
      if (cursorY + height > pageHeight - margin) {
        pdf.addPage();
        cursorY = margin;
      }
    };

    pdf.setTextColor('#0f172a');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.text(curriculo.nome, margin, cursorY);
    cursorY += 10;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor('#475569');
    pdf.text(curriculo.cargoPretendido, margin, cursorY);
    cursorY += 12;

    pdf.setDrawColor('#e2e8f0');
    pdf.setLineWidth(0.5);
    pdf.line(margin, cursorY, margin + maxWidth, cursorY);
    cursorY += 10;

    addPageIfNeeded(44);
    pdf.setFillColor('#f8fafc');
    pdf.roundedRect(margin, cursorY, maxWidth, 42, 4, 4, 'F');
    pdf.setTextColor('#0f172a');
    pdf.setFontSize(11);
    pdf.text('Dados Pessoais', margin + 4, cursorY + 8);

    pdf.setFontSize(10);
    pdf.setTextColor('#334155');
    pdf.text(`Email: ${curriculo.email}`, margin + 4, cursorY + 16, { maxWidth: maxWidth - 8 });
    pdf.text(`Telefone: ${curriculo.telefone}`, margin + 4, cursorY + 22, { maxWidth: maxWidth - 8 });
    pdf.text(`CPF: ${curriculo.cpf}`, margin + 4, cursorY + 28, { maxWidth: maxWidth - 8 });
    pdf.text(`Nascimento: ${curriculo.dataNascimento}`, margin + 4, cursorY + 34, { maxWidth: maxWidth - 8 });
    cursorY += 54;

    pdf.setFontSize(12);
    pdf.setTextColor('#0f172a');
    pdf.text('Resumo Profissional', margin, cursorY);
    cursorY += 8;

    pdf.setFontSize(10);
    pdf.setTextColor('#334155');
    const resumoLines = pdf.splitTextToSize(curriculo.resumo, maxWidth);
    pdf.text(resumoLines, margin, cursorY);
    cursorY += resumoLines.length * lineHeight + 10;

    pdf.setFontSize(12);
    pdf.setTextColor('#0f172a');
    pdf.text('Experiência Profissional', margin, cursorY);
    cursorY += 8;

    curriculo.experiencias.forEach((exp) => {
      const expHeader = `${exp.cargo} • ${exp.empresa}`;
      const descLines = pdf.splitTextToSize(exp.descricao, maxWidth);
      const requiredHeight = 10 + descLines.length * lineHeight + 6;
      addPageIfNeeded(requiredHeight);

      pdf.setFontSize(11);
      pdf.setTextColor('#0f172a');
      pdf.text(expHeader, margin, cursorY);
      cursorY += 6;

      pdf.setFontSize(10);
      pdf.setTextColor('#475569');
      pdf.text(exp.periodo, margin, cursorY);
      cursorY += 6;

      pdf.setTextColor('#334155');
      pdf.text(descLines, margin, cursorY);
      cursorY += descLines.length * lineHeight + 8;
    });

    pdf.setFontSize(12);
    pdf.setTextColor('#0f172a');
    addPageIfNeeded(14);
    pdf.text('Formação Acadêmica', margin, cursorY);
    cursorY += 8;

    curriculo.formacoes.forEach((edu) => {
      const eduLine = `${edu.curso} — ${edu.instituicao}`;
      const requiredHeight = 10 + lineHeight + 8;
      addPageIfNeeded(requiredHeight);

      pdf.setFontSize(11);
      pdf.setTextColor('#0f172a');
      pdf.text(eduLine, margin, cursorY);
      cursorY += 6;

      pdf.setFontSize(10);
      pdf.setTextColor('#475569');
      pdf.text(`Conclusão: ${edu.conclusao}`, margin, cursorY);
      cursorY += 10;
    });

    pdf.save(`${curriculo.nome.replace(/\s+/g, '_').toLowerCase()}_curriculo.pdf`);
  };

  if (loading) {
    return (
      <div className="container py-8 space-y-4">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!curriculo) {
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Currículo não encontrado</h1>
          <Button asChild>
            <Link href="/sistema/curiculos/visualizar">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar à lista
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto space-y-8">
        <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Visualização do currículo</p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{curriculo.nome}</h1>
              <p className="text-lg text-slate-600">{curriculo.cargoPretendido}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="outline" size="sm" className="text-slate-700">
                <Link href="/sistema/curiculos/visualizar">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadPdf} className="text-slate-700 border-slate-200 hover:border-slate-300">
                <Download className="w-4 h-4 mr-2" /> Baixar PDF
              </Button>
              <Button asChild size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
                <Link href={`/sistema/curiculos/cadastrar?id=${curriculo.id}`}>
                  <Edit2 className="w-4 h-4 mr-2" /> Editar
                </Link>
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" /> Deletar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <Card>
              <div className="rounded-t-[28px] bg-slate-950 px-6 py-6 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Perfil profissional</p>
                <p className="mt-3 text-base leading-relaxed text-slate-200">{curriculo.resumo}</p>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Email</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{curriculo.email}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Telefone</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{curriculo.telefone}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">CPF</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{curriculo.cpf}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Nascimento</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{curriculo.dataNascimento}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Experiência Profissional</h2>
              <div className="space-y-4">
                {curriculo.experiencias.map((exp) => (
                  <div key={exp.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">{exp.cargo}</h3>
                      <span className="text-sm text-slate-500">{exp.periodo}</span>
                    </div>
                    <p className="text-sm text-slate-600">{exp.empresa}</p>
                    <p className="mt-3 text-slate-700 leading-relaxed">{exp.descricao}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Formação Acadêmica</h2>
              <div className="space-y-4">
                {curriculo.formacoes.map((edu) => (
                  <div key={edu.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">{edu.curso}</h3>
                      <span className="text-sm text-slate-500">Conclusão: {edu.conclusao}</span>
                    </div>
                    <p className="mt-3 text-slate-600">{edu.instituicao}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
