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
  $("produto").focus();
  $("painel").scrollIntoView({ behavior: "smooth", block: "start" });
}
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
  const p = ativos().find((x) => x.id === $("produto").value),
    q = arredondar($("quantidade").value);
  if (!p) {
    $("erro").textContent = "Selecione um produto.";
    return;
  }
  // quantidade pode ser decimal (kg, l); entrada e saída precisam ser maiores que zero
  if (!Number.isFinite(q) || q < 0 || (tipo !== "ajuste" && q <= 0)) {
    $("erro").textContent = "Informe uma quantidade válida.";
    return;
  }
  const anterior = arredondar(p.qtd);
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
  const atualizados = produtos.map((x) =>
    x.id === p.id ? { ...x, qtd: nova } : x,
  );
  if (!guardarDados(chave, atualizados)) return;
  produtos = atualizados;
  registrarMovimentacao({
    produtoId: p.id,
    tipo,
    quantidade: q,
    anterior,
    final: nova,
    fornecedorId: tipo === "entrada" ? $("fornecedor").value : "",
    observacao: $("observacao").value.trim(),
  });
  fechar();
  render();
};
render();
