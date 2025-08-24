import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "LexiGenius",
  description: "Your intelligent writing partner for clear, professional, and impactful content.",
  keywords: [
    "AI writing assistant",
    "LexiGenius",
    "content generation",
    "copywriting",
    "email writing",
    "productivity tool",
  ],
  authors: [{ name: "LexiGenius Team", url: "#" }],
  creator: "LexiGenius",
  applicationName: "LexiGenius",
  metadataBase: new URL("https://lexigenius.vercel.app/"),
  openGraph: {
    title: "LexiGenius – Smart Writing, Simplified",
    description: "LexiGenius helps you generate polished content, emails, and more using the power of AI.",
    url: "https://lexigenius.vercel.app/",
    siteName: "LexiGenius",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/favicon.ico", // Path relative to the public folder
        width: 800,
        height: 600,
        alt: "LexiGenius Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LexiGenius",
    description: "Supercharge your writing with AI – clear, professional, and fast.",
    creator: "@your-twitter-handle",
    images: ["/favicon.ico"], // Just the relative path works here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={``}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <MainLayout>{children}</MainLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
