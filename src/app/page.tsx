"use client";

import dynamic from "next/dynamic";
import { Features } from "@/components/Features";
import { Protocol } from "@/components/Protocol";

// Dynamic imports with SSR disabled for components using Aptos/Shelby SDKs
const Hero = dynamic(() => import("@/components/Hero").then(mod => mod.Hero), { ssr: false });
const VaultDropzone = dynamic(() => import("@/components/VaultDropzone").then(mod => mod.VaultDropzone), { ssr: false });
const Dashboard = dynamic(() => import("@/components/Dashboard").then(mod => mod.Dashboard), { ssr: false });

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
