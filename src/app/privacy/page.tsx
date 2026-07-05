import type { Metadata } from 'next'

import { HubItem, LegalShell } from '@/components/legal-shell'

export const metadata: Metadata = {
  title: 'Privacy Policies',
  description: 'Privacy policies for Solora apps.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policies — Solora',
    description: 'Privacy policies for Solora apps.',
    url: '/privacy',
  },
}

const PrivacyHubPage = () => {
  return (
    <LegalShell
      title="Privacy Policies"
      back={{ href: '/', label: 'Back to home' }}
      prose={false}
    >
      <p className="text-muted-foreground">
        Each Solora app has its own privacy policy. Select an app below.
      </p>
      <div className="mt-6 grid gap-3">
        <HubItem
          href="/tierly/privacy"
          title="Tierly"
          description="Volume & tiered pricing"
        />
      </div>
    </LegalShell>
  )
}

export default PrivacyHubPage
