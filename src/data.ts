export type ProjectStatus =
  | 'primeiro_contato'
  | 'negociacao'
  | 'documentacao'
  | 'submetido'
  | 'aprovado'
  | 'reprovado'

export type ProjectTab = 'overview' | 'documents' | 'finance' | 'communication'

export type Project = {
  id: string
  name: string
  proponent: string
  status: ProjectStatus
  source: string
  total: number
  captured: number
  docsComplete: number
  docsTotal: number
  lastInteraction: string
  location: string
  sponsor: string
  contact: string
  stage?: string
  rejectionReason?: string
  receiptPending?: boolean
  documents: string[]
  communications: Communication[]
  timeline: TimelineItem[]
}

export type Communication = {
  channel: 'WhatsApp' | 'E-mail'
  date: string
  text: string
  responsible?: string
}

export type TimelineItem = {
  label: string
  detail: string
  tone?: 'blue' | 'green' | 'orange'
}

export type DiaryCheck = {
  date: string
  time: string
  detail: string
  match?: string
}

export const statusMeta: Record<ProjectStatus, { label: string; short: string; tone: string }> = {
  primeiro_contato: { label: 'Primeiro Contato', short: 'Primeiro contato', tone: 'blue' },
  negociacao: { label: 'Negociação / Fonte', short: 'Negociação', tone: 'orange' },
  documentacao: { label: 'Documentação', short: 'Documentação', tone: 'orange' },
  submetido: { label: 'Submetido p/ Aprov.', short: 'Submetido', tone: 'blue-soft' },
  aprovado: { label: 'Aprovado', short: 'Aprovado', tone: 'green' },
  reprovado: { label: 'Reprovado', short: 'Reprovado', tone: 'red' },
}

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Musicalidade na Gota — Ed. 2026',
    proponent: 'Tassia Tostes',
    status: 'primeiro_contato',
    source: 'A definir',
    total: 99224,
    captured: 0,
    docsComplete: 0,
    docsTotal: 4,
    lastInteraction: '2026-08-23',
    location: 'Santos, SP',
    sponsor: 'Ainda não vinculada',
    contact: '(13) 99999-0000 • proponente@email.com',
    stage: 'Primeiro contato',
    receiptPending: true,
    documents: [],
    communications: [],
    timeline: [
      { label: 'hoje', detail: 'Ficha aberta no cockpit', tone: 'blue' },
      { label: '2d atrás', detail: 'Última interação registrada com o proponente' },
      { label: 'início', detail: 'Projeto criado no pipeline' },
    ],
  },
  {
    id: 'p2',
    name: 'Skate Amador — Continuidade',
    proponent: 'Ludmilla Rossi',
    status: 'primeiro_contato',
    source: 'A definir',
    total: 58106,
    captured: 0,
    docsComplete: 0,
    docsTotal: 4,
    lastInteraction: '2026-08-16',
    location: 'Santos, SP',
    sponsor: 'Ainda não vinculada',
    contact: '(13) 98888-1111 • ludmilla@email.com',
    stage: 'Primeiro contato',
    receiptPending: true,
    documents: [],
    communications: [],
    timeline: [{ label: '9d atrás', detail: 'Projeto parado aguardando primeiro contato' }],
  },
  {
    id: 'p3',
    name: 'Longboard Feminino Sul-Americano',
    proponent: 'Isabela Panza',
    status: 'negociacao',
    source: 'PROMIFAE Santos',
    total: 55835,
    captured: 12000,
    docsComplete: 1,
    docsTotal: 4,
    lastInteraction: '2026-08-22',
    location: 'Santos, SP',
    sponsor: 'Em negociação',
    contact: '(13) 97777-2222 • isabela@email.com',
    stage: 'Negociação / Fonte',
    documents: ['Carta de intenção'],
    communications: [{ channel: 'E-mail', date: '22/08, 10:10', text: 'Envio da proposta comercial para avaliação.' }],
    timeline: [{ label: '3d atrás', detail: 'Fonte de financiamento em negociação', tone: 'orange' }],
  },
  {
    id: 'p4',
    name: 'Integrar Arte e Vida — Núcleo 03',
    proponent: 'Thiago Daniel',
    status: 'documentacao',
    source: 'Lei Federal Esporte',
    total: 240000,
    captured: 0,
    docsComplete: 2,
    docsTotal: 4,
    lastInteraction: '2026-08-20',
    location: 'Santos, SP',
    sponsor: 'Em prospecção',
    contact: '(13) 96666-3333 • thiago@email.com',
    stage: 'Documentação',
    receiptPending: true,
    documents: ['Plano de trabalho', 'Orçamento preliminar'],
    communications: [],
    timeline: [{ label: '5d atrás', detail: 'Documentação iniciada' }],
  },
  {
    id: 'p5',
    name: '130 Anos em Fatos e Fotos',
    proponent: 'Cultivo Tech',
    status: 'documentacao',
    source: 'PROMICULT Santos',
    total: 100000,
    captured: 0,
    docsComplete: 3,
    docsTotal: 4,
    lastInteraction: '2026-08-13',
    location: 'Santos, SP',
    sponsor: 'Em prospecção',
    contact: '(13) 95555-4444 • projetos@cultivo.tec.br',
    stage: 'Documentação',
    documents: ['Plano de trabalho', 'Orçamento', 'Apresentação do projeto'],
    communications: [{ channel: 'WhatsApp', date: '13/08, 09:30', text: 'Solicitação do documento complementar.' }],
    timeline: [{ label: '12d atrás', detail: 'Aguardando documento complementar', tone: 'orange' }],
  },
  {
    id: 'p6',
    name: 'Futuro do Skate',
    proponent: 'Cultivo Tech',
    status: 'submetido',
    source: 'PROMIFAE Santos',
    total: 58106,
    captured: 39500,
    docsComplete: 4,
    docsTotal: 4,
    lastInteraction: '2026-08-24',
    location: 'Santos, SP',
    sponsor: 'Cultivo Tech',
    contact: '(13) 95555-4444 • projetos@cultivo.tec.br',
    stage: 'Submetido p/ Aprovação',
    documents: ['Contrato', 'Ofícios', 'Orçamento', 'Apresentação do projeto'],
    communications: [{ channel: 'E-mail', date: '24/08, 16:05', text: 'Confirmação de submissão do projeto.' }],
    timeline: [{ label: '1d atrás', detail: 'Projeto submetido para aprovação', tone: 'blue' }],
  },
  {
    id: 'p7',
    name: 'Musicalidade na Gota — Ed. 2023',
    proponent: 'Tassia Tostes',
    status: 'aprovado',
    source: 'PROMICULT',
    total: 99224,
    captured: 99224,
    docsComplete: 4,
    docsTotal: 4,
    lastInteraction: '2026-08-24',
    location: 'Santos, SP',
    sponsor: 'PROMICULT',
    contact: '(13) 99999-0000 • proponente@email.com',
    stage: 'Aprovado',
    documents: ['Contrato', 'Ofícios', 'Documentos aprovados', 'Relatório final'],
    communications: [{ channel: 'WhatsApp', date: '24/08, 12:20', text: 'Projeto aprovado. Próximos passos enviados.' }],
    timeline: [{ label: '1d atrás', detail: 'Aprovação registrada', tone: 'green' }],
  },
  {
    id: 'p8',
    name: 'A Dança Contemporânea',
    proponent: 'Cultivo Tech',
    status: 'aprovado',
    source: 'PROMICULT',
    total: 99998,
    captured: 99998,
    docsComplete: 4,
    docsTotal: 4,
    lastInteraction: '2026-08-24',
    location: 'Santos, SP',
    sponsor: 'PROMICULT',
    contact: '(13) 95555-4444 • projetos@cultivo.tec.br',
    stage: 'Aprovado',
    documents: ['Contrato', 'Ofícios', 'Documentos aprovados', 'Relatório final'],
    communications: [{ channel: 'E-mail', date: '24/08, 11:45', text: 'Confirmação de aprovação e encaminhamento.' }],
    timeline: [{ label: '1d atrás', detail: 'Aprovação registrada', tone: 'green' }],
  },
  {
    id: 'p9',
    name: 'Corrida 60+',
    proponent: 'Pedro Nogueira Minga da Rocha',
    status: 'reprovado',
    source: 'PROMIFAE Santos',
    total: 45000,
    captured: 0,
    docsComplete: 3,
    docsTotal: 4,
    lastInteraction: '2026-08-24',
    location: 'Santos, SP',
    sponsor: 'PROMIFAE Santos',
    contact: '(13) 94444-5555 • pedro@email.com',
    rejectionReason: 'Verba do edital PROMIFAE 2026 esgotada antes da análise deste projeto.',
    documents: ['Plano de trabalho', 'Orçamento', 'Apresentação do projeto'],
    communications: [],
    timeline: [{ label: '1d atrás', detail: 'Projeto reprovado — motivo registrado', tone: 'orange' }],
  },
  {
    id: 'p10',
    name: 'Corrida da Briosa',
    proponent: 'UACEP',
    status: 'reprovado',
    source: 'PROMIFAE Santos',
    total: 38000,
    captured: 0,
    docsComplete: 2,
    docsTotal: 4,
    lastInteraction: '2026-08-20',
    location: 'Santos, SP',
    sponsor: 'PROMIFAE Santos',
    contact: '(13) 93333-6666 • contato@uacep.org.br',
    rejectionReason: 'Documentação incompleta — orçamento não compatível com o edital.',
    documents: ['Plano de trabalho', 'Orçamento'],
    communications: [],
    timeline: [{ label: '5d atrás', detail: 'Projeto reprovado por documentação incompleta', tone: 'orange' }],
  },
]

export const diaryChecks: DiaryCheck[] = [
  { date: '24/08/2026', time: '06:00', detail: 'Nenhuma publicação nova cruzada com a base.' },
  { date: '23/08/2026', time: '06:00', detail: 'Publicação encontrada: resultado PROMIFAE 2026', match: '2 projetos da base — Corrida 60+ e Corrida da Briosa' },
  { date: '22/08/2026', time: '06:00', detail: 'Nenhuma publicação nova cruzada com a base.' },
]

export const documentFolders = [
  { title: 'Contrato', group: 'Documentos legais', count: 0 },
  { title: 'Ofícios', group: 'Documentos legais', count: 0 },
  { title: 'Documentos diversos', group: 'Documentos legais', count: 0 },
  { title: 'Documentos para aprovação', group: 'Documentos legais', count: 0 },
  { title: 'Documentos aprovados', group: 'Documentos legais', count: 0 },
  { title: 'Contrapartida', group: 'Comunicação & ativos', count: 1 },
  { title: 'Layouts aguardando aprovação', group: 'Comunicação & ativos', count: 0 },
  { title: 'Layouts aprovados', group: 'Comunicação & ativos', count: 8 },
  { title: 'Fotos e vídeos', group: 'Comunicação & ativos', count: 340 },
  { title: 'Relatórios', group: 'Comunicação & ativos', count: 14 },
  { title: 'Imprensa', group: 'Comunicação & ativos', count: 0 },
]

export const statusColumns: ProjectStatus[] = [
  'primeiro_contato',
  'negociacao',
  'documentacao',
  'submetido',
  'aprovado',
  'reprovado',
]

export function daysIdle(date: string, reference = new Date('2026-08-25T12:00:00')) {
  const delta = reference.getTime() - new Date(`${date}T12:00:00`).getTime()
  return Math.max(0, Math.floor(delta / 86400000))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

export function compactCurrency(value: number) {
  if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1).replace('.', ',')}M`
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(1).replace('.', ',')}k`
  return formatCurrency(value)
}

export function approvalRate(proponent: string) {
  const decided = projects.filter((project) => project.proponent === proponent && ['aprovado', 'reprovado'].includes(project.status))
  if (!decided.length) return null
  return Math.round((decided.filter((project) => project.status === 'aprovado').length / decided.length) * 100)
}
