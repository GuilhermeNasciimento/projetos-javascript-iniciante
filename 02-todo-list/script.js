
/* ===================================
   1. SELECIONANDO ELEMENTOS DO HTML
=================================== */

const formTarefa = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagemVazia = document.getElementById("mensagem-vazia");
const contadorTarefas = document.getElementById("contador-tarefas");
const botoesFiltro = document.querySelectorAll(".filtro");


/* ===================================
   2. DADOS E LOCALSTORAGE
=================================== */


/* ===================================
   FUNÇÃO PARA CARREGAR TAREFAS
=================================== */

function carregarTarefas() {

    try {

        // Busca as tarefas salvas no navegador
        const tarefasSalvas = localStorage.getItem("minhasTarefas");

        // Se não houver dados, retorna um array vazio
        if (!tarefasSalvas) {
            return [];
        }

        // Converte o JSON em dados JavaScript
        const dados = JSON.parse(tarefasSalvas);

        // Verifica se o resultado é um array
        if (!Array.isArray(dados)) {
            throw new Error("Os dados salvos não são um array.");
        }

        // Verifica a estrutura de cada tarefa
        const dadosValidos = dados.every(function(tarefa) {

            return tarefa !== null &&
                   typeof tarefa === "object" &&
                   Number.isSafeInteger(tarefa.id) &&
                   tarefa.id > 0 &&
                   typeof tarefa.texto === "string" &&
                   tarefa.texto.trim() !== "" &&
                   tarefa.texto.length <= 100 &&
                   typeof tarefa.concluida === "boolean";

        });

        if (!dadosValidos) {
            throw new Error("Existem tarefas com dados inválidos.");
        }

        // Verifica se os IDs são únicos
        const ids = dados.map(function(tarefa) {
            return tarefa.id;
        });

        if (new Set(ids).size !== ids.length) {
            throw new Error("Existem tarefas com IDs repetidos.");
        }

        // Retorna as tarefas recuperadas
        return dados;

    } catch (erro) {

        console.error("Erro ao carregar tarefas:", erro);

        alert(
            "Não foi possível recuperar as tarefas salvas. " +
            "A aplicação será iniciada com uma lista vazia."
        );

        return [];

    }

}

// Inicializa o array com as tarefas recuperadas
let tarefas = carregarTarefas();


// Define o próximo identificador disponível
let proximoId = tarefas.reduce(function(maiorId, tarefa) {
    return Math.max(maiorId, tarefa.id);
}, 0) + 1;

// Define o filtro inicial
let filtroAtual = "todas";



/* ===================================
   FUNÇÃO PARA SALVAR TAREFAS
=================================== */

function salvarTarefas() {

    try {

        // Converte as tarefas para JSON
        const tarefasJSON = JSON.stringify(tarefas);

        // Armazena os dados no navegador
        localStorage.setItem("minhasTarefas", tarefasJSON);

        return true;

    } catch (erro) {

        // Registra o erro no console
        console.error("Erro ao salvar tarefas:", erro);

        // Informa o problema ao usuário
        alert(
            "Não foi possível salvar as tarefas no navegador. " +
            "As alterações podem ser perdidas ao atualizar a página."
        );

        return false;

    }

}


/* ===================================
   3. FUNÇÃO PARA EXIBIR AS TAREFAS
=================================== */

function renderizarTarefas() {

    
// Limpa a lista antes de exibir as tarefas
listaTarefas.innerHTML = "";

// Define quais tarefas devem aparecer
let tarefasFiltradas = tarefas;

if (filtroAtual === "pendentes") {

    tarefasFiltradas = tarefas.filter(function(tarefa) {
        return tarefa.concluida === false;
    });

} else if (filtroAtual === "concluidas") {

    tarefasFiltradas = tarefas.filter(function(tarefa) {
        return tarefa.concluida === true;
    });

}

// Percorre apenas as tarefas filtradas
tarefasFiltradas.forEach(function(tarefa) {


    // Cria o elemento da tarefa
    const li = document.createElement("li");
    
// Identifica o elemento HTML pelo ID da tarefa
li.dataset.id = tarefa.id;


    // Adiciona a classe CSS se estiver concluída
    if (tarefa.concluida) {
        li.classList.add("concluida");
    }

    // Cria o botão de concluir
    const botaoConcluir = document.createElement("button");

    botaoConcluir.classList.add("btn-concluir");
    botaoConcluir.type = "button";

    // Define o símbolo do botão
    botaoConcluir.textContent = tarefa.concluida ? "↩" : "✓";

    // Define uma descrição acessível
    botaoConcluir.setAttribute(
        "aria-label",
        tarefa.concluida
            ? "Marcar como pendente"
            : "Marcar como concluída"
    );

    // Adiciona o evento de clique
    botaoConcluir.addEventListener("click", function() {
        alternarConclusao(tarefa.id);
    });

    // Cria o texto da tarefa
    const span = document.createElement("span");

    span.textContent = tarefa.texto;

    // Cria o botão de editar
    const botaoEditar = document.createElement("button");

    botaoEditar.classList.add("btn-editar");
    botaoEditar.type = "button";

    // Define o símbolo do botão
    botaoEditar.textContent = "✎";
    
    // Cria o botão de excluir
    const botaoExcluir = document.createElement("button");

    // Adiciona a classe CSS
    botaoExcluir.classList.add("btn-excluir");

    // Define o tipo do botão
    botaoExcluir.type = "button";

    // Define o símbolo do botão
    botaoExcluir.textContent = "🗑";

    // Adiciona uma descrição acessível
    botaoExcluir.setAttribute(
    "aria-label",
    `Excluir tarefa: ${tarefa.texto}`
);

    // Adiciona o evento de clique
    botaoExcluir.addEventListener("click", function() {
        excluirTarefa(tarefa.id);
    });

    // Descrição para acessibilidade
    botaoEditar.setAttribute(
    "aria-label",
    `Editar tarefa: ${tarefa.texto}`
);

    // Adiciona o evento de clique
    botaoEditar.addEventListener("click", function() {
        editarTarefa(tarefa.id);
    });

    
    // Adiciona os elementos dentro da tarefa
    li.appendChild(botaoConcluir);
    li.appendChild(span);
    li.appendChild(botaoEditar);
    li.appendChild(botaoExcluir);

    // Adiciona a tarefa na lista HTML
    listaTarefas.appendChild(li);


    });

    
// Verifica se existem tarefas no filtro selecionado
if (tarefasFiltradas.length === 0) {

    mensagemVazia.style.display = "block";

    if (filtroAtual === "pendentes") {
        mensagemVazia.textContent = "Nenhuma tarefa pendente.";
    } else if (filtroAtual === "concluidas") {
        mensagemVazia.textContent = "Nenhuma tarefa concluída.";
    } else {
        mensagemVazia.textContent = "Nenhuma tarefa cadastrada.";
    }

} else {
    mensagemVazia.style.display = "none";
}


    // Atualiza o contador
    
// Conta apenas as tarefas não concluídas
const tarefasPendentes = tarefas.filter(function(tarefa) {
    return tarefa.concluida === false;
});

// Atualiza o contador
contadorTarefas.textContent =
    tarefasPendentes.length === 1
        ? "1 tarefa pendente"
        : `${tarefasPendentes.length} tarefas pendentes`;


}


/* ===================================
   4. FUNÇÃO PARA ADICIONAR TAREFAS
=================================== */

function adicionarTarefa(evento) {

    // Impede que o formulário recarregue a página
    evento.preventDefault();

    // Obtém o texto digitado e remove espaços extras
    const texto = inputTarefa.value.trim();

    // Impede tarefas vazias
    if (texto === "") {
        return;
    }

    // Cria um objeto representando a tarefa
    const novaTarefa = {
        id: proximoId,
        texto: texto,
        concluida: false
    };

    // Prepara o identificador da próxima tarefa
    proximoId++;

    // Adiciona a tarefa ao array
    
tarefas.push(novaTarefa);

// Salva as tarefas no navegador
salvarTarefas();

// Atualiza a lista na tela
renderizarTarefas();


    // Limpa o campo de texto
    inputTarefa.value = "";

    // Devolve o foco ao campo
    inputTarefa.focus();

}


/* ===================================
   FUNÇÃO PARA CONCLUIR TAREFAS
=================================== */

function alternarConclusao(id) {

    // Procura a tarefa pelo identificador
    const tarefa = tarefas.find(function(item) {
        return item.id === id;
    });

    // Verifica se a tarefa foi encontrada
    if (!tarefa) {
        return;
    }

    // Alterna entre concluída e pendente
    
tarefa.concluida = !tarefa.concluida;

// Salva a alteração
salvarTarefas();

// Atualiza a interface
renderizarTarefas();


}



/* ===================================
   FUNÇÃO PARA EDITAR TAREFAS
=================================== */

function editarTarefa(id) {

    // Procura a tarefa pelo ID
    const tarefa = tarefas.find(function(item) {
        return item.id === id;
    });

    if (!tarefa) {
        return;
    }

    // Localiza o elemento HTML da tarefa
    const li = Array.from(listaTarefas.children).find(function(item) {
        return Number(item.dataset.id) === id;
    });

    if (!li) {
        return;
    }

    // Evita abrir duas edições na mesma tarefa
    if (li.querySelector(".input-edicao")) {
        return;
    }

    // Localiza o texto original
    const span = li.querySelector("span");

    // Cria um campo para edição
    const inputEdicao = document.createElement("input");

    inputEdicao.type = "text";
    inputEdicao.value = tarefa.texto;
    inputEdicao.maxLength = 100;
    inputEdicao.classList.add("input-edicao");
    inputEdicao.setAttribute("aria-label", "Editar texto da tarefa");

    // Cria o botão Salvar
    const botaoSalvar = document.createElement("button");

    botaoSalvar.type = "button";
    botaoSalvar.textContent = "Salvar";
    botaoSalvar.classList.add("btn-salvar");

    // Cria o botão Cancelar
    const botaoCancelar = document.createElement("button");

    botaoCancelar.type = "button";
    botaoCancelar.textContent = "Cancelar";
    botaoCancelar.classList.add("btn-cancelar");

    // Substitui o texto pelo campo de edição
    li.replaceChild(inputEdicao, span);

    // Oculta os botões originais durante a edição
    const botoesOriginais = li.querySelectorAll("button");

    botoesOriginais.forEach(function(botao) {
        botao.style.display = "none";
    });

    // Adiciona os novos botões
    li.appendChild(botaoSalvar);
    li.appendChild(botaoCancelar);

    // Coloca o cursor no campo
    inputEdicao.focus();
    inputEdicao.select();

    // Função para salvar a edição
    function salvarEdicao() {

        const novoTexto = inputEdicao.value.trim();

        if (novoTexto === "") {
            alert("A tarefa não pode ficar vazia!");
            return;
        }

        // Atualiza o objeto
        tarefa.texto = novoTexto;

        // Salva no localStorage
        salvarTarefas();

        // Atualiza a interface
        renderizarTarefas();
    }

    // Função para cancelar a edição
    function cancelarEdicao() {
        renderizarTarefas();
    }

    // Eventos dos botões
    botaoSalvar.addEventListener("click", salvarEdicao);
    botaoCancelar.addEventListener("click", cancelarEdicao);

    // Permite salvar com Enter e cancelar com Escape
    inputEdicao.addEventListener("keydown", function(evento) {

        if (evento.key === "Enter") {
            salvarEdicao();
        }

        if (evento.key === "Escape") {
            cancelarEdicao();
        }

    });

}


/* ===================================
   FUNÇÃO PARA EXCLUIR TAREFAS
=================================== */

function excluirTarefa(id) {

    // Procura a tarefa pelo identificador
    const tarefa = tarefas.find(function(item) {
        return item.id === id;
    });

    // Verifica se a tarefa existe
    if (!tarefa) {
        return;
    }

    // Solicita confirmação ao usuário
    const confirmacao = confirm(
        `Deseja realmente excluir a tarefa "${tarefa.texto}"?`
    );

    // Se o usuário cancelar, encerra a função
    if (!confirmacao) {
        return;
    }

    // Cria um novo array sem a tarefa excluída
    
tarefas = tarefas.filter(function(item) {
    return item.id !== id;
});

// Salva o array após a exclusão
salvarTarefas();

// Atualiza a lista na tela
renderizarTarefas();


}


/* ===================================
   5. EVENTO DO FORMULÁRIO
=================================== */

formTarefa.addEventListener("submit", adicionarTarefa);

/* ===================================
   EVENTOS DOS FILTROS
=================================== */

botoesFiltro.forEach(function(botao) {

    botao.addEventListener("click", function() {

        // Obtém o filtro do botão clicado
        filtroAtual = botao.dataset.filtro;

        
// Remove a seleção visual e acessível de todos os filtros
botoesFiltro.forEach(function(item) {

    item.classList.remove("ativo");

    item.setAttribute("aria-pressed", "false");

});

// Marca o botão selecionado
botao.classList.add("ativo");

botao.setAttribute("aria-pressed", "true");


        // Atualiza a lista de tarefas
        renderizarTarefas();

    });

});



/* ===================================
   6. EXIBIÇÃO INICIAL
=================================== */

renderizarTarefas();
