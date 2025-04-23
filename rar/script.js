document.addEventListener("DOMContentLoaded", () => {
  const cliente = JSON.parse(localStorage.getItem("cliente"));
  if (!cliente) {
    alert("Você precisa se cadastrar para acessar o site.");
    window.location.href = "cadastro.html";
  } else {
    document.getElementById("nomeCliente").textContent = cliente.nome;
    exibirProdutos(produtos);
  }

  const inputBusca = document.getElementById("searchInput");
  if (inputBusca) {
    inputBusca.addEventListener("input", () => {
      const termo = inputBusca.value.toLowerCase();
      const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        p.codigo.toLowerCase().includes(termo)
      );
      exibirProdutos(filtrados);
    });
  }
});

function exibirProdutos(lista) {
  const container = document.getElementById("produtosContainer");
  container.innerHTML = "";

  lista.forEach(produto => {
    const card = document.createElement("div");
    card.className = "item-produto responsivo";
    card.innerHTML = `
      <div class="imagem-produto">
        <img src="img/${produto.imagem}" class="img-produto" onclick="abrirImagem('img/${produto.imagem}')" />
      </div>
      <div class="info-produto">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
        <p class="codigo">Código: ${produto.codigo}</p>
        ${
          produto.estoque === 0
            ? '<p class="sem-estoque">Sem estoque</p>'
            : `
          <div class="quantidade">
            <button onclick="alterarQtd(this, -1)" class="btn-quantidade">-</button>
            <span>1</span>
            <button onclick="alterarQtd(this, 1)" class="btn-quantidade">+</button>
          </div>
          <button class="btn-adicionar" onclick="adicionarCarrinho('${produto.codigo}', this)">Adicionar</button>`
        }
      </div>
    `;
    container.appendChild(card);
  });
}

function adicionarCarrinho(codigo, botao) {
  const card = botao.closest(".item-produto");
  const qtd = parseInt(card.querySelector(".quantidade span").textContent);

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = carrinho.find(p => p.codigo === codigo);

  if (item) {
    item.quantidade += qtd;
  } else {
    carrinho.push({ codigo, quantidade: qtd });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  botao.classList.add("adicionado");
  botao.textContent = "Adicionado!";
  setTimeout(() => {
    botao.classList.remove("adicionado");
    botao.textContent = "Adicionar";
  }, 1000);
}

function alterarQtd(botao, delta) {
  const span = botao.parentElement.querySelector("span");
  let qtd = parseInt(span.textContent);
  qtd += delta;
  if (qtd < 1) qtd = 1;
  span.textContent = qtd;
}

// ✅ NOVO: função para abrir imagem em zoom (modal)
function abrirImagem(imagemSrc) {
  const modal = document.createElement("div");
  modal.classList.add("imagem-modal");

  modal.innerHTML = `
    <div class="imagem-modal-conteudo">
      <span class="fechar-modal" onclick="document.body.removeChild(this.parentElement.parentElement)">×</span>
      <img src="${imagemSrc}" alt="Imagem ampliada">
    </div>
  `;

  document.body.appendChild(modal);
}
