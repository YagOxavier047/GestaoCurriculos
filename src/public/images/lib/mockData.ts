import { Curriculum } from '@/types/curriculum';

export const mockCurriculos: Curriculum[] = [
  {
    id: '1',
    nome: 'João Silva Santos',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-00',
    telefone: '(11) 98765-4321',
    dataNascimento: '15/03/1990',
    cargoPretendido: 'Desenvolvedor Frontend',
    resumo: 'Profissional com 5 anos de experiência em desenvolvimento web, especializado em React, Next.js e TypeScript. Focado em criar experiências de usuário excepcionais e código limpo.',
    foto: '/images/foto1.jpg',
    experiencias: [
      {
        id: 'exp1',
        empresa: 'Tech Solutions Ltda',
        cargo: 'Desenvolvedor Junior',
        periodo: 'Jan 2020 - Dez 2022',
        descricao: 'Desenvolvimento de aplicações web utilizando React e TypeScript.'
      },
      {
        id: 'exp2',
        empresa: 'Digital Agency',
        cargo: 'Desenvolvedor Pleno',
        periodo: 'Jan 2023 - Atual',
        descricao: 'Liderança técnica em projetos Next.js e implementação de UI/UX.'
      }
    ],
    formacoes: [
      {
        id: 'form1',
        instituicao: 'Universidade de São Paulo',
        curso: 'Ciência da Computação',
        conclusao: '2019'
      }
    ],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    nome: 'Maria Oliveira Santos',
    email: 'maria.oliveira@email.com',
    cpf: '987.654.321-00',
    telefone: '(11) 91234-5678',
    dataNascimento: '22/08/1995',
    cargoPretendido: 'Designer UX/UI',
    resumo: 'Designer apaixonada por criar interfaces intuitivas e experiências memoráveis. Experiência com Figma, pesquisa de usuários e design systems.',
    foto: '/images/foto2.jpg',
    experiencias: [
      {
        id: 'exp1',
        empresa: 'Creative Studio',
        cargo: 'Designer Junior',
        periodo: 'Mar 2021 - Atual',
        descricao: 'Criação de interfaces para aplicações web e mobile.'
      }
    ],
    formacoes: [
      {
        id: 'form1',
        instituicao: 'FAAP',
        curso: 'Design Gráfico',
        conclusao: '2020'
      }
    ],
    createdAt: '2024-02-20T14:30:00Z'
  }
];