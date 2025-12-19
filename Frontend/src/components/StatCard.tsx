import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
}

const variantStyles = {
  default: {
    icon: "text-primary bg-primary/10",
    trend: "text-primary",
  },
  success: {
    icon: "text-success bg-success/10",
    trend: "text-success",
  },
  warning: {
    icon: "text-warning bg-warning/10",
    trend: "text-warning",
  },
  destructive: {
    icon: "text-destructive bg-destructive/10",
    trend: "text-destructive",
  },
};

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
  className,
}: StatCardProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "glass rounded-xl p-6 transition-all duration-300 hover:border-primary/30 group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-mono tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}

        </div>
        <div
          className={cn(
            "p-3 rounded-lg transition-transform duration-300 group-hover:scale-110",
            styles.icon
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
