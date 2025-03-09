// app/layout.tsx
import "./globals.css";
import SolanaProvider from "./providers/SolanaProvider";
import { Metadata } from "next";

// (Optional) Next.js 13 "metadata" export
export const metadata: Metadata = {
  title: "My Solana Landing",
  description: "A Next.js 13 landing page with Solana wallet integration."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the entire app with the SolanaProvider */}
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}
