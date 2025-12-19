import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { ExtensionPopup } from "@/components/ExtensionPopup";
import { Download, Chrome, Globe, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Extension = () => {
  return (
    <Layout>
      <Header
        title="Browser Extension"
        subtitle="Download and manage the CyberShield extension"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Extension Preview */}
        <div className="glass rounded-xl p-8">
          <h3 className="text-lg font-semibold mb-6 text-center">
            Extension Preview
          </h3>
          <ExtensionPopup />
        </div>

        {/* Download Options */}
        <div className="space-y-6">
          {/* Chrome */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Chrome className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Chrome Extension</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Install CyberShield for Google Chrome and Chromium-based browsers.
                </p>
                <Button variant="shield" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Install for Chrome
                </Button>
              </div>
            </div>
          </div>

          {/* Firefox */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Globe className="w-8 h-8 text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Firefox Add-on</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Install CyberShield for Mozilla Firefox browser.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Install for Firefox
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="glass rounded-xl p-6 border-dashed">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <Smartphone className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Mobile App</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Mobile protection coming soon. Join the waitlist to be notified.
                </p>
                <Button variant="secondary" className="w-full" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold mb-4">Extension Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold font-mono text-primary">v2.4.1</p>
                <p className="text-xs text-muted-foreground">Version</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">50K+</p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-success">4.8★</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Extension;
