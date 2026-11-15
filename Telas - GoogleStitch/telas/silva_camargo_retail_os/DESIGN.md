---
name: Silva Camargo Retail OS
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#8f000b'
  on-tertiary: '#ffffff'
  tertiary-container: '#bb0112'
  on-tertiary-container: '#ffc7c1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#93000b'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

O design system estabelece uma linguagem visual utilitária, ágil e refinada para a operação diária de varejo alimentar e frente de caixa (PDV). Inspirado na densidade informacional e precisão do Linear e Shopify, o ecossistema prioriza escaneabilidade veloz, confiança operacional e fricção zero no ponto de venda e controle de estoque.

### Pilares de Design
- **Precisão Cirúrgica:** Redução de ornamentos dispensáveis. Hierarquia imediata através de contraste tipográfico, pesos estruturados e bordas milimétricas.
- **Eficiência Tátil:** Foco na ergonomia de desktop com suporte nativo a fluxos via teclado, layouts de alta densidade e estados visuais evidentes.
- **Clareza Semiótica:** Cores semânticas funcionam como sinalizadores imediatos de estado de estoque, faturamento e alertas de reposição.

### Estilo
Modern SaaS Utilitário: interfaces limpas, cartões brancos pousados sobre fundo cinza-ardósia ultra suave, bordas de 1px ultra-precisas e microelevações apenas onde há necessidade funcional de foco ou sobreposição.

## Colors

A estrutura cromática equilibra a seriedade institucional com sinalizadores de alta visibilidade para operações de caixa e conferência de inventário.

- **Primária (`#1D4ED8`):** Azul Royal profundo. Usado para comandos principais, foco ativo, seleção de registros e navegação principal.
- **Secundária / Positivo (`#059669`):** Verde Esmeralda. Dedicado a entradas de mercadoria, fluxo de caixa positivo, margens saudáveis e confirmações.
- **Terciária / Crítico (`#DC2626`):** Coral avermelhado. Sinaliza saídas, quebras, perdas, rupturas de estoque e ações destrutivas.
- **Alerta / Atenção (`#D97706`):** Âmbar técnico. Alerta de lote próximo ao vencimento e estoque abaixo do ponto de pedido.
- **Neutros e Superfícies:**
  - Fundo da Aplicação: `#F8FAFC` (Slate 50 frio e descansado).
  - Superfícies Elevadas/Cards: `#FFFFFF`.
  - Bordas Estruturais: `#E2E8F0` (Linhas nítidas de separação).
  - Texto Principal: `#0F172A` (Contraste AAA para longas jornadas de trabalho).
  - Texto Secundário: `#64748B`.

## Typography

O sistema adota uma divisão híbrida de alto rendimento: **Plus Jakarta Sans** para cabeçalhos e identidades numéricas de grande porte (KPIs), conferindo modernidade contemporânea, e **Inter** para densidade de dados, controles e labels.

- **Recursos Tabulares:** Toda renderização numérica de estoque, códigos de barras (EAN), valores em Real (R$) e quantidades em tabelas deve utilizar `font-variant-numeric: tabular-nums` para alinhamento vertical absoluto.
- **Labels e Metadados:** Rótulos utilizam peso Medium (500) ou Semibold (600) com tracking sutil para máxima legibilidade rápida sob iluminação de loja.

## Layout & Spacing

O layout opera em uma malha fluida otimizada para monitores desktop de 1080p e displays compactos de terminais PDV (a partir de 1280px de largura útil).

- **Grid Estrutural:** Sistema de 12 colunas com `gutter: 1.5rem` em desktop e `margin: 2rem` nas bordas exteriores.
- **Painel Lateral e Conteúdo:** Barra lateral fixa de 260px colapsável para 64px (ícones apenas), liberando espaço para tabelas e painéis de caixa.
- **Ritmo de Componentes:** Densidade equilibrada baseada no incremento de 4px/8px. Formulários e tabelas usam `space-sm` internamente para manter os dados no campo de visão imediato sem necessidade de rolagem excessiva.

## Elevation & Depth

A profundidade é expressa predominantemente através de superfícies contidas por bordas afiadas (`#E2E8F0`) e sombras difusas de baixa opacidade, evitando sobrecarga cognitiva em telas operacionais.

- **Nível 0 (Canvas):** Superfície base `#F8FAFC` sem sombra.
- **Nível 1 (Cards, Tabelas e Painéis):** Fundo `#FFFFFF`, borda perimetral sólida de 1px `#E2E8F0`, e sombra suave: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Nível 2 (Popovers, Dropdowns, Menus Rápidos):** Borda de 1px `#E2E8F0`, sombra: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Nível 3 (Modais e Drawers de Caixa):** Sobreposição com backdrop blur de 4px (`rgba(15, 23, 42, 0.4)`), borda de 1px `#CBD5E1`, e sombra focal: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)`.

## Shapes

O sistema opta pela sobriedade do padrão **Soft** (nível 1):
- Componentes interativos regulares (botões, campos de entrada, tags, linhas de alerta) utilizam raio de curvatura de `0.25rem` (4px) a `0.375rem` (6px).
- Containers maiores, como cartões de KPI, modais e envelopes de tabelas, usam `0.5rem` (8px).
- Badges de status e pílulas de contagem mantêm formato cilíndrico completo (`9999px`) apenas para diferenciação de metadados.

## Components

### 1. Cabeçalho & Ações Rápidas
- Barra superior contínua em `#FFFFFF`, altura fixa de 64px, borda inferior de 1px `#E2E8F0`.
- Seção direita com busca global acessível via atalho `⌘K / Ctrl+K`, indicador de sincronização do PDV (ponto verde pulsante), botão de "Nova Venda / F2" com destaque primário `#1D4ED8`, e avatar compacto com detalhes da filial.

### 2. Cards de Métricas (KPIs)
- Container branco com borda de 1px `#E2E8F0` e padding interno de `1.25rem`.
- Rótulo superior em `label-sm` (`#64748B`), valor principal em `headline-lg` (`#0F172A`) com números tabulares.
- Indicador de variação no rodapé com badge translúcido:
  - Positivo: fundo `#ECFDF5`, texto `#059669`.
  - Negativo: fundo `#FEF2F2`, texto `#DC2626`.
  - Atenção de estoque: fundo `#FFFBEB`, texto `#D97706`.

### 3. Tabelas de Dados Operacionais
- Cabeçalho com fundo `#F8FAFC`, texto em `label-sm` caixa-alta com `#64748B` e borda inferior contínua.
- Linhas com altura de 48px, hover em `#F1F5F9`, sem divisórias verticais internas.
- Colunas numéricas alinhadas invariavelmente à direita com a tipografia `data-mono`.
- Tags de status com preenchimento leve e borda de 1px correspondente: "Em Estoque", "Ponto de Pedido", "Crítico", "Esgotado".

### 4. Formulários & Validação
- Campos com altura de 40px, borda de 1px `#CBD5E1`, cantos arredondados de 6px e preenchimento `#FFFFFF`.
- Estado ativo/foco com anel externo: `box-shadow: 0 0 0 2px rgba(29, 78, 216, 0.2)` e borda `#1D4ED8`.
- Labels sempre posicionados acima do campo em `label-md` (`#334155`), com indicação visual para campos obrigatórios.
- Mensagens de erro em corpo `12px` na cor `#DC2626`, ancoradas abaixo do input com ícone indicativo.

### 5. Modais Centralizados
- Larguras padronizadas (520px para cadastros rápidos, 720px para conciliação ou detalhes de cupom fiscal).
- Cabeçalhos temáticos por contexto de ação:
  - Padrão/Cadastro: faixa neutra com ícone de ação primária.
  - Alerta/Exclusão: topo sinalizado com badge e ícone em `#DC2626`.
  - Entrada de Mercadoria: detalhamento com barra de cabeçalho em tom `#059669`.
- Rodapé fixo contendo alinhamento à direita: botão secundário ("Cancelar/Esc") e ação afirmativa primária ("Salvar/F10").