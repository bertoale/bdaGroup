import { Metadata } from "next";
import { Navbar } from "@/sections/layout/navbar";
import { Footer } from "@/sections/layout/footer";
import { ContactSection } from "@/sections/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact Us | Best Deals Asia Group",
  description: "Get in touch with Best Deals Asia Group headquarters in Legian, Bali. Discover partnership opportunities, property services, and corporate inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
