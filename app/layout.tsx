import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Footer from '@/components/Footer'
import Providers from './providers'
import Head from 'next/head'
import AnimateProvider from './animatePresence'
import { Analytics } from '@vercel/analytics/react';


config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Adzi Bilal',
    description: 'Portofolio Adzi Bilal 2023'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <Head>
                {/* <!-- Google tag (gtag.js) --> */}
                <script
                    async
                    src='https://www.googletagmanager.com/gtag/js?id=G-2M4S4LDT4K'></script>
                <script>
                    {` window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-2M4S4LDT4K');`}
                </script>
            </Head>
            <body className={inter.className}>
                <AnimateProvider>
                    <Providers>
                        <Navbar />
                        {children}
                        <Footer />
                    </Providers>
                </AnimateProvider>
                <Analytics />
            </body>
        </html>
    )
}
