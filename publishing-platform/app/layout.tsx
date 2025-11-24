import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Roboto_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Publish - Modern Publishing Platform for Writers",
    template: "%s | Publish"
  },
  description: "Create, publish, and share amazing stories on our modern publishing platform. Join thousands of writers today.",
  keywords: ["publishing", "writing", "stories", "blog", "content creation", "medium", "writers", "articles"],
  authors: [{ name: "Publish Team" }],
  creator: "Publish",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://phase-two-capstone-project-orcin.vercel.app",
    siteName: "Publish",
    title: "Publish - Modern Publishing Platform",
    description: "Share your stories with the world. Write, publish, and connect with readers.",
    images: [
      {
        url: "/creative-writing-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Publish - Modern Publishing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publish - Modern Publishing Platform",
    description: "Share your stories with the world. Write, publish, and connect with readers.",
    images: ["/creative-writing-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// Force light theme
const forceLightTheme = "light"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff", // Force light theme color
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${robotoMono.variable}`}
      data-theme={forceLightTheme}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
