const api = axios.create({
    baseURL: CONFIG.BASE_URL,
    headers: {
        Authorization: `Bearer ${CONFIG.API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

async function carregarFilme() {
    const id = localStorage.getItem("filmeId")

    let titulo_pagina_filme = document.getElementById("titulo-pagina-filme")
    let fundo_filme1 = document.getElementById("left-blur")
    let fundo_filme2 = document.getElementById("right-blur")
    let imagem_filme = document.getElementById("imagem-filme")
    let titulo_filme = document.getElementById("titulo-filme")
    let descricao_filme = document.getElementById("descricao-filme")
    let generos_filme = document.getElementById("generos-filme")
    let lancamento_filme = document.getElementById("lancamento-filme")
    let avaliacao_filme = document.getElementById("avaliacao-filme")
    
    try {
        const resposta = await api.get(`/movie/${id}?language=pt-BR`)
        const filme = resposta.data
        const dataLancamento = new Date(filme.release_date)
        const dataLancamentoFormatada = dataLancamento.toLocaleDateString("pt-BR", { timeZone: "UTC" });
        const anoLancamento = new Date(filme.release_date).getFullYear()
        let avaliacaoFilme = null
        if (filme.vote_average == 0) {
            avaliacaoFilme = "Em Breve"
        } else {
            avaliacaoFilme = filme.vote_average.toFixed(1)
        }
        console.log(filme)

        titulo_pagina_filme.textContent = `${filme.title} - ${anoLancamento}`
        fundo_filme1.src = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`
        fundo_filme2.src = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`
        imagem_filme.src = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`
        titulo_filme.textContent = filme.title
        descricao_filme.textContent = filme.overview
        generos_filme.textContent = filme.genres.map(g => g.name).join(", ")
        lancamento_filme.textContent = dataLancamentoFormatada
        avaliacao_filme.textContent = avaliacaoFilme

    } catch (e) {
        console.log(e)
        alert("Deu pau")
    }
}

async function verTrailer() {
    try {
        const id = localStorage.getItem("filmeId")
        const resposta = await api.get(`/movie/${id}?language=pt-BR`)
        const filme = resposta.data
        window.open(`https://www.imdb.com/pt/title/${filme.imdb_id}/`, "_blank")

    } catch (e) {
        console.log(e)
        alert("URL inválida.")
    }
}

carregarFilme()