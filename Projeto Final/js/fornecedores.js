const chave = "fornecedores_mercadinho",
  $ = (id) => document.getElementById(id);
let fornecedores = lerDados(chave),
  editando = null;
const campos = [
  "nome",
  "telefone",
  "whatsapp",
  "email",
  "prazo",
  "itens",
  "endereco",
  "obs",
];
function render() {
  const termo = $("busca").value.trim().toLowerCase(),
    res = fornecedores.filter((f) =>
      (f.nome + " " + f.itens).toLowerCase().includes(termo),
    );
  $("contador").textContent =
    fornecedores.length + " fornecedor(es) cadastrado(s)";
  $("lista").innerHTML = res.length
    ? res
        .map(
          (f) =>
            `<tr><td>${textoSeguro(f.nome)}</td><td>${textoSeguro(f.telefone)}</td><td>${textoSeguro(f.email)}</td><td>${textoSeguro(f.itens)}</td><td><div class="acoes"><button class="btn btn-cinza btn-peq" data-editar="${f.id}">Editar</button><button class="btn btn-vermelho btn-peq" data-excluir="${f.id}">Excluir</button></div></td></tr>`,
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
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
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
    if (f && confirm("Excluir fornecedor " + f.nome + "?")) {
      const novos = fornecedores.filter((x) => x.id !== f.id);
      if (guardarDados(chave, novos)) {
        fornecedores = novos;
        render();
      }
    }
  }
};
render();
