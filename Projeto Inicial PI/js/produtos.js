
if (sessionStorage.getItem('logado') !== 'sim') window.location.href = 'index.html';

const CHAVE = 'produtos_mercadinho';
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
  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.categoria.toLowerCase().includes(termo) ||
    p.barras.includes(termo));

  $('contador').textContent = produtos.length + (produtos.length === 1 ? ' produto cadastrado' : ' produtos cadastrados');
  const corpo = $('lista');
  corpo.innerHTML = '';

  if (filtrados.length === 0) {
    const msg = produtos.length === 0 ? 'Nenhum produto cadastrado. Clique em "Novo produto".' : 'Nenhum produto encontrado.';
    corpo.innerHTML = '<tr><td colspan="6" class="vazio">' + msg + '</td></tr>';
    return;
  }
  filtrados.forEach(p => {
    const baixo = Number(p.qtd) <= Number(p.minimo) && Number(p.minimo) > 0;
    const tr = document.createElement('tr');
 
    [p.nome, p.categoria, p.barras, moeda(p.venda), p.qtd + ' ' + p.unidade].forEach((txt, i) => {
      const td = document.createElement('td');
      td.textContent = txt;
      if (i === 4 && baixo) { td.className = 'baixo'; td.title = 'Estoque abaixo do mínimo'; }
      tr.appendChild(td);
    });
    const td = document.createElement('td');
    td.className = 'acoes';
    const bEd = document.createElement('button');
    bEd.className = 'btn btn-cinza btn-peq'; bEd.textContent = 'Editar';
    bEd.onclick = () => abrirModal(p.id);
    const bEx = document.createElement('button');
    bEx.className = 'btn btn-vermelho btn-peq'; bEx.textContent = 'Excluir';
    bEx.onclick = () => excluir(p.id);
    td.append(bEd, bEx);
    tr.appendChild(td);
    corpo.appendChild(tr);
  });
}


function abrirModal(id) {
  editandoId = id || null;
  $('erroForm').textContent = '';
  const p = produtos.find(x => x.id === id);
  $('tituloModal').textContent = p ? 'Editar Produto' : 'Novo Produto';
  campos.forEach(c => { $(c).value = p ? p[c] : ''; });
  if (!p) $('unidade').value = 'un';
  $('modal').classList.add('aberto');
  $('nome').focus();
}
function fecharModal() { $('modal').classList.remove('aberto'); }


$('formProduto').addEventListener('submit', function (e) {
  e.preventDefault();
  const dados = {};
  campos.forEach(c => { dados[c] = $(c).value.trim(); });

  if (!dados.nome || !dados.categoria || !dados.barras || !dados.fornecedor) {
    $('erroForm').textContent = 'Preencha todos os campos marcados com *.';
    return;
  }
  if (!/^\d+$/.test(dados.barras)) {
    $('erroForm').textContent = 'O código de barras deve ter apenas números.';
    return;
  }
  const duplicado = produtos.some(p => p.barras === dados.barras && p.id !== editandoId);
  if (duplicado) {
    $('erroForm').textContent = 'Já existe um produto com esse código de barras.';
    return;
  }
  for (const c of ['custo','venda','qtd','minimo']) {
    if (dados[c] !== '' && Number(dados[c]) < 0) {
      $('erroForm').textContent = 'Valores não podem ser negativos.';
      return;
    }
  }
  if (dados.qtd !== '' && !Number.isInteger(Number(dados.qtd))) {
    $('erroForm').textContent = 'A quantidade em estoque deve ser um número inteiro.';
    return;
  }
  ['custo','venda','qtd','minimo'].forEach(c => { dados[c] = Number(dados[c] || 0); });

  const copia = JSON.stringify(produtos);
  if (editandoId) {
    const i = produtos.findIndex(p => p.id === editandoId);
    produtos[i] = { id: editandoId, ...dados };
  } else {
    produtos.push({ id: Date.now().toString(), ...dados });
  }
  if (!salvar()) { produtos = JSON.parse(copia); return; }
  fecharModal();
  mostrar();
});


function excluir(id) {
  const p = produtos.find(x => x.id === id);
  if (!confirm('Excluir "' + p.nome + '"? Essa ação não pode ser desfeita.')) return;
  const copia = JSON.stringify(produtos);
  produtos = produtos.filter(x => x.id !== id);
  if (!salvar()) { produtos = JSON.parse(copia); return; }
  mostrar();
}


$('btnNovo').onclick = () => abrirModal();
$('btnFechar').onclick = fecharModal;
$('btnCancelar').onclick = fecharModal;
$('busca').addEventListener('input', mostrar);
$('btnSair').onclick = () => { sessionStorage.removeItem('logado'); window.location.href = 'index.html'; };

carregar();
mostrar();
