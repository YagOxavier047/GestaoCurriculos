import { Curriculum } from '@/types/curriculum';

export const mockCurriculos: Curriculum[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@email.com',
    cpf: '123.456.789-01',
    telefone: '(11) 99999-9999',
    dataNascimento: '01/01/1990',
    cargoPretendido: 'Desenvolvedor Full Stack',
    resumo: 'Desenvolvedor com 5 anos de experiência em tecnologias web',
    foto: undefined,
    experiencias: [
      {
        id: '1',
        empresa: 'Tech Company',
        cargo: 'Desenvolvedor Senior',
        periodo: '2022 - Atual',
        descricao: 'Desenvolvimento de aplicações web com React e Node.js',
      },
    ],
    formacoes: [
      {
        id: '1',
        instituicao: 'Universidade XYZ',
        curso: 'Engenharia de Software',
        conclusao: '2018',
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@email.com',
    cpf: '987.654.321-01',
    telefone: '(11) 88888-8888',
    dataNascimento: '15/05/1992',
    cargoPretendido: 'UX/UI Designer',
    resumo: 'Designer com experiência em design de interfaces',
    foto: undefined,
    experiencias: [
      {
        id: '2',
        empresa: 'Design Studio',
        cargo: 'UX/UI Designer',
        periodo: '2021 - Atual',
        descricao: 'Design de interfaces para aplicações web e mobile',
      },
    ],
    formacoes: [
      {
        id: '2',
        instituicao: 'Faculdade de Design',
        curso: 'Design Gráfico',
        conclusao: '2019',
      },
    ],
    createdAt: new Date().toISOString(),
  },
];
