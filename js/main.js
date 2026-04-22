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
        let resposta = await api.get("/movie/top_rated?language=pt-BR")
        let filmes = resposta.data.results
        filmes.forEach(filme => {
            let linha = `
                <div class="col">
                    <div class="card h-100">
                        <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="${filme.title}" style="height: 400px; object-fit: cover;">
                        <div class="card-body">
                            <h4 class="card-title text-title">${filme.title}</h4>
                            <p class="card-text text-truncate">${filme.overview || "Sem descrição disponível."}</p>
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