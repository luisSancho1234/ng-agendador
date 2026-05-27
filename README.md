# NGAgendador - Front-end Angular

Este projeto corresponde ao front-end do sistema de agendamentos, desenvolvido em Angular.  
A aplicação permite a interação com usuários, visualização de agendamentos, gerenciamento de dados e comunicação com a API back-end do sistema.

## Tecnologias utilizadas

- Angular
- TypeScript
- HTML
- CSS / Tailwind CSS
- RxJS
- Angular Router
- FontAwesome
- API REST

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- Angular CLI

Para verificar as versões instaladas:

    node -v
    npm -v
    ng version

Caso o Angular CLI não esteja instalado, execute:

    npm install -g @angular/cli

## Instalação

Clone o repositório:

    git clone <URL_DO_REPOSITORIO>

Acesse a pasta do projeto:

    cd ng-agendador

Instale as dependências:

    npm install

## Executando o projeto

Para iniciar o servidor de desenvolvimento:

    ng serve

Depois, acesse no navegador:

    http://localhost:4200

A aplicação será recarregada automaticamente sempre que houver alteração nos arquivos do projeto.

## Build do projeto

Para gerar a versão de produção:

    ng build

Os arquivos finais serão gerados na pasta:

    dist/

## Estrutura básica do projeto

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

## Comunicação com o back-end

O front-end consome os dados da API do sistema de agendamentos por meio de serviços Angular.

## Principais funcionalidades

- Listagem de agendamentos
- Cadastro de novos agendamentos
- Edição de agendamentos existentes
- Filtro por status dos agendamentos
- Integração com API REST
- Interface responsiva

## Padrão de desenvolvimento

O projeto utiliza componentes Angular para organizar a interface e services para centralizar a comunicação com o back-end.

Boas práticas adotadas:

- Separação entre componentes, services e models
- Uso de tipagem com TypeScript
- Organização por responsabilidade
- Uso de paginação quando necessário
- Tratamento de dados nulos ou opcionais no template

## Observações importantes

- Verifique se o back-end está em execução antes de utilizar as funcionalidades integradas.
- Após instalar novas bibliotecas, reinicie o servidor Angular.
- Evite regras de negócio complexas diretamente nos templates HTML.
- Prefira centralizar chamadas HTTP dentro dos services.

## Autor

Projeto desenvolvido por mim, Luis Fernando Sancho.
