import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://aitexthumanizer.krishaiworks.com"
  ),

  title: "AI Text Humanizer | Make AI Text Sound Human",

  description:
    "Humanize AI-generated text and make it sound more natural, clear, and engaging. Rewrite AI content into natural-sounding text with the free AI Text Humanizer by KrishAIWorks.",

  keywords: [
    "AI Text Humanizer",
    "AI Humanizer",
    "AI Text Humanizer Free",
    "Humanize AI Text",
    "Humanize AI Content",
    "AI Content Humanizer",
    "AI Text Rewriter",
    "Make AI Text Human",
    "Humanize AI Writing",
    "Natural Text Rewriter",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.vercel.app",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  alternates: {
    canonical:
      "https://aitexthumanizer.krishaiworks.com/",
  },

  openGraph: {
    title: "AI Text Humanizer | KrishAIWorks",
    description:
      "Humanize AI-generated text and make it sound more natural, clear, and engaging.",
    url: "https://aitexthumanizer.krishaiworks.com/",
    siteName: "KrishAIWorks",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Text Humanizer | KrishAIWorks",
    description:
      "Make AI-generated text sound natural and human with AI Text Humanizer.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id": "https://aitexthumanizer.krishaiworks.com/#webapplication",
      name: "AI Text Humanizer",
      url: "https://aitexthumanizer.krishaiworks.com/",
      description:
        "Humanize AI-generated text and make it sound more natural, clear, and engaging. Rewrite AI content into natural-sounding text with the free AI Text Humanizer by KrishAIWorks.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://aitexthumanizer.krishaiworks.com/#webpage",
      url: "https://aitexthumanizer.krishaiworks.com/",
      name: "AI Text Humanizer | Make AI Text Sound Human",
      description:
        "Humanize AI-generated text and make it sound more natural, clear, and engaging. Rewrite AI content into natural-sounding text with the free AI Text Humanizer by KrishAIWorks.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id": "https://aitexthumanizer.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}