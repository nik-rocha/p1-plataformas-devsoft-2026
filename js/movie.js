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

    let imagem_filme = document.getElementById("imagem-filme")
    let titulo_filme = document.getElementById("titulo-filme")
    let descricao_filme = document.getElementById("descricao-filme")
    
    try {
        const resposta = await api.get(`/movie/${id}`)
        const filme = resposta.data
        console.log(filme)

        imagem_filme.src = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`
        titulo_filme.textContent = filme.title
        descricao_filme.textContent = filme.overview
    } catch (e) {
        console.log(e)
        alert("Deu pau")
    }
}

carregarFilme()