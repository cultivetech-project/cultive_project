# ADRs

Architecture Decision Records registram decisões relevantes e duráveis.

## Quando criar

Crie um ADR para stack, banco, autenticação, storage, deploy, fronteiras frontend/backend, linha do tempo, auditoria, permissões, migrations ou qualquer alteração persistente que não esteja explícita no PRD.

## Status válidos

- `proposed`: proposta aguardando decisão;
- `accepted`: decisão aprovada e aplicável;
- `superseded`: substituída por outra ADR.

## Formato

```text
ADR-XXX — título

Status: proposed | accepted | superseded

Contexto

Decisão

Alternativas consideradas

Consequências

Impacto

Data

Decisor
```

ADRs propostas não autorizam implementação definitiva. O arquivo [`../architecture/STACK_OPTIONS.md`](../architecture/STACK_OPTIONS.md) é uma proposta de opções, não uma ADR aceita.

