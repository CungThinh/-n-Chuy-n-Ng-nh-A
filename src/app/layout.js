import "../app/globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SessionProviderWrapper from "@/context/SessionProviderWrapper";
import PageTransition from "@/lib/PageTransition";
import { NextUI } from "@/context/NextUIProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextUI>
          <SessionProviderWrapper>
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </SessionProviderWrapper>
        </NextUI>
      </body>
    </html>
  );
}
