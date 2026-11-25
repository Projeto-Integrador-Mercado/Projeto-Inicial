const fs=require('node:fs'), vm=require('node:vm'), assert=require('node:assert/strict');
const dir=process.argv[2] || 'mercadinho-atualizado/js';
let checks=0;
function check(f){f();checks++;}
function app(extra='estoque.js', unit='un') {
 const data=new Map(Object.entries({versao_dados_mercadinho:'2',produtos_mercadinho:JSON.stringify([{id:'p1',nome:'Arroz',barras:'123',qtd:10,minimo:2,unidade:unit,ativo:true,fornecedorId:'f1',categoriaId:'c1'}]),fornecedores_mercadinho:JSON.stringify([{id:'f1',nome:'Fornecedor'}]),categorias_mercadinho:JSON.stringify([{id:'c1',nome:'Alimentos'}]),movimentacoes_mercadinho:'[]'}));
 const els={};const el=id=>els[id]??=( {_value:'',get value(){return this._value;},set value(v){this._value=String(v);},checked:false,textContent:'',innerHTML:'',hidden:false,dataset:{},classList:{add(){},remove(){}},focus(){},scrollIntoView(){},reset(){},appendChild(){},append(){},addEventListener(t,fn){this[t]=fn;}});
 let fail=false;const alerts=[];
 const ctx=vm.createContext({console,Math,Date,Number,JSON,String,Object,Array,crypto:{randomUUID:()=>String(Math.random())},location:{replace(){}},window:{location:{},print(){}},alert:x=>alerts.push(x),confirm:()=>true,prompt:()=>'',sessionStorage:{getItem:k=>k==='logado'?'sim':'Richard',removeItem(){}},localStorage:{getItem:k=>data.get(k)??null,setItem(k,v){if(fail&&k==='estado_mercadinho_v3')throw Error('quota');data.set(k,v);}},document:{getElementById:el,querySelectorAll:()=>[],createElement:()=>el(String(Math.random()))}});
 vm.runInContext(fs.readFileSync(dir+'/dados.js','utf8'),ctx);
 if(extra)vm.runInContext(fs.readFileSync(dir+'/'+extra,'utf8'),ctx);
 const run=s=>vm.runInContext(s,ctx);
 return {data,el,run,alerts,fail:()=>fail=true,move(type,q,motivo='') {run(`abrir('${type}')`);el('produto').value='p1';el('quantidade').value=String(q);el('observacao').value=motivo;el('formMov').onsubmit({preventDefault(){}});},state:()=>JSON.parse(data.get('estado_mercadinho_v3')||'null')};
}
{
 const a=app();a.move('entrada',2);check(()=>assert.equal(a.state().produtos_mercadinho[0].qtd,12));check(()=>assert.equal(a.state().movimentacoes_mercadinho[0].fornecedorId,'f1'));a.move('saida',3);check(()=>assert.equal(a.state().produtos_mercadinho[0].qtd,9));a.move('saida',99);check(()=>assert.equal(a.state().produtos_mercadinho[0].qtd,9));a.move('ajuste',0);check(()=>assert.equal(a.state().produtos_mercadinho[0].qtd,9));a.move('ajuste',0,'Inventário');check(()=>assert.equal(a.state().produtos_mercadinho[0].qtd,0));check(()=>assert.equal(a.state().movimentacoes_mercadinho[0].quantidade,-9));a.move('ajuste',0,'Repetido');check(()=>assert.equal(a.state().movimentacoes_mercadinho.length,3));
 const prev=a.data.get('estado_mercadinho_v3');a.fail();a.move('entrada',1);check(()=>assert.equal(a.data.get('estado_mercadinho_v3'),prev));check(()=>assert.ok(a.alerts.length));
}
for(const q of ['',-1,0,NaN,Infinity,0.5,1.0001,Number.MAX_VALUE]){const a=app();a.move('entrada',q);check(()=>assert.equal(a.state(),null));}
{const a=app('estoque.js','kg');a.move('entrada',0.125);check(()=>assert.equal(a.state().produtos_mercadinho[0].qtd,10.125));a.move('saida',0.125);check(()=>assert.equal(a.state().produtos_mercadinho[0].qtd,10));}
{const a=app();a.data.set('fornecedores_mercadinho','[]');a.move('entrada',1);check(()=>assert.equal(a.state(),null));}
{const a=app();const p=JSON.parse(a.data.get('produtos_mercadinho'));p[0].ativo=false;a.data.set('produtos_mercadinho',JSON.stringify(p));a.move('saida',1);check(()=>assert.equal(a.state(),null));}
{const a=app();a.data.set('estado_mercadinho_v3','corrompido');check(()=>assert.equal(a.run("guardarDados('produtos_mercadinho', [])"),false));check(()=>assert.equal(a.data.get('estado_mercadinho_v3'),'corrompido'));}
{const a=app('produtos.js');a.run("abrirModal('p1')");a.el('qtd').value='100';a.el('formProduto').submit({preventDefault(){}});check(()=>assert.equal(a.state().produtos_mercadinho[0].qtd,10));check(()=>assert.equal(a.state().movimentacoes_mercadinho.length,0));}
{const a=app('fornecedores.js');a.data.set('produtos_mercadinho','[]');a.data.set('movimentacoes_mercadinho',JSON.stringify([{fornecedorId:'f1'}]));a.el('lista').onclick({target:{closest:s=>s==='[data-excluir]'?{dataset:{excluir:'f1'}}:null}});check(()=>assert.equal(a.state(),null));check(()=>assert.ok(a.alerts[0].includes('movimentações')));}
console.log(checks+' verificações aprovadas');
