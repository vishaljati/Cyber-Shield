import { Layout } from "@/components/Layout";
import { Header } from "@/components/Dashboard/Header";
import { WhitelistManager } from "@/components/WhitelistManager";
import { Shield, AlertTriangle } from "lucide-react";

const Whitelist = () => {
  return (
    <Layout>
      <Header
        title="Whitelist Management"
        subtitle="Manage trusted sites that bypass protection"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WhitelistManager />
        </div>

        <div className="space-y-4">
          {/* Info Card */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">About Whitelisting</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Whitelisted sites will not have their trackers blocked. Only add sites
              you fully trust, such as your bank or employer portals.
            </p>
          </div>

          {/* Warning Card */}
          <div className="glass rounded-xl p-6 border-warning/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <h3 className="font-semibold">Caution</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Whitelisted sites can track your activity. Make sure you understand
              the privacy implications before adding a site.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Whitelist;
