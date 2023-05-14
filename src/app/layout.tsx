import "@/styles/globals.css";
import Navbar from "@src/components/Navbar";
import Providers from "@src/components/Providers";
import { cn } from "@src/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {children}
        </Providers>

        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
