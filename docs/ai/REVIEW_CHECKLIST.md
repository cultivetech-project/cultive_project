# Checklist de review

## Produto e regras

- [ ] Implementação está dentro do escopo do PRD.
- [ ] Nenhuma regra foi inventada a partir do mockup.
- [ ] Projeto continua sendo a entidade central.
- [ ] Status, etapa, reprovação, comunicação e cálculos financeiros respeitam o PRD.
- [ ] KPIs são derivados, não duplicados.

## Arquitetura e dados

- [ ] ADR foi criada para decisão relevante.
- [ ] Não há dependência indevida do Marcasite.
- [ ] Não há N+1 ou carregamento desnecessário de binários.
- [ ] Migrations e seeds são revisáveis e não contêm PII.

## Segurança

- [ ] Não há segredos, tokens ou `.env` no diff.
- [ ] Entradas são validadas no servidor quando aplicável.
- [ ] Uploads validam tamanho, tipo e nome.
- [ ] Documentos respeitam acesso autorizado.
- [ ] Logs não expõem dados sensíveis.

## UX e qualidade

- [ ] Tela preserva a linguagem visual dos mockups.
- [ ] Estados vazios, erro e carregamento são tratados.
- [ ] Acessibilidade básica foi verificada.
- [ ] Testes, lint, typecheck e build aplicáveis foram executados.
- [ ] PR descreve testes, riscos, decisões e screenshots quando necessário.

