import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { ProtectionToggle } from "@/components/ProtectionToggle";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Shield, Eye, Cookie, Fingerprint, Wifi, Code } from "lucide-react";

interface ProtectionFeature {
  id: string;
  name: string;
  description: string;
  icon: typeof Shield;
  enabled: boolean;
  level: "essential" | "recommended" | "advanced";
}

const initialFeatures: ProtectionFeature[] = [
  {
    id: "trackers",
    name: "Tracker Blocking",
    description: "Block known tracking scripts and pixels",
    icon: Shield,
    enabled: true,
    level: "essential",
  },
  {
    id: "cookies",
    name: "Third-party Cookies",
    description: "Block cookies from external domains",
    icon: Cookie,
    enabled: true,
    level: "essential",
  },
  {
    id: "fingerprinting",
    name: "Fingerprint Protection",
    description: "Prevent browser fingerprinting attempts",
    icon: Fingerprint,
    enabled: true,
    level: "recommended",
  },
  {
    id: "webrtc",
    name: "WebRTC Leak Prevention",
    description: "Hide your real IP address from WebRTC",
    icon: Wifi,
    enabled: false,
    level: "advanced",
  },
  {
    id: "scripts",
    name: "Script Blocking",
    description: "Block suspicious JavaScript execution",
    icon: Code,
    enabled: false,
    level: "advanced",
  },
  {
    id: "invisible",
    name: "Invisible Pixel Blocking",
    description: "Block 1x1 tracking pixels",
    icon: Eye,
    enabled: true,
    level: "recommended",
  },
];

const levelStyles = {
  essential: "border-success/30 bg-success/5",
  recommended: "border-primary/30 bg-primary/5",
  advanced: "border-warning/30 bg-warning/5",
};

const levelBadges = {
  essential: "bg-success/20 text-success",
  recommended: "bg-primary/20 text-primary",
  advanced: "bg-warning/20 text-warning",
};

const Protection = () => {
  const [features, setFeatures] = useState(initialFeatures);

  const toggleFeature = (id: string) => {
    setFeatures(
      features.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  return (
    <Layout>
      <Header
        title="Protection Settings"
        subtitle="Configure your privacy protection features"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Protection Toggle */}
        <div className="lg:col-span-1">
          <ProtectionToggle />
        </div>

        {/* Features Grid */}
        <div className="lg:col-span-2">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">Protection Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all cursor-pointer hover:scale-[1.02]",
                    levelStyles[feature.level],
                    feature.enabled && "ring-1 ring-primary/50"
                  )}
                  onClick={() => toggleFeature(feature.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <feature.icon
                      className={cn(
                        "w-5 h-5",
                        feature.enabled ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full capitalize",
                          levelBadges[feature.level]
                        )}
                      >
                        {feature.level}
                      </span>
                      <div
                        className={cn(
                          "w-10 h-6 rounded-full transition-colors relative",
                          feature.enabled ? "bg-primary" : "bg-muted"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-foreground transition-transform",
                            feature.enabled ? "translate-x-5" : "translate-x-1"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium mb-1">{feature.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Protection;
