
# Projeto 03 — Controle de Despesas Pessoais

Aplicação web desenvolvida com HTML, CSS e JavaScript puro para gerenciamento de receitas e despesas pessoais.

O projeto permite registrar movimentações financeiras, acompanhar o saldo disponível e consultar o histórico de transações.

## Funcionalidades

- Cadastro de receitas e despesas
- Classificação das transações por categorias
- Cálculo automático do saldo total
- Exibição dos totais de receitas e despesas
- Filtro de transações por tipo
- Exclusão de transações com confirmação
- Armazenamento dos dados com localStorage
- Recuperação automática dos dados ao abrir a página
- Validação dos campos do formulário
- Tratamento de dados inválidos no armazenamento
- Destaque visual para saldo negativo
- Mensagem quando não existem transações
- Interface responsiva para desktop e dispositivos móveis

## Tecnologias utilizadas

- HTML5 — Estrutura da aplicação
- CSS3 — Estilização e responsividade
- JavaScript — Lógica e interatividade
- localStorage — Persistência local dos dados

## Conceitos de JavaScript aplicados

Durante o desenvolvimento, foram utilizados:

- Variáveis com const e let
- Arrays e objetos
- Funções
- Estruturas condicionais (if/else)
- Manipulação do DOM
- Eventos com addEventListener
- Métodos de arrays: push, forEach e filter
- Manipulação de classes com classList
- Conversão de dados com JSON.parse e JSON.stringify
- Armazenamento com localStorage
- Tratamento de erros com try/catch
- Validação de dados com typeof, Array.isArray e Number.isFinite
- Formatação monetária com toLocaleString

## Como executar o projeto

1. Faça o download ou clone o repositório.
2. Abra a pasta `03-controle-despesas`.
3. Abra o arquivo `index.html` utilizando o Live Server do VS Code.
4. Cadastre receitas e despesas pelo formulário.
5. Acompanhe os valores e utilize os filtros disponíveis.

Não é necessário instalar bibliotecas ou frameworks.

## Estrutura de arquivos

```text
03-controle-despesas/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Armazenamento dos dados

As transações são armazenadas no localStorage do navegador.

Isso permite manter os registros após atualizar ou fechar a página.

Os dados são armazenados localmente e não são sincronizados entre dispositivos.

## Objetivo do projeto

Este projeto foi desenvolvido como parte de um portfólio de estudos em desenvolvimento web.

O objetivo foi praticar HTML, CSS e JavaScript, especialmente manipulação do DOM, eventos, arrays, objetos e armazenamento local.

## Autor

Guilherme Nascimento

Projeto desenvolvido para fins de estudo e portfólio.
