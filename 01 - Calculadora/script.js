
/* =====================================
   PROJETO 01 - CALCULADORA
   HTML + CSS + JavaScript
===================================== */

// 1. Selecionando os elementos HTML

const visor = document.getElementById("visor");
const botoes = document.querySelectorAll(".botoes button");

// 2. Variáveis de controle

let numeroAtual = "0";
let numeroAnterior = "";
let operador = null;
let iniciarNovoNumero = false;
let erro = false;

// 3. Atualizar o visor

function atualizarVisor() {
    visor.value = numeroAtual;
}

// 4. Adicionar números

function adicionarNumero(numero) {
    if (erro) {
        limparCalculadora();
    }

    if (iniciarNovoNumero) {
        numeroAtual = numero;
        iniciarNovoNumero = false;
    } else if (numeroAtual === "0") {
        numeroAtual = numero;
    } else {
        numeroAtual += numero;
    }

    atualizarVisor();
}

// 5. Adicionar ponto decimal

function adicionarDecimal() {
    if (erro) {
        limparCalculadora();
    }

    if (iniciarNovoNumero) {
        numeroAtual = "0.";
        iniciarNovoNumero = false;
    } else if (!numeroAtual.includes(".")) {
        numeroAtual += ".";
    }

    atualizarVisor();
}

// 6. Escolher uma operação

function escolherOperador(novoOperador) {
    if (erro) return;

    if (operador !== null && !iniciarNovoNumero) {
        calcular();

        if (erro) return;
    }

    numeroAnterior = numeroAtual;
    operador = novoOperador;
    iniciarNovoNumero = true;
}

// 7. Realizar o cálculo

function calcular() {
    if (operador === null || erro) return;

    if (iniciarNovoNumero) return;

    const num1 = Number(numeroAnterior);
    const num2 = Number(numeroAtual);

    let resultado;

    switch (operador) {
        case "+":
            resultado = num1 + num2;
            break;

        case "-":
            resultado = num1 - num2;
            break;

        case "*":
            resultado = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                mostrarErro();
                return;
            }

            resultado = num1 / num2;
            break;

        default:
            return;
    }

    // Reduzir pequenos erros de precisão decimal
    resultado = Number(resultado.toPrecision(12));

    if (!Number.isFinite(resultado)) {
        mostrarErro();
        return;
    }

    numeroAtual = String(resultado);
    numeroAnterior = "";
    operador = null;
    iniciarNovoNumero = true;

    atualizarVisor();
}

// 8. Limpar a calculadora

function limparCalculadora() {
    numeroAtual = "0";
    numeroAnterior = "";
    operador = null;
    iniciarNovoNumero = false;
    erro = false;

    atualizarVisor();
}

// 9. Apagar o último dígito

function apagarNumero() {
    if (erro) {
        limparCalculadora();
        return;
    }

    if (iniciarNovoNumero) return;

    if (numeroAtual.length <= 1) {
        numeroAtual = "0";
    } else if (
        numeroAtual.length === 2 &&
        numeroAtual.startsWith("-")
    ) {
        numeroAtual = "0";
    } else {
        numeroAtual = numeroAtual.slice(0, -1);
    }

    atualizarVisor();
}

// 10. Trocar o sinal

function trocarSinal() {
    if (erro) return;

    if (numeroAtual === "0") return;

    numeroAtual = String(-Number(numeroAtual));

    atualizarVisor();
}

// 11. Calcular porcentagem

function calcularPorcentagem() {
    if (erro) return;

    const valor = Number(numeroAtual) / 100;

    numeroAtual = String(
        Number(valor.toPrecision(12))
    );

    atualizarVisor();
}

// 12. Mostrar mensagem de erro

function mostrarErro() {
    numeroAtual = "Erro";
    numeroAnterior = "";
    operador = null;
    iniciarNovoNumero = true;
    erro = true;

    atualizarVisor();
}

// 13. Capturar cliques nos botões

botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const numero = botao.dataset.numero;
        const operacao = botao.dataset.operador;
        const acao = botao.dataset.acao;

        if (numero !== undefined) {
            adicionarNumero(numero);

        } else if (operacao !== undefined) {
            escolherOperador(operacao);

        } else if (acao === "decimal") {
            adicionarDecimal();

        } else if (acao === "igual") {
            calcular();

        } else if (acao === "limpar") {
            limparCalculadora();

        } else if (acao === "apagar") {
            apagarNumero();

        } else if (acao === "sinal") {
            trocarSinal();

        } else if (acao === "porcentagem") {
            calcularPorcentagem();
        }
    });
});

// 14. Exibir o valor inicial

atualizarVisor();


/* =====================================
   15. SUPORTE AO TECLADO
===================================== */

document.addEventListener("keydown", function(event) {

    const tecla = event.key;

    // Números de 0 a 9
    if (/^[0-9]$/.test(tecla)) {
        adicionarNumero(tecla);
    }

    // Operações matemáticas
    else if (["+", "-", "*", "/"].includes(tecla)) {
        escolherOperador(tecla);
    }

    // Calcular resultado
    else if (tecla === "Enter" || tecla === "=") {
        event.preventDefault();
        calcular();
    }

    // Apagar último dígito
    else if (tecla === "Backspace") {
        event.preventDefault();
        apagarNumero();
    }

    // Limpar calculadora
    else if (tecla === "Escape") {
        limparCalculadora();
    }

    // Ponto decimal
    else if (tecla === "." || tecla === ",") {
        adicionarDecimal();
    }

    // Porcentagem
    else if (tecla === "%") {
        calcularPorcentagem();
    }

});

