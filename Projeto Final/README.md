# Mercadinho Silva Camargo

Sistema de Controle de Estoque — Projeto Final de Desenvolvimento Web (2ª parte)

## 1. Integrantes do grupo

| RA | Nome | E-mail |
| --- | --- | --- |
| 0030482611006 | Richard Souza Chaves | richard.chaves@aluno.cps.sp.gov.br |
| 0030482611001 | Gabriel Otávio da Silva Rodrigues | gabriel.rodrigues23@aluno.cps.sp.gov.br |
| 0030482611027 | Victor Favarin | victor.conceicao2@aluno.cps.sp.gov.br |
| 0030482611035 | Rafael Lima Dorsa | rafael.dorsa@aluno.cps.sp.gov.br |

## 2. Contexto do projeto

O Mercadinho Silva Camargo é um comércio de bairro que hoje controla seus produtos em cadernos, planilhas e mensagens de WhatsApp. Essa dispersão dificulta saber quanto existe de cada produto. Este projeto é a parte de desenvolvimento web de um sistema de controle de estoque, que faz parte do Projeto Integrador (PI) do grupo.

Seguindo a orientação do professor de PI, o projeto foi dividido em etapas. Nesta entrega o grupo desenvolveu o login, o painel principal (dashboard) e as telas de produtos, fornecedores, estoque e relatórios. Fiados, parte financeira e outras áreas ficam para etapas futuras.

## 3. O que foi desenvolvido

- **Login:** usuário e senha, validação de campos vazios e mensagem de erro. O acesso é demonstrativo; a autenticação real será feita em etapa própria do PI.
- **Dashboard principal:** tela exibida após o login, com acesso a Produtos, Fornecedores, Estoque e Relatórios.
- **Produtos:** cadastro, listagem, pesquisa, edição e exclusão (com confirmação), com validações de campos obrigatórios, código de barras único e valores não negativos.
- **Fornecedores:** cadastro com endereço, o que o fornecedor fornece, prazo de entrega, telefone e demais informações complementares.
- **Estoque:** registro de entrada, saída e ajuste, com aviso da quantidade mínima de cada produto e indicação de situação (estoque normal, baixo ou sem estoque).
- **Relatórios:** panorama mais completo do estoque, com data e horário das movimentações.
- **Responsividade:** o layout se adapta a telas menores.

## 4. Tecnologias e armazenamento

O site foi feito com HTML5 (estrutura), CSS3 (visual e responsividade) e JavaScript (eventos, validações e manipulação da página). A persistência dos dados usa o localStorage do navegador, uma das opções previstas no enunciado: a lista de produtos é guardada em formato JSON na chave `produtos_mercadinho` e recarregada ao abrir a página.

Limitação conhecida: os dados ficam restritos ao navegador e ao computador em que foram cadastrados. Não há sincronização entre usuários nem entre dispositivos. Em uma versão real, os dados ficariam em um banco de dados central com servidor.

> **NOTA:** Não conseguiremos desenvolver um banco de dados mais complexo, tendo em vista que não tivemos aula de banco de dados por alguns meses. Por conta disso, improvisamos um armazenamento local.

## 5. Próximas etapas

- Controle de fiados (vendas a prazo).
- Parte financeira (contas a pagar e a receber).
- Autenticação real e banco de dados central, em conjunto com o PI.
- Outras áreas.
