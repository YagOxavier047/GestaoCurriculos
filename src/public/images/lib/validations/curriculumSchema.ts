import * as yup from 'yup';

export const curriculumSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(3, 'Mínimo de 3 caracteres'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório').length(14, 'CPF inválido'),
  telefone: yup.string().required('Telefone é obrigatório').min(15, 'Telefone inválido'),
  dataNascimento: yup.string().required('Data de nascimento é obrigatória'),
  cargoPretendido: yup.string().required('Cargo é obrigatório').min(2, 'Mínimo de 2 caracteres'),
  resumo: yup.string().required('Resumo é obrigatório').min(50, 'Mínimo de 50 caracteres'),
  foto: yup.string().optional(),
  experiencias: yup.array().of(
    yup.object({
      id: yup.string(),
      empresa: yup.string().required('Empresa é obrigatória'),
      cargo: yup.string().required('Cargo é obrigatório'),
      periodo: yup.string().required('Período é obrigatório'),
      descricao: yup.string().min(10, 'Descreva brevemente suas atividades')
    })
  ),
  formacoes: yup.array().of(
    yup.object({
      id: yup.string(),
      instituicao: yup.string().required('Instituição é obrigatória'),
      curso: yup.string().required('Curso é obrigatório'),
      conclusao: yup.string().required('Ano de conclusão é obrigatório')
    })
  )
});

export type CurriculumFormData = yup.InferType<typeof curriculumSchema>;