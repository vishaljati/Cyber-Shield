import { useState } from "react";
import { cn } from "@/lib/utils";
import { ShieldIcon } from "./ShieldIcon";
import { Power } from "lucide-react";

export const ProtectionToggle = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="glass rounded-xl p-8 flex flex-col items-center justify-center">
      <div className="relative mb-6">
        {/* Rotating ring */}
        {isActive && (
          <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-primary/30 animate-shield" />
        )}
        
        {/* Shield */}
        <div
          className={cn(
            "transition-all duration-500 cursor-pointer",
            isActive ? "animate-float" : "opacity-60"
          )}
          onClick={() => setIsActive(!isActive)}
        >
          <ShieldIcon size="xl" active={isActive} />
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">
        {isActive ? "Protection Active" : "Protection Disabled"}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        {isActive
          ? "Your browsing is secure. Trackers are being blocked."
          : "Click to enable protection against trackers."}
      </p>

      <button
        onClick={() => setIsActive(!isActive)}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-medium",
          isActive
            ? "bg-success/20 text-success hover:bg-success/30 glow-success"
            : "bg-destructive/20 text-destructive hover:bg-destructive/30"
        )}
      >
        <Power className="w-4 h-4" />
        {isActive ? "Enabled" : "Disabled"}
      </button>
    </div>
  );
};
