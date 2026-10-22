# Discovery — escopo inicial

**Projeto:** Controle de Mercado  
**Cliente:** Mercadinho Silva Camargo  
**Disciplina:** Projeto Integrador — 2º semestre de ADS  
**Revisão:** 22/10/2026

## Contexto e problema

O projeto do semestre anterior abrangia diferentes processos do mercado. Agora, a proposta foi reduzida ao controle de entrada e saída de produtos. Registros manuais e dispersos dificultam a consulta do saldo e a conferência das movimentações.

Este documento utiliza a apresentação fornecida anteriormente e as orientações atuais da equipe. Não representa uma nova entrevista com o estabelecimento.

## Objetivo

Construir uma aplicação básica para que um usuário autorizado consulte produtos e registre suas movimentações de estoque. O trabalho será desenvolvido em etapas compatíveis com o segundo semestre do curso.

## Primeira etapa

| Item | Entrega planejada |
|---|---|
| Tela de login | Campos de usuário e senha, botão de entrada e mensagens de validação |
| Backend de estoque | Operações de entrada e saída, persistência do histórico e atualização do saldo |

O cadastro completo, as telas de produtos e um pequeno relatório poderão ser detalhados posteriormente. Não serão criadas novas issues para esses itens nesta etapa.

## Usuário principal

Pessoa autorizada pelo mercadinho para controlar o estoque. Inicialmente, propõe-se um único perfil de acesso. A criação da conta inicial e a implementação da autenticação precisam ser definidas na integração da tela de login.

## Dados mínimos propostos

- **Produto:** identificador, código, nome, unidade e saldo.
- **Movimentação:** identificador, produto, tipo (entrada ou saída), quantidade, data/hora e observação opcional.
- **Usuário:** identificador, login e senha protegida por hash quando a autenticação for implementada.

Para os testes iniciais do backend, poderão ser utilizados produtos de exemplo previamente cadastrados. O suporte a produtos vendidos por peso precisa ser confirmado; a proposta inicial utiliza unidades inteiras.

## Regras iniciais

1. Entrada aumenta o saldo e saída diminui o saldo.
2. Quantidade precisa ser maior que zero.
3. Saída maior que o saldo disponível é recusada.
4. Produto inexistente é recusado.
5. Movimentação e saldo devem ser gravados juntos; falhas não podem deixar dados parciais.
6. O saldo inicial é registrado como uma entrada.
7. Retirar produto do estoque não significa registrar pagamento ou faturamento.

## Validação da primeira etapa

- Login: verificar campos vazios, senha mascarada e mensagens de sucesso ou erro conforme retorno da autenticação. Uma simulação de interface não deve ser apresentada como autenticação implementada.
- Estoque: partindo de zero, registrar entrada de 10 e saída de 3; confirmar saldo 7 e duas movimentações. Tentar saída de 8 e confirmar que saldo e histórico não mudaram.

## Decisões pendentes

Tecnologias exigidas pela disciplina, armazenamento, integração da autenticação, necessidade de quantidades fracionárias, integrantes responsáveis e datas de entrega. Não há atribuições individuais neste documento.
