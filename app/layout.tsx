import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Shoppit – AI Product Recommendations",
    template: "%s · Shoppit",
  },
  description:
    "Shoppit is an AI product recommendation app that helps shoppers discover the right products instantly. Join the waitlist.",
  applicationName: "Shoppit",
  generator: "v0.app",
  keywords: [
    "Shoppit",
    "AI",
    "product recommendations",
    "recommendation engine",
    "ecommerce",
    "shopping",
    "personalization",
  ],
  authors: [{ name: "Shoppit" }],
  creator: "Shoppit",
  publisher: "Shoppit",
  openGraph: {
    title: "Shoppit – AI Product Recommendations",
    description:
      "Shoppit is an AI product recommendation app that helps shoppers discover the right products instantly. Join the waitlist.",
    url: "/",
    siteName: "Shoppit",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Shoppit",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shoppit – AI Product Recommendations",
    description:
      "Shoppit is an AI product recommendation app that helps shoppers discover the right products instantly. Join the waitlist.",
    images: ["/placeholder.jpg"],
  },
  category: "technology",
  alternates: { canonical: "/" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased dark`}>
      <body className="font-sans">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
