# Mercadinho Silva Camargo

Aplicação acadêmica HTML, CSS e JavaScript para entrada, saída e ajuste de produtos. Dados no localStorage; login apenas demonstrativo.

## Executar

Abra mercadinho-atualizado/html/index.html com um servidor local ou pela URL publicada. Mantenha HTML e style.css juntos, com js/ ao lado de html/. Não precisa instalar banco de dados ou backend. Use a mesma origem e uma aba por vez para alterar dados.

| Usuário | Senha |
|---|---|
| Richard | 1234 |
| Dorsa | 1234 |
| Gabriel | 1234 |
| Victor | 1234 |

Os nomes ignoram maiúsculas/minúsculas. Todos acessam o mesmo estoque local; não existem perfis diferentes. A sessão usa sessionStorage e o botão Sair encerra o acesso demonstrativo.

## Uso

1. Cadastre fornecedores. Na tela Produtos, crie a categoria e o produto.
2. Produtos começam com saldo zero; entradas, saídas e ajustes são realizados exclusivamente na tela Estoque. A unidade não muda na edição.
3. Entrada usa o fornecedor principal do produto. Saída não permite saldo negativo.
4. Ajuste recebe o saldo final e exige motivo. O histórico guarda a diferença, o saldo anterior e o final.
5. Un/cx aceitam inteiros; kg/l aceitam até três casas decimais. Produtos podem ser inativados e reativados.
6. Consulte movimentos em Relatórios. Dashboard e Relatórios são telas, não classes de domínio.

## Persistência

estado_mercadinho_v3 reúne as quatro listas produtos_mercadinho, fornecedores_mercadinho, categorias_mercadinho e movimentacoes_mercadinho em um único objeto no localStorage. Saldo e movimento são persistidos na mesma operação. Chaves antigas ficam preservadas como cópia de migração; não representam o saldo atualizado. versao_dados_mercadinho controla a conversão legada de nomes para ids.

Para guardar uma cópia, use as ferramentas do navegador para copiar o valor completo de estado_mercadinho_v3 antes de limpar dados ou voltar a uma versão antiga. Não há sincronização, backup automático, controle entre abas ou autenticação segura. Registros legados mantêm suas limitações; nos ajustes antigos confira anterior/final.

## Documentação e testes

- [Requisitos](../docs/Requisitos_Mercadinho_Silva_Camargo.md)
- [Diagrama vigente](../docs/diagramas/modelo-atual.md)
- [Testes](../docs/TESTES.md): `node tests/estoque.cjs` na raiz do repositório.

Versão preparada em 23/11/2026 para integração após os pacotes Dorsa 01 a 04. Revisão e envio: Gabriel Otávio. Preparação: auxílio de IA solicitado por Richard. Autor e SHA efetivos serão os do GitHub após o envio.
