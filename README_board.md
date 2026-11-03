# Projeto Integrador Mercado: 2º Semestre

## Sobre o projeto
Sistema de gestão de mercado desenvolvido na disciplina de Engenharia de Software. O projeto é construído de forma incremental: cada funcionalidade é registrada como uma **história de usuário** no backlog, detalhada em **tarefas** e acompanhada no **board** (Kanban).

**Repositório:** Projeto-Inicial
**Equipe:** [nomes dos integrantes e papéis]
**Disciplina / Professor:** [nome]

## Escopo do semestre

| Código | História de usuário | Issue | Status |
|--------|---------------------|-------|--------|
| US-001 | Tela de login | #1 | Concluída |
| US-002 | Backend de entrada e saída de produtos | #2 | Em andamento |
| US-003 | Dashboard | [#] | Concluída |
| US-004 | Cadastro de fornecedores | [#] | Concluída |
| US-005 | Estoque | [#] | Concluída |
| US-006 | Relatórios | [#] | Concluída |

> Atualize a coluna **Issue** com o número real de cada issue e a coluna **Status** conforme o andamento.

## Histórias de usuário

### US-001: Tela de login
**Como** usuário, **quero** fazer login para acessar o sistema.

Principais entregas:
- Ocultar os caracteres da senha
- Validar os campos obrigatórios
- Exibir mensagens claras de acesso negado ou falha na comunicação

### US-002: Backend de entrada e saída de produtos
**Como** gestor, **quero** registrar a entrada e a saída de produtos para manter o controle da movimentação.

Principais entregas:
- Registro de entrada de produtos
- Registro de saída de produtos
- Consulta do histórico de movimentações

### US-003: Dashboard
**Como** gestor, **quero** visualizar um painel com indicadores do mercado para acompanhar rapidamente a situação do estoque e das movimentações.

Principais entregas:
- Indicadores gerais (total de produtos, entradas e saídas recentes)
- Alerta de produtos com estoque baixo
- Layout responsivo

### US-004: Cadastro de fornecedores
**Como** gestor, **quero** cadastrar e gerenciar fornecedores para saber a origem dos produtos.

Principais entregas:
- Cadastro com nome, CNPJ, telefone e e-mail
- Listagem, edição e exclusão de fornecedores
- Validação de campos e de CNPJ duplicado

### US-005: Estoque
**Como** gestor, **quero** consultar e controlar o estoque para saber a quantidade disponível de cada produto.

Principais entregas:
- Consulta da quantidade atual por produto
- Atualização automática a cada entrada e saída
- Bloqueio de saída maior que a quantidade disponível
- Indicação de estoque baixo

### US-006: Relatórios
**Como** gestor, **quero** gerar relatórios de estoque e de movimentação para apoiar a tomada de decisão.

Principais entregas:
- Relatório de estoque atual
- Relatório de entradas e saídas por período
- Filtros por período, produto e fornecedor

## Como o board funciona

| Coluna | Significado |
|--------|-------------|
| **Todo** | Item ainda não iniciado |
| **In Progress** | Item sendo trabalhado no momento |
| **Done** | Item concluído, com critérios de aceitação atendidos |

- Cada **história de usuário** (US-XXX) é uma issue pai, e suas tarefas são **sub-issues**.
- A barra de progresso no card da história mostra quantas sub-issues foram concluídas.
- Ao fechar uma issue, o card vai automaticamente para **Done** (workflow ativo).
- O board exibe apenas as histórias principais. O detalhamento completo está na view **Backlogs**.

## Views do Project

| View | Layout | Conteúdo |
|------|--------|----------|
| **Board** | Board | Visão resumida por status, apenas com as histórias de usuário |
| **Backlogs** | Table | Todas as issues e sub-issues, com status e progresso |

## Convenções

- **Título das histórias:** `US-XXX — descrição`
- **Descrição das issues:** história de usuário, critérios de aceitação e tarefas em checklist
- **Labels:** `feature`, `frontend`, `backend`, `design`, `teste`, `documentação`
- **Definição de pronto:** critérios de aceitação atendidos, código revisado e testado, issue fechada

## Próximas funcionalidades (backlog futuro)
- [ex.: controle de permissões por perfil de usuário]
- [ex.: notificações de estoque baixo por e-mail]
- [ex.: integração com ponto de venda]
