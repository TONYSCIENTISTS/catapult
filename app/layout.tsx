// app/layout.tsx
import "./globals.css"; // Your global overrides
import SolanaProvider from "./Providers/SolanaProvider";

export const metadata = {
  title: "Windows 98 Style",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap entire app with SolanaProvider */}
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
