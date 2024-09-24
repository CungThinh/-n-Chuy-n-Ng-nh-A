import SessionProviderWrapper from '@/app/SessionProviderWrapper';
import '../app/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}