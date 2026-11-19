# Como contribuir

## Padrão de commits

Referência: [iuricode/padroes-de-commits](https://github.com/iuricode/padroes-de-commits).

Use `tipo(escopo): descrição curta`. O escopo e o emoji inicial são opcionais; prefira a descrição em português, iniciada por um verbo. Explique o motivo e os testes no corpo do commit ou no PR.

| Tipo | Uso | Exemplo |
| --- | --- | --- |
| feat | Funcionalidade nova | `feat(estoque): vincular fornecedor à entrada` |
| fix | Correção de erro | `fix(estoque): impedir saldo negativo` |
| docs | Documentação e diagramas | `docs(uml): corrigir multiplicidades` |
| refactor | Organização sem mudar comportamento | `refactor(produtos): separar validações` |
| style | Formatação do código | `style(js): ajustar indentação` |
| test | Testes | `test(estoque): cobrir ajuste de saldo` |
| ci | Integração contínua | `ci(git): validar pull requests` |
| chore | Manutenção/configuração | `chore(git): organizar contribuição` |
| build | Dependências e build | `build: atualizar dependências` |
| perf | Desempenho | `perf(produtos): otimizar pesquisa` |
| revert | Reversão | `revert: desfazer alteração de estoque` |
| security | Segurança | `security(login): corrigir validação de acesso` |

Também são aceitos `raw`, `cleanup`, `remove` e `init`, presentes na referência. Exemplos com emoji: `:books: docs: atualizar documentação` e `🐛 fix(estoque): validar quantidade`. Mudanças incompatíveis podem usar `!`, com explicação do impacto no corpo.

Evite `Add files via upload`, `Update file`, `ajustes` e `final`. Ao enviar arquivos pelo site, substitua a mensagem automática no campo do commit. Os commits anteriores à adoção deste guia são preservados: não faça force push para renomear o histórico compartilhado.

## Branches e pull requests

1. Abra uma issue com objetivo e critérios de aceitação; adicione-a ao quadro.
2. Atualize sua cópia da `dev` e crie uma branch curta, como `fix/estoque-negativo`, `docs/diagrama-classes` ou `chore/padroes-git`.
3. Faça commits pequenos e abra um PR com **base `dev`**. Use o mesmo padrão semântico no título do PR e preencha o modelo.
4. Revise o diff, execute os testes pertinentes e registre as evidências. Peça revisão de um colega. Integre a tarefa usando squash com título semântico ou merge com título semântico.
5. Abra um PR com **base `main` e origem `dev`** para entregar o conjunto verificado. Use **Create a merge commit**, com título semântico, para preservar a ancestralidade entre as branches permanentes.
6. Após o merge, sincronize a `dev` com a `main` por fast-forward, se possível. Se for necessária uma sincronização por PR, use origem `main`, destino `dev` e título `chore(git): sincronizar main com dev`. Não use force push.
7. Feche as issues concluídas e marque **Done / Feito** no quadro. Uma issue pode ser referenciada por `Refs #numero` no PR para `dev`; use `Closes #numero` no PR para `main` quando todos os critérios forem atendidos.

Não exclua `dev` nem `main` após os merges. Branches de tarefa podem ser removidas depois da integração. Não integre uma branch antiga apenas por existir; primeiro compare seu conteúdo com o estado atual.

## Validação automática

O workflow `Padrões de contribuição` verifica título do PR, destino/origem das branches e mensagens dos novos commits comuns. Commits de merge com múltiplos pais são ignorados nessa validação; informe um título semântico ao fazer merge pelo GitHub. Commits antigos já presentes na base não são reavaliados.

A verificação é executada para PRs destinados a `dev` e `main`. Para torná-la obrigatória antes de integrar, configure uma regra de proteção para ambas as branches, exigindo PR e o check `Validar contribuição`. Não confunda a presença do workflow com proteção já ativada. A primeira instalação do workflow deve ser conferida manualmente e sua execução verificada no GitHub.

## Definição de pronto

- Critérios da issue atendidos e evidências registradas.
- Diff revisado e testes pertinentes aprovados.
- PRs de integração e entrega vinculados à issue.
- Mudança integrada na `main` e status conferido no quadro.

Documentos já existentes podem ser registrados como entregas documentais, sem declarar o sistema inteiro validado. Não crie PRs vazios para simular revisões históricas; as próximas alterações devem seguir o fluxo acima.
