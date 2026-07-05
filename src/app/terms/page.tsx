import type { Metadata } from 'next'

import { HubItem, LegalShell } from '@/components/legal-shell'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Solora apps.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service — Solora',
    description: 'Terms of service for Solora apps.',
    url: '/terms',
  },
}

const TermsHubPage = () => {
  return (
    <LegalShell
      title="Terms of Service"
      back={{ href: '/', label: 'Back to home' }}
      prose={false}
    >
      <p className="text-muted-foreground">
        Each Solora app has its own terms. Select an app below.
      </p>
      <div className="mt-6 grid gap-3">
        <HubItem href="/tierly/terms" title="Tierly" description="Volume & tiered pricing" />
      </div>
    </LegalShell>
  )
}

export default TermsHubPage
