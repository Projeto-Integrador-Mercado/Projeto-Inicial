# Requisitos acordados — Mercadinho Silva Camargo

## Escopo desta especificação

Este documento descreve **o comportamento que o grupo definiu para esta entrega**. O protótipo é uma implementação parcial desse escopo. A comparação entre regra e código aparece separadamente, para que limitações atuais do protótipo não sejam confundidas com requisitos.

As regras abaixo incorporam as decisões confirmadas pelo grupo nesta conversa. O diagrama de classes representa este escopo acordado.

## Requisitos funcionais

| ID | Requisito acordado |
|---|---|
| RF01 | O sistema deve permitir acesso demonstrativo com credenciais predefinidas. Não haverá cadastro real de usuários nem perfis individuais nesta entrega. |
| RF02 | Após o acesso demonstrativo, o sistema deve exibir um dashboard com navegação para Produtos, Fornecedores, Estoque e Relatórios, além de permitir sair da sessão demonstrativa. |
| RF03 | O sistema deve permitir cadastrar, consultar, pesquisar, editar e excluir produtos. |
| RF04 | Cada produto deve conter nome, categoria, código de barras, fornecedor principal, custo, preço de venda, quantidade atual, quantidade mínima, unidade, localização e observações. Campos monetários e quantidades não podem ser negativos; código de barras é numérico e único. |
| RF05 | O sistema deve permitir cadastrar, consultar, pesquisar, editar e excluir fornecedores, com os dados de contato e cadastro existentes no formulário do protótipo. |
| RF06 | Cada produto deve estar associado a exatamente um fornecedor previamente cadastrado. Um fornecedor pode estar associado a nenhum ou vários produtos. O fornecedor do produto pode ser alterado; a alteração vale para entradas futuras. |
| RF07 | O sistema deve impedir a exclusão de um fornecedor enquanto houver produtos associados a ele. Para excluir o fornecedor, os produtos devem primeiro ser associados a outro. |
| RF08 | O sistema deve permitir consultar produtos e suas situações de estoque: normal, baixo ou sem estoque, comparando quantidade atual e quantidade mínima. |
| RF09 | A quantidade de um produto só pode ser alterada na tela Estoque, por entrada, saída ou ajuste. O cadastro e a edição do produto não alteram saldo. Uma quantidade inicial, se houver, deve ser registrada como entrada após o cadastro do produto. |
| RF10 | Ao registrar entrada, o sistema deve preencher automaticamente o fornecedor atualmente associado ao produto. O fornecedor de uma entrada não é escolhido separadamente. |
| RF11 | O sistema deve permitir saída de estoque e impedir que a quantidade retirada exceda o saldo disponível. |
| RF12 | O sistema deve permitir ajuste informando a quantidade final desejada, inclusive zero. |
| RF13 | Cada entrada, saída ou ajuste deve atualizar o saldo e gerar uma movimentação com data, produto, tipo, quantidade movimentada, saldo anterior, saldo final e observação. Em entrada, deve também registrar o fornecedor usado naquela ocasião. |
| RF14 | O sistema deve permitir excluir produtos e preservar no histórico as movimentações já registradas para eles. O histórico deve continuar legível mesmo após a exclusão. |
| RF15 | O sistema deve apresentar relatório do histórico de movimentações, com filtros por produto, tipo e período, além de totais de entradas, saídas e ajustes. A impressão do relatório não é necessária nesta entrega. |

## Requisitos não funcionais e limites desta entrega

| ID | Requisito / limite acordado |
|---|---|
| RNF01 | A interface deve ser apresentada em português e adaptar-se a telas menores. |
| RNF02 | Nesta entrega, os dados ficam armazenados no navegador por `localStorage`; não há banco de dados central nem sincronização entre dispositivos. |
| RNF03 | O login é apenas demonstrativo e não deve ser apresentado como autenticação segura para uso real. A autenticação real fica para uma etapa futura. |
| RNF04 | O sistema deve validar os dados de entrada e apresentar mensagens compreensíveis para erros. |

## Fora do escopo desta entrega / evolução futura

- Cadastro de usuários, autenticação real e perfis/permissões individuais.
- Banco de dados central e acesso compartilhado entre computadores/usuários.
- Controle de fiados/vendas a prazo.
- Parte financeira, como contas a pagar e a receber.
- Impressão do relatório.

## Estado atual do protótipo

Esta seção descreve o código observado no ZIP. Ela **não altera** os requisitos acordados acima.

| Área | O que o protótipo faz hoje | Ajuste necessário para atender ao requisito acordado |
|---|---|---|
| Login e sessão | Valida credenciais fixas no JavaScript e usa `sessionStorage`. | Compatível com o escopo demonstrativo desta entrega; não é autenticação real. |
| Dashboard | Apresenta saudação e links para Produtos, Fornecedores, Estoque e Relatórios. | Compatível com o escopo acordado. |
| Produtos | Faz cadastro, pesquisa, edição, exclusão e validações. O formulário também deixa editar quantidade. | Remover a alteração direta do saldo no cadastro/edição. Quantidade inicial deverá ser lançada como entrada na tela Estoque. |
| Fornecedores | Faz cadastro, pesquisa, edição e exclusão. Produto guarda o nome do fornecedor; ao excluir fornecedor, o produto mantém esse nome órfão. | Manter vínculo identificável Produto–Fornecedor e bloquear exclusão do fornecedor enquanto estiver associado a produtos. |
| Estoque | Registra entrada, saída e ajuste. Entrada permite escolher fornecedor independentemente do fornecedor cadastrado no produto. | Preencher o fornecedor da entrada a partir do produto. Garantir que toda alteração de saldo aconteça por esta tela. |
| Movimentações | Registra movimentações na tela Estoque com produto, tipo, quantidade, saldos, fornecedor da entrada e observação. Entrada inicial criada no cadastro não contém os saldos anterior/final. | A entrada inicial será registrada pela tela Estoque. Guardar os nomes de produto e fornecedor da época para manter histórico legível. |
| Exclusão de produto | Exclui produto e deixa os registros de movimentação no armazenamento. As movimentações guardam `produtoId` e nome do produto. | Preservar a exibição histórica mesmo sem o cadastro atual; o modelo prevê referência atual opcional e dados históricos na movimentação. |
| Relatórios | Filtra por produto, tipo e período, calcula totais e mostra o histórico. Também oferece botão de impressão. | Relatórios atendem ao escopo; impressão é uma função excedente e não é requisito desta entrega. |
| Armazenamento | Usa `localStorage` para produtos, fornecedores e movimentações. | Compatível com a limitação acordada para este semestre. |

## Relação com o PDF de diagrama anterior

O PDF mostra `Produto`, `Fornecedor`, `Movimentacao`, `ControleEstoque` e `Relatorio`, mas não representa as telas de Login, Dashboard, Produtos, Fornecedores, Estoque e Relatórios. Os atributos de Produto e Fornecedor também estão incompletos em relação ao código. O novo diagrama inclui as telas/módulos do protótipo e as classes de dados. As caixas de tela e módulo representam responsabilidades distribuídas pelos HTML e arquivos JavaScript; não afirmam que o código declare classes JavaScript com esses nomes.

No novo modelo, Produto associa-se a um Fornecedor; cada produto tem exatamente um fornecedor, e cada fornecedor pode estar associado a vários produtos. Movimentações preservam nomes históricos e podem continuar existindo sem vínculo com um produto atualmente cadastrado. Por isso, a associação histórica com o Produto é opcional após exclusão.

As relações do diagrama são aplicadas onde há suporte no projeto: Produto–Fornecedor e Produto–Movimentacao são associações; Relatorio agrega os registros que consulta sem controlar o ciclo de vida deles; Dashboard compõe os quatro atalhos incorporados à página. Para representar as três variantes de movimentação já existentes (`entrada`, `saida`, `ajuste`), o modelo conceitual usa especializações de `Movimentacao`; no protótipo atual essas variantes são armazenadas pelo campo `tipo`, não por classes distintas.
