# Mercadinho Silva Camargo — Sistema de Controle de Estoque

Projeto Final de Desenvolvimento Web (2ª parte).

**Site publicado:** [colar aqui o link do GitHub Pages]
**Login de teste:** usuário `admin` / senha `1234`

## Integrantes

| RA | Nome | E-mail |
|---|---|---|
| 0030482611006 | Richard Souza Chaves | richard.chaves@aluno.cps.sp.gov.br |
| 0030482611001 | Gabriel Otávio da Silva Rodrigues | gabriel.rodrigues23@aluno.cps.sp.gov.br |
| 0030482611027 | Victor Favarin | victor.conceicao2@aluno.cps.sp.gov.br |
| 0030482611035 | Rafael Lima Dorsa | rafael.dorsa@aluno.cps.sp.gov.br |

Curso / turma: [preencher] · Professor(a): [preencher]

## Contexto

O Mercadinho Silva Camargo é um comércio de bairro que controla seus produtos em cadernos, planilhas e mensagens de WhatsApp, o que dificulta saber quanto existe de cada produto. Este projeto é a parte de desenvolvimento web de um sistema de controle de estoque, ligado ao Projeto Integrador (PI).

Seguindo a orientação do professor de PI, o projeto foi dividido em etapas. Nesta entrega foram desenvolvidas duas telas: **login** e **cadastro de produtos**.

## O que foi desenvolvido

- **Login:** usuário e senha, validação de campos vazios e mensagem de erro. O acesso é demonstrativo; a autenticação real será feita em etapa própria do PI.
- **Produtos (CRUD):** listar, pesquisar (nome, categoria ou código de barras), cadastrar, editar e excluir com confirmação.
- **Campos:** nome, categoria, código de barras, fornecedor, preço de custo, preço de venda, quantidade, estoque mínimo, unidade, localização e observações.
- **Alerta de estoque:** quantidade igual ou abaixo do mínimo aparece em vermelho.
- **Validações:** campos obrigatórios, código de barras numérico e único, valores não negativos, quantidade inteira.
- **Responsividade:** layout adaptado a telas menores.

## Tecnologias e armazenamento

HTML5, CSS3 e JavaScript. Os dados são salvos no **localStorage** do navegador (chave `produtos_mercadinho`, em formato JSON).

> Limitação: os dados ficam restritos ao navegador e ao computador usados. Não há sincronização entre usuários ou dispositivos.

## Estrutura de pastas

```
ProjetoFinal/
  html/   index.html (login) · produtos.html
  css/    style.css
  js/     login.js · produtos.js
```

## Como testar

1. Entrar com `admin` / `1234`.
2. Cadastrar um produto, recarregar a página e conferir se ele continua na lista.
3. Editar, pesquisar e excluir.
4. Testar campos vazios e código de barras repetido.

Para rodar localmente, abra `html/index.html` no navegador.

## Próximas etapas

- Tela de fornecedores
- Painel principal (dashboard)
- Entradas e saídas de estoque com histórico
- Autenticação real e banco de dados central (junto com o PI)

## Uso de inteligência artificial

A IA foi usada como assistente de apoio. O grupo revisou o código e é responsável por compreendê-lo e explicá-lo. [Ajustem conforme o que o grupo realmente fez.]
