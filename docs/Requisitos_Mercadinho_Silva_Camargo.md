# Requisitos da entrega

Esta versão deve ser integrada após Dorsa 01 a 04. Software, manual e modelo-atual descrevem o mesmo comportamento. A versão anterior deste documento está preservada no histórico Git.

| ID | Regra implementada no pacote final |
|---|---|
| RF01 | Login demonstrativo Richard, Dorsa, Gabriel ou Victor, senha 1234; nomes sem distinção de caixa. Sem cadastro ou perfis reais. |
| RF02 | Dashboard é menu para Produtos, Fornecedores, Estoque e Histórico/Relatórios. Telas não são classes de domínio. |
| RF03 | Produtos podem ser cadastrados, pesquisados, editados, inativados e reativados. Não há exclusão definitiva. |
| RF04 | Produto contém os campos descritos no modelo-atual. Categoria e fornecedor são referências por id, obrigatórias e existentes. Código de barras numérico e único. |
| RF05 | Fornecedor pode ser cadastrado, editado e excluído somente quando nenhum produto ou movimento o referencia. |
| RF06 | Cadastro admite saldo inicial com entrada automática. Edição do cadastro preserva saldo e unidade. |
| RF07 | Entrada soma quantidade e usa o fornecedor principal atual do produto; a referência é gravada no movimento. |
| RF08 | Saída subtrai quantidade e não pode exceder o saldo. Produtos inativos não recebem movimentações. |
| RF09 | Ajuste solicita saldo final, inclusive zero, exige motivo e rejeita saldo sem alteração. Grava anterior, final e diferença assinada. |
| RF10 | Entrada/saída devem ser positivas. Un/cx usam inteiros; kg/l até três casas decimais. Quantidades e preços devem ser finitos e não negativos, exceto a diferença do ajuste no histórico. |
| RF11 | Saldo e histórico são gravados juntos em um único setItem do localStorage. Falha nessa gravação preserva os dois valores anteriores. |
| RF12 | Histórico permite filtros e impressão já existente. Não representa uma classe Relatorio. |

## Limites

Dados locais por navegador/origem, sem sincronização, sem backend e sem autenticação real. Usar uma aba por vez para edição: não há controle de concorrência entre abas. Não limpar dados do site sem exportar uma cópia. Abrir sempre pela mesma origem; o comportamento de file:// varia por navegador, portanto preferir servidor local ou a URL publicada.

O objeto estado_mercadinho_v3 reúne produtos, fornecedores, categorias e movimentos. Dados legados válidos são importados; chaves antigas são preservadas. Dados ilegíveis bloqueiam escrita, exigindo recuperação de uma cópia. Campos legados ausentes não são reconstruídos por suposição.

Fora do escopo: contas a pagar/receber, fiado, vendas financeiras, usuários reais, banco compartilhado e acesso simultâneo garantido.
