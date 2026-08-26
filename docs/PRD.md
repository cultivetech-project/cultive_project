# PRD — Cultivo Cockpit Operacional Pré-Aprovação

> Status: referência funcional inicial. A stack ainda não foi aceita. Este documento registra o escopo e as regras presentes no material fornecido para esta execução; decisões abertas permanecem explícitas e não devem ser preenchidas por suposição técnica.

## 1. Objetivo

Dar à Cultivo Tech uma visão operacional centralizada dos projetos antes da aprovação, permitindo acompanhar projetos, proponentes, documentos, captação financeira, comunicações e checagens manuais do Diário Oficial.

## 2. Escopo

O Cockpit cobre somente:

`Primeiro contato → negociação/fonte → documentação → submetido para aprovação → aprovado/reprovado`.

Após aprovação, a continuidade ocorre manualmente no Marcasite.

### Dentro do MVP

- board de projetos;
- ficha do projeto com dados e linha do tempo;
- visão de proponentes;
- documentos organizados em categorias;
- acompanhamento financeiro;
- registro de comunicações por WhatsApp e e-mail, sem envio real;
- registro manual do Diário Oficial, associação manual e histórico;
- dashboard com indicadores derivados da base;
- dados fictícios de desenvolvimento para os estados dos mockups.

### Fora do escopo nesta fase

- substituir ou escrever no Marcasite;
- API, MCP ou sincronização automática com o Marcasite;
- scraping do Diário Oficial;
- IA autônoma lendo ou classificando o Diário Oficial;
- envio real de WhatsApp ou e-mail;
- portal do proponente ou patrocinador;
- geração automática de contratos;
- modelo definitivo de autorização/multiusuário sem decisão;
- infraestrutura complexa ou microservices sem necessidade.

## 3. Entidade central e modelo conceitual

`Projeto` é a entidade central. Documentos, financeiro e comunicação são subdomínios/abas do projeto, não sistemas independentes.

Entidades previstas:

- `Proponente`;
- `Projeto`;
- `Documento`;
- `Comunicacao`;
- `ChecagemDiarioOficial`;
- `Empresa`.

Campos técnicos como chaves, timestamps, versionamento e metadados de storage podem existir quando indispensáveis, mas devem ser documentados. Não adicione campos persistentes de negócio sem justificativa.

## 4. Regras funcionais críticas

1. Um projeto `reprovado` exige `motivo_reprovacao`.
2. `etapa` só se aplica quando `status = em_andamento`.
3. Projeto com `data_ultima_interacao < hoje - 7 dias` é considerado parado/travado.
4. Taxa de aprovação é calculada da base; para 2 aprovados e 1 reprovado, o resultado é 67%. Não armazenar o percentual manualmente.
5. Comunicação registrada contém projeto, canal, conteúdo, responsável e data/hora.
6. Percentual financeiro é `valor_captado / valor_total`, tratando divisão por zero e dados inválidos.
7. KPIs do dashboard são derivados da base e não persistidos separadamente.
8. Dashboard deve sinalizar pelo menos projetos parados há mais de 7 dias, comprovantes pendentes conforme regra disponível e reprovados sem comunicação registrada.
9. A entrada do Diário Oficial é manual; checagem, associações e histórico devem ser registrados.
10. Não assumir drag-and-drop do board sem requisito explícito; o mockup demonstra a organização visual.

## 5. Telas e informações

O produto deve refletir os mockups fornecidos: dark mode, sidebar fixa, cards escuros, bordas discretas, azul para ação, verde para sucesso, vermelho para reprovação/alerta, laranja para atenção, alta densidade de informação e abordagem desktop-first. Os detalhes estão em [`UX_REFERENCE.md`](UX_REFERENCE.md).

### Board de projetos

Colunas: Primeiro Contato; Negociação/Fonte; Documentação; Submetido p/ Aprovação; Aprovado; Reprovado.

Cada card mostra projeto, proponente, fonte, valor captado, valor total, documentos, dias parado e motivo quando reprovado.

### Dashboard

KPIs: projetos ativos, verba captada, verba pendente e projetos parados há mais de 7 dias. Também exibe Top 10 por urgência/dias sem interação/valor relevante, distribuição de status e travas operacionais.

### Ficha do projeto

Abas: Dados & Linha do tempo; Documentos; Financeiro; Comunicação. A linha do tempo deve ter origem modelada com cuidado. Eventos esperados: projeto criado, etapa/status alterado, interação registrada, documento adicionado, comunicação registrada, reprovação e aprovação. Se for necessária uma nova entidade persistente, criar ADR antes.

### Documentos

Categorias legais: Contrato, Ofícios, Documentos diversos, Documentos para aprovação, Documentos aprovados.

Categorias de comunicação e ativos: Contrapartida, Layouts aguardando aprovação, Layouts aprovados, Fotos e vídeos, Relatórios, Imprensa. Financeiro permanece na própria aba.

## 6. Segurança e qualidade

- segredos fora do Git e `.env.example` sem credenciais;
- validação server-side;
- upload com limite de tamanho, MIME/type validado e nome tratado;
- proteção contra acesso indevido a documentos;
- nenhum dado sensível em logs;
- evitar carregar binários junto de metadata, N+1 queries e agregados desnecessários;
- planejar paginação, lazy loading, filtros server-side, upload direto/streaming e índices quando a stack permitir;
- preparar logs estruturados, erros, healthcheck, request/correlation ID e auditoria sem adicionar plataforma paga sem aprovação.

## 7. Dados de desenvolvimento

O seed deve cobrir todos os status/etapas dos mockups, projetos parados, fontes diferentes, percentuais de captação, proponentes recorrentes e não recorrentes, diário com e sem match, documentos e comunicações. Usar somente dados fictícios, sem PII real.

## 8. Critérios de aceite do primeiro vertical slice

Após a stack ser aprovada, a primeira entrega executável deve permitir:

`abrir aplicação → visualizar Projetos → abrir um projeto → visualizar dados, status, etapa e proponente`.

Cada slice deve ser executável e testável antes da próxima expansão.

## 9. Perguntas abertas

- Qual alternativa de stack será aceita?
- Qual banco relacional será usado?
- Qual storage para documentos?
- Qual hospedagem e estratégia de CI/CD?
- Autenticação/multiusuário entra no MVP? Qual modelo de autorização?
- Qual regra exata de desempate do Top 10?
- Quais comprovantes são obrigatórios em cada situação?
- A linha do tempo será uma entidade persistente própria ou uma projeção de eventos existentes?

