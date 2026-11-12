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

// ---------- NOVO: quantidades decimais (kg, l) ----------
// Arredonda para 3 casas, como o banco (REAL com 3 casas), evitando 0.1 + 0.2 = 0.30000000000000004
function arredondar(v) {
  return Math.round(numero(v) * 1000) / 1000;
}
// Mostra a quantidade no padrão brasileiro: 12,5 / 3,25 / 40
function formatarQtd(v) {
  return arredondar(v).toLocaleString("pt-BR", { maximumFractionDigits: 3 });
}
// Identificador para categorias e fornecedores criados pelo sistema
function novoId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8);
}

// ---------- NOVO: migração dos dados antigos (versão 1 -> 2) ----------
// Roda uma única vez por navegador. Converte os nomes guardados antes
// (categoria, fornecedor) em ids, igual às chaves estrangeiras do banco.
const VERSAO_DADOS = "2";
function migrarDados() {
  if (localStorage.getItem("versao_dados_mercadinho") === VERSAO_DADOS) return;
  const cats = lerDados("categorias_mercadinho"),
    forn = lerDados("fornecedores_mercadinho"),
    prods = lerDados("produtos_mercadinho"),
    movs = lerDados("movimentacoes_mercadinho");
  const achar = (lista, nome) =>
    lista.find(
      (x) =>
        String(x.nome).trim().toLowerCase() ===
        String(nome ?? "")
          .trim()
          .toLowerCase(),
    );

  // fornecedores: o campo "itens" deixa de existir (vem da relação com produtos)
  const fornNovos = forn.map((f) => {
    const { itens, ...resto } = f;
    if (itens)
      resto.obs =
        (resto.obs ? resto.obs + " | " : "") +
        "Produtos fornecidos (cadastro antigo): " +
        itens;
    return resto;
  });

  // produtos: nome da categoria/fornecedor vira id; todos nascem ativos
  const prodNovos = prods.map((p) => {
    if ("categoriaId" in p && "fornecedorId" in p) return p;
    const { categoria, fornecedor, ...resto } = p;
    let c = achar(cats, categoria);
    if (!c && categoria) {
      c = { id: novoId(), nome: String(categoria).trim() };
      cats.push(c);
    }
    let f = achar(fornNovos, fornecedor);
    if (!f && fornecedor) {
      f = {
        id: novoId(),
        nome: String(fornecedor).trim(),
        telefone: "",
        whatsapp: "",
        email: "",
        prazo: "",
        endereco: "",
        obs: "",
      };
      fornNovos.push(f);
    }
    return {
      ...resto,
      categoriaId: c ? c.id : "",
      fornecedorId: f ? f.id : "",
      ativo: p.ativo !== false,
    };
  });

  // movimentações: fornecedor vira id; estoque inicial ganha anterior/final
  const movNovos = movs.map((m) => {
    const { fornecedor, ...resto } = m;
    const f = achar(fornNovos, fornecedor);
    const novo = { ...resto, fornecedorId: m.fornecedorId || (f ? f.id : "") };
    if (novo.anterior === undefined && novo.tipo === "entrada") {
      novo.anterior = 0;
      novo.final = numero(novo.quantidade);
    }
    return novo;
  });

  if (
    guardarDados("categorias_mercadinho", cats) &&
    guardarDados("fornecedores_mercadinho", fornNovos) &&
    guardarDados("produtos_mercadinho", prodNovos) &&
    guardarDados("movimentacoes_mercadinho", movNovos)
  )
    localStorage.setItem("versao_dados_mercadinho", VERSAO_DADOS);
}
migrarDados();
