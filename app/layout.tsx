import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
