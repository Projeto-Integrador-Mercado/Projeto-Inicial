const $ = (id) => document.getElementById(id),
  chave = "produtos_mercadinho";
let produtos = lerDados(chave),
  tipo = "entrada";
function render() {
  produtos = lerDados(chave);
  $("contador").textContent = produtos.length + " produtos cadastrados";
  $("totalNormal").textContent = produtos.filter(
    (p) => statusProduto(p) === "Normal",
  ).length;
  $("totalBaixo").textContent = produtos.filter(
    (p) => statusProduto(p) === "Estoque baixo",
  ).length;
  $("totalSem").textContent = produtos.filter(
    (p) => statusProduto(p) === "Sem estoque",
  ).length;
  const termo = $("busca").value.toLowerCase();
  const lista = produtos.filter((p) =>
    (p.nome + " " + p.categoria + " " + p.barras).toLowerCase().includes(termo),
  );
  $("lista").innerHTML = lista.length
    ? lista
        .map(
          (p) =>
            `<tr class="linha-clicavel" data-produto="${p.id}" title="Clique para registrar saída"><td>${textoSeguro(p.nome)}</td><td>${textoSeguro(p.categoria)}</td><td>${numero(p.qtd)} ${textoSeguro(p.unidade || "un")}</td><td>${numero(p.minimo)}</td><td>${textoSeguro(p.local)}</td><td><span class="situacao ${statusProduto(p) === "Normal" ? "sit-normal" : statusProduto(p) === "Estoque baixo" ? "sit-baixo" : "sit-sem"}">${statusProduto(p)}</span></td></tr>`,
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
  $("quantidade").min = t === "ajuste" ? "0" : "1";
  $("ajudaQtd").hidden = t !== "ajuste";
  $("campoFornecedor").hidden = t !== "entrada";
  $("produto").innerHTML =
    '<option value="">Selecione o produto</option>' +
    produtos
      .map(
        (p) =>
          `<option value="${p.id}">${textoSeguro(p.nome)} (estoque: ${numero(p.qtd)})</option>`,
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
  const p = produtos.find((x) => x.id === $("produto").value),
    q = Number($("quantidade").value);
  if (!p) {
    $("erro").textContent = "Selecione um produto.";
    return;
  }
  if (!Number.isInteger(q) || q < (tipo === "ajuste" ? 0 : 1)) {
    $("erro").textContent = "Informe uma quantidade inteira válida.";
    return;
  }
  const anterior = numero(p.qtd);
  if (tipo === "saida" && q > anterior) {
    $("erro").textContent =
      "Quantidade maior do que o estoque disponível (" + anterior + ").";
    return;
  }
  const nova =
    tipo === "entrada" ? anterior + q : tipo === "saida" ? anterior - q : q;
  const atualizados = produtos.map((x) =>
    x.id === p.id ? { ...x, qtd: nova } : x,
  );
  if (!guardarDados(chave, atualizados)) return;
  produtos = atualizados;
  const f = lerDados("fornecedores_mercadinho").find(
    (x) => x.id === $("fornecedor").value,
  );
  registrarMovimentacao({
    produtoId: p.id,
    produto: p.nome,
    tipo,
    quantidade: q,
    anterior,
    final: nova,
    fornecedor: tipo === "entrada" ? f?.nome || "" : "",
    observacao: $("observacao").value.trim(),
  });
  fechar();
  render();
};
render();
