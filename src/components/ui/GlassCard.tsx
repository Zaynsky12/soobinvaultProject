import React from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
    children,
    className,
    largeCurve = false,
}: {
    children: React.ReactNode;
    className?: string;
    largeCurve?: boolean;
}) {
    return (
        <div
            className={cn(
                "glass-panel premium-glass-border transition-transform hover:-translate-y-[2px] transition-all duration-300",
                largeCurve ? "glass-panel-curve-large" : "glass-panel-curve",
                className
            )}
        >
            {children}
        </div>
    );
}
