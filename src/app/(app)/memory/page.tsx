'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import { BookOpen } from 'lucide-react'

export default function MemoryPage() {
  return (
    <div>
      <PageHeader
        title="Memory & Context"
        description="People, journal entries, timeline, and graph memory."
      />
      <div
        className="mt-8 rounded-xl border p-8 text-center"
        style={{ borderColor: 'var(--divider)', background: 'var(--card-bg)' }}
      >
        <BookOpen size={48} strokeWidth={1.5} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Memory Hub</h3>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          Coming soon. This section will connect to Mem0, Supermemory, Obsidian, and Notion for persistent memory and graph-style context.
        </p>
      </div>
    </div>
  )
}
