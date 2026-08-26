# Opções de stack

**STATUS: Opção A aceita somente para o primeiro slice visual local; backend e produção continuam pendentes.**

Esta comparação continua sendo a referência para a solução completa. A decisão registrada em [`../adr/ADR-001-stack-mvp.md`](../adr/ADR-001-stack-mvp.md) cobre somente o primeiro slice visual, sem persistência ou integrações.

## Critérios

Simplicidade, velocidade, manutenção, custo, hospedagem, banco, upload de documentos, evolução, autenticação, observabilidade e CI/CD.

## Alternativas

| Opção | Composição | Pontos fortes | Trade-offs |
|---|---|---|---|
| A — full-stack TypeScript | Next.js + TypeScript; PostgreSQL; storage S3-compatible; auth gerenciada ou Auth.js; deploy em plataforma Node/containers | Uma linguagem, boa velocidade para UI + rotas, componentes reutilizáveis, fácil CI/CD e evolução para integrações | Exige disciplina para não misturar domínio e UI; custo/limites da hospedagem precisam ser validados; auth e storage ainda são decisões |
| B — Django monolítico | Django + templates/HTMX ou frontend progressivo; PostgreSQL; storage S3-compatible; auth nativa; deploy em container | Admin, auth e ORM maduros; bom encaixe para backoffice, CRUD, regras e auditoria; operação simples | Menor reaproveitamento de ecossistema TypeScript se a equipe preferir JS; experiência visual mais customizada exige trabalho deliberado |
| C — frontend/backend separados | React/Vite + TypeScript; API Node/Nest/Fastify; PostgreSQL; storage S3-compatible; provedor de auth; deploy separado | Fronteiras explícitas, evolução para integrações e clientes múltiplos; contratos de API claros | Maior custo inicial, dois deploys e observabilidade distribuída; mais código operacional para o MVP |

## Comparação por preocupação

- **Simplicidade e velocidade:** A e B são adequadas; C é a mais pesada antes de existir um segundo consumidor da API.
- **Manutenção:** B reduz decisões de composição; A mantém uma linguagem; C aumenta superfície operacional.
- **Custo e hospedagem:** todas podem começar com serviços gerenciados de baixo custo e PostgreSQL; valores e limites dependem do provedor escolhido.
- **Banco:** PostgreSQL é adequado às relações entre projetos, proponentes, documentos, comunicações, empresas e checagens.
- **Documentos:** nenhuma alternativa deve guardar binários no banco por padrão; usar storage de objetos com metadata e autorização no app.
- **Autenticação:** B oferece base nativa; A/C dependem da escolha entre biblioteca própria e provedor gerenciado. O modelo de autorização continua aberto.
- **Observabilidade:** todas permitem logs estruturados, healthcheck, request ID e erros; evitar plataforma paga sem aprovação.
- **CI/CD:** todas suportam install, lint, typecheck quando aplicável, test e build em GitHub Actions após a decisão.
- **Evolução:** A é equilibrada para integrar depois; B é forte para domínio/backoffice; C só justifica a complexidade quando houver clientes independentes ou integrações robustas.

## Recomendação técnica para produção

**Recomendo avaliar primeiro a Opção A — full-stack TypeScript + PostgreSQL + storage S3-compatible**, por equilibrar velocidade de entrega, consistência visual com os mockups e futura integração. Essa decisão de produção continua pendente e exige ADR própria aceita.

## Decisões que precisam ser tomadas

1. Opção A, B ou C.
2. Provedor/forma de PostgreSQL.
3. Storage de documentos e política de retenção.
4. Hospedagem e ambientes.
5. Autenticação no MVP e modelo de autorização.
6. Estratégia de observabilidade e custo aceitável.
