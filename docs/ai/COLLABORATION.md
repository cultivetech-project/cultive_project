# Colaboração Codex + Claude

Codex e Claude coordenam por Git, GitHub, arquivos de governança, Issues e Pull Requests. Não presumir conversa direta entre agentes.

## Fluxo padrão

```text
PRD
 ↓
Issue / Task
 ↓
Arquitetura quando necessária
 ↓
Implementação
 ↓
Testes
 ↓
Review do outro agente
 ↓
Correções
 ↓
PR
 ↓
Merge
```

Evite que dois agentes implementem a mesma tarefa simultaneamente. Uma tarefa tem um único owner de implementação e um reviewer explícito.

## Papéis preferenciais

- Codex: implementação, refatoração, testes, CI, investigação e conclusão de tarefas bem especificadas.
- Claude: arquitetura, challenge, revisão de PR, regras de negócio, UX, segurança, modelagem e edge cases.
- Human/Rogério: decisões de produto, stack, banco, cloud, storage, autenticação, custo, escopo e incompatibilidades.

Fluxo recomendado: Codex implementa → Claude revisa → Codex corrige. Para arquitetura: Claude propõe → Codex verifica viabilidade → Rogério decide quando necessário → ADR aceita → Codex implementa.

## Contrato de tarefa

Toda task/Issue deve declarar:

```yaml
id:
titulo:
status:
owner: codex | claude | human
reviewer: codex | claude | human
dependencias:
arquivos_afetados:
criterios_aceite:
testes_necessarios:
decisoes_relacionadas:
```

## Handoff

Ao interromper uma tarefa, atualize [`HANDOFF.md`](HANDOFF.md) com branch, commit, arquivos, testes, pendências, decisões e próxima ação. Não deixe trabalho incompleto parecer concluído.

