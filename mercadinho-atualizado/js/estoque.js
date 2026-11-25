const $ = (id) => document.getElementById(id),
  chave = "produtos_mercadinho";
let produtos = lerDados(chave),
  tipo = "entrada";
// Produtos inativos não aparecem no estoque nem podem receber movimentação
const ativos = () => produtos.filter((p) => p.ativo !== false);
function render() {
  produtos = lerDados(chave);
  const lista0 = ativos();
  $("contador").textContent = lista0.length + " produtos cadastrados";
  $("totalNormal").textContent = lista0.filter(
    (p) => statusProduto(p) === "Normal",
  ).length;
  $("totalBaixo").textContent = lista0.filter(
    (p) => statusProduto(p) === "Estoque baixo",
  ).length;
  $("totalSem").textContent = lista0.filter(
    (p) => statusProduto(p) === "Sem estoque",
  ).length;
  const termo = $("busca").value.toLowerCase();
  const cats = lerDados("categorias_mercadinho");
  const nomeCategoria = (p) =>
    (cats.find((c) => c.id === p.categoriaId) || {}).nome || "";
  const lista = lista0.filter((p) =>
    (p.nome + " " + nomeCategoria(p) + " " + p.barras)
      .toLowerCase()
      .includes(termo),
  );
  $("lista").innerHTML = lista.length
    ? lista
        .map(
          (p) =>
            `<tr class="linha-clicavel" data-produto="${p.id}" title="Clique para registrar saída"><td>${textoSeguro(p.nome)}</td><td>${textoSeguro(nomeCategoria(p))}</td><td>${formatarQtd(p.qtd)} ${textoSeguro(p.unidade || "un")}</td><td>${formatarQtd(p.minimo)}</td><td>${textoSeguro(p.local)}</td><td><span class="situacao ${statusProduto(p) === "Normal" ? "sit-normal" : statusProduto(p) === "Estoque baixo" ? "sit-baixo" : "sit-sem"}">${statusProduto(p)}</span></td></tr>`,
        )
        .join("")
    : '<tr><td class="vazio" colspan="6">Nenhum produto encontrado. Cadastre um produto na tela Produtos.</td></tr>';
}
function abrir(t, id) {
  produtos = lerDados(chave);
  tipo = t;
  $("formMov").reset();
  $("erro").textContent = "";
  $("painel").hidden = false;
  const rotulos = {
      entrada: "Entrada de Produtos",
      saida: "Saída de Produtos",
      ajuste: "Ajuste de Estoque",
    },
    cores = {
      entrada: "cor-fornecedor",
      saida: "cor-saida",
      ajuste: "cor-ajuste",
    };
  $("titulo").textContent = rotulos[t];
  $("painelTitulo").className = "painel-titulo " + cores[t];
  $("confirmar").className =
    "btn " +
    { entrada: "btn-verde", saida: "btn-saida", ajuste: "btn-azul" }[t];
  $("confirmar").textContent =
    "✓ Confirmar " +
    { entrada: "Entrada", saida: "Saída", ajuste: "Ajuste" }[t];
  $("labelQtd").textContent =
    t === "ajuste" ? "Quantidade Final *" : "Quantidade *";
  $("quantidade").min = t === "ajuste" ? "0" : "0.001";
  $("ajudaQtd").hidden = t !== "ajuste";
  $("observacao").required = t === "ajuste";
  $("campoFornecedor").hidden = t !== "entrada";
  $("produto").innerHTML =
    '<option value="">Selecione o produto</option>' +
    ativos()
      .map(
        (p) =>
          `<option value="${p.id}">${textoSeguro(p.nome)} (estoque: ${formatarQtd(p.qtd)})</option>`,
      )
      .join("");
  const forn = lerDados("fornecedores_mercadinho");
  $("fornecedor").innerHTML =
    '<option value="">Não informado</option>' +
    forn
      .map((f) => `<option value="${f.id}">${textoSeguro(f.nome)}</option>`)
      .join("");
  if (id) $("produto").value = id;
  $("fornecedor").disabled = true;
  atualizarFornecedorEntrada();
  $("produto").focus();
  $("painel").scrollIntoView({ behavior: "smooth", block: "start" });
}
function atualizarFornecedorEntrada() {
  const p = ativos().find(p => p.id === $("produto").value);
  $("fornecedor").value = p?.fornecedorId || '';
}
$("produto").onchange = atualizarFornecedorEntrada;
function fechar() {
  $("painel").hidden = true;
}
document
  .querySelectorAll("[data-tipo]")
  .forEach((b) => (b.onclick = () => abrir(b.dataset.tipo)));
$("fechar").onclick = fechar;
$("cancelar").onclick = fechar;
$("busca").oninput = render;
$("lista").onclick = (e) => {
  const tr = e.target.closest("[data-produto]");
  if (tr) abrir("saida", tr.dataset.produto);
};
$("formMov").onsubmit = (e) => {
  e.preventDefault();
  produtos = lerDados(chave);
  const p = ativos().find((x) => x.id === $("produto").value),
    q = arredondar($("quantidade").value);
  if (!p) {
    $("erro").textContent = "Selecione um produto.";
    return;
  }
  if (!quantidadeValida($("quantidade").value, p.unidade, tipo === 'ajuste') || !quantidadeValida(p.qtd, p.unidade)) {
    $("erro").textContent = 'Use inteiros para un/cx e até 3 casas para kg/l. Verifique também o saldo cadastrado.'; return;
  }
  // quantidade pode ser decimal (kg, l); entrada e saída precisam ser maiores que zero
  if (!Number.isFinite(q) || q < 0 || (tipo !== "ajuste" && q <= 0)) {
    $("erro").textContent = "Informe uma quantidade válida.";
    return;
  }
  const motivo = $("observacao").value.trim();
  if (tipo === 'ajuste' && !motivo) {
    $("erro").textContent = 'Informe o motivo do ajuste.'; return;
  }
  const fornecedor = lerDados('fornecedores_mercadinho').find(f => f.id === p.fornecedorId);
  if (tipo === 'entrada' && !fornecedor) {
    $("erro").textContent = 'Cadastre um fornecedor válido para este produto.'; return;
  }
  const anterior = arredondar(p.qtd);
  if (tipo === 'ajuste' && q === anterior) {
    $("erro").textContent = 'O saldo informado já é o saldo atual.'; return;
  }
  if (tipo === "saida" && q > anterior) {
    $("erro").textContent =
      "Quantidade maior do que o estoque disponível (" +
      formatarQtd(anterior) +
      ").";
    return;
  }
  const nova = arredondar(
    tipo === "entrada" ? anterior + q : tipo === "saida" ? anterior - q : q,
  );
  if (!quantidadeValida(nova, p.unidade)) {
    $("erro").textContent = 'Saldo fora do limite permitido.'; return;
  }
  const atualizados = produtos.map((x) =>
    x.id === p.id ? { ...x, qtd: nova } : x,
  );
  if (!salvarProdutosComMovimentacao(atualizados, {
    produtoId: p.id,
    tipo,
    quantidade: tipo === "ajuste" ? arredondar(nova - anterior) : q,
    anterior,
    final: nova,
    fornecedorId: tipo === "entrada" ? p.fornecedorId : "",
    observacao: $("observacao").value.trim(),
  })) return;
  produtos = atualizados;
  fechar();
  render();
};
render();

