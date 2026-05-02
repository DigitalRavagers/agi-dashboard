'use client'

import Link from 'next/link'
import { DEFAULT_PROJECTS } from '@/lib/utils'
import { PageHeader } from '@/components/ui/PageHeader'
import { FolderOpen } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Your brands and initiatives. Click any project to see its files, ideas, and tasks."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {DEFAULT_PROJECTS.map(p => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="rounded-xl border p-5 transition-all duration-150 hover:shadow-sm hover:-translate-y-0.5"
            style={{ borderColor: 'var(--divider)', background: 'var(--card-bg)' }}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{p.emoji ?? '📁'}</span>
              <div>
                <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {p.name}
                </div>
                {p.description && (
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {p.description}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.slug}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
