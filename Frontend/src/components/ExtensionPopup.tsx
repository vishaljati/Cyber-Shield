import { useState } from "react";
import { cn } from "@/lib/utils";
import { ShieldIcon } from "./ShieldIcon";
import { Power, Settings, ExternalLink, ChevronDown } from "lucide-react";

export const ExtensionPopup = () => {
  const [isActive, setIsActive] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const stats = {
    today: 247,
    thisWeek: 1823,
    total: 45892,
  };

  return (
    <div className="glass rounded-xl overflow-hidden max-w-[320px] mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldIcon size="sm" active={isActive} />
            <span className="font-semibold text-gradient">CyberShield</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Toggle */}
        <div className="flex flex-col items-center mb-6">
          <div
            className={cn(
              "mb-4 cursor-pointer transition-all duration-300",
              isActive ? "scale-100" : "scale-95 opacity-70"
            )}
            onClick={() => setIsActive(!isActive)}
          >
            <ShieldIcon size="lg" active={isActive} />
          </div>

          <button
            onClick={() => setIsActive(!isActive)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              isActive
                ? "bg-success/20 text-success"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Power className="w-3 h-3" />
            {isActive ? "Protection ON" : "Protection OFF"}
          </button>
        </div>

        {/* Current Site */}
        <div className="glass rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Current Site</p>
              <p className="text-sm font-mono">example.com</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
              Protected
            </span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            <span className="text-success font-medium">12</span> trackers blocked
          </div>
        </div>

        {/* Stats */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
        >
          <span className="text-sm">Trackers Blocked</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-primary">{stats.today}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                showDetails && "rotate-180"
              )}
            />
          </div>
        </button>

        {showDetails && (
          <div className="mt-2 space-y-2 animate-fade-in">
            <div className="flex justify-between p-2 rounded-lg bg-secondary/50">
              <span className="text-xs text-muted-foreground">Today</span>
              <span className="text-xs font-mono">{stats.today}</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-secondary/50">
              <span className="text-xs text-muted-foreground">This Week</span>
              <span className="text-xs font-mono">{stats.thisWeek}</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-secondary/50">
              <span className="text-xs text-muted-foreground">All Time</span>
              <span className="text-xs font-mono">{stats.total}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border/50 bg-secondary/30">
        <button className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
          Open Dashboard
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
