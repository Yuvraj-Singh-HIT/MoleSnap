import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "emerald" | "blue" | "purple" | "orange";
}

export function GlowingCard({ children, className, glowColor = "emerald" }: GlowingCardProps) {
  const glowColors = {
    emerald: "hover:shadow-[0_0_50px_hsl(160_84%_39%/0.3)]",
    blue: "hover:shadow-[0_0_50px_hsl(217_91%_60%/0.3)]",
    purple: "hover:shadow-[0_0_50px_hsl(271_81%_56%/0.3)]",
    orange: "hover:shadow-[0_0_50px_hsl(25_95%_53%/0.3)]",
  };

  return (
    <div
      className={cn(
        "relative p-6 rounded-2xl glass transition-all duration-500",
        glowColors[glowColor],
        className
      )}
    >
      {children}
    </div>
  );
}

interface GridBackgroundProps {
  title: ReactNode;
  description: string;
  children?: ReactNode;
  className?: string;
}

export function GridBackground({ title, description, children, className }: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative p-12 rounded-3xl glass-strong overflow-hidden",
        className
      )}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      
      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
        {children}
      </div>
    </div>
  );
}
