# Mercadinho Silva Camargo – Sistema de Controle de Estoque

Sistema web de controle de estoque para um mercadinho, feito apenas com **HTML, CSS e JavaScript puro** (sem frameworks e sem servidor). Todos os dados ficam guardados no navegador, em `localStorage`.

Este documento explica a parte de **front-end**: as telas (HTML), o estilo (CSS) e a lógica (JavaScript).

---

## Funcionalidades

- **Login** de demonstração.
- **Dashboard** com atalhos para as telas.
- **Produtos**: cadastrar, editar, pesquisar, inativar e reativar.
- **Fornecedores**: cadastrar, editar, pesquisar e excluir.
- **Estoque**: ver a situação de cada produto e registrar entradas, saídas e ajustes.
- **Relatórios**: histórico de movimentações com filtros, totais e impressão.

---

## Estrutura de pastas

```
html/
├── index.html          Login
├── dashboard.html      Menu principal
├── produtos.html       Cadastro e consulta de produtos
├── fornecedores.html   Cadastro e consulta de fornecedores
├── estoque.html        Situação do estoque e movimentações
├── relatorios.html     Histórico de movimentações
└── style.css           Estilo único de todas as telas

js/
├── dados.js            Funções compartilhadas e migração de dados
├── login.js            Validação do login
├── produtos.js         Lógica da tela de produtos
├── fornecedores.js     Lógica da tela de fornecedores
├── estoque.js          Lógica da tela de estoque
└── relatorios.js       Lógica da tela de relatórios
```

Os HTML carregam o CSS com `./style.css` e os scripts com `../js/`. Por isso, **mantenha o `style.css` na mesma pasta dos HTML e a pasta `js/` ao lado de `html/`**.

---

## Como executar

1. Baixe ou clone o repositório.
2. Abra `html/index.html` no navegador (Chrome ou Edge recomendados).
3. Entre com o usuário de demonstração:

| Usuário | Senha |
|---|---|
| `Richard` | `1234` |
| `Dorsa` | `1234` |
| `Gabriel` | `1234` |
| `Victor` | `1234` |

Não é preciso instalar nada. Se preferir, também é possível abrir por um servidor local (por exemplo, a extensão Live Server do VS Code).

> **Atenção:** o `localStorage` é separado por endereço. Os dados cadastrados ao abrir o arquivo direto (`file://`) não aparecem ao abrir por um servidor local, e vice-versa.

---

## HTML – as telas

| Arquivo | Para que serve | Script usado |
|---|---|---|
| `index.html` | Formulário de login | `login.js` |
| `dashboard.html` | Quatro cartões que levam a Produtos, Fornecedores, Estoque e Relatórios, e o botão Sair | `dados.js` |
| `produtos.html` | Tabela de produtos, busca, filtro "Mostrar inativos" e janela (modal) de cadastro/edição | `dados.js`, `produtos.js` |
| `fornecedores.html` | Tabela de fornecedores, busca e painel de cadastro/edição | `dados.js`, `fornecedores.js` |
| `estoque.html` | Contadores de situação, três botões de movimentação (entrada, saída, ajuste), busca e tabela | `dados.js`, `estoque.js` |
| `relatorios.html` | Filtros (produto, tipo, datas), totais e tabela do histórico | `dados.js`, `relatorios.js` |

Todas as telas, exceto o login, incluem o `dados.js`, que redireciona para `index.html` se não houver sessão iniciada.

---

## CSS – `style.css`

Um único arquivo para todo o sistema.

- **Variáveis** (`:root`): cores principais (`--azul`, `--fundo`, `--texto`, `--erro` etc.).
- **Componentes reutilizados**: botões (`.btn`, `.btn-azul`, `.btn-verde`, `.btn-vermelho`, `.btn-cinza`, `.btn-saida`), campos de formulário, tabelas (`.tabela-wrap`), painéis (`.painel-form`), modal e cartões do dashboard.
- **Uma cor por seção**: cada tela tem uma classe no `<body>` (`pagina-dashboard`, `pagina-fornecedores`, `pagina-estoque`, `pagina-relatorios`) e cabeçalhos coloridos (`.cor-fornecedor`, `.cor-estoque`, `.cor-relatorio`).
- **Situação do estoque**: selos `.sit-normal`, `.sit-baixo`, `.sit-sem` e `.sit-ajuste`.
- **Produtos inativos**: `.linha-inativa` (linha esmaecida) e `.selo-inativo`.
- **Layout responsivo**: grades com CSS Grid e Flexbox, com ajustes para telas de até 700 px, 600 px e 430 px.
- **Impressão**: regras em `@media print` escondem botões e filtros no relatório.
- **Fonte**: Nunito, carregada do Google Fonts.

---

## JavaScript – como funciona

### `dados.js` (compartilhado)

| Função | O que faz |
|---|---|
| (início do arquivo) | Se `sessionStorage.logado` não for `"sim"`, volta para `index.html` |
| `lerDados(chave)` / `guardarDados(chave, valor)` | Leem e gravam listas no `localStorage` com tratamento de erro |
| `registrarMovimentacao(m)` | Adiciona um registro ao histórico, com data e id automáticos |
| `textoSeguro(v)` | Escapa caracteres HTML antes de inserir texto na página |
| `numero(v)` | Converte para número (vazio vira 0) |
| `statusProduto(p)` | Retorna `Sem estoque`, `Estoque baixo` ou `Normal` |
| `arredondar(v)` / `formatarQtd(v)` | Arredondam a 3 casas e mostram no padrão brasileiro (12,5) |
| `novoId()` | Gera um identificador para categorias e fornecedores |
| `migrarDados()` | Converte dados salvos no formato antigo para o atual (roda uma vez) |
| `sair()` | Encerra a sessão e volta ao login |

### `login.js`
Aceita Richard, Dorsa, Gabriel e Victor com a senha demonstrativa `1234`. O nome ignora maiúsculas/minúsculas e espaços nas extremidades; a sessão guarda a grafia canônica. Não há cadastro, permissões diferentes ou separação do estoque por usuário. Se estiverem corretos, grava `logado` e `usuario` no `sessionStorage` e abre o dashboard.

### `produtos.js`
- Lista os produtos ativos (e os inativos, se o filtro estiver marcado), com busca por nome, categoria ou código de barras.
- Cadastro e edição pelo modal, com validações: nome, categoria, código de barras e fornecedor obrigatórios; código de barras só com números e **único** (inclusive entre inativos); valores não negativos.
- **Categoria** é escolhida em uma lista; o botão "+ Nova" cria uma categoria nova (sem repetir nomes, ignorando maiúsculas).
- **Produto não é apagado**: o botão "Inativar" o esconde das listas e "Reativar" o traz de volta, mantendo o histórico.
- Ao cadastrar um produto com quantidade, registra uma **entrada de estoque inicial**. Ao mudar a quantidade pela edição, registra um **ajuste**.

### `fornecedores.js`
- Cadastro, edição, busca e exclusão.
- A coluna "Produtos ativos" mostra os produtos de cada fornecedor, e a busca também encontra por esses nomes.
- **Não permite excluir** um fornecedor que ainda tenha produtos vinculados.

### `estoque.js`
- Mostra apenas produtos ativos, com contadores de **Normal**, **Estoque baixo** e **Sem estoque**.
- Três tipos de movimentação:
  - **Entrada**: soma a quantidade ao estoque (fornecedor opcional).
  - **Saída**: subtrai do estoque e não aceita mais do que o disponível. Clicar na linha de um produto abre a saída dele.
  - **Ajuste**: define a quantidade final (usado em inventário).
- Aceita **quantidades decimais** (por exemplo, 2,5 kg).
- Cada movimentação grava o estoque anterior e o final no histórico.

### `relatorios.js`
- Lista as movimentações, da mais recente para a mais antiga.
- Filtros por produto, tipo (entrada, saída, ajuste) e período.
- Totais de entradas e saídas e contagem de ajustes.
- Botão de imprimir (`window.print()`).

---

## Dados guardados no navegador

Chaves do `localStorage`:

| Chave | Conteúdo |
|---|---|
| `produtos_mercadinho` | `id`, `nome`, `categoriaId`, `barras`, `fornecedorId`, `custo`, `venda`, `qtd`, `minimo`, `unidade` (`un`, `kg`, `l`, `cx`), `local`, `obs`, `ativo` |
| `fornecedores_mercadinho` | `id`, `nome`, `telefone`, `whatsapp`, `email`, `prazo`, `endereco`, `obs` |
| `categorias_mercadinho` | `id`, `nome` |
| `movimentacoes_mercadinho` | `id`, `data`, `produtoId`, `tipo` (`entrada`, `saida`, `ajuste`), `quantidade`, `anterior`, `final`, `fornecedorId`, `observacao` |
| `versao_dados_mercadinho` | Versão do formato dos dados (controle da migração) |

No `sessionStorage`: `logado` e `usuario` (sessão do login).

Produtos e movimentações apontam para fornecedores e categorias **pelo id**, e não pelo nome. Assim, renomear um fornecedor ou categoria não quebra os vínculos.

### Migração de dados antigos
Se o navegador já tiver dados do formato anterior (categoria e fornecedor guardados pelo nome), o `migrarDados()` converte tudo automaticamente na primeira abertura de qualquer tela: cria as categorias, troca os nomes por ids e marca os produtos como ativos. O texto do antigo campo "Produtos Fornecidos" é preservado nas observações do fornecedor.

---

## Limitações conhecidas

- Os dados ficam **somente no navegador** de quem usa: não são compartilhados entre pessoas nem entre computadores, e são apagados se o cache do site for limpo.
- O login é apenas de demonstração. A senha fica visível no código e **não oferece segurança real**.
- Não há testes automatizados.

---

## Tecnologias

HTML5, CSS3 e JavaScript (ES6+), com `localStorage` e `sessionStorage`. Sem bibliotecas externas, exceto a fonte Nunito (Google Fonts).

## Registro de mudanças — 23/11/2026

Responsável: Richard Souza Chaves, com auxílio de IA. Commit: `feat: ajustar login demonstrativo`. Substituído o acesso admin pelos quatro integrantes; tela e manual atualizados em conjunto. localStorage e sessão demonstrativa mantidos. As demais correções de estoque e o alinhamento completo dos diagramas continuam pendentes.
