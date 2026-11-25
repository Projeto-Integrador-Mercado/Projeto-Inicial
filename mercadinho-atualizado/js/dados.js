if (sessionStorage.getItem("logado") !== "sim") location.replace("index.html");
// Todas as listas continuam no localStorage. Uma gravação reúne saldo e histórico.
const CHAVE_ESTADO = 'estado_mercadinho_v3';
const LISTAS = ['produtos_mercadinho', 'fornecedores_mercadinho', 'categorias_mercadinho', 'movimentacoes_mercadinho'];
function lerEstado() {
  const raw = localStorage.getItem(CHAVE_ESTADO);
  const estado = raw === null ? Object.fromEntries(LISTAS.map(chave => {
    const antigo = localStorage.getItem(chave);
    return [chave, antigo === null ? [] : JSON.parse(antigo)];
  })) : JSON.parse(raw);
  if (!estado || LISTAS.some(chave => !Array.isArray(estado[chave]))) {
    throw new Error('Dados inválidos. Preserve o armazenamento antes de recuperar um backup.');
  }
  return estado;
}
function lerDados(chave) {
  if (!LISTAS.includes(chave)) throw new Error('Lista desconhecida.');
  return lerEstado()[chave];
}
function guardarDados(chave, valor) {
  try {
    if (!LISTAS.includes(chave) || !Array.isArray(valor)) throw new Error('Lista inválida.');
    const estado = lerEstado();
    estado[chave] = valor;
    localStorage.setItem(CHAVE_ESTADO, JSON.stringify(estado));
    return true;
  } catch {
    alert('Falha ao salvar. Os dados anteriores foram preservados.');
    return false;
  }
}
function salvarProdutosComMovimentacao(produtos, movimento) {
  try {
    const estado = lerEstado();
    estado.produtos_mercadinho = produtos;
    if (movimento) estado.movimentacoes_mercadinho.unshift({
      ...movimento, id: novoId(), data: new Date().toISOString(),
    });
    localStorage.setItem(CHAVE_ESTADO, JSON.stringify(estado));
    return true;
  } catch {
    alert('Falha ao salvar. Estoque e histórico não foram alterados.');
    return false;
  }
}
function registrarMovimentacao(m) {
  return salvarProdutosComMovimentacao(lerDados('produtos_mercadinho'), m);
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
// Arredonda para 3 casas, evitando 0.1 + 0.2 = 0.30000000000000004
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
// (categoria, fornecedor) em ids de referência entre os objetos locais.
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


function quantidadeValida(valor, unidade, permiteZero = true) {
  if (String(valor).trim() === '' || !['un', 'cx', 'kg', 'l'].includes(unidade)) return false;
  const n = Number(valor), escala = n * 1000;
  if (!Number.isFinite(n) || n < 0 || (!permiteZero && n === 0) || Math.abs(escala) > Number.MAX_SAFE_INTEGER) return false;
  if (unidade === 'un' || unidade === 'cx') return Number.isInteger(n);
  return Math.abs(escala - Math.round(escala)) < 0.000001;
}
