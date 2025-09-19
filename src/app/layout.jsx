import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Optimized Space Grotesk font configuration
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Critical for performance - prevents FOIT (Flash of Invisible Text)
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segist UI', 'Roboto', 'sans-serif'],
});

// Enhanced metadata for medicue
export const metadata = {
  title: {
    default: "medicue - Never Miss a Dose Again | AI-Powered Medication Management",
    template: "%s | medicue - Smart Medication Reminders"
  },
  description: "Transform your medication management with AI-powered prescription parsing, intelligent reminders, and comprehensive health analytics. Trusted by 15,000+ patients and 45+ healthcare partners worldwide.",
  keywords: [
    "medication management",
    "pill reminders",
    "prescription upload",
    "health analytics", 
    "medication adherence",
    "AI prescription parsing",
    "healthcare app",
    "dose tracking",
    "medical reminders",
    "health reports"
  ],
  authors: [{ name: "medicue Team" }],
  creator: "medicue",
  publisher: "medicue Healthcare Solutions",
  category: "Healthcare",
  
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medicue.app",
    siteName: "medicue",
    title: "medicue - Never Miss a Dose Again",
    description: "AI-powered medication management platform trusted by patients, families, and healthcare professionals worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "medicue - Smart Medication Management Platform",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@medicueapp",
    creator: "@medicueapp",
    title: "medicue - Never Miss a Dose Again",
    description: "AI-powered medication management platform trusted by patients, families, and healthcare professionals worldwide.",
    images: ["/twitter-image.jpg"],
  },
  
  // Additional SEO enhancements
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification for search engines
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  
  // App-specific metadata
  applicationName: "medicue",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "medicue",
    startupImage: [
      "/apple-touch-startup-image-768x1004.png",
      {
        url: "/apple-touch-startup-image-1536x2008.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Theme colors
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16a34a" },
    { media: "(prefers-color-scheme: dark)", color: "#15803d" },
  ],
  
  // Additional meta tags
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "application-name": "medicue",
    "msapplication-TileColor": "#16a34a",
    "msapplication-config": "/browserconfig.xml",
  },
};

// Viewport configuration for optimal mobile experience
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#16a34a",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${spaceGrotesk.variable} scroll-smooth`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://api.medicue.app" />
        <link rel="dns-prefetch" href="https://cdn.medicue.app" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Additional performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "medicue",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "description": "AI-powered medication management platform for better health outcomes",
              "url": "https://medicue.app",
              "author": {
                "@type": "Organization",
                "name": "medicue Healthcare Solutions"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} antialiased scroll-smooth bg-white text-gray-900 font-sans leading-relaxed`}
        suppressHydrationWarning={true}
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <div id="main-content" className="min-h-screen flex flex-col">
          {children}
        </div>
        
        {/* Performance monitoring (optional) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
