'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import { Sparkles } from 'lucide-react'

export default function IntelligencePage() {
  return (
    <div>
      <PageHeader
        title="Intelligence"
        description="Breakthroughs, insights, decisions, and recurring patterns."
      />
      <div
        className="mt-8 rounded-xl border p-8 text-center"
        style={{ borderColor: 'var(--divider)', background: 'var(--card-bg)' }}
      >
        <Sparkles size={48} strokeWidth={1.5} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Breakthroughs & Patterns</h3>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          Coming soon. This section will surface key insights, decisions, patterns, and recommendations from your work and voice logs.
        </p>
      </div>
    </div>
  )
}
