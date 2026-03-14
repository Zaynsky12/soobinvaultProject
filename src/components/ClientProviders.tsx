"use client";

import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import React from "react";
import { ShelbyClient } from "@shelby-protocol/sdk/browser";
import { ShelbyClientProvider } from "@shelby-protocol/react";
import { Network } from "@aptos-labs/ts-sdk";

const WalletProvider = dynamic((() => import("@/components/WalletProvider")) as any, { ssr: false }) as any;
const Navbar = dynamic((() => import("@/components/Navbar")) as any, { ssr: false }) as any;

const shelbyClient = new ShelbyClient({
    network: Network.TESTNET,
    apiKey: process.env.NEXT_PUBLIC_SHELBY_API_KEY,
});

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <WalletProvider>
            <ShelbyClientProvider client={shelbyClient}>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </ShelbyClientProvider>
        </WalletProvider>
    );
}
