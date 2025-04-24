import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resumify',
  description: 'Build your CV online for free and get hired',
  icons: {
    icon: [
      {
        url: '/icons/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icons/favicon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        url: '/icons/favicon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen overflow-hidden">
      {children}
    </div>
  )
}
