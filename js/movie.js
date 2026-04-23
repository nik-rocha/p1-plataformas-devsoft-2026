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

    let fundo_filme = document.getElementsByClassName("film-blur")
    let imagem_filme = document.getElementById("imagem-filme")
    let titulo_filme = document.getElementById("titulo-filme")
    let descricao_filme = document.getElementById("descricao-filme")
    let generos_filme = document.getElementById("generos-filme")
    let lancamento_filme = document.getElementById("lancamento-filme")
    
    try {
        const resposta = await api.get(`/movie/${id}?language=pt-BR`)
        const filme = resposta.data
        const dataLancamento = new Date(filme.release_date)
        const dataLancamentoFormatada = dataLancamento.toLocaleDateString("pt-BR", { timeZone: "UTC" });
        console.log(filme)

        fundo_filme[0].style.backgroundImage = `url("https://image.tmdb.org/t/p/w500/${filme.poster_path}")`
        fundo_filme[0].style.backgroundSize = "auto"
        imagem_filme.src = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`
        titulo_filme.textContent = filme.title
        descricao_filme.textContent = filme.overview
        generos_filme.textContent = `Gêneros: ${filme.genres.map(g => g.name).join(", ")}`
        lancamento_filme.textContent = `Data de Lançamento: ${dataLancamentoFormatada}`

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