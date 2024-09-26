
import '../app/globals.css'
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import SessionProviderWrapper from '@/context/SessionProviderWrapper';
import PageTransition from '@/lib/PageTransition';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SessionProviderWrapper>
          <PageTransition>
          {children}
          </PageTransition>
        </SessionProviderWrapper>
        <Footer />
      </body>
    </html>
  );
}