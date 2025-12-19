import { StatCard } from "@/components/StatCard";
import { TrackerFeed } from "@/components/TrackerFeed";
import { ProtectionToggle } from "@/components/ProtectionToggle";
import { Shield, Eye, Globe, AlertTriangle } from "lucide-react";

interface DashboardProps {
  stats?: {
    trackersBlocked: string | number;
    sitesProtected: string | number;
    fingerprintAttempts: string | number;
    threatsDetected: string | number;
  };
  showProtectionToggle?: boolean;
  showTrackerFeed?: boolean;
}

export const Dashboard = ({
  stats = {
    trackersBlocked: "2,847",
    sitesProtected: "156",
    fingerprintAttempts: "89",
    threatsDetected: "12"
  },
  showProtectionToggle = true,
  showTrackerFeed = true
}: DashboardProps) => {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Trackers Blocked Today"
          value={stats.trackersBlocked.toString()}
          icon={Shield}
          variant="success"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Sites Protected"
          value={stats.sitesProtected.toString()}
          icon={Globe}
          variant="default"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Fingerprint Attempts"
          value={stats.fingerprintAttempts.toString()}
          icon={Eye}
          variant="warning"
          trend={{ value: 23, positive: false }}
        />
        <StatCard
          title="Threats Detected"
          value={stats.threatsDetected.toString()}
          icon={AlertTriangle}
          variant="destructive"
          subtitle="Action recommended"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {showTrackerFeed && (
          <div className="lg:col-span-2">
            <TrackerFeed />
          </div>
        )}
        {showProtectionToggle && (
          <div>
            <ProtectionToggle />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
