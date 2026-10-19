
# Projeto 02 — To-Do List

Aplicação web para gerenciamento de tarefas, desenvolvida com HTML, CSS e JavaScript puro.

O projeto permite organizar atividades do dia a dia por meio de uma interface responsiva, com funcionalidades de cadastro, edição, conclusão, exclusão e filtragem de tarefas.

Os dados são armazenados localmente no navegador utilizando `localStorage`.

## Funcionalidades

- Adicionar novas tarefas.
- Marcar tarefas como concluídas ou pendentes.
- Editar tarefas diretamente na página.
- Excluir tarefas mediante confirmação.
- Filtrar tarefas por:
  - Todas;
  - Pendentes;
  - Concluídas.
- Visualizar a quantidade de tarefas pendentes.
- Salvar e recuperar tarefas com `localStorage`.
- Validar campos vazios e limitar o texto a 100 caracteres.
- Tratar erros de leitura e gravação no armazenamento local.
- Utilizar a aplicação em computadores, tablets e celulares.

## Tecnologias utilizadas

- **HTML5:** estrutura e organização dos elementos.
- **CSS3:** estilização, Flexbox e responsividade.
- **JavaScript:** lógica da aplicação e manipulação do DOM.
- **localStorage:** persistência dos dados no navegador.
- **Git e GitHub:** versionamento e publicação do código.

## Conceitos praticados

Durante o desenvolvimento, foram aplicados:

- Manipulação do DOM com `getElementById`, `querySelector` e `createElement`.
- Eventos com `addEventListener`.
- Manipulação de arrays com `push`, `find`, `filter`, `forEach`, `every` e `reduce`.
- Criação e utilização de funções.
- Objetos JavaScript.
- Operadores condicionais e lógicos.
- Manipulação de classes CSS com `classList`.
- Utilização de atributos personalizados com `dataset`.
- Armazenamento e recuperação de dados com `localStorage`.
- Conversão de dados com `JSON.stringify()` e `JSON.parse()`.
- Tratamento de erros com `try...catch`.
- Acessibilidade básica com atributos ARIA.
- Eventos de teclado para salvar e cancelar edições.

## Estrutura do projeto

```text
02-todo-list/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Como executar

1. Faça o download ou clone o repositório.
2. Abra a pasta `02-todo-list` no Visual Studio Code.
3. Abra o arquivo `index.html` em um navegador.

Para facilitar o desenvolvimento, também é possível utilizar a extensão Live Server no VS Code.

Não é necessário instalar bibliotecas ou dependências externas.

## Como utilizar

1. Digite uma tarefa no campo de texto.
2. Clique em "Adicionar" ou pressione Enter.
3. Utilize o botão de conclusão para alterar o estado da tarefa.
4. Clique no botão de edição para modificar o texto.
5. Utilize o botão de exclusão para remover uma tarefa.
6. Selecione os filtros para visualizar tarefas específicas.

As tarefas permanecem salvas no navegador, mesmo após atualizar ou reabrir a página, desde que os dados locais não sejam apagados.

## Objetivo do projeto

Este projeto foi desenvolvido como parte dos meus estudos de desenvolvimento web, com o objetivo de consolidar conhecimentos fundamentais de JavaScript.

O principal desafio foi implementar as operações CRUD utilizando manipulação do DOM e arrays, além de garantir a persistência dos dados com `localStorage`.

Também foram aplicadas melhorias de usabilidade, responsividade, acessibilidade e tratamento de erros.

## Autor

**Guilherme Nascimento**

Projeto desenvolvido para fins de estudo e composição de portfólio no GitHub.
