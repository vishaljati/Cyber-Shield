import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import { ShieldIcon } from "./ShieldIcon";
import {
  LayoutDashboard,
  Shield,
  Globe,
  Settings,
  BarChart3,
  List,
  Puzzle,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Shield, label: "Protection", path: "/protection" },
  { icon: Globe, label: "Whitelist", path: "/whitelist" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Puzzle, label: "Extension", path: "/extension" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card/50 backdrop-blur-xl border-r border-border/50 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <ShieldIcon size="md" active />
          <div>
            <h1 className="font-bold text-lg text-gradient">CyberShield</h1>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive && "scale-110"
                )}
              />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="glass rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-2">Protection Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success"></span>
          </div>
        </div>
      </div>
    </aside>
  );
};
