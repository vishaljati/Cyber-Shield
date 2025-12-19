import { cn } from "@/lib/utils";

interface ShieldIconProps {
  className?: string;
  active?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-20 h-20",
  xl: "w-32 h-32",
};

export const ShieldIcon = ({ className, active = true, size = "md" }: ShieldIconProps) => {
  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Glow effect */}
      {active && (
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
      )}
      
      {/* Shield SVG */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          "relative z-10 w-full h-full transition-all duration-300",
          active ? "text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]" : "text-muted-foreground"
        )}
      >
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="100%" stopColor="hsl(187 100% 60%)" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L4 5.5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5.5L12 2Z"
          fill={active ? "url(#shieldGradient)" : "currentColor"}
          fillOpacity={active ? 0.2 : 0.1}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {active && (
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
};
