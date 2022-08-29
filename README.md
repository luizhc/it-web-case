# Olá, seja bem-vindo(a)! 👋

## 🏡 Sobre o projeto

**It Web Case** é uma aplicação front-end web Angular responsiva, que foi desenvolvida inspirada na API [it-api-case](https://github.com/adelbs/it-api-case), porém com um back-end próprio utilizando os serviços do Firebase da Google. Esta aplicação tem como objetivo gerenciar lançamentos de gastos pessoais e suas categorias.

## ⚡ Tecnologias utilizadas

&nbsp;&nbsp;🚀 [Angular](http://angular.io) framework para construção e desenvolvimento da aplicação (versão 14.1.0) <br>
&nbsp;&nbsp;🤖 [TypeScript](https://www.typescriptlang.org) como linguagem (orientada a objetos, compilada para [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)) (versão 4.7.2) <br>
&nbsp;&nbsp;🎨 [Bootstrap](https://getbootstrap.com) para estilização dos componentes (inputs, grids, etc) (versão 5.2.0) <br>
&nbsp;&nbsp;📢 [Sweet Alert](https://sweetalert2.github.io/) para mensagens de sucesso, alertas, erros, etc (versão 11.4.29) <br>
&nbsp;&nbsp;💥 [NgRx](https://ngrx.io) para programação reativa e gerenciamento de estado (versão 14.2.0) <br>
&nbsp;&nbsp;🎯 [NgRx Store Local Storage](https://www.npmjs.com/package/ngrx-store-localstorage) para sincronização automática entre o armazenamento NgRx e o armazenamento local do navegador (versão 14.0.0) <br>
&nbsp;&nbsp;🔥 [Firebase](https://ngrx.io) da Google, para armazenamento em dados em banco de dados noSQL realtime (versão 9.9.3) <br>
&nbsp;&nbsp;💼 [Vercel](https://vercel.com/) para o CI/CD do projeto a cada commit e hospedagem automática da aplicação.

## 🪁 Arquitetura do projeto

A aplicação foi densenvolvimento com Angular, pois usa o conecito de SPA (Single Page Application) que propicia para o usuário a experiência de estar fazendo um uso de uma única tela, uma vez que não existe carregamento entre as telas, o conteúdo é gerado dinamicamente.
Também foi utilizado os serviços do Firebase para gerenciamento do banco de dados da Cloud Firestore, devido o seu grande poder de escabalidade e por ser um banco realtime, ou seja, os dados são atualizados em tempo real os dados na tela do usuário.
Foi adodado uso da biblioteca Bootstrap que possui um set pré-definido com todo um guia de estilos, entregando componentes estilizados e responsivos.
Foi feito uso dd NgRx, biblioteca poderosa para gerencimento de estado e reatividade em aplicações Angular, ela é inspirada no Redux muito utilizado para o React.
E para o CI/CD foi utilizado o ambiente Cloud da Vercel, que faz toda integração do projeto após o commit e entrega da aplicação atualizada.

## 🌎 Bora ver a aplicação rodando na prática?

Para acessa-lá, <a href="https://it-web-case.vercel.app">clique aqui</a>.

## 💻 Instalações necessárias

Para utilização da aplicação em ambiente desenvolvimento, é necessário os seguintes requisitos instalados:

- [Git](https://git-scm.com) para clone e controle de versão do código-fonte
- [Node.js](https://nodejs.org) para interpretar e rodar a aplicação (nele vem também o [NPM](https://www.npmjs.com) para gerenciamento dos pacotes e instalação de dependências) (instalar versão 16.13.1 ou mais recente)
- [Angular CLI](https://angular.io/cli) para utilização de linhas de comando Angular, utéis para criar components, classes, services, entre outros (instalar versão 14.1.3 ou mais recente)
- Editor código-fonte de sua preferencial (sugiro o [VS Code](https://code.visualstudio.com))

## 🔧 Clone / configuração

- Realize o clone do projeto em seu computador com o comando:

```bash
  git clone https://github.com/luizhc/it-web-case.git
```

- Atráves do terminal, vá até o diretório onde clonou o projeto e rode o comando para instalação das depêndencias:

```bash
  npm install
```

## 🔌 Execução / acesso

- Para executar o projeto execute o comando:

```bash
  ng serve
```

- O projeto será aberto automaticamente no seu browser em `http://localhost:4200`.

## 🐞 Encontrou um bug?

Bora participar da melhoria continua desse projeto, para reportar um bug <a href="https://github.com/luizhc/it-web-case/issues">clique aqui</a>.

## 😎 Contribuir no projeto

Se você gostou da ideia e deseja ver esse projeto crescer, bora contribuir? É só seguir os passos abaixo:

- 1. Realize o fork e clone do projeto
- 2. Atualize sua branch baseada na `main` com `git checkout main` e `git pull`
- 3. Crie sua branch baseado no tipo de contribuição:
  - Feature: `git checkout -b feature/nome_feature `
  - Fix: `git checkout -b fix/nome_fix `
- 3. Faça o commit das mudanças `git commit -m 'seu comentário aqui'`
- 4. Faça um `push` para a sua branch: `git push`
- 5. Abra um <a href="https://github.com/luizhc/it-web-case/pulls">pull request</a>

## 💡 Comandos úteis

- Realizar build: para buildar execute o comando `ng build`. Os artefatos de construção serão armazenados no diretório `dist/`
- Gerar arquivos: `ng generate component component-name` para gerar um novo componente. Você também pode gerar outros arquivos com `ng generate directive|pipe|service|class|guard|interface|enum|module`

## 🌱 Precisa de ajuda?

Para obter mais ajuda sobre o Angular e o uso da sua CLI você pode usar o comando `ng help` ou consultar a página [Visão geral da CLI e referência de comandos](https://angular.io/cli). Caso tenha outras dúvidas, você pode acessar os links disponíveis nas palavras desta documentação ou consultar a documentação oficial.

## 💖 Pontos de melhorias

- **Escalabilidade:** possuir uma biblioteca de componentes próprios, para que possibilite o reuso e facilite a manutenção dos mesmos. Publicação das dependência em ambiente [Nexus](https://www.sonatype.com/products/.nexus-repository), facilitando o gerencimento. Ter times diferentes, um atuando focado na biblioteca e outro time focado em atuar no desenvolvimento da aplicação. Realização dos testes unitários e integrados garantindo a qualidade do produto, fazer uso da ferramenta [SonarQube](https://www.sonarqube.org/) para cobertura e qualidade do código.
- **Resiliência:** se adaptar as situações com a prática, aprender com erros e não comete-los novamente, confiar em si mesmo, encontrar base de apoio, sempre estar aberto a aprender e principalmente disseminar conhecimento com demais colegas.
- **Alta disponibilidade:** clusterização dos ambientes, melhorando ainda mais em casos de alta demanda / concorrência. Possuir verificação nas dependência do projeto para garantir que nenhuma biblioteca esteja desatualizada ou até mesmo obsoleta e venha quebrar o projeto.
- **Observabilidade – Monitoração e Log:** Detectar e investigar problemas e possíveis gargalos com uso de ferramentas com IA para tal finalidade, um bom exemplo seria o uso do [Dynatrace](https://www.dynatrace.com/)
- **Segurança:** Fazer utlização de token para acesso aos serviços. Fazer uso de proxy interno na aplicação para omitir o endereço das requests back-end. Utlizar duplo fator de autenticação, aumentando o nível de segurança entre usuário e aplicação.
- **Acessibilidade:** Fazer uso de tags que facilitem os leitores de tela, ajudando assim pessoas com deficiência. Seguir o padrão [WCAG](https://pt.wikipedia.org/wiki/Diretrizes_de_Acessibilidade_para_o_Conte%C3%BAdo_da_Web).
- **Esteira CI/CD:** Foi feito uso da [Vercel](https://vercel.com/) para todo CI/CD do projeto, a cada commit é realizado o processo de build e deploy, tudo de forma sincronizada. Para melhorar ainda poderia ter um processo de build para cada ambiente (development, staging, production, etc).
