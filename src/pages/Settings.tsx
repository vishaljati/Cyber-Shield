import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Shield,
  Database,
  Palette,
  HelpCircle,
  LogOut,
  Save,
} from "lucide-react";

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const Settings = () => {
  const [notifications, setNotifications] = useState<SettingToggle[]>([
    {
      id: "tracker-alerts",
      label: "Tracker Alerts",
      description: "Get notified when new trackers are detected",
      enabled: true,
    },
    {
      id: "weekly-report",
      label: "Weekly Reports",
      description: "Receive weekly summary of blocked trackers",
      enabled: true,
    },
    {
      id: "threat-alerts",
      label: "Threat Alerts",
      description: "Immediate notification for high-risk threats",
      enabled: true,
    },
  ]);

  const [privacy, setPrivacy] = useState<SettingToggle[]>([
    {
      id: "analytics",
      label: "Anonymous Analytics",
      description: "Help improve CyberShield with anonymous usage data",
      enabled: false,
    },
    {
      id: "crash-reports",
      label: "Crash Reports",
      description: "Automatically send crash reports",
      enabled: true,
    },
  ]);

  const toggleSetting = (
    settings: SettingToggle[],
    setSettings: React.Dispatch<React.SetStateAction<SettingToggle[]>>,
    id: string
  ) => {
    setSettings(
      settings.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const SettingSection = ({
    title,
    icon: Icon,
    settings,
    setSettings,
  }: {
    title: string;
    icon: typeof Bell;
    settings: SettingToggle[];
    setSettings: React.Dispatch<React.SetStateAction<SettingToggle[]>>;
  }) => (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div>
              <p className="font-medium">{setting.label}</p>
              <p className="text-sm text-muted-foreground">
                {setting.description}
              </p>
            </div>
            <button
              onClick={() => toggleSetting(settings, setSettings, setting.id)}
              className={cn(
                "w-12 h-7 rounded-full transition-colors relative",
                setting.enabled ? "bg-primary" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 w-5 h-5 rounded-full bg-foreground transition-transform",
                  setting.enabled ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <Header title="Settings" subtitle="Configure your CyberShield preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingSection
          title="Notifications"
          icon={Bell}
          settings={notifications}
          setSettings={setNotifications}
        />

        <SettingSection
          title="Privacy & Data"
          icon={Database}
          settings={privacy}
          setSettings={setPrivacy}
        />

        {/* Theme Settings */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Appearance</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-lg bg-secondary border-2 border-primary flex flex-col items-center gap-2">
              <div className="w-full h-20 rounded-lg bg-background border border-border" />
              <span className="text-sm font-medium">Dark Mode</span>
            </button>
            <button className="p-4 rounded-lg bg-secondary border-2 border-transparent hover:border-border flex flex-col items-center gap-2 transition-colors">
              <div className="w-full h-20 rounded-lg bg-foreground border border-border" />
              <span className="text-sm font-medium text-muted-foreground">
                Light Mode
              </span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Account</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Save className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Version Info */}
          <div className="glass rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground">CyberShield</p>
            <p className="font-mono text-lg">v2.4.1</p>
            <p className="text-xs text-muted-foreground mt-2">
              © 2024 CyberShield. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
