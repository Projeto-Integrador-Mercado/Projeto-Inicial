if (sessionStorage.getItem("logado") !== "sim") location.replace("index.html");
function lerDados(chave) {
  try {
    const dados = JSON.parse(localStorage.getItem(chave));
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}
function guardarDados(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    alert("Falha ao salvar os dados no navegador.");
    return false;
  }
}
function registrarMovimentacao(m) {
  const chave = "movimentacoes_mercadinho";
  const lista = lerDados(chave);
  lista.unshift({
    id: String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8),
    data: new Date().toISOString(),
    ...m,
  });
  return guardarDados(chave, lista);
}
function textoSeguro(v) {
  return String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function numero(v) {
  return Number(v || 0);
}
function statusProduto(p) {
  const q = numero(p.qtd),
    min = numero(p.minimo);
  return q <= 0 ? "Sem estoque" : q <= min ? "Estoque baixo" : "Normal";
}
function sair() {
  sessionStorage.removeItem("logado");
  sessionStorage.removeItem("usuario");
  location.href = "index.html";
}
