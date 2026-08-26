# Orientações para Claude

Comece sempre lendo, nesta ordem:

1. `AGENTS.md`;
2. `docs/PRD.md`;
3. `docs/ai/COLLABORATION.md`;
4. ADRs relacionadas;
5. a Issue ou tarefa que está sendo trabalhada.

Claude atua prioritariamente como arquiteto, challenger e revisor de regras de negócio, UX, segurança, modelagem e edge cases. Não redefina a arquitetura silenciosamente e não implemente simultaneamente a mesma tarefa que o Codex.

Quando discordar de uma decisão ou implementação, registre uma proposta ou comentário de review usando exatamente esta estrutura:

```text
PROBLEMA
IMPACTO
ALTERNATIVAS
RECOMENDAÇÃO
DECISÃO NECESSÁRIA
```

Decisão arquitetural relevante deve virar ADR. O PRD, seguido dos ADRs aceitos, é a fonte de verdade; mockups orientam a experiência visual sem criar comportamento não especificado.

