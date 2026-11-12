const chave = "fornecedores_mercadinho",
  $ = (id) => document.getElementById(id);
let fornecedores = lerDados(chave),
  editando = null;
// "itens" (Produtos Fornecidos) saiu: a lista vem da relação com os produtos
const campos = [
  "nome",
  "telefone",
  "whatsapp",
  "email",
  "prazo",
  "endereco",
  "obs",
];
function render() {
  const termo = $("busca").value.trim().toLowerCase(),
    produtos = lerDados("produtos_mercadinho"),
    nomesDe = (f) =>
      produtos
        .filter((p) => p.fornecedorId === f.id && p.ativo !== false)
        .map((p) => p.nome),
    res = fornecedores.filter((f) =>
      (f.nome + " " + nomesDe(f).join(" ")).toLowerCase().includes(termo),
    );
  $("contador").textContent =
    fornecedores.length + " fornecedor(es) cadastrado(s)";
  $("lista").innerHTML = res.length
    ? res
        .map(
          (f) =>
            `<tr><td>${textoSeguro(f.nome)}</td><td>${textoSeguro(f.telefone)}</td><td>${textoSeguro(f.email)}</td><td>${textoSeguro(nomesDe(f).join(", ") || "—")}</td><td><div class="acoes"><button class="btn btn-cinza btn-peq" data-editar="${f.id}">Editar</button><button class="btn btn-vermelho btn-peq" data-excluir="${f.id}">Excluir</button></div></td></tr>`,
        )
        .join("")
    : '<tr><td colspan="5" class="vazio">Nenhum fornecedor encontrado.</td></tr>';
}
function abrir(id) {
  editando = id || null;
  const f = fornecedores.find((x) => x.id === id);
  $("titulo").textContent = f ? "Editar Fornecedor" : "Novo Fornecedor";
  campos.forEach((c) => ($(c).value = f?.[c] || ""));
  $("erro").textContent = "";
  $("painel").hidden = false;
  $("nome").focus();
}
function fechar() {
  $("painel").hidden = true;
  editando = null;
}
$("novo").onclick = () => abrir();
$("fechar").onclick = fechar;
$("cancelar").onclick = fechar;
$("busca").oninput = render;
$("formFornecedor").onsubmit = (e) => {
  e.preventDefault();
  const d = {};
  campos.forEach((c) => (d[c] = $(c).value.trim()));
  if (!d.nome) {
    $("erro").textContent = "Informe o nome do fornecedor.";
    return;
  }
  if (editando) {
    fornecedores = fornecedores.map((f) =>
      f.id === editando ? { ...f, ...d } : f,
    );
  } else
    fornecedores.push({
      id: novoId(),
      ...d,
    });
  if (guardarDados(chave, fornecedores)) {
    fechar();
    render();
  }
};
$("lista").onclick = (e) => {
  const ed = e.target.closest("[data-editar]"),
    ex = e.target.closest("[data-excluir]");
  if (ed) abrir(ed.dataset.editar);
  if (ex) {
    const f = fornecedores.find((x) => x.id === ex.dataset.excluir);
    if (!f) return;
    // não exclui fornecedor que ainda é usado por algum produto (ativo ou inativo)
    const vinculados = lerDados("produtos_mercadinho").filter(
      (p) => p.fornecedorId === f.id,
    );
    if (vinculados.length) {
      const ativosN = vinculados.filter((p) => p.ativo !== false).length;
      alert(
        "Não é possível excluir " +
          f.nome +
          ": há " +
          vinculados.length +
          " produto(s) vinculado(s), sendo " +
          ativosN +
          " ativo(s). Troque o fornecedor desses produtos antes.",
      );
      return;
    }
    if (confirm("Excluir fornecedor " + f.nome + "?")) {
      const novos = fornecedores.filter((x) => x.id !== f.id);
      if (guardarDados(chave, novos)) {
        fornecedores = novos;
        render();
      }
    }
  }
};
render();
