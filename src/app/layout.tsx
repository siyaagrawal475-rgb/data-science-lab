import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { KeyboardShortcuts } from '@/components/layout/KeyboardShortcuts';

export const metadata: Metadata = {
  title: {
    default: 'Data Science Lab - 6-Unit Interactive Curriculum & Labs',
    template: '%s | Data Science Lab',
  },
  description:
    'Interactive educational platform featuring 6 units, 60 lessons, 24 computational labs, and 86 mathematical formulas across Exploratory Data Analysis, Linear Algebra, Probability, Regression, and Machine Learning.',
  keywords: [
    'Data Science',
    'Linear Algebra',
    'Probability Theory',
    'Exploratory Data Analysis',
    'Regression Analysis',
    'Machine Learning',
    'Interactive Labs',
    'KaTeX Math',
  ],
  authors: [{ name: 'Data Science Lab Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Data Science Lab - Modern Interactive Educational Platform',
    description:
      'Master data science through 6 structured units, 60 interactive lessons, and 24 hands-on computational labs.',
    type: 'website',
    siteName: 'Data Science Lab',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('dsl_theme');
                  var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && supportDark) || (theme === 'system' && supportDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#F8FAFC] dark:bg-[#0F1720] text-[#172033] dark:text-[#F1F5F9] min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
        <AuthProvider>
          <ThemeProvider>
            <KeyboardShortcuts />
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
