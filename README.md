# Cultivo Cockpit

Cockpit Operacional Pré-Aprovação da Cultivo Tech.

## Status

🟡 Primeiro slice visual local implementado; persistência e stack de produção continuam pendentes.

O Cockpit cobre o fluxo `Primeiro contato → negociação → documentação → submissão → aprovação/reprovação`. Após aprovação, o fluxo segue manualmente no Marcasite. Nesta fase não há integração, scraping, IA autônoma, envio real de WhatsApp/e-mail ou portal externo.

## O que existe neste repositório

- preview local em Vite + React + TypeScript com Dashboard, Projetos, Proponentes, Diário Oficial e ficha do Projeto;
- contrato de engenharia para Codex, Claude e pessoas;
- PRD consolidado a partir do material fornecido;
- referência UX dos mockups;
- contexto do sistema e opções de stack;
- ADR e protocolo de colaboração;
- backlog inicial de épicos e tarefas pequenas;
- templates de Issue e Pull Request.

## Próxima decisão necessária

Escolher a arquitetura de produção, banco, storage de documentos, hospedagem e momento da autenticação do MVP. A comparação está em [`docs/architecture/STACK_OPTIONS.md`](docs/architecture/STACK_OPTIONS.md); o preview local está registrado em [`docs/adr/ADR-001-stack-mvp.md`](docs/adr/ADR-001-stack-mvp.md).

Depois da decisão, a ordem recomendada é: scaffold → infraestrutura local → schema/migrations → seed → primeiro vertical slice → testes → CI → deploy.

## Executar localmente

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite. Para validar a compilação de produção, execute `npm run build`.

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
