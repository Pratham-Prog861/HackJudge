import type { Metadata } from "next";
import { Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/app-shell";
import { AuthSync } from "@/components/auth-sync";
import { ToastProvider } from "@/components/toast-provider";

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackJudge",
  description:
    "AI-assisted hackathon judging platform built with Next.js, Clerk, and Convex.",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", sora.variable, ibmPlexMono.variable)}
    >
      <body className="antialiased">
        <ClerkProvider dynamic>
          <ConvexClientProvider>
            <ToastProvider>
              <AuthSync />
              <AppShell>{children}</AppShell>
            </ToastProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
