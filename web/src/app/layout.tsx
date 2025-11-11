import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { AuthProvider } from '@/shared/providers/AuthProvider';

export const metadata: Metadata = {
  title: '센스 있는 선물 - 맞춤형 선물 큐레이션',
  description: '키워드로 찾는 완벽한 선물 추천 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
