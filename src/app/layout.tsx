import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best Deals Asia Group",
  description:
    "Your premier destination for comprehensive solutions within the property industry in Bali, Indonesia. Holiday rental accommodation, villa management, real estate, maintenance, events, and digital solutions.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Server-rendered: reads directly from process.env without NEXT_PUBLIC_ bake requirement
  const leadstreamsBaseUrl = process.env.LEADSTREAMS_BASE_URL || "https://leadstreams.bestdealsdigitalsolutions.com";
  const leadstreamsWebsiteId = process.env.LEADSTREAMS_WEBSITE_ID;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        {leadstreamsWebsiteId && (
          <script
            src={`${leadstreamsBaseUrl.replace(/\/+$/, "")}/static/widget.js`}
            data-website-id={leadstreamsWebsiteId}
            defer
          />
        )}
      </body>
    </html>
  );
}
