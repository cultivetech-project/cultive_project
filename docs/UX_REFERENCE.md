# Referência UX — Cultivo Cockpit

Os mockups fornecidos são a referência visual e de experiência. Eles não criam comportamentos que não estejam visíveis ou descritos no PRD. A implementação deve manter o caráter desktop-first, denso e operacional.

## Direção visual comum

- fundo quase preto e cards em tons escuros;
- sidebar fixa com marca Cultivo Cockpit e navegação;
- bordas discretas e separadores finos;
- tipografia limpa e hierarquia por títulos, labels e métricas;
- azul para ação/seleção;
- verde para aprovado/sucesso;
- vermelho para reprovado/alerta;
- laranja para atenção e etapas intermediárias;
- estados vazios e contagens visíveis sem abrir a ficha.

## Dashboard — `1000176960.jpg`

**Objetivo:** dar visão geral, prioridade e travas do portfólio.

**Componentes visíveis:** quatro KPI cards; tabela Top 10 projetos; bloco Status Geral com barras; bloco Onde tem trava agora.

**Informações:** projetos ativos, verba captada, verba pendente, projetos parados; projeto, status, verba e dias parado; distribuição por status; alertas de projetos parados, comprovantes, reprovados sem aviso e indicador positivo de conversão.

**Ações/estados:** navegação para Dashboard, Projetos, Proponentes e Diário Oficial; destaque visual de alertas e estados positivos. O mockup não especifica filtros nem ações de correção.

**Regra relacionada:** KPIs e alertas são derivados da base; Top 10 prioriza urgência, dias sem interação e valor relevante, com desempate ainda aberto.

## Board de Projetos — `1000176962.jpg`

**Objetivo:** mostrar todos os projetos organizados por status/etapa.

**Componentes visíveis:** seis colunas, contagem por coluna e Project Cards.

**Informações nos cards:** nome do projeto, proponente, fonte, valor captado/total, quantidade de documentos, dias parado e motivo de reprovação quando aplicável.

**Ações/estados:** card abre a ficha completa; cores e badges representam estágio e situação. O mockup não comprova drag-and-drop.

**Regra relacionada:** etapas, status e motivo obedecem ao PRD; não inventar transições.

## Proponentes — `1000176974.jpg`

**Objetivo:** visão por pessoa/organização, com leitura rápida de desempenho histórico.

**Componentes visíveis:** tabela com proponente, taxa de aprovação, recorrência e fonte mais usada.

**Ações/estados:** seleção/abertura do proponente para ver projetos relacionados é indicada pelo texto da tela; status de taxa usa cores.

**Regra relacionada:** taxa é calculada a partir dos projetos e não armazenada manualmente.

## Diário Oficial — `1000176971.jpg`

**Objetivo:** registrar uma checagem diária manual e cruzá-la com a base.

**Componentes visíveis:** data da checagem, responsável e horário; área para colar texto; botão de cruzamento; histórico de checagens com destaque de match.

**Ações/estados:** colar conteúdo e registrar/cruzar; histórico sem publicação nova; histórico com match e projetos associados.

**Regra relacionada:** entrada, associação e histórico são manuais; sem scraping ou IA autônoma.

## Ficha do projeto — Dados & Linha do tempo — `1000176980.jpg`

**Objetivo:** concentrar a identidade do projeto e seu histórico operacional.

**Componentes visíveis:** voltar para Projetos; título e proponente; badge de etapa/status; trilha Cultivo Tech → Aprovado → futuro API/MCP → Marcasite; tabs; card de dados; card de linha do tempo.

**Informações:** nome, proponente, fonte, valor total, local, patrocinadora e eventos como criação, última interação e abertura da ficha.

**Ações/estados:** navegar entre abas; abrir dados do projeto. A trilha futura não autoriza integração nesta fase.

**Regra relacionada:** Projeto é a entidade central; após aprovação, transferência ao Marcasite é manual.

## Documentos — `1000176978.jpg`

**Objetivo:** organizar documentos legais e ativos de comunicação de forma equivalente às pastas operacionais.

**Componentes visíveis:** aviso de alinhamento com pastas do Marcasite; grupos Documentos Legais e Comunicação & Ativos; cards de pastas com contagem.

**Informações:** Contrato, Ofícios, Documentos diversos, Documentos para aprovação, Documentos aprovados, Contrapartida, Layouts aguardando aprovação, Layouts aprovados, Fotos e vídeos, Relatórios e Imprensa.

**Ações/estados:** abrir categorias e visualizar contagem; o mockup não define upload, exclusão, permissões ou preview.

**Regra relacionada:** não integrar com Marcasite nesta fase; financeiro fica em aba específica.

## Financeiro — `1000176966.jpg`

**Objetivo:** acompanhar o progresso de captação e documentos financeiros.

**Componentes visíveis:** barra de progresso; valores captados/previstos; cards Comprovante de pagamento, Comprovante de abatimento e Cadastro financeiro.

**Informações:** percentual, valor captado, valor previsto, contagem de arquivos e visibilidade para empresa patrocinadora.

**Ações/estados:** abrir categorias financeiras; o mockup não define upload ou permissões definitivas.

**Regra relacionada:** percentual deriva de captado/total, com divisão por zero e dados inválidos tratados.

## Comunicação — `1000176969.jpg`

**Objetivo:** registrar e preparar contato com o proponente.

**Componentes visíveis:** contato, botões Enviar por WhatsApp e Enviar por E-mail, modelos para aprovado/documento pendente/reprovado e histórico.

**Informações:** telefone/e-mail exibidos no mockup, mensagem modelo, canal, data/hora e conteúdo histórico.

**Ações/estados:** clicar no canal registra a comunicação; envio real não é requisito desta fase.

**Regra relacionada:** registrar projeto, canal, conteúdo, responsável e data/hora.

