"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function MagneticButton({
    children,
    className,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.3);
            yTo(y * 0.3);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        button.addEventListener("mousemove", mouseMove);
        button.addEventListener("mouseleave", mouseLeave);

        return () => {
            button.removeEventListener("mousemove", mouseMove);
            button.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={cn(
                "relative overflow-hidden rounded-[2rem] px-8 py-4 font-semibold text-color-deep transition-all duration-300 group cursor-pointer",
                className
            )}
        >
            <span className="absolute inset-0 w-full h-full bg-color-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
}
