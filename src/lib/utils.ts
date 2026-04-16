import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatarData(data: string): string {
  try {
    const [dia, mes, ano] = data.split('/');
    const date = new Date(`${ano}-${mes}-${dia}`);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return data;
  }
}

export function formatarTelefone(telefone: string): string {
  return telefone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

export function formatarCPF(cpf: string): string {
  return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function calcularIdade(dataNascimento: string): number {
  const [dia, mes, ano] = dataNascimento.split('/').map(Number);
  const hoje = new Date();
  let idade = hoje.getFullYear() - ano;

  if (hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia)) {
    idade--;
  }

  return idade;
}

export function truncarTexto(texto: string, limite: number): string {
  if (texto.length <= limite) return texto;
  return texto.substring(0, limite) + '...';
}
