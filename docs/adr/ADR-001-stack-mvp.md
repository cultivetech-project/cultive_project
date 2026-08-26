# ADR-001 — Stack do primeiro slice visual

Status: accepted

## Contexto

O repositório precisava de uma primeira tela executável para validar a experiência dos mockups, mas ainda não há necessidade de persistência, autenticação ou upload real para esse slice. A prioridade é obter feedback visual rápido com uma base fácil de evoluir.

## Decisão

Usar Vite + React + TypeScript para o primeiro slice local, com dados fictícios mantidos em módulos TypeScript e cálculos derivados no cliente. A aplicação é um protótipo visual executável; não representa a decisão definitiva de backend, banco, storage ou hospedagem de produção.

## Alternativas consideradas

- Next.js full-stack + PostgreSQL + storage de objetos;
- Django monolítico + PostgreSQL + storage de objetos;
- React/Vite + API Node separada + PostgreSQL + storage de objetos.

## Consequências

- entrega visual rápida e uma única linguagem no frontend;
- navegação, board, dashboard, ficha e registros manuais podem ser validados localmente;
- não existe persistência entre reinícios, autenticação, upload real ou integração externa;
- após validação UX, backend, banco, storage, autenticação e deploy devem ser decididos em ADRs próprias.

## Impacto

O protótipo pode ser executado com `npm install` e `npm run dev`. As regras derivadas já estão representadas em funções testáveis, mas a camada de dados real ainda não foi construída.

## Data

2026-08-25

## Decisor

Rogério — decisão operacional solicitada: seguir o melhor critério para obter um preview local.
