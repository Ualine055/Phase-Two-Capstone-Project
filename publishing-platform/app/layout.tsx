import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Roboto_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
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
  title: "Publish - Modern Publishing Platform for Writers",
  description: "Create, publish, and share amazing stories on our modern publishing platform. Join thousands of writers today.",
  keywords: "publishing, writing, stories, blog, content creation",
  authors: [{ name: "Publish Team" }],
  creator: "Publish",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://publish.example.com",
    siteName: "Publish",
    title: "Publish - Modern Publishing Platform",
    description: "Share your stories with the world",
    images: [
      {
        url: "https://publish.example.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publish - Modern Publishing Platform",
    description: "Share your stories with the world",
    images: ["https://publish.example.com/og-image.png"],
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
