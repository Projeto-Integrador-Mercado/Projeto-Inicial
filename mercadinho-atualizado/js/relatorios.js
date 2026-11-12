const $ = (id) => document.getElementById(id);
$("dataGeracao").textContent =
  "Gerado em " + new Date().toLocaleDateString("pt-BR");
function render() {
  const termo = $("produto").value.toLowerCase(),
    tipo = $("tipo").value,
    inicio = $("inicio").value,
    fim = $("fim").value;
  // o nome do produto vem do cadastro (pelo id); movimentos antigos usam o nome gravado
  const produtos = lerDados("produtos_mercadinho");
  const nomeProduto = (m) =>
    (produtos.find((p) => p.id === m.produtoId) || {}).nome || m.produto || "—";
  const lista = lerDados("movimentacoes_mercadinho").filter((m) => {
    const dia = (m.data || "").slice(0, 10);
    return (
      String(nomeProduto(m)).toLowerCase().includes(termo) &&
      (!tipo || m.tipo === tipo) &&
      (!inicio || dia >= inicio) &&
      (!fim || dia <= fim)
    );
  });
  $("entradas").textContent = formatarQtd(
    lista
      .filter((m) => m.tipo === "entrada")
      .reduce((s, m) => s + numero(m.quantidade), 0),
  );
  $("saidas").textContent = formatarQtd(
    lista
      .filter((m) => m.tipo === "saida")
      .reduce((s, m) => s + numero(m.quantidade), 0),
  );
  $("ajustes").textContent = lista.filter((m) => m.tipo === "ajuste").length;
  $("contagem").textContent = "(" + lista.length + " registros)";
  $("lista").innerHTML = lista.length
    ? lista
        .map(
          (m) =>
            `<tr><td>${new Date(m.data).toLocaleString("pt-BR")}</td><td>${textoSeguro(nomeProduto(m))}</td><td><span class="situacao ${m.tipo === "entrada" ? "sit-normal" : m.tipo === "saida" ? "sit-sem" : "sit-ajuste"}">${{ entrada: "Entrada", saida: "Saída", ajuste: "Ajuste" }[m.tipo] || m.tipo}</span></td><td>${formatarQtd(m.quantidade)}</td><td>${m.final === undefined ? "—" : formatarQtd(m.final)}</td><td>${textoSeguro(m.observacao || "—")}</td></tr>`,
        )
        .join("")
    : '<tr><td colspan="6" class="vazio">Nenhuma movimentação encontrada para os filtros selecionados.</td></tr>';
}
["produto", "tipo", "inicio", "fim"].forEach((id) =>
  $(id).addEventListener("input", render),
);
$("imprimir").onclick = () => window.print();
render();
