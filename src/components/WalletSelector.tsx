"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AdapterWallet } from "@aptos-labs/wallet-adapter-core";
import { X, ChevronRight, Wallet as WalletIcon, ExternalLink } from 'lucide-react';
import gsap from 'gsap';

interface WalletSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WalletSelector({ isOpen, onClose }: WalletSelectorProps): React.ReactNode {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { wallets, connect } = useWallet();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const ctx = gsap.context(() => {
                gsap.fromTo(overlayRef.current, 
                    { opacity: 0 }, 
                    { opacity: 1, duration: 0.3, ease: 'power2.out' }
                );
                gsap.fromTo(modalRef.current, 
                    { scale: 0.95, opacity: 0, y: 20 }, 
                    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 }
                );
            });
            return () => {
                ctx.revert();
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(modalRef.current, { scale: 0.95, opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: onClose });
    };

    const onWalletClick = (walletName: any) => {
        connect(walletName);
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div 
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={handleClose}
            />

            {/* Modal */}
            <div 
                ref={modalRef}
                className="relative w-full max-w-md bg-[#0B1121]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden"
            >
                {/* Header */}
                <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-color-primary to-color-accent flex items-center justify-center shadow-[0_0_20px_rgba(232,58,118,0.3)]">
                            <WalletIcon className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-heading font-bold text-white tracking-tight">Connect Wallet</h2>
                            <p className="text-xs text-color-support/60 font-medium">Select your preferred way to connect</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-white/5 text-color-support/60 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Wallet List */}
                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-3">
                        {wallets?.map((wallet: AdapterWallet) => (
                            <button
                                key={wallet.name}
                                onClick={() => onWalletClick(wallet.name)}
                                className="w-full group relative flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-xl bg-white/5 p-2 flex items-center justify-center overflow-hidden">
                                        <img 
                                            src={wallet.icon} 
                                            alt={wallet.name} 
                                            className="w-full h-full object-contain"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-color-primary/0 to-color-accent/0 group-hover:from-color-primary/10 group-hover:to-color-accent/10 transition-all duration-500" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-white font-bold tracking-tight">{wallet.name}</h3>
                                        {wallet.name === 'Aptos Connect' && (
                                            <span className="text-[10px] uppercase tracking-widest text-color-accent font-bold">Social Login Enabled</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-color-primary group-hover:text-white transition-all duration-300">
                                        <ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </button>
                        ))}

                        {(!wallets || wallets.length === 0) && (
                            <div className="text-center py-10">
                                <p className="text-color-support/60 mb-4">No wallets detected</p>
                                <a 
                                    href="https://aptos.dev/guides/install-petra-wallet" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-color-primary hover:text-color-accent font-bold transition-colors"
                                >
                                    Get Petra Wallet <ExternalLink size={14} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 pt-4 border-t border-white/5 bg-white/[0.02]">
                    <p className="text-center text-[10px] text-color-support/40 leading-relaxed">
                        By connecting a wallet, you agree to our Terms of Service and acknowledge that you have read and understand our Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}
