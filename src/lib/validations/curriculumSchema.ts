import * as yup from 'yup';

export const curriculumSchema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  cpf: yup.string().required('CPF obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
  dataNascimento: yup.string().required('Data de nascimento obrigatória'),
  cargoPretendido: yup.string().required('Cargo pretendido obrigatório'),
  resumo: yup.string().required('Resumo obrigatório'),
  experiencias: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      empresa: yup.string().required('Empresa obrigatória'),
      cargo: yup.string().required('Cargo obrigatório'),
      periodo: yup.string().required('Período obrigatório'),
      descricao: yup.string().required('Descrição obrigatória'),
    })
  ).required(),
  formacoes: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      instituicao: yup.string().required('Instituição obrigatória'),
      curso: yup.string().required('Curso obrigatório'),
      conclusao: yup.string().required('Data de conclusão obrigatória'),
    })
  ).required(),
});

export type CurriculumFormData = yup.InferType<typeof curriculumSchema>;
