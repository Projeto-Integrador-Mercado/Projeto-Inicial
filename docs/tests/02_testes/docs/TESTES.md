# Verificação da entrega

Após integrar Dorsa 01 a 04, executar na raiz: `node tests/estoque.cjs` (Node 18 ou superior apenas para testes). O sistema continua sendo HTML/JS com localStorage e não exige Node para uso.

Preparação por IA: 28 verificações automatizadas aprovadas em 23/11/2026, cobrindo entrada/saída, saldo insuficiente, ajuste zero, motivo obrigatório, ajuste sem efeito, falha de gravação, quantidades inválidas, kg decimal, fornecedor ausente, produto inativo, armazenamento corrompido, bloqueio da edição direta de saldo e exclusão de fornecedor histórico. São testes de lógica com DOM simulado; não comprovam layout nem deploy.

Gabriel deve executar novamente e registrar resultado e commit no PR. Também testar manualmente:

1. Abrir por servidor local, cadastrar fornecedor e categoria, depois produto com saldo inicial.
2. Entrar com cada um dos quatro usuários; conferir saudação e Sair.
3. Realizar entrada, saída e ajuste; conferir histórico e recarregar a página.
4. Alterar fornecedor principal; conferir que a entrada anterior mantém seu fornecedorId.
5. Abrir em tela pequena; conferir formulário, botões e tabela sem bloqueios.
6. Usar cópia dos dados legados, atualizar os arquivos e conferir migração sem perda.

Estado da revisão humana: PENDENTE. Marcar FEITO somente depois de executar, anexar evidências e integrar.
