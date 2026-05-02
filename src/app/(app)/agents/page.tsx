'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import { Cpu } from 'lucide-react'

export default function AgentsPage() {
  return (
    <div>
      <PageHeader
        title="AI Agents"
        description="Create, launch, monitor, and manage your AI agents from the dashboard."
      />
      <div
        className="mt-8 rounded-xl border p-8 text-center"
        style={{ borderColor: 'var(--divider)', background: 'var(--card-bg)' }}
      >
        <Cpu size={48} strokeWidth={1.5} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Agent Hub</h3>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          Coming soon. This is where you&apos;ll launch, monitor, and communicate with your AI agents.
        </p>
      </div>
    </div>
  )
}
