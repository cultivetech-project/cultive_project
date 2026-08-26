# Contrato de engenharia — Cultivo Cockpit

Este arquivo é o contrato operacional para qualquer agente ou pessoa que altere este repositório.

## Ordem de leitura

Antes de alterar comportamento de negócio, leia `docs/PRD.md`, `docs/architecture/`, os ADRs aplicáveis e a tarefa em `tasks/`. Use `docs/ai/COLLABORATION.md` para coordenar trabalho entre agentes.

O PRD e ADRs aceitos prevalecem sobre interpretações de mockups. Não invente requisitos nem reabra decisões aceitas sem uma nova proposta documentada.

## Regras de trabalho

1. Trabalhe uma tarefa delimitada por vez e declare owner/reviewer.
2. Preserve a entidade central `Projeto`; documentos, financeiro e comunicação são subdomínios/abas do projeto.
3. Atualize a documentação quando o comportamento mudar.
4. Escreva testes para regras críticas e casos-limite relevantes.
5. Não antecipe features fora do escopo, integrações reais ou decisões de stack pendentes.
6. Nunca faça integração, escrita ou sincronização automática com o Marcasite nesta fase.
7. Comunicação e Diário Oficial permanecem manuais; registrar ações é suficiente para o MVP.
8. Nunca comite segredos, credenciais reais, PII ou arquivos `.env`.
9. Valide toda entrada no servidor quando houver backend, especialmente uploads e acesso a documentos.
10. Preserve alterações não relacionadas feitas por outras pessoas.

## Branches e commits

- `main` é a branch estável.
- Use `feat/<issue>-descricao`, `fix/<issue>-descricao` ou `chore/<issue>-descricao`.
- Um único owner implementa cada tarefa; o reviewer trabalha em branch/PR separado.
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:` ou `ci:`.
- Prefira commits pequenos e semanticamente coerentes.

## Definition of Done

Uma tarefa só vai para `tasks/done/` quando os critérios de aceite estiverem atendidos, os testes aplicáveis passarem, lint/typecheck/build forem executados quando existirem, a documentação estiver atualizada e não houver credenciais incluídas. Use `docs/ai/DEFINITION_OF_DONE.md` como checklist completo.

## ADRs

Crie ou atualize um ADR antes de aceitar decisões sobre stack, banco, autenticação, storage, deploy, arquitetura, auditoria ou modelagem persistente relevante. ADRs podem ser propostos por Codex ou Claude; decisões aceitas dependem de aprovação explícita ou de decisão já registrada no projeto.

## Migrations e dados

Migrations devem ser versionadas, revisáveis e acompanhadas de testes/rollback conforme a stack escolhida. Seeds são somente de desenvolvimento e não podem conter PII real. Não adicione campos persistentes de negócio sem justificativa no PRD ou ADR.

## Revisão

Todo PR deve explicar objetivo, issue, mudanças, não mudanças, testes, riscos e decisões relacionadas. Revisores devem procurar divergência do PRD, regras inventadas, falhas de segurança, edge cases, problemas de acessibilidade/performance e ausência de testes.

