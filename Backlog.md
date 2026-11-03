# Backlog inicial — Projeto 2º Semestre

**Revisão:** 22/10/2026  
**Projeto:** Controle de Mercado — Mercadinho Silva Camargo

Somente duas issues compõem esta etapa. Situação inicial: **Todo**, sem responsáveis ou prazos definidos. Os IDs US-001 e US-002 identificam os requisitos; as issues correspondentes são #1 e #2.

## US-001 — Tela de login

[Issue #1](https://github.com/Projeto-Integrador-Mercado/Projeto-Inicial/issues/1)

**Prioridade:** alta  
**Objetivo:** criar a interface de acesso ao sistema.  
**História:** Como usuário do mercadinho, quero informar meu login e minha senha para acessar o controle de estoque.

### Tarefas

- [ ] Criar os campos de usuário e senha e o botão Entrar.
- [ ] Ocultar os caracteres da senha.
- [ ] Validar os campos obrigatórios.
- [ ] Exibir mensagens claras de acesso negado ou falha na comunicação.
- [ ] Preparar a integração com a autenticação e o encaminhamento à área de produtos.

### Critérios de aceite

- Campos vazios impedem o envio e mostram orientação.
- A senha aparece mascarada.
- Quando a autenticação informar erro, a tela permanece no login e apresenta mensagem.
- Quando a autenticação confirmar sucesso, a interface encaminha para a área de produtos.
- Durante a verificação, o botão impede envios repetidos.
- Caso seja utilizado um retorno simulado, isso deve ser documentado; autenticação e proteção de rotas só serão consideradas prontas após integração real.

**Dependência:** definição do contrato de autenticação e da página de destino. Cadastro público e recuperação de senha ficam fora desta tarefa inicial.

## US-002 — Backend de entrada e saída de produtos

[Issue #2](https://github.com/Projeto-Integrador-Mercado/Projeto-Inicial/issues/2)

**Prioridade:** alta  
**Objetivo:** implementar a lógica básica de movimentação do estoque.  
**História:** Como usuário do mercadinho, quero registrar entradas e saídas para manter o saldo dos produtos atualizado.

### Tarefas

- [ ] Preparar a estrutura mínima de produtos e movimentações.
- [ ] Implementar o registro de entrada e o aumento do saldo.
- [ ] Implementar o registro de saída e a redução do saldo.
- [ ] Validar produto, tipo de movimentação, quantidade e saldo disponível.
- [ ] Persistir movimentação e saldo na mesma operação atômica.
- [ ] Retornar confirmação ou mensagem de erro para a interface.
- [ ] Verificar os cenários de aceite com produtos de exemplo.

### Critérios de aceite

- Entrada de 10 unidades em saldo zero resulta em saldo 10.
- Saída de 3 unidades em saldo 10 resulta em saldo 7.
- Saída igual ao saldo é permitida e resulta em zero.
- Quantidade zero, negativa ou inválida é recusada.
- Produto inexistente e tipo diferente de entrada ou saída são recusados.
- Saída maior que o saldo não altera estoque nem cria movimentação.
- Movimentação registra produto, tipo, quantidade e data/hora; observação é opcional.
- Se houver falha ao salvar, saldo e histórico permanecem consistentes.
- Validação e atualização são realizadas juntas para evitar saldo negativo em solicitações simultâneas.

**Dependências:** definição da tecnologia e do armazenamento; produtos de exemplo disponíveis. A integração com autenticação deverá proteger as operações antes do uso real. Cadastro completo de produtos, financeiro, vendas e relatórios ficam fora desta tarefa inicial.

## US-003 - Tela de produtos
Como **usuário**, quero **visualizar a lista de produtos e seus detalhes** para **escolher o que desejo**.

## Descrição
Criar a funcionalidade de listagem de produtos, com página de detalhes de cada item.

## Critérios de aceitação
- [ ] A lista exibe nome, imagem e preço de cada produto
- [ ] Ao clicar em um produto, abre a página de detalhes com a descrição completa
- [ ] Os dados vêm do banco/API, sem valores fixos no código
- [ ] Quando não houver produtos, aparece a mensagem "Nenhum produto encontrado"
- [ ] A tela funciona em celular e desktop (responsiva)

## Tarefas
- [ ] Modelar a entidade Produto (id, nome, descrição, preço, imagem)
- [ ] Criar o endpoint para listar e detalhar produtos
- [ ] Implementar a tela de listagem
- [ ] Implementar a tela de detalhes
- [ ] Testar os cenários principais

## Conclusão das tarefas

Mover uma issue para Done somente após implementação e verificação de seus critérios de aceite. A documentação e a abertura dos cartões representam planejamento, não conclusão do software.
