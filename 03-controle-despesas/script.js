
/* ==================================
   1. SELECIONANDO ELEMENTOS DO HTML
================================== */

const formulario = document.getElementById("form-transacao");

const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoInput = document.getElementById("tipo");
const categoriaInput = document.getElementById("categoria");

const listaTransacoes = document.getElementById("lista-transacoes");

const saldoTotal = document.getElementById("saldo-total");
const totalReceitas = document.getElementById("total-receitas");
const totalDespesas = document.getElementById("total-despesas");
const cardSaldo = document.querySelector(".saldo");

const filtroTipo = document.getElementById("filtro-tipo");

/* ==================================
   2. CARREGANDO DADOS SALVOS
================================== */


let transacoes = [];

try {

    const dadosSalvos = localStorage.getItem("transacoes");

    if (dadosSalvos !== null) {

        const dadosConvertidos = JSON.parse(dadosSalvos);

        if (Array.isArray(dadosConvertidos)) {

            transacoes = dadosConvertidos.filter(function(transacao) {

                return (
                    transacao !== null &&
                    typeof transacao === "object" &&
                    typeof transacao.id === "string" &&
                    typeof transacao.descricao === "string" &&
                    transacao.descricao.trim() !== "" &&
                    typeof transacao.valor === "number" &&
                    Number.isFinite(transacao.valor) &&
                    transacao.valor > 0 &&
                    ["receita", "despesa"].includes(transacao.tipo) &&
                    typeof transacao.categoria === "string" &&
                    transacao.categoria.trim() !== ""
                );

            });

        } else {
            console.warn("Os dados salvos não são um array.");
        }
    }

} catch (erro) {

    console.error("Erro ao carregar transações:", erro);

    transacoes = [];

}


/* ==================================
   3. FORMATANDO VALORES EM REAIS
================================== */

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* ==================================
   NOMES DAS CATEGORIAS
================================== */

const nomesCategorias = {
    alimentacao: "Alimentação",
    transporte: "Transporte",
    moradia: "Moradia",
    saude: "Saúde",
    lazer: "Lazer",
    salario: "Salário",
    outros: "Outros"
};


/* ==================================
   4. SALVANDO NO LOCALSTORAGE
================================== */

function salvarTransacoes() {
    localStorage.setItem(
        "transacoes",
        JSON.stringify(transacoes)
    );
}

/* ==================================
   5. CADASTRANDO TRANSAÇÕES
================================== */

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const descricao = descricaoInput.value.trim();
    const valor = Number(valorInput.value);
    const tipo = tipoInput.value;
    const categoria = categoriaInput.value;

    if (
        descricao === "" ||
        !Number.isFinite(valor) ||
        valor <= 0 ||
        tipo === "" ||
        categoria === ""
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const novaTransacao = {
        id: crypto.randomUUID(),
        descricao: descricao,
        valor: valor,
        tipo: tipo,
        categoria: categoria
    };

    transacoes.push(novaTransacao);

    salvarTransacoes();
    atualizarTabela();
    atualizarResumo();

    formulario.reset();
});

/* ==================================
   6. EXIBINDO TRANSAÇÕES NA TABELA
================================== */

function atualizarTabela() {

    listaTransacoes.innerHTML = "";

    const tipoSelecionado = filtroTipo.value;

    const transacoesFiltradas = transacoes.filter(function(transacao) {

        if (tipoSelecionado === "todos") {
            return true;
        }

        return transacao.tipo === tipoSelecionado;
    });

    
/* Mensagem quando não houver transações */

if (transacoesFiltradas.length === 0) {

    const linha = document.createElement("tr");

    const coluna = document.createElement("td");

    coluna.colSpan = 5;

    coluna.textContent = "Nenhuma transação encontrada.";

    coluna.classList.add("mensagem-vazia");

    linha.appendChild(coluna);

    listaTransacoes.appendChild(linha);

    return;
}

    transacoesFiltradas.forEach(function(transacao) {

        const linha = document.createElement("tr");

        const colunaDescricao = document.createElement("td");
        colunaDescricao.textContent = transacao.descricao;

        const colunaCategoria = document.createElement("td");

        colunaCategoria.textContent =
            nomesCategorias[transacao.categoria] || transacao.categoria;

        const colunaTipo = document.createElement("td");
        colunaTipo.textContent = transacao.tipo;

        const colunaValor = document.createElement("td");
        colunaValor.textContent = formatarMoeda(transacao.valor);

        if (transacao.tipo === "receita") {
            colunaValor.classList.add("valor-receita");
        } else {
            colunaValor.classList.add("valor-despesa");
        }

        const colunaAcoes = document.createElement("td");

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("btn-excluir");
        botaoExcluir.type = "button";

        botaoExcluir.addEventListener("click", function() {
            excluirTransacao(transacao.id);
        });

        colunaAcoes.appendChild(botaoExcluir);

        linha.appendChild(colunaDescricao);
        linha.appendChild(colunaCategoria);
        linha.appendChild(colunaTipo);
        linha.appendChild(colunaValor);
        linha.appendChild(colunaAcoes);

        listaTransacoes.appendChild(linha);
    });
}

/* ==================================
   7. EXCLUINDO TRANSAÇÕES
================================== */

function excluirTransacao(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta transação?"
    );

    if (!confirmar) {
        return;
    }

    transacoes = transacoes.filter(function(transacao) {
        return transacao.id !== id;
    });

    salvarTransacoes();
    atualizarTabela();
    atualizarResumo();
}

/* ==================================
   8. ATUALIZANDO O RESUMO FINANCEIRO
================================== */

function atualizarResumo() {

    let receitas = 0;
    let despesas = 0;

    transacoes.forEach(function(transacao) {

        if (transacao.tipo === "receita") {
            receitas += transacao.valor;
        } else {
            despesas += transacao.valor;
        }

    });

    const saldo = receitas - despesas;

    totalReceitas.textContent = formatarMoeda(receitas);
    totalDespesas.textContent = formatarMoeda(despesas);
    saldoTotal.textContent = formatarMoeda(saldo);
}

    /* Alterando a cor do saldo */

if (saldo < 0) {
    cardSaldo.classList.add("saldo-negativo");
} else {
    cardSaldo.classList.remove("saldo-negativo");
}

/* ==================================
   9. EVENTO DO FILTRO
================================== */

filtroTipo.addEventListener("change", function() {
    atualizarTabela();
});

/* ==================================
   10. INICIALIZAÇÃO DA APLICAÇÃO
================================== */

atualizarTabela();
atualizarResumo();
