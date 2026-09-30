import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Footer from './components/Footer';
import InquiryDrawer from './components/InquiryDrawer';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Modura Design Group',
    description: 'Modura Design Group',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="flex min-h-full flex-col">
                <Topbar />
                <Header />
                {children}
                <InquiryDrawer />
                <Footer />
            </body>
        </html>
    );
}
