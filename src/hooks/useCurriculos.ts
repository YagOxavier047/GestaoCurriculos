// src/hooks/useCurriculos.ts
'use client';

import { useState, useCallback } from 'react';
import { Curriculum } from '@/types/curriculum';
import { toast } from 'sonner';
import { mockCurriculos } from '@/lib/mockData';

function initializeCurriculos(): Curriculum[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('curriculos');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Erro ao parsear localStorage:', error);
      return mockCurriculos;
    }
  }
  localStorage.setItem('curriculos', JSON.stringify(mockCurriculos));
  return mockCurriculos;
}

export function useCurriculos() {
  const [curriculos, setCurriculos] = useState<Curriculum[]>(initializeCurriculos);
  const [loading] = useState(false);

  type CurriculoInput = Omit<Curriculum, 'id' | 'createdAt'>;

  const validateCurriculo = (data: CurriculoInput): boolean => {
    if (!data.nome?.trim()) {
      toast.error('Nome obrigatório');
      return false;
    }
    if (!data.email?.trim() || !data.email.includes('@')) {
      toast.error('Email inválido');
      return false;
    }
    if (!data.cpf?.trim()) {
      toast.error('CPF obrigatório');
      return false;
    }
    if (!data.telefone?.trim()) {
      toast.error('Telefone obrigatório');
      return false;
    }
    if (!data.cargoPretendido?.trim()) {
      toast.error('Cargo pretendido obrigatório');
      return false;
    }
    if (!data.resumo?.trim() || data.resumo.length < 10) {
      toast.error('Resumo profissional inválido (mínimo 10 caracteres)');
      return false;
    }
    return true;
  };

  const addCurriculo = useCallback((data: CurriculoInput) => {
    try {
      if (!validateCurriculo(data)) {
        return false;
      }

      const novoCurriculo: Curriculum = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      
      const novosCurriculos = [...curriculos, novoCurriculo];
      setCurriculos(novosCurriculos);
      localStorage.setItem('curriculos', JSON.stringify(novosCurriculos));
      
      return true;
    } catch (error) {
      console.error('Erro ao adicionar currículo:', error);
      toast.error('Erro ao salvar currículo. Tente novamente.');
      return false;
    }
  }, [curriculos]);

  const getById = useCallback((id: string): Curriculum | undefined => {
    if (!id) return undefined;
    return curriculos.find(c => c.id === id);
  }, [curriculos]);

  const deleteCurriculo = useCallback((id: string) => {
    try {
      if (!id) {
        toast.error('ID inválido');
        return false;
      }

      if (!curriculos.some(c => c.id === id)) {
        toast.error('Currículo não encontrado');
        return false;
      }

      const filtrados = curriculos.filter(c => c.id !== id);
      setCurriculos(filtrados);
      localStorage.setItem('curriculos', JSON.stringify(filtrados));
      toast.success('Currículo removido com sucesso!');
      
      return true;
    } catch (error) {
      console.error('Erro ao deletar currículo:', error);
      toast.error('Erro ao remover currículo. Tente novamente.');
      return false;
    }
  }, [curriculos]);

  const updateCurriculo = useCallback((id: string, data: Partial<CurriculoInput>) => {
    try {
      if (!id) {
        toast.error('ID inválido');
        return false;
      }

      const index = curriculos.findIndex(c => c.id === id);
      if (index === -1) {
        toast.error('Currículo não encontrado');
        return false;
      }

      const curriculoAtualizado: Curriculum = {
        ...curriculos[index],
        ...data,
      };

      const novosCurrentículos = [...curriculos];
      novosCurrentículos[index] = curriculoAtualizado;
      
      setCurriculos(novosCurrentículos);
      localStorage.setItem('curriculos', JSON.stringify(novosCurrentículos));
      toast.success('Currículo atualizado com sucesso!');
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar currículo:', error);
      toast.error('Erro ao atualizar currículo. Tente novamente.');
      return false;
    }
  }, [curriculos]);

  const search = useCallback((term: string): Curriculum[] => {
    if (!term.trim()) return curriculos;
    
    const lowerTerm = term.toLowerCase();
    return curriculos.filter(c => 
      c.nome.toLowerCase().includes(lowerTerm) ||
      c.cargoPretendido.toLowerCase().includes(lowerTerm) ||
      c.email.toLowerCase().includes(lowerTerm)
    );
  }, [curriculos]);

  const exportarJSON = useCallback((id?: string) => {
    try {
      let dadosExportar = id ? curriculos.filter(c => c.id === id) : curriculos;
      
      if (dadosExportar.length === 0) {
        toast.error('Nenhum currículo para exportar');
        return;
      }

      const dataStr = JSON.stringify(dadosExportar, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `curriculos-${new Date().getTime()}.json`;
      link.click();
      
      toast.success('Currículo(s) exportado(s) com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar:', error);
      toast.error('Erro ao exportar currículo. Tente novamente.');
    }
  }, [curriculos]);

  const clearAll = useCallback(() => {
    if (window.confirm('Tem certeza que deseja remover TODOS os currículos? Esta ação não pode ser desfeita.')) {
      try {
        setCurriculos([]);
        localStorage.removeItem('curriculos');
        toast.success('Todos os currículos foram removidos');
        return true;
      } catch (error) {
        console.error('Erro ao limpar:', error);
        toast.error('Erro ao limpar currículos');
        return false;
      }
    }
    return false;
  }, []);

  return { 
    curriculos, 
    loading, 
    addCurriculo, 
    getById, 
    deleteCurriculo,
    updateCurriculo,
    search,
    exportarJSON,
    clearAll,
  };
}