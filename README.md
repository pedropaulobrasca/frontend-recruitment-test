# Sistema de Gerenciamento de Empresas - Frontend

<div align="center">
  <img src="assets/images/dashboard.png" alt="Dashboard do Sistema" width="600">
</div>

## 📋 Sobre o Projeto

Este é o frontend do Sistema de Gerenciamento de Empresas, desenvolvido com **React** e **TypeScript**. A aplicação consome uma **API GraphQL** e oferece uma interface moderna e responsiva para gerenciar empresas e seus proprietários.

## 🚀 Funcionalidades

- Interface intuitiva para gerenciamento de empresas e proprietários
- Dashboard com visualização de dados em tempo real
- Sistema de autenticação e autorização
- Integração completa com API GraphQL
- Layout responsivo e moderno
- Temas claro e escuro
- Validação de formulários

## 🛠️ Tecnologias Utilizadas

- **React 18+**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado do JavaScript
- **Apollo Client**: Cliente GraphQL para gerenciamento de dados
- **Material-UI**: Biblioteca de componentes visuais
- **React Router**: Gerenciamento de rotas na aplicação
- **React Hook Form**: Gerenciamento eficiente de formulários
- **Yup**: Validação de schemas para formulários
- **Jest/Testing Library**: Ferramentas para testes automatizados
- **ESLint/Prettier**: Padronização e formatação de código

## ⚙️ Pré-requisitos

- **Node.js** 16 ou superior
- **npm** ou **yarn**
- Backend GraphQL em execução

## 🔧 Configuração do Ambiente

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/frontend-recruitment-test.git
cd frontend-recruitment-test
```

2. **Configure as variáveis de ambiente:**

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

4. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em **localhost:3000**.

## 📊 Estrutura do Projeto

```
frontend-recruitment-test/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── hooks/              # Hooks customizados
│   ├── services/           # Serviços e integrações
│   ├── graphql/            # Queries e mutations GraphQL
│   ├── contexts/           # Contextos React
│   ├── utils/              # Funções utilitárias
│   ├── styles/             # Estilos globais
│   └── types/              # Definições de tipos
├── public/                 # Arquivos estáticos
├── tests/                  # Testes automatizados
└── config/                 # Configurações do projeto
```

## 🗒️ Principais Componentes

- **DataTable**: Tabela de dados com paginação e filtros
- **EnterpriseForm**: Formulário de cadastro/edição de empresas
- **OwnerForm**: Formulário de cadastro/edição de proprietários
- **Dashboard**: Painel principal com métricas
- **Layout**: Estrutura base da aplicação

## 🧪 Testes

Execute os testes com:

```bash
npm test
# ou
yarn test
```

Para verificar a cobertura de testes:

```bash
npm test --coverage
# ou
yarn test --coverage
```

## 🚀 Deploy

### Usando Vercel

1. Conecte seu repositório à **Vercel**
2. Configure as variáveis de ambiente na plataforma
3. O deploy será feito automaticamente a cada push

### Build Manual

```bash
npm run build
# ou
yarn build
```

## 📈 Performance

- **Lazy Loading** de componentes
- Otimização de imagens
- **Caching** de dados com GraphQL
- **Code Splitting** automático

## 📄 Licença

Este projeto está sob a licença **MIT**.