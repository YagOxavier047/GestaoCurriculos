// src/hooks/useCurriculos.ts
'use client';

import { useState, useCallback, useEffect } from 'react';
import { Curriculum } from '@/types/curriculum';
import { toast } from 'sonner';
import { mockCurriculos } from '@/lib/mockData';

// Helper seguro para gerar IDs apenas no cliente
const generateId = (): string => {
  if (typeof window !== 'undefined' && typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback para ambientes sem crypto.randomUUID
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper seguro para acessar localStorage
const getStorageCurriculos = (): Curriculum[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('curriculos');
    if (stored) {
      return JSON.parse(stored);
    }
    // Inicializa com mock apenas no primeiro acesso no cliente
    localStorage.setItem('curriculos', JSON.stringify(mockCurriculos));
    return mockCurriculos;
  } catch (error) {
    console.error('Erro ao acessar localStorage:', error);
    return mockCurriculos;
  }
};

// Helper seguro para salvar no localStorage
const saveStorageCurriculos = (data: Curriculum[]): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem('curriculos', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
    return false;
  }
};

export function useCurriculos() {
  // Inicializa estado vazio no SSR e carrega dados apenas no cliente
  const [curriculos, setCurriculos] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega dados do localStorage apenas no cliente
  useEffect(() => {
    queueMicrotask(() => {
      setCurriculos(getStorageCurriculos());
      setLoading(false);
    });
  }, []);

  const isHydrated = !loading;

  type CurriculoInput = Omit<Curriculum, 'id' | 'createdAt'>;

  const validateCurriculo = useCallback((data: CurriculoInput): boolean => {
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
  }, []);

  const addCurriculo = useCallback((data: CurriculoInput) => {
    try {
      if (!isHydrated) {
        toast.error('Aguarde o carregamento da página');
        return false;
      }

      if (!validateCurriculo(data)) {
        return false;
      }

      const novoCurriculo: Curriculum = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      
      const novosCurriculos = [...curriculos, novoCurriculo];
      setCurriculos(novosCurriculos);
      
      if (!saveStorageCurriculos(novosCurriculos)) {
        toast.error('Não foi possível salvar localmente');
      }
      
      return true;
    } catch (error: unknown) {
      console.error('Erro ao adicionar currículo:', error);
      toast.error('Erro ao salvar currículo. Tente novamente.');
      return false;
    }
  }, [curriculos, isHydrated, validateCurriculo]);

  const getById = useCallback((id: string): Curriculum | undefined => {
    if (!id || !isHydrated) return undefined;
    return curriculos.find(c => c.id === id);
  }, [curriculos, isHydrated]);

  const deleteCurriculo = useCallback((id: string) => {
    try {
      if (!isHydrated) {
        toast.error('Aguarde o carregamento da página');
        return false;
      }

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
      
      if (!saveStorageCurriculos(filtrados)) {
        toast.error('Não foi possível atualizar o armazenamento');
      }
      
      toast.success('Currículo removido com sucesso!');
      return true;
    } catch (error: unknown) {
      console.error('Erro ao deletar currículo:', error);
      toast.error('Erro ao remover currículo. Tente novamente.');
      return false;
    }
  }, [curriculos, isHydrated]);

  const updateCurriculo = useCallback((id: string, data: Partial<CurriculoInput>) => {
    try {
      if (!isHydrated) {
        toast.error('Aguarde o carregamento da página');
        return false;
      }

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

      const novosCurriculos = [...curriculos];
      novosCurriculos[index] = curriculoAtualizado;
      
      setCurriculos(novosCurriculos);
      
      if (!saveStorageCurriculos(novosCurriculos)) {
        toast.error('Não foi possível atualizar o armazenamento');
      }
      
      toast.success('Currículo atualizado com sucesso!');
      return true;
    } catch (error: unknown) {
      console.error('Erro ao atualizar currículo:', error);
      toast.error('Erro ao atualizar currículo. Tente novamente.');
      return false;
    }
  }, [curriculos, isHydrated]);

  const search = useCallback((term: string): Curriculum[] => {
    if (!term.trim() || !isHydrated) return curriculos;
    
    const lowerTerm = term.toLowerCase();
    return curriculos.filter(c => 
      c.nome.toLowerCase().includes(lowerTerm) ||
      c.cargoPretendido.toLowerCase().includes(lowerTerm) ||
      c.email.toLowerCase().includes(lowerTerm)
    );
  }, [curriculos, isHydrated]);

  const exportarJSON = useCallback((id?: string) => {
    try {
      if (typeof window === 'undefined' || !isHydrated) {
        toast.error('Exportação disponível apenas no navegador');
        return;
      }

      const dadosExportar = id ? curriculos.filter(c => c.id === id) : curriculos;
      
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
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Currículo(s) exportado(s) com sucesso!');
    } catch (error: unknown) {
      console.error('Erro ao exportar:', error);
      toast.error('Erro ao exportar currículo. Tente novamente.');
    }
  }, [curriculos, isHydrated]);

  const clearAll = useCallback(() => {
    if (typeof window === 'undefined' || !isHydrated) {
      toast.error('Operação disponível apenas no navegador');
      return false;
    }

    if (window.confirm('Tem certeza que deseja remover TODOS os currículos? Esta ação não pode ser desfeita.')) {
      try {
        setCurriculos([]);
        localStorage.removeItem('curriculos');
        toast.success('Todos os currículos foram removidos');
        return true;
      } catch (error: unknown) {
        console.error('Erro ao limpar:', error);
        toast.error('Erro ao limpar currículos');
        return false;
      }
    }
    return false;
  }, [isHydrated]);

  return { 
    curriculos, 
    loading,
    isHydrated,
    addCurriculo, 
    getById, 
    deleteCurriculo,
    updateCurriculo,
    search,
    exportarJSON,
    clearAll,
  };
};

export default useCurriculos;