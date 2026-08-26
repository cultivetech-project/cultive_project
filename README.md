# Cultivo Cockpit

Cockpit Operacional Pré-Aprovação da Cultivo Tech.

## Status

🟡 Bootstrap concluído; a implementação da aplicação aguarda decisão de stack.

O Cockpit cobre o fluxo `Primeiro contato → negociação → documentação → submissão → aprovação/reprovação`. Após aprovação, o fluxo segue manualmente no Marcasite. Nesta fase não há integração, scraping, IA autônoma, envio real de WhatsApp/e-mail ou portal externo.

## O que existe neste repositório

- contrato de engenharia para Codex, Claude e pessoas;
- PRD consolidado a partir do material fornecido;
- referência UX dos mockups;
- contexto do sistema e opções de stack;
- ADR e protocolo de colaboração;
- backlog inicial de épicos e tarefas pequenas;
- templates de Issue e Pull Request.

## Próxima decisão necessária

Escolher a stack, banco, storage de documentos, hospedagem e momento da autenticação do MVP. A comparação está em [`docs/architecture/STACK_OPTIONS.md`](docs/architecture/STACK_OPTIONS.md) e permanece com `STATUS: AGUARDANDO DECISÃO DO ROGÉRIO`.

Depois da decisão, a ordem recomendada é: scaffold → infraestrutura local → schema/migrations → seed → primeiro vertical slice → testes → CI → deploy.

## Estrutura

```text
AGENTS.md                 contrato central de engenharia
CLAUDE.md                 orientação para revisão arquitetural
docs/PRD.md               escopo e regras funcionais
docs/UX_REFERENCE.md      leitura dos mockups
docs/architecture/        contexto e opções de stack
docs/adr/                 decisões arquiteturais
docs/ai/                  colaboração e handoff
tasks/backlog/            épicos e tarefas disponíveis
.github/                  templates de Issues e PRs
```

## Segurança

Segredos devem ficar fora do Git. Use `.env.example` somente como contrato de configuração e nunca copie credenciais reais para ele. Se um token foi compartilhado em chat, trate-o como comprometido, revogue-o no provedor e gere outro antes de usar o repositório.

## Contribuição

Leia [`AGENTS.md`](AGENTS.md), escolha uma tarefa com owner único, siga o protocolo em [`docs/ai/COLLABORATION.md`](docs/ai/COLLABORATION.md), use Conventional Commits e abra um PR com o template do repositório.

