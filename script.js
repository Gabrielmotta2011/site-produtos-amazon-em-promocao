let cardContainer = document.querySelector(".card-container")
let title = document.querySelector("header h1")
let buscar = document.querySelector("#botao-busca")
let dados = [];

// Supondo que você tenha um <input id="busca"> no seu HTML
const campoBusca = document.querySelector("header input");

// Renderiza os cards quando o usuário abre o site
iniciarBusca();
// Animar tamanho da fonte e opacidade do background do título
title.animate([
    { fontSize: '0rem', padding: '0px' },
    { fontSize: '5rem', padding: '0.1px' }
], {
    duration: 1000,
    easing: 'ease-out'
});

buscar.animate([
    { fontSize: '0rem', padding: '0rem'},
    { fontSize: '1rem', padding: '0.75rem 1.5rem'}
], {
    duration: 1000,
    easing: 'ease-out'
});


// Adiciona um evento que é acionado a cada letra digitada na busca
campoBusca.addEventListener("input", () => {
    const termoBuscado = campoBusca.value;
    const dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoBuscado.toLowerCase());
    });
    renderizarCards(dadosFiltrados, termoBuscado);
});

async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            return;
        }
    }

    const termoBusca = campoBusca.value;
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados, termoBuscado) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar os novos
    for (let dado of dados) {
        let nomeProduto = dado.nome;
        if (termoBuscado && termoBuscado.length > 0) {
            const regex = new RegExp(termoBuscado, 'gi');
            nomeProduto = nomeProduto.replace(regex, (match) => `<mark>${match}</mark>`);
        }

        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <img src="${dado.imagem}" alt="${dado.nome}">
        <h2>${nomeProduto}</h2>
        <a href="${dado.link}" target="_blank">Ver Preço</a>
        `

        cardContainer.appendChild(article);

        // Anima o card ao ser adicionado
        article.animate([
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 500, // Duração da animação em milissegundos
            easing: 'ease-out' // Efeito de desaceleração suave
        });
    }
}