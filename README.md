# Sistema de Gestão de Currículos

Um sistema completo para criação, gerenciamento e visualização de currículos profissionais, desenvolvido com tecnologias modernas.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como uma solução completa para gestão de currículos, permitindo aos usuários criar, editar, visualizar e exportar seus perfis profissionais de forma intuitiva e eficiente.

## 👥 Equipe de Desenvolvimento

- **Frontend**: Emanoela - Responsável por toda a interface do usuário, design e experiência do usuário
- **Backend**: Yago - Responsável pela lógica de negócio, validações, armazenamento e funcionalidades do sistema

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 16.2.3** - Framework React para produção
- **React 19.2.4** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS v4** - Framework CSS utilitário
- **Shadcn/ui** - Componentes de UI acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Yup** - Validação de dados
- **Sonner** - Notificações toast
- **Lucide React** - Ícones modernos

### Backend
- **Local Storage** - Persistência de dados local
- **Custom Hooks** - Lógica de negócio reutilizável
- **Validação de Dados** - Schema validation com Yup
- **CRUD Operations** - Create, Read, Update, Delete
- **Export JSON** - Funcionalidade de exportação

## ✨ Funcionalidades

### 📝 Cadastro de Currículos
- Formulário completo com validações
- Upload de foto de perfil
- Campos dinâmicos para experiências profissionais
- Campos dinâmicos para formações acadêmicas
- Validação em tempo real

### 👀 Visualização e Gerenciamento
- Lista de currículos com cards profissionais
- Busca em tempo real por nome ou cargo
- Visualização detalhada de currículos
- Edição de currículos existentes
- Exclusão com confirmação

### 📊 Recursos Avançados
- Exportação de currículos em JSON
- Interface responsiva (mobile, tablet, desktop)
- Design profissional com tema azul
- Estados de loading com skeleton screens
- Notificações de feedback

## 🏗️ Arquitetura

```
src/
├── app/                    # Páginas Next.js (App Router)
│   ├── page.tsx           # Página inicial
│   ├── layout.tsx         # Layout global
│   ├── curriculos/        # Rotas de currículos
│   └── sistema/           # Sistema administrativo
├── components/            # Componentes reutilizáveis
│   ├── curriculum/        # Componentes específicos de currículos
│   ├── global/           # Componentes globais (Header, Footer)
│   └── ui/               # Componentes base (Button, Input, etc.)
├── hooks/                # Custom hooks para lógica de negócio
├── lib/                  # Utilitários e validações
├── types/                # Definições TypeScript
└── public/               # Assets estáticos
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd gestao-curriculos
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

### Build para Produção

```bash
npm run build
npm start
```

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- 📱 Dispositivos móveis
- 📟 Tablets
- 💻 Desktops

## 🎨 Design System

- **Cores**: Tema profissional em azul (#0073cc)
- **Tipografia**: Inter (Google Fonts)
- **Componentes**: Shadcn/ui com Tailwind CSS
- **Ícones**: Lucide React
- **Notificações**: Sonner (toast notifications)

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código

## 📈 Status do Projeto

✅ **Concluído**
- Interface completa e responsiva
- CRUD funcional de currículos
- Validações e feedback
- Design profissional
- Exportação de dados
- Responsividade total

## 🤝 Contribuição

Este projeto foi desenvolvido colaborativamente pela equipe, com responsabilidades bem definidas entre frontend e backend.

## 📄 Licença

Este projeto é privado e foi desenvolvido para fins educacionais e demonstrativos.
