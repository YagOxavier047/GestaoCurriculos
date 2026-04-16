export interface Experience {
  id: string;
  empresa: string;
  cargo: string;
  periodo: string;
  descricao: string;
}

export interface Education {
  id: string;
  instituicao: string;
  curso: string;
  conclusao: string;
}

export interface Curriculum {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  cargoPretendido: string;
  resumo: string;
  foto?: string;
  experiencias: Experience[];
  formacoes: Education[];
  createdAt: string;
}