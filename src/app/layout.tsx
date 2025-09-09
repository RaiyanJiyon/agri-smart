import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import Navbar from "@/components/layout/navbar";
import { LanguageProvider } from "@/components/shared/language-provider";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";
import AuthProvider from "@/services/auth-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgriSmart - AI-Powered Farming Assistant",
  description: "Make data-driven farming decisions with AI-powered insights",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        {/* Wrap the entire app with LanguageProvider */}
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <Navbar />
              {children}
              <Toaster />
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
