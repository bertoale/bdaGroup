import { Metadata } from "next";
import { Navbar } from "@/sections/layout/navbar";
import { Footer } from "@/sections/layout/footer";
import { CareerSection } from "@/sections/career/career-section";
import { getActiveJobPositions } from "@/lib/career-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Career | Best Deals Asia Group",
  description:
    "Join the dedicated team at Best Deals Asia Group. Explore open career opportunities across hospitality, property management, operations, and digital solutions in Bali.",
};

export default async function CareerPage() {
  const activePositions = await getActiveJobPositions();

  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />
      <div className="pt-20">
        <CareerSection initialPositions={activePositions} />
      </div>
      <Footer />
    </main>
  );
}
