const listas = {
  "Primeiro Semestre": [
    { codigo: "P001", quantidade: 1 },
    { codigo: "P002", quantidade: 2 },
    { codigo: "P003", quantidade: 1 },
    { codigo: "P004", quantidade: 1 },
    { codigo: "P008", quantidade: 1 }
  ],
  "Segundo Semestre": [
    { codigo: "P005", quantidade: 1 },
    { codigo: "P006", quantidade: 1 },
    { codigo: "P007", quantidade: 1 },
    { codigo: "P009", quantidade: 2 },
    { codigo: "P010", quantidade: 1 }
  ],
  "Terceiro Semestre": [
    { codigo: "P011", quantidade: 2 },
    { codigo: "P012", quantidade: 1 },
    { codigo: "P013", quantidade: 1 },
    { codigo: "P014", quantidade: 1 },
    { codigo: "P015", quantidade: 1 }
  ],
  "Quarto Semestre": [
    { codigo: "P016", quantidade: 1 },
    { codigo: "P017", quantidade: 1 },
    { codigo: "P018", quantidade: 1 },
    { codigo: "P019", quantidade: 1 },
    { codigo: "P020", quantidade: 2 }
  ],
  "Quinto Semestre": [
    { codigo: "P001", quantidade: 1 },
    { codigo: "P005", quantidade: 1 },
    { codigo: "P010", quantidade: 2 },
    { codigo: "P015", quantidade: 1 },
    { codigo: "P019", quantidade: 1 }
  ]
};

function abrirLista(nomeLista, botao) {
  document.getElementById("botoes-listas").style.display = "none";
  const lista = listas[nomeLista];
  const listaContainer = document.getElementById("lista-produtos");
  listaContainer.innerHTML = `<h2>${nomeLista}</h2>`;

  lista.forEach(item => {
    const produto = produtos.find(p => p.codigo === item.codigo);
    if (produto) {
      const div = document.createElement("div");
      div.className = "item-produto responsivo";
      div.innerHTML = `
        <div class="imagem-produto">
          <img src="img/${produto.imagem}" alt="${produto.nome}" />
        </div>
        <div class="info-produto">
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
          <p><small>Código: ${produto.codigo}</small></p>
          ${
            produto.estoque === 0
              ? '<p class="sem-estoque">Sem estoque</p>'
              : `
            <div class="quantidade">
              <button onclick="alterarQuantidade('${produto.codigo}', -1)" class="btn-quantidade">-</button>
              <span id="quantidade-${produto.codigo}">1</span>
              <button onclick="alterarQuantidade('${produto.codigo}', 1)" class="btn-quantidade">+</button>
            </div>
            <button onclick="adicionarAoCarrinho('${produto.codigo}', this)" class="btn-adicionar">Adicionar</button>
            `
          }
        </div>
      `;
      listaContainer.appendChild(div);
    }
  });
}

function adicionarAoCarrinho(codigo, botao) {
  const quantidade = parseInt(document.getElementById(`quantidade-${codigo}`).textContent);
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const itemExistente = carrinho.find(p => p.codigo === codigo);
  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({ codigo, quantidade });
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  botao.classList.add("adicionado");
  botao.textContent = "Adicionado!";
}

function alterarQuantidade(codigo, delta) {
  const span = document.getElementById(`quantidade-${codigo}`);
  let quantidade = parseInt(span.textContent);
  quantidade += delta;
  if (quantidade < 1) quantidade = 1;
  span.textContent = quantidade;
}
