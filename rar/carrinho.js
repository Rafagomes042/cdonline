function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    document.getElementById("total").textContent = "Total: R$ 0,00";
    return;
  }

  carrinho.forEach(item => {
    const produto = produtos.find(p => p.codigo === item.codigo);
    if (produto) {
      const subtotal = produto.preco * item.quantidade;
      total += subtotal;

      const div = document.createElement("div");
      div.className = "item-produto responsivo";
      div.innerHTML = `
        <div class="info-produto">
          <h3>${produto.nome}</h3>
          <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
          <p>
            <button onclick="alterarQtd('${produto.codigo}', -1)" class="btn-quantidade">-</button>
            ${item.quantidade}
            <button onclick="alterarQtd('${produto.codigo}', 1)" class="btn-quantidade">+</button>
            <button onclick="removerProduto('${produto.codigo}')" class="btn-remover">Excluir</button>
          </p>
        </div>
      `;
      lista.appendChild(div);
    }
  });

  document.getElementById("total").textContent = `Total: R$ ${total.toFixed(2)}`;
}

function alterarQtd(codigo, delta) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = carrinho.find(p => p.codigo === codigo);
  if (item) {
    item.quantidade += delta;
    if (item.quantidade <= 0) {
      removerProduto(codigo);
    } else {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      carregarCarrinho();
    }
  }
}

function removerProduto(codigo) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho = carrinho.filter(p => p.codigo !== codigo);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}

function finalizarPedido() {
  const cliente = JSON.parse(localStorage.getItem("cliente"));
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let mensagem = `*Pedido - Casa do Dentista*%0A`;
  mensagem += `Nome: ${cliente.nome}%0A`;
  mensagem += `WhatsApp: ${cliente.whatsapp}%0A`;
  mensagem += `%0A*Produtos:*%0A`;

  let total = 0;
  carrinho.forEach(item => {
    const produto = produtos.find(p => p.codigo === item.codigo);
    if (produto) {
      const subtotal = produto.preco * item.quantidade;
      total += subtotal;
      mensagem += `- ${item.quantidade}x [${produto.codigo}] ${produto.nome} - R$ ${subtotal.toFixed(2)}%0A`;
    }
  });

  mensagem += `%0A*Total: R$ ${total.toFixed(2)}*`;

  const numeroVendedor = '5585981791544';
  const link = `https://wa.me/${numeroVendedor}?text=${mensagem}`;
  window.open(link, "_blank");
}

window.onload = carregarCarrinho;
