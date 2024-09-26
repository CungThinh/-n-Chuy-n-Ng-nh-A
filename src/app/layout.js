import SessionProviderWrapper from '@/app/SessionProviderWrapper';
import '../app/globals.css'
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
        <Footer />
      </body>
    </html>
  );
}