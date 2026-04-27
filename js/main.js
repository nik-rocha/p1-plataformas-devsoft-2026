const api = axios.create({
    baseURL: CONFIG.BASE_URL,
    headers: {
        Authorization: `Bearer ${CONFIG.API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

async function verFilmes() {
    let container = document.getElementById("lista-filmes")
    container.innerHTML = ""
    
    try {
        let resposta = await api.get("/movie/popular?language=pt-BR")
        let filmes = resposta.data.results
        filmes.forEach(filme => {
            const dataLancamento = new Date(filme.release_date)
            const dataLancamentoFormatada = dataLancamento.toLocaleDateString("pt-BR", { timeZone: "UTC" });
            let avaliacaoFilme = null
            if (filme.vote_average == 0) {
                avaliacaoFilme = "Em Breve"
            } else {
                avaliacaoFilme = filme.vote_average.toFixed(1)
            }
            let linha = `
                <div class="col">
                    <div class="card h-100">
                        <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="${filme.title}" style="height: 400px; object-fit: cover;">
                        <div class="card-body">
                            <h4 class="card-title text-title">${filme.title}</h4>
                            <p class="card-text text-truncate">${filme.overview || "Sem descrição disponível."}</p>
                            <div class="bottom-info">
                                <p class="card-text fw-bold">Data de Lançamento: <span class="card-text fw-normal">${dataLancamentoFormatada}</span></p>
                                <p class="card-text fw-bold">Avaliação Média: <span class="card-text fw-normal">${avaliacaoFilme}</span></p>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent border-top-0">
                            <button class="btn btn-warning w-100 card-button" onclick="selecionarFilme(${filme.id})">Ver Sobre</button>
                        </div>
                    </div>
                </div>
            `
            container.innerHTML += linha;
        })
        console.log(filmes)
    } catch (e) {
        console.log(e)
        alert("Deu pau")
    }
}

function selecionarFilme(id) {
    localStorage.setItem("filmeId", id);
    window.location.href="./movie.html"
}

verFilmes()