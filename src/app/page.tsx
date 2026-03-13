import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Protocol } from "@/components/Protocol";
import { VaultDropzone } from "@/components/VaultDropzone";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-color-deep text-color-clean selection:bg-color-accent selection:text-color-deep">
      <Hero />
      <Features />
      <Protocol />
      <VaultDropzone />
      <Dashboard />
    </main>
  );
}
