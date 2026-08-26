import { useMemo, useState } from 'react'
import {
  approvalRate,
  compactCurrency,
  daysIdle,
  diaryChecks as initialDiaryChecks,
  documentFolders,
  formatCurrency,
  projects,
  statusColumns,
  statusMeta,
  type Communication,
  type DiaryCheck,
  type Project,
  type ProjectStatus,
  type ProjectTab,
} from './data'

type View = 'dashboard' | 'projects' | 'proponents' | 'diary' | 'project'

const navItems: { key: Exclude<View, 'project'>; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: '▥' },
  { key: 'projects', label: 'Projetos', icon: '▰' },
  { key: 'proponents', label: 'Proponentes', icon: '♣' },
  { key: 'diary', label: 'Diário Oficial', icon: '▤' },
]

function App() {
  const [view, setView] = useState<View>('dashboard')
  const [selectedProjectId, setSelectedProjectId] = useState('p1')
  const [projectTab, setProjectTab] = useState<ProjectTab>('overview')
  const [diaryText, setDiaryText] = useState('')
  const [checks, setChecks] = useState<DiaryCheck[]>(initialDiaryChecks)
  const [communicationOverrides, setCommunicationOverrides] = useState<Record<string, Communication[]>>({})
  const [notice, setNotice] = useState<string | null>(null)

  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0]

  const openProject = (project: Project, tab: ProjectTab = 'overview') => {
    setSelectedProjectId(project.id)
    setProjectTab(tab)
    setView('project')
    setNotice(null)
  }

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(null), 3500)
  }

  const registerDiaryCheck = () => {
    if (!diaryText.trim()) {
      showNotice('Cole o trecho do Diário Oficial antes de cruzar com a base.')
      return
    }
    setChecks((current) => [
      { date: '25/08/2026', time: 'agora', detail: 'Checagem registrada. Nenhum match automático neste protótipo.', match: 'A associação de projetos permanece manual.' },
      ...current,
    ])
    setDiaryText('')
    showNotice('Checagem registrada no histórico local.')
  }

  const registerCommunication = (project: Project, communication: Communication) => {
    setCommunicationOverrides((current) => ({
      ...current,
      [project.id]: [...(current[project.id] ?? []), communication],
    }))
    showNotice(`${communication.channel} registrado para ${project.name}.`)
  }

  return (
    <div className="app-shell">
      <Sidebar view={view} onNavigate={(nextView) => setView(nextView)} />
      <main className="main-content">
        {notice && <div className="toast">✓ {notice}</div>}
        {view === 'dashboard' && <DashboardView onOpenProject={openProject} />}
        {view === 'projects' && <ProjectsView onOpenProject={openProject} />}
        {view === 'proponents' && <ProponentsView onOpenProject={openProject} />}
        {view === 'diary' && <DiaryView text={diaryText} checks={checks} onChange={setDiaryText} onRegister={registerDiaryCheck} />}
        {view === 'project' && (
          <ProjectView
            project={selectedProject}
            tab={projectTab}
            onBack={() => setView('projects')}
            onTabChange={setProjectTab}
            onRegisterCommunication={registerCommunication}
            additionalCommunications={communicationOverrides[selectedProject.id] ?? []}
          />
        )}
      </main>
    </div>
  )
}

function Sidebar({ view, onNavigate }: { view: View; onNavigate: (view: Exclude<View, 'project'>) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-title">CULTIVO <span>• Cockpit</span></div>
        <div className="brand-subtitle">O projeto é o centro — tudo mora<br />dentro dele</div>
      </div>
      <div className="nav-section-label">VISÃO GERAL</div>
      <nav className="nav-list">
        {navItems.slice(0, 1).map((item) => <NavButton key={item.key} item={item} active={view === item.key} onClick={() => onNavigate(item.key)} />)}
      </nav>
      <div className="nav-section-label operation-label">OPERAÇÃO</div>
      <nav className="nav-list">
        {navItems.slice(1).map((item) => <NavButton key={item.key} item={item} active={view === item.key} onClick={() => onNavigate(item.key)} />)}
      </nav>
      <div className="sidebar-note">
        <strong>Sem integração automática<br />com o Marcasite ainda.</strong>
        <span>Prioridade agora é o fluxo de trabalho da Cultivo — a ponte automática (API/MCP) vem depois.</span>
      </div>
    </aside>
  )
}

function NavButton({ item, active, onClick }: { item: { label: string; icon: string }; active: boolean; onClick: () => void }) {
  return <button className={`nav-button ${active ? 'active' : ''}`} onClick={onClick}><span className="nav-icon">{item.icon}</span>{item.label}</button>
}

function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  )
}

function DashboardView({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const activeProjects = projects.filter((project) => project.status !== 'reprovado')
  const captured = activeProjects.reduce((sum, project) => sum + project.captured, 0)
  const pending = activeProjects.reduce((sum, project) => sum + project.total - project.captured, 0)
  const stalled = activeProjects.filter((project) => daysIdle(project.lastInteraction) > 7)
  const topProjects = [...projects].sort((a, b) => daysIdle(b.lastInteraction) - daysIdle(a.lastInteraction) || b.total - a.total).slice(0, 6)
  const statusCounts = statusColumns.map((status) => ({ status, count: projects.filter((project) => project.status === status).length }))
  const rejectedWithoutCommunication = projects.filter((project) => project.status === 'reprovado' && !project.communications.length).length
  const pendingReceipts = projects.filter((project) => project.receiptPending).length

  return (
    <div className="page-wrap">
      <PageHeader title="Dashboard" description="O que o Diego vê primeiro: status geral, os projetos que mais importam agora, e onde tem trava." />
      <section className="kpi-grid">
        <KpiCard label="Projetos ativos" value={String(activeProjects.length)} tone="neutral" />
        <KpiCard label="Verba já captada" value={compactCurrency(captured)} tone="green" />
        <KpiCard label="Verba pendente de captação" value={compactCurrency(pending)} tone="neutral" />
        <KpiCard label="Projetos parados > 7 dias" value={String(stalled.length)} tone="red" />
      </section>
      <div className="dashboard-grid">
        <section className="panel top-projects-panel">
          <PanelHeading title="TOP PROJETOS — POR VALOR E URGÊNCIA" subtitle="Onde vale olhar primeiro hoje" />
          <div className="project-table-head"><span>PROJETO</span><span>STATUS</span><span>VERBA</span><span>PARADO</span></div>
          <div className="project-table">
            {topProjects.map((project) => <button className="project-row" key={project.id} onClick={() => onOpenProject(project)}>
              <span className="project-row-name"><strong>{project.name}</strong><small>{project.proponent}</small></span>
              <StatusBadge status={project.status} />
              <span className="project-row-money">{formatCurrency(project.captured)} / {formatCurrency(project.total)}</span>
              <span className={daysIdle(project.lastInteraction) > 7 ? 'danger-text' : ''}>{daysIdle(project.lastInteraction) ? `${daysIdle(project.lastInteraction)}d` : '—'}</span>
            </button>)}
          </div>
        </section>
        <div className="dashboard-side">
          <section className="panel status-panel">
            <PanelHeading title="STATUS GERAL" subtitle="Distribuição de todos os projetos ativos" />
            <div className="status-bars">
              {statusCounts.map(({ status, count }) => <div className="status-bar-row" key={status}><span>{statusMeta[status].label}</span><div className="bar-track"><div className={`bar-fill ${statusMeta[status].tone}`} style={{ width: `${Math.max(8, (count / projects.length) * 100)}%` }} /></div><strong>{count}</strong></div>)}
            </div>
          </section>
          <section className="panel bottleneck-panel">
            <PanelHeading title="ONDE TEM TRAVA AGORA" subtitle="Sinais automáticos, sem precisar caçar manualmente" />
            <AlertItem tone="red" title={`${stalled.length} projetos parados há mais de 7 dias.`} detail="Concentrados em documentação e negociação." />
            <AlertItem tone="red" title={`${pendingReceipts} comprovantes de abatimento pendentes de envio.`} detail="Risco de o proponente perder o benefício fiscal do ano." />
            <AlertItem tone="orange" title={`${rejectedWithoutCommunication} reprovados ainda não foram avisados.`} detail="Aviso pendente há mais de 3 dias." />
            <AlertItem tone="green" title="Taxa de conversão geral calculada diretamente da base." detail="Indicadores não são persistidos separadamente." />
          </section>
        </div>
      </div>
    </div>
  )
}

function ProjectsView({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  return (
    <div className="page-wrap">
      <PageHeader title="Projetos" description="A visão principal. Cada card é um projeto — status, fonte, verba e documentação visíveis sem abrir nada. Clique pra abrir a ficha completa." />
      <section className="board">
        {statusColumns.map((status) => {
          const columnProjects = projects.filter((project) => project.status === status)
          return <div className={`board-column ${statusMeta[status].tone}`} key={status}>
            <div className="board-column-heading"><span><i className={`status-dot ${statusMeta[status].tone}`} />{statusMeta[status].label}</span><strong>{columnProjects.length}</strong></div>
            <div className="board-cards">{columnProjects.map((project) => <ProjectCard key={project.id} project={project} onClick={() => onOpenProject(project)} />)}</div>
          </div>
        })}
      </section>
    </div>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const idle = daysIdle(project.lastInteraction)
  return <button className="project-card" onClick={onClick}>
    <div className="card-title">{project.name}</div>
    <div className="card-proponent">{project.proponent}</div>
    <div className="card-source">{project.source}</div>
    <div className="card-meta"><span>{formatCurrency(project.captured)} captado / {formatCurrency(project.total)}</span><span className={idle > 7 ? 'danger-text' : ''}>{idle ? `${idle}d parado` : 'agora'}</span></div>
    <div className="card-meta"><span>{project.docsComplete}/{project.docsTotal} docs</span>{project.rejectionReason && <span className="rejection-mini">⚠ motivo</span>}</div>
    {project.rejectionReason && <div className="card-rejection">⚠ {project.rejectionReason}</div>}
  </button>
}

function ProponentsView({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const names = [...new Set(projects.map((project) => project.proponent))]
  return (
    <div className="page-wrap">
      <PageHeader title="Proponentes" description="Visão por pessoa/organização. Clique pra ver todos os projetos daquele proponente com status individual." />
      <section className="panel proponents-panel">
        <div className="proponent-table-head"><span>PROPONENTE</span><span>TAXA DE APROVAÇÃO</span><span>RECORRÊNCIA</span><span>FONTE MAIS USADA</span></div>
        {names.map((name) => {
          const related = projects.filter((project) => project.proponent === name)
          const rate = approvalRate(name)
          const source = related.sort((a, b) => b.total - a.total)[0].source
          return <button className="proponent-row" key={name} onClick={() => onOpenProject(related[0])}>
            <span>{name}</span><span><span className={`rate-pill ${rate !== null && rate >= 50 ? 'positive' : 'negative'}`}>{rate === null ? '—' : `${rate}%`}</span></span><span>{related.length > 1 ? 'Recorrente' : 'Primeira vez'}</span><span>{source}</span>
          </button>
        })}
      </section>
    </div>
  )
}

function DiaryView({ text, checks, onChange, onRegister }: { text: string; checks: DiaryCheck[]; onChange: (value: string) => void; onRegister: () => void }) {
  return <div className="page-wrap">
    <PageHeader title="Diário Oficial" description="Checagem diária — o que foi publicado sobre projetos da Cultivo Tech, cruzado com a base. Hoje isso é feito manualmente; aqui fica o registro." />
    <section className="panel diary-current">
      <div className="section-title">CHECAGEM DE HOJE — 25/08/2026</div>
      <div className="muted-copy">Última checagem registrada às 08:12 por Amanda</div>
      <div className="diary-form">
        <label>COLAR TRECHO DO DIÁRIO OFICIAL DE HOJE PRA CRUZAR COM A BASE</label>
        <textarea value={text} onChange={(event) => onChange(event.target.value)} placeholder="Cole aqui o conteúdo relevante do Diário Oficial..." />
        <button className="primary-button" onClick={onRegister}>Cruzar com a base</button>
      </div>
    </section>
    <section className="panel history-panel">
      <div className="section-title">HISTÓRICO DE CHECAGENS</div>
      <div className="diary-history">{checks.map((check, index) => <div className={`diary-check ${check.match ? 'has-match' : ''}`} key={`${check.date}-${check.time}-${index}`}>
        <div className="history-date">{check.date} · {check.time}{check.match && <span className="match-pill">match encontrado</span>}</div>
        <strong>{check.detail}</strong>
        {check.match && <span>{check.match}</span>}
      </div>)}</div>
    </section>
  </div>
}

function ProjectView({ project, tab, onBack, onTabChange, onRegisterCommunication, additionalCommunications }: { project: Project; tab: ProjectTab; onBack: () => void; onTabChange: (tab: ProjectTab) => void; onRegisterCommunication: (project: Project, communication: Communication) => void; additionalCommunications: Communication[] }) {
  const tabs: { id: ProjectTab; label: string }[] = [
    { id: 'overview', label: 'Dados & Linha do tempo' },
    { id: 'documents', label: 'Documentos' },
    { id: 'finance', label: 'Financeiro' },
    { id: 'communication', label: 'Comunicação' },
  ]
  return <div className="page-wrap project-page">
    <button className="back-link" onClick={onBack}>← Voltar pra Projetos</button>
    <div className="project-header"><div><h1>{project.name}</h1><p>Proponente: {project.proponent}</p></div><StatusBadge status={project.status} /></div>
    <div className="project-pipeline"><span>Cultivo Tech</span><b>→</b><span className="pipeline-current">{statusMeta[project.status].label}</span><b>→</b><span className="pipeline-muted">(futuro) API/MCP → Marcasite</span></div>
    <div className="tabs">{tabs.map((item) => <button className={tab === item.id ? 'active' : ''} key={item.id} onClick={() => onTabChange(item.id)}>{item.label}</button>)}</div>
    {tab === 'overview' && <OverviewTab project={project} />}
    {tab === 'documents' && <DocumentsTab project={project} />}
    {tab === 'finance' && <FinanceTab project={project} />}
    {tab === 'communication' && <CommunicationTab project={project} additionalCommunications={additionalCommunications} onRegister={onRegisterCommunication} />}
  </div>
}

function OverviewTab({ project }: { project: Project }) {
  return <div className="two-col-grid">
    <section className="panel"><PanelHeading title="DADOS DO PROJETO" /><div className="data-grid"><DataPoint label="NOME DO PROJETO" value={project.name} /><DataPoint label="PROPONENTE" value={project.proponent} /><DataPoint label="FONTE DE FINANCIAMENTO" value={project.source} /><DataPoint label="VALOR TOTAL" value={formatCurrency(project.total)} /><DataPoint label="LOCAL DE REALIZAÇÃO" value={project.location} /><DataPoint label="EMPRESA PATROCINADORA" value={project.sponsor} muted={project.sponsor === 'Ainda não vinculada'} /></div></section>
    <section className="panel timeline-panel"><PanelHeading title="LINHA DO TEMPO" />{project.timeline.map((item, index) => <div className="timeline-item" key={`${item.label}-${index}`}><span>{item.label}</span><strong className={item.tone ? `${item.tone}-text` : ''}>{item.detail}</strong></div>)}</section>
  </div>
}

function DocumentsTab({ project }: { project: Project }) {
  return <div><div className="info-banner">▰ Reflete a estrutura real de pastas do Marcasite pra este projeto — documentos legais e ativos de comunicação juntos, do jeito que o Marcasite já organiza.</div><section className="panel folders-panel">{['Documentos legais', 'Comunicação & ativos'].map((group) => <div key={group}><div className="section-title folder-group-title">{group}</div><div className="folder-grid">{documentFolders.filter((folder) => folder.group === group).map((folder) => <div className="folder-card" key={folder.title}><span>▰</span><strong>{folder.title}</strong><small>{folder.title === 'Contrato' && project.status === 'aprovado' ? 1 : folder.count || (project.documents.some((document) => document.toLowerCase().includes(folder.title.toLowerCase().split(' ')[0])) ? 1 : 0)} arquivo(s)</small></div>)}</div></div>)}</section></div>
}

function FinanceTab({ project }: { project: Project }) {
  const progress = project.total ? Math.round((project.captured / project.total) * 100) : 0
  return <div className="finance-view"><section className="panel progress-panel"><PanelHeading title="PROGRESSO DE CAPTAÇÃO" /><div className="progress-line"><div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div><strong>{progress}%</strong></div><div className="muted-copy">{formatCurrency(project.captured)} captados de {formatCurrency(project.total)} previstos</div></section><section className="panel finance-docs"><PanelHeading title="DOCUMENTOS FINANCEIROS" /><div className="finance-card-grid">{['Comprovante de pagamento', 'Comprovante de abatimento', 'Cadastro financeiro'].map((label, index) => <div className="finance-card" key={label}><strong>▰ {label}</strong><span>{index === 2 ? '0 arquivos' : '1 arquivo'}</span><small>{index < 2 ? '🔒 visível à empresa patrocinadora' : ' '}</small></div>)}</div></section></div>
}

function CommunicationTab({ project, additionalCommunications, onRegister }: { project: Project; additionalCommunications: Communication[]; onRegister: (project: Project, communication: Communication) => void }) {
  const history = [...project.communications, ...additionalCommunications]
  const templates = [
    { title: 'MODELO — PROJETO APROVADO', text: 'Olá! Seu projeto foi aprovado. Próximos passos: assinatura de contrato e envio de documentação complementar.' },
    { title: 'MODELO — DOCUMENTO PENDENTE', text: 'Olá! Pra seguirmos com a submissão, ainda falta: [DOU/DOE]. Pode nos enviar assim que possível?' },
    { title: 'MODELO — PROJETO REPROVADO', text: `Olá! Infelizmente seu projeto não foi aprovado nesta rodada. Motivo: ${project.rejectionReason ?? '[motivo]'}. Podemos conversar sobre reenvio numa próxima janela.` },
  ]
  return <div className="communication-view"><section className="panel contact-panel"><PanelHeading title="FALAR COM O PROPONENTE" subtitle={`Contato: ${project.contact}`} /><div className="contact-actions"><button className="channel-button" onClick={() => onRegister(project, { channel: 'WhatsApp', date: 'agora', text: templates[0].text, responsible: 'Equipe Cultivo' })}><span>●</span><strong>Enviar por WhatsApp</strong><small>Atualização de status do projeto</small></button><button className="channel-button" onClick={() => onRegister(project, { channel: 'E-mail', date: 'agora', text: templates[0].text, responsible: 'Equipe Cultivo' })}><span>✉</span><strong>Enviar por E-mail</strong><small>Atualização formal, com anexos se precisar</small></button></div>{templates.map((template) => <div className="template-card" key={template.title}><span>{template.title}</span><p>{template.text}</p></div>)}</section><section className="panel communication-history"><PanelHeading title="HISTÓRICO DE COMUNICAÇÃO" />{history.length ? history.map((communication, index) => <div className="communication-item" key={`${communication.date}-${index}`}><span>{communication.channel} — {communication.date}{communication.responsible ? ` · ${communication.responsible}` : ''}</span><p>“{communication.text}”</p></div>) : <EmptyState text="Nenhuma comunicação registrada para este projeto." />}</section></div>
}

function KpiCard({ label, value, tone }: { label: string; value: string; tone: 'neutral' | 'green' | 'red' }) { return <div className="kpi-card"><strong className={tone}>{value}</strong><span>{label}</span></div> }
function PanelHeading({ title, subtitle }: { title: string; subtitle?: string }) { return <div className="panel-heading"><div className="section-title">{title}</div>{subtitle && <div className="muted-copy">{subtitle}</div>}</div> }
function StatusBadge({ status }: { status: ProjectStatus }) { return <span className={`status-badge ${statusMeta[status].tone}`}>{statusMeta[status].short}</span> }
function AlertItem({ tone, title, detail }: { tone: string; title: string; detail: string }) { return <div className="alert-item"><span className={`alert-icon ${tone}`}>{tone === 'green' ? '✓' : '!'}</span><div><strong>{title}</strong><span>{detail}</span></div></div> }
function DataPoint({ label, value, muted }: { label: string; value: string; muted?: boolean }) { return <div className="data-point"><span>{label}</span><strong className={muted ? 'muted-value' : ''}>{value}</strong></div> }
function EmptyState({ text }: { text: string }) { return <div className="empty-state">{text}</div> }

export default App
