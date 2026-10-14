// Catálogo completo baseado nos panfletos oficiais da GT Design
const produtos = [
  { id: 1, cat: "online", nome: "Criação de Logótipo Profissional", preco: "Sob Orçamento", desc: "Design exclusivo para marcas e empresas." },
  { id: 2, cat: "online", nome: "Arte para Instagram / Redes Sociais", preco: "Sob Orçamento", desc: "Posts, banners e flyers digitais de alta conversão." },
  { id: 3, cat: "online", nome: "Cartão de Visita Digital Interativo", preco: "Sob Orçamento", desc: "Com links clicáveis para WhatsApp, Redes Sociais e PIX." },
  { id: 4, cat: "online", nome: "Elaboração de Currículo Profissional", preco: "R$ 15,00", desc: "Formatado perfeitamente para aprovação em seleções." },
  { id: 5, cat: "online", nome: "Digitação e Formatação de Documentos", preco: "Sob Orçamento", desc: "Trabalhos escolares, PDF para Word e relatórios." },
  { id: 6, cat: "impressao", nome: "Impressões e Cópias (P&B / Colorida)", preco: "Por Quantidade", desc: "Impressões rápidas em Capoeiruçu, Cachoeira e Conceição da Feira." },
  { id: 7, cat: "impressao", nome: "Encadernação e Plastificação", preco: "Sob Orçamento", desc: "Acabamento impecável para apostilas e documentos." },
  { id: 8, cat: "informatica", nome: "Formatação de PC / Instalação do Windows", preco: "Sob Orçamento", desc: "Limpeza de sistema, drivers e otimização geral." },
  { id: 9, cat: "informatica", nome: "Recuperação de Dados e Pendrive", preco: "Sob Orçamento", desc: "Recupere arquivos perdidos ou pendrives corrompidos." },
  { id: 10, cat: "celular", nome: "Configuração de Telemóveis e Apps", preco: "Sob Orçamento", desc: "Transferência de fotos, contas de e-mail e WhatsApp." }
];

let carrinho = [];

// Renderizar Produtos no Estilo Marketplace
function renderizarProdutos(lista) {
  const grid = document.getElementById('grid-produtos');
  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum serviço encontrado.</p>';
    return;
  }

  lista.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card-produto';

    let tagLabel = item.cat === 'online' ? '🌐 100% Online' : '📍 Atendimento Local';
    let tagClass = item.cat === 'online' ? 'tag-online' : 'tag-presencial';

    card.innerHTML = `
      <div>
        <span class="tag-cat ${tagClass}">${tagLabel}</span>
        <h3>${item.nome}</h3>
        <p>${item.desc}</p>
      </div>
      <div class="preco-acao">
        <span class="preco">${item.preco}</span>
        <button class="btn-add" onclick="adicionarCarrinho(${item.id})">+ Pedir</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Filtros por Categoria
function filtrarCategoria(cat) {
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (cat === 'todos') {
    renderizarProdutos(produtos);
  } else {
    const filtrados = produtos.filter(p => p.cat === cat);
    renderizarProdutos(filtrados);
  }
}

// Pesquisa em Tempo Real
function filtrarPorBusca() {
  const termo = document.getElementById('input-busca').value.toLowerCase();
  const resultados = produtos.filter(p => 
    p.nome.toLowerCase().includes(termo) || p.desc.toLowerCase().includes(termo)
  );
  renderizarProdutos(resultados);
}

// Adicionar ao Carrinho Estilo Anota.AI
function adicionarCarrinho(id) {
  const item = produtos.find(p => p.id === id);
  if (item && !carrinho.find(c => c.id === id)) {
    carrinho.push(item);
    atualizarCarrinhoFlutuante();
  }
}

function removerItemCarrinho(id) {
  carrinho = carrinho.filter(c => c.id !== id);
  atualizarCarrinhoFlutuante();
  renderizarItensCheckout();
}

function atualizarCarrinhoFlutuante() {
  const barra = document.getElementById('carrinho-flutuante');
  const qtdEl = document.getElementById('qtd-carrinho');

  qtdEl.innerText = carrinho.length;

  if (carrinho.length > 0) {
    barra.style.display = 'flex';
  } else {
    barra.style.display = 'none';
    fecharCheckout();
  }
}

// Modal de Checkout
function abrirCheckout() {
  renderizarItensCheckout();
  document.getElementById('modal-checkout').style.display = 'flex';
}

function fecharCheckout() {
  document.getElementById('modal-checkout').style.display = 'none';
}

function renderizarItensCheckout() {
  const container = document.getElementById('lista-itens-checkout');
  if (carrinho.length === 0) {
    container.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted); text-align: center;">Carrinho vazio.</p>';
    return;
  }

  container.innerHTML = '';
  carrinho.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-checkout-linha';
    div.innerHTML = `
      <span><strong>${item.nome}</strong> (${item.preco})</span>
      <button onclick="removerItemCarrinho(${item.id})" style="color: #ef4444; background:none; border:none; cursor:pointer; font-size:0.8rem;">Remover</button>
    `;
    container.appendChild(div);
  });
}

// Envio Organizado via WhatsApp
function enviarPedidoWhatsApp(e) {
  e.preventDefault();

  const nome = document.getElementById('cli-nome').value;
  const cidade = document.getElementById('cli-cidade').value;
  const codigoAfiliado = document.getElementById('cli-afiliado').value;
  const obs = document.getElementById('cli-obs').value;
  const numeroWhatsApp = "5575988532747"; // Número oficial da GT Design

  let mensagem = `🛒 *NOVO PEDIDO / ORÇAMENTO — GT DESIGN*\n\n`;
  mensagem += `👤 *Cliente:* ${nome}\n`;
  mensagem += `📍 *Localidade:* ${cidade}\n`;

  if (codigoAfiliado.trim() !== '') {
    mensagem += `🤝 *Código de Afiliado:* ${codigoAfiliado}\n`;
  }

  mensagem += `\n📋 *Serviços Solicitados:*\n`;
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} (${item.preco})\n`;
  });

  if (obs.trim() !== '') {
    mensagem += `\n📝 *Observações:* ${obs}\n`;
  }

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// Sistema de Afiliados
function abrirModalAfiliado() {
  document.getElementById('modal-afiliado').style.display = 'flex';
}

function fecharModalAfiliado() {
  document.getElementById('modal-afiliado').style.display = 'none';
}

function gerarAfiliadoID() {
  const nome = document.getElementById('aff-nome').value;
  const pix = document.getElementById('aff-pix').value;

  if (!nome || !pix) {
    alert("Por favor, preencha o seu nome e chave PIX para gerar o código.");
    return;
  }

  const codigo = "GT-" + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('codigo-criado').innerText = codigo;
  document.getElementById('area-resultado-aff').style.display = 'block';
  localStorage.setItem('meuCodigoAfiliado', codigo);
}

function compartilharWhatsAppAfiliado() {
  const codigo = document.getElementById('codigo-criado').innerText;
  const texto = `🚀 *Conheça o app oficial da GT Design Digital & Informática!*\n\nServiços de qualidade, impressões, criação de artes e formatação de PC.\n\nUtilize o meu código de indicação *${codigo}* no seu pedido!\n\nAcesse aqui: ${window.location.href}`;
  
  const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

// Inicializar aplicativo
renderizarProdutos(produtos);