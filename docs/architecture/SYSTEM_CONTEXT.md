# Contexto do sistema

## Fronteira

O Cultivo Cockpit é um backoffice operacional para o período pré-aprovação. O Marcasite permanece como sistema posterior à aprovação, sem integração nesta fase.

```text
Proponente / equipe Cultivo
            │ entrada e operação manual
            ▼
┌──────────────────────────────────────────────┐
│ Cultivo Cockpit                              │
│                                              │
│ Projeto ── Proponente                         │
│    ├── Documentos                             │
│    ├── Financeiro                             │
│    ├── Comunicação                            │
│    └── Linha do tempo                         │
│                                              │
│ Dashboard: projeções agregadas da base       │
│ Diário Oficial: texto, checagem e associação │
└──────────────────────────────────────────────┘
            │ após aprovação: transferência manual
            ▼
       Marcasite existente
```

## Fluxos principais

1. Equipe cria/acompanha um `Projeto` associado a um `Proponente`.
2. O projeto avança entre status/etapas conforme o processo aprovado.
3. Documentos, financeiro e comunicações são registrados dentro da ficha do projeto.
4. Dashboard calcula KPIs e travas diretamente da base.
5. Equipe cola manualmente conteúdo do Diário Oficial, registra a checagem e associa projetos quando aplicável.
6. Projeto aprovado segue manualmente para o Marcasite.

## Princípios de fronteira

- não replicar o Marcasite nem transformá-lo em dependência de runtime;
- não tratar mockup como contrato de API;
- não carregar binários ao consultar metadata de projeto;
- não persistir KPIs derivados;
- não escolher tecnologia antes do gate de stack;
- documentar uma decisão nova em ADR antes de implementá-la.

