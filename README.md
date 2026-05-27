# 📅 NGAgendador - Front-end Angular

Este projeto corresponde ao front-end do sistema de agendamentos, desenvolvido em Angular.  
A aplicação permite a interação com usuários, visualização de agendamentos, gerenciamento de dados e comunicação com a API back-end do sistema.

---

## 🚀 Tecnologias utilizadas

- 🅰️ Angular
- 📘 TypeScript
- 🌐 HTML
- 🎨 CSS / Tailwind CSS
- 🔄 RxJS
- 🧭 Angular Router
- ⭐ FontAwesome
- 🔌 API REST

---

## 📋 Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- 🟢 Node.js
- 📦 npm
- 🅰️ Angular CLI

Para verificar as versões instaladas:

```bash
node -v
npm -v
ng version
```

Caso o Angular CLI não esteja instalado:

```bash
npm install -g @angular/cli
```

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Acesse a pasta do projeto:

```bash
cd ng-agendador
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Executando o projeto

Para iniciar o servidor de desenvolvimento:

```bash
ng serve
```

Depois, acesse:

```bash
http://localhost:4200
```

💡 A aplicação será recarregada automaticamente a cada alteração.

---

## 🏗️ Build do projeto

Para gerar a versão de produção:

```bash
ng build
```

Arquivos gerados:

```bash
dist/
```

---

## 📁 Estrutura básica do projeto

```bash
src/
├── app/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── models/
│   ├── enums/
│   └── app-routing.module.ts
├── assets/
├── environments/
└── styles.css
```

---

## 🔗 Comunicação com o back-end

O front-end consome dados da API do sistema de agendamentos através de services Angular.
API disponível em https://github.com/luisSancho1234/spring-agendador

---

## ✨ Principais funcionalidades

- 📄 Listagem de agendamentos
- ➕ Cadastro de novos agendamentos
- ✏️ Edição de agendamentos
- 🔍 Filtro por status
- 🔌 Integração com API REST
- 📱 Interface responsiva

---

## 🧠 Padrão de desenvolvimento

O projeto utiliza componentes Angular para organizar a interface e services para centralizar a comunicação com o back-end.

Boas práticas adotadas:

- 🧩 Separação entre components, services e models
- 📘 Uso de tipagem com TypeScript
- 📂 Organização por responsabilidade
- 📄 Uso de paginação quando necessário
- 🛡️ Tratamento de dados nulos ou opcionais

---

## ⚠️ Observações importantes

- ✅ Verifique se o back-end está em execução
- 🔄 Após instalar bibliotecas, reinicie o servidor
- 🚫 Evite regras de negócio complexas no HTML
- 📡 Centralize chamadas HTTP nos services

---

## 👨‍💻 Autor

Projeto desenvolvido por **Luis Fernando Sancho**
