
if (sessionStorage.getItem('logado') !== 'sim') window.location.href = 'index.html';

const CHAVE = 'produtos_mercadinho';
const CHAVE_CATEGORIAS = 'categorias_mercadinho';
let produtos = [];
let editandoId = null; 

// ---------- localStorage ---------
function carregar() {
  try {
    produtos = JSON.parse(localStorage.getItem(CHAVE)) || [];
  } catch (e) {
    alert('Não foi possível ler os dados salvos.');
    produtos = [];
  }
}
function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(produtos));
    return true;
  } catch (e) {
    alert('Não foi possível salvar os dados. Nada foi alterado.');
    return false;
  }
}


const $ = id => document.getElementById(id);
const campos = ['nome','categoria','barras','fornecedor','custo','venda','qtd','minimo','unidade','local','obs'];


function moeda(v) { return 'R$ ' + Number(v || 0).toFixed(2).replace('.', ','); }

function mostrar() {
  const termo = $('busca').value.trim().toLowerCase();
  const cats = lerDados(CHAVE_CATEGORIAS);
  const nomeCategoria = id => (cats.find(c => c.id === id) || {}).nome || '—';
  const comInativos = $('verInativos').checked;
  const visiveis = produtos.filter(p => p.ativo !== false || comInativos);
  const filtrados = visiveis.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    nomeCategoria(p.categoriaId).toLowerCase().includes(termo) ||
    p.barras.includes(termo));

  const ativos = produtos.filter(p => p.ativo !== false).length;
  const inativos = produtos.length - ativos;
  $('contador').textContent = ativos + (ativos === 1 ? ' produto cadastrado' : ' produtos cadastrados') + (inativos ? ' (' + inativos + ' inativo' + (inativos === 1 ? '' : 's') + ')' : '');
  const corpo = $('lista');
  corpo.innerHTML = '';

  if (filtrados.length === 0) {
    const msg = produtos.length === 0 ? 'Nenhum produto cadastrado. Clique em "Novo produto".' : 'Nenhum produto encontrado.';
    corpo.innerHTML = '<tr><td colspan="6" class="vazio">' + msg + '</td></tr>';
    return;
  }
  filtrados.forEach(p => {
    const inativo = p.ativo === false;
    const baixo = !inativo && Number(p.qtd) <= Number(p.minimo) && Number(p.minimo) > 0;
    const tr = document.createElement('tr');
    if (inativo) tr.className = 'linha-inativa';
 
    [p.nome, nomeCategoria(p.categoriaId), p.barras, moeda(p.venda), formatarQtd(p.qtd) + ' ' + p.unidade].forEach((txt, i) => {
      const td = document.createElement('td');
      td.textContent = txt;
      if (i === 0 && inativo) {
        const selo = document.createElement('span');
        selo.className = 'selo-inativo'; selo.textContent = 'Inativo';
        td.appendChild(selo);
      }
      if (i === 4 && baixo) { td.className = 'baixo'; td.title = 'Estoque abaixo do mínimo'; }
      tr.appendChild(td);
    });
    const td = document.createElement('td');
    td.className = 'acoes';
    const bEd = document.createElement('button');
    bEd.className = 'btn btn-cinza btn-peq'; bEd.textContent = 'Editar';
    bEd.onclick = () => abrirModal(p.id);
    const bAt = document.createElement('button');
    if (inativo) {
      bAt.className = 'btn btn-verde btn-peq'; bAt.textContent = 'Reativar';
      bAt.onclick = () => alterarAtivo(p.id, true);
    } else {
      bAt.className = 'btn btn-vermelho btn-peq'; bAt.textContent = 'Inativar';
      bAt.onclick = () => inativar(p.id);
    }
    td.append(bEd, bAt);
    tr.appendChild(td);
    corpo.appendChild(tr);
  });
}


function abrirModal(id) {
  editandoId = id || null;
  $('erroForm').textContent = '';
  const p = produtos.find(x => x.id === id);
  atualizarCategorias();
  atualizarFornecedores();
  $('tituloModal').textContent = p ? 'Editar Produto' : 'Novo Produto';
  campos.forEach(c => {
    const valor = c === 'categoria' ? p?.categoriaId : c === 'fornecedor' ? p?.fornecedorId : p?.[c];
    $(c).value = p ? (valor ?? '') : '';
  });
  if (!p) $('unidade').value = 'un';
  $('modal').classList.add('aberto');
  $('nome').focus();
}
function fecharModal() { $('modal').classList.remove('aberto'); }


$('formProduto').addEventListener('submit', function (e) {
  e.preventDefault();
  const dados = {};
  campos.forEach(c => { dados[c] = $(c).value.trim(); });
  // categoria e fornecedor agora são guardados por id (chave estrangeira)
  dados.categoriaId = dados.categoria; delete dados.categoria;
  dados.fornecedorId = dados.fornecedor; delete dados.fornecedor;

  if (!dados.nome || !dados.categoriaId || !dados.barras || !dados.fornecedorId) {
    $('erroForm').textContent = 'Preencha todos os campos marcados com *.';
    return;
  }
  if (!/^\d+$/.test(dados.barras)) {
    $('erroForm').textContent = 'O código de barras deve ter apenas números.';
    return;
  }
  const duplicado = produtos.some(p => p.barras === dados.barras && p.id !== editandoId);
  if (duplicado) {
    $('erroForm').textContent = 'Já existe um produto (ativo ou inativo) com esse código de barras.';
    return;
  }
  for (const c of ['custo','venda','qtd','minimo']) {
    if (dados[c] !== '' && Number(dados[c]) < 0) {
      $('erroForm').textContent = 'Valores não podem ser negativos.';
      return;
    }
  }
  ['custo','venda'].forEach(c => { dados[c] = Number(dados[c] || 0); });
  ['qtd','minimo'].forEach(c => { dados[c] = arredondar(dados[c]); });

  const copia = JSON.stringify(produtos);
  let anterior = 0;
  let produtoId = editandoId;
  if (editandoId) {
    const i = produtos.findIndex(p => p.id === editandoId);
    anterior = arredondar(produtos[i].qtd);
    produtos[i] = { ...produtos[i], ...dados };
  } else {
    produtoId = Date.now().toString();
    produtos.push({ id: produtoId, ...dados, ativo: true });
  }
  if (!salvar()) { produtos = JSON.parse(copia); return; }
  // todo movimento de estoque precisa de histórico, inclusive o estoque inicial
  if (!editandoId && dados.qtd > 0) registrarMovimentacao({produtoId, tipo:'entrada', quantidade: dados.qtd, anterior: 0, final: dados.qtd, fornecedorId: dados.fornecedorId, observacao:'Estoque inicial do cadastro'});
  if (editandoId && dados.qtd !== anterior) registrarMovimentacao({produtoId, tipo:'ajuste', quantidade: dados.qtd, anterior, final: dados.qtd, fornecedorId:'', observacao:'Ajuste feito pela edição do cadastro'});
  fecharModal();
  mostrar();
});


// Produto não é mais apagado: fica inativo e o histórico de movimentações é mantido
function inativar(id) {
  const p = produtos.find(x => x.id === id);
  const aviso = Number(p.qtd) > 0 ? '\nEle ainda tem ' + formatarQtd(p.qtd) + ' ' + p.unidade + ' em estoque.' : '';
  if (!confirm('Inativar "' + p.nome + '"?' + aviso + '\nO histórico será mantido e você poderá reativá-lo depois.')) return;
  alterarAtivo(id, false);
}
function alterarAtivo(id, ativo) {
  const copia = JSON.stringify(produtos);
  const p = produtos.find(x => x.id === id);
  p.ativo = ativo;
  if (!salvar()) { produtos = JSON.parse(copia); return; }
  mostrar();
}


$('btnNovo').onclick = () => abrirModal();
$('btnFechar').onclick = fecharModal;
$('btnCancelar').onclick = fecharModal;
$('busca').addEventListener('input', mostrar);
$('verInativos').addEventListener('change', mostrar);
$('btnNovaCategoria').onclick = novaCategoria;


function atualizarFornecedores() {
  const sel = $('fornecedor');
  const atual = sel.value;
  sel.innerHTML = '<option value="">Selecione o fornecedor</option>';
  lerDados('fornecedores_mercadinho').sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')).forEach(f => { const op = document.createElement('option'); op.value = f.id; op.textContent = f.nome; sel.appendChild(op); });
  sel.value = atual;
}
function atualizarCategorias() {
  const sel = $('categoria');
  const atual = sel.value;
  sel.innerHTML = '<option value="">Selecione a categoria</option>';
  lerDados(CHAVE_CATEGORIAS).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')).forEach(c => { const op = document.createElement('option'); op.value = c.id; op.textContent = c.nome; sel.appendChild(op); });
  sel.value = atual;
}
function novaCategoria() {
  const nome = (prompt('Nome da nova categoria:') || '').trim();
  if (!nome) return;
  const cats = lerDados(CHAVE_CATEGORIAS);
  let c = cats.find(x => x.nome.toLowerCase() === nome.toLowerCase());
  if (!c) {
    c = { id: novoId(), nome };
    if (!guardarDados(CHAVE_CATEGORIAS, [...cats, c])) return;
  }
  atualizarCategorias();
  $('categoria').value = c.id;
}
carregar();
atualizarCategorias();
atualizarFornecedores();
mostrar();
