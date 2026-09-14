# 📅 Agenda Web

Uma agenda web simples e interativa desenvolvida como projeto de prática de **Frontend**, utilizando **React + Vite**, com estilização baseada em **Tailwind CSS** e componentes do **Material UI**.

O projeto foi criado com foco no desenvolvimento de uma interface funcional para gerenciamento de tarefas, explorando conceitos como gerenciamento de estado, persistência de dados no navegador, manipulação de datas, componentes, eventos e interações dinâmicas.

## 🚀 Demonstração

Você pode acessar a aplicação através dos seguintes links:

* 🌐 **[Agenda — Packlor](https://agenda.packlor.com/)**
* 🌐 **[Agenda — Vercel](https://rotarotina.vercel.app/)**

> As duas URLs disponibilizam a mesma aplicação hospedada em ambientes diferentes.

---

## ✨ Funcionalidades

### 📆 Calendário

* Visualização mensal em formato de calendário.
* Navegação entre meses.
* Retorno rápido para o mês atual.
* Identificação visual do dia atual.
* Navegação direta para um mês e ano específicos.
* Seleção de um dia para visualizar e gerenciar suas tarefas.

A estrutura do calendário é construída dinamicamente a partir do mês e ano selecionados, considerando o primeiro dia da semana e a quantidade de dias do mês.

### 📝 Gerenciamento de tarefas

Cada tarefa possui:

* Texto descritivo;
* Data;
* Cor personalizada;
* Estado de conclusão.

É possível:

* Criar novas tarefas;
* Editar o texto de uma tarefa;
* Alterar sua data;
* Alterar sua cor;
* Marcar como concluída;
* Desmarcar uma tarefa;
* Excluir tarefas concluídas.

Ao criar uma tarefa, ela já é inserida diretamente no modo de edição, tornando o fluxo de criação mais rápido.

### 🖱️ Drag and Drop

As tarefas podem ser **arrastadas entre os dias do calendário**.

A aplicação utiliza os eventos nativos de Drag and Drop do navegador para identificar a tarefa movimentada e atualizar sua data.

### 🎨 Personalização de tarefas

Cada tarefa possui uma cor configurável.

A aplicação também calcula automaticamente uma cor de texto adequada ao fundo da tarefa utilizando uma fórmula de luminância, melhorando a legibilidade em diferentes cores.

### ✅ Controle de conclusão

As tarefas podem ser marcadas como concluídas individualmente.

Quando concluída, a tarefa recebe uma indicação visual através de:

* Texto riscado;
* Redução de opacidade.

Também é possível marcar ou desmarcar todas as tarefas de um determinado dia de uma só vez.

### 🕐 Histórico de tarefas

A aplicação possui uma tela de histórico que permite visualizar todas as tarefas cadastradas.

A partir dela é possível:

* Localizar uma tarefa no calendário;
* Alterar seu texto;
* Alterar sua data;
* Alterar seu estado de conclusão.

Ao localizar uma tarefa, o calendário navega automaticamente para o mês correspondente e destaca temporariamente a tarefa encontrada.

### 🌙 Dark Mode

A aplicação possui suporte a **Dark Mode**.

A preferência de tema é armazenada no `localStorage`, fazendo com que a escolha permaneça mesmo após recarregar a página.

### 💾 Persistência local

As tarefas são armazenadas no **Local Storage do navegador**.

Dessa forma, os dados permanecem disponíveis após o recarregamento da página, sem a necessidade de um backend ou banco de dados externo.

> **Observação:** como os dados são armazenados localmente, as tarefas ficam vinculadas ao navegador/dispositivo utilizado.

## ⚡ PWA e Service Worker

A aplicação também foi configurada como uma **Progressive Web App (PWA)** utilizando `vite-plugin-pwa` e **Workbox**.

O projeto utiliza um **Service Worker** para realizar o precaching dos principais recursos estáticos da aplicação, como JavaScript, CSS, HTML e imagens. Dessa forma, após o primeiro carregamento, esses recursos podem ser reutilizados a partir do cache do navegador, proporcionando carregamentos posteriores mais rápidos e maior resiliência em situações de conexão limitada.

Além disso, a aplicação possui:

* 📦 **Precaching** dos recursos estáticos através do Workbox;
* 🔄 **Atualização automática** do Service Worker;
* 📱 **Manifest PWA**, permitindo a instalação da agenda como aplicativo;
* 🖥️ Modo `standalone`, fazendo com que a aplicação instalada seja apresentada como um aplicativo independente do navegador;
* 💾 Persistência dos dados da agenda utilizando armazenamento local do navegador.

---

## 🛠️ Tecnologias utilizadas

### Frontend

* **React**
* **Vite**
* **JavaScript**
* **HTML5**
* **CSS3**

### Styling & UI

* **Tailwind CSS**
* **Material UI (MUI)**

### Recursos e APIs do navegador

* `localStorage`
* `sessionStorage`
* HTML5 Drag and Drop API

---

## 🧠 Conceitos praticados

Este projeto foi desenvolvido principalmente como exercício de **desenvolvimento Frontend**, explorando:

* Componentização com React;
* Hooks (`useState`, `useEffect` e `useMemo`);
* Gerenciamento de estado;
* Renderização condicional;
* Manipulação de arrays e objetos;
* Manipulação de datas com JavaScript;
* Eventos de interação do usuário;
* Drag and Drop;
* Persistência de dados no navegador;
* Controle de tema;
* Criação de interfaces responsivas;
* Utilização conjunta de Tailwind CSS e Material UI;
* Organização da aplicação através de componentes e hooks personalizados.

---

## 📂 Estrutura

A aplicação possui uma organização baseada em componentes e hooks:

```text
src/
├── components/
│   ├── calendar/
│   │   └── Calendar.jsx
│   ├── weekly/
│   └── layout/
│       └── FlouatingMenu.jsx
│
├── hooks/
│   ├── useDarkMode.js
│   ├── useScreen.js
│   └── useTasks.js
│
└── assets/
```

Entre os hooks utilizados está o `useDarkMode`, responsável por controlar o tema da aplicação, e o `useScreen`, utilizado para controlar a visualização atual da agenda.

---

## ⚙️ Como executar localmente

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Entre no diretório

```bash
cd <NOME_DO_PROJETO>
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

---

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de **praticar e consolidar conhecimentos de desenvolvimento Frontend utilizando React**.

A proposta não foi construir uma plataforma completa de gerenciamento de compromissos, mas criar uma aplicação pequena o suficiente para permitir experimentar diferentes recursos de interface e interação.

Entre os principais pontos explorados estão o gerenciamento de tarefas através do estado do React, persistência utilizando APIs de armazenamento do navegador, construção dinâmica de um calendário e interações como edição, conclusão, busca e Drag and Drop.

---

## 📌 Possíveis melhorias

Por ser um projeto desenvolvido principalmente para prática de Frontend, algumas funcionalidades poderiam ser adicionadas futuramente:

* [ ] Backend para persistência dos dados;
* [ ] Sistema de autenticação;
* [ ] Sincronização entre dispositivos;
* [ ] Notificações e lembretes;
* [ ] Eventos recorrentes;
* [ ] Visualização diária e semanal mais completa;
* [ ] Categorias de tarefas;
* [ ] Filtros e pesquisa por texto;
* [ ] Melhorias de acessibilidade;
* [ ] Testes automatizados.

---

## 📄 Licença

Este projeto foi desenvolvido para fins de **estudo, prática e portfólio**.
