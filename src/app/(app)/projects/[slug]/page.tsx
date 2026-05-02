'use client'

import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useBentoStore } from '@/lib/store'
import { DEFAULT_PROJECTS } from '@/lib/utils'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatusPill } from '@/components/ui/StatusPill'
import { PriorityBadge } from '@/components/ui/PriorityBadge'
import { cn } from '@/lib/utils'
import { ArrowLeft, FileText, Lightbulb, CheckSquare } from 'lucide-react'

type FilterTab = 'all' | 'files' | 'ideas' | 'tasks'

const TABS: { key: FilterTab; label: string; icon: React.ReactNode }[] = [
  { key: 'all',   label: 'All',     icon: <span style={{ fontSize: 14 }}>📋</span> },
  { key: 'files', label: 'Files',   icon: <FileText size={16} strokeWidth={1.6} /> },
  { key: 'ideas', label: 'Ideas',   icon: <Lightbulb size={16} strokeWidth={1.6} /> },
  { key: 'tasks', label: 'Tasks',   icon: <CheckSquare size={16} strokeWidth={1.6} /> },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { items } = useBentoStore()
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  const project = useMemo(() => DEFAULT_PROJECTS.find(p => p.slug === slug), [slug])

  const filteredItems = useMemo(() => {
    let filtered = items.filter(i => i.project === slug)
    if (activeTab === 'files') filtered = filtered.filter(i => i.type === 'file')
    if (activeTab === 'ideas') filtered = filtered.filter(i => i.type === 'idea')
    if (activeTab === 'tasks') filtered = filtered.filter(i => i.type === 'task')
    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }, [items, slug, activeTab])

  if (!project) {
    return (
      <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
        <p className="text-lg">Project not found</p>
        <Link href="/projects" className="text-sm mt-2 inline-block" style={{ color: 'var(--accent)' }}>
          ← Back to projects
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-4 hover:opacity-80 transition-opacity"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft size={16} strokeWidth={1.6} />
        Back to Projects
      </Link>

      {/* Header */}
      <PageHeader
        title={`${project.emoji ?? ''} ${project.name}`}
        description={project.description ?? ''}
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 mt-6 border-b" style={{ borderColor: 'var(--divider)' }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-150',
              activeTab === tab.key
                ? 'border-current'
                : 'border-transparent hover:opacity-80'
            )}
            style={{
              color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-muted)',
              borderBottomColor: activeTab === tab.key ? 'var(--accent)' : 'transparent',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
        <div className="flex-1 text-right text-xs py-2.5" style={{ color: 'var(--text-muted)' }}>
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Items */}
      {filteredItems.length === 0 ? (
        <div
          className="rounded-xl border p-10 text-center"
          style={{ borderColor: 'var(--divider)', background: 'var(--card-bg)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No {activeTab === 'all' ? '' : activeTab} items in this project yet.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map(item => (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="block rounded-xl border p-4 transition-all duration-150 hover:shadow-sm"
              style={{ borderColor: 'var(--divider)', background: 'var(--card-bg)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusPill status={item.status} />
                  <PriorityBadge priority={item.priority} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>{item.created_by === 'agi' ? '🧠 AGI' : '👤 George'}</span>
                <span>•</span>
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="capitalize">{item.type}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
