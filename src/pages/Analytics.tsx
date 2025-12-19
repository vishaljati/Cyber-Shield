import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { Shield, TrendingUp, Clock, Zap } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", blocked: 420 },
  { day: "Tue", blocked: 380 },
  { day: "Wed", blocked: 510 },
  { day: "Thu", blocked: 470 },
  { day: "Fri", blocked: 620 },
  { day: "Sat", blocked: 280 },
  { day: "Sun", blocked: 340 },
];

const categoryData = [
  { name: "Analytics", value: 45, color: "hsl(187 100% 42%)" },
  { name: "Advertising", value: 30, color: "hsl(142 76% 36%)" },
  { name: "Social Media", value: 15, color: "hsl(38 92% 50%)" },
  { name: "Fingerprinting", value: 10, color: "hsl(0 84% 60%)" },
];

const topTrackers = [
  { name: "Google Analytics", count: 1247, percentage: 32 },
  { name: "Facebook Pixel", count: 892, percentage: 23 },
  { name: "DoubleClick", count: 654, percentage: 17 },
  { name: "Amazon Ads", count: 421, percentage: 11 },
  { name: "Others", count: 643, percentage: 17 },
];

const Analytics = () => {
  return (
    <Layout>
      <Header
        title="Analytics"
        subtitle="Insights into your browsing protection"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Blocked"
          value="45,892"
          icon={Shield}
          variant="success"
        />
        <StatCard
          title="This Week"
          value="3,020"
          icon={TrendingUp}
          variant="default"
          trend={{ value: 15, positive: true }}
        />
        <StatCard
          title="Avg. Per Day"
          value="431"
          icon={Clock}
          variant="default"
        />
        <StatCard
          title="Protection Rate"
          value="98.7%"
          icon={Zap}
          variant="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187 100% 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(187 100% 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
              <XAxis
                dataKey="day"
                stroke="hsl(215 20% 55%)"
                fontSize={12}
              />
              <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222 47% 8%)",
                  border: "1px solid hsl(222 30% 18%)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stroke="hsl(187 100% 42%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBlocked)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Categories Pie */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">By Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Trackers */}
      <div className="mt-6 glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Top Blocked Trackers</h3>
        <div className="space-y-4">
          {topTrackers.map((tracker) => (
            <div key={tracker.name} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{tracker.name}</span>
                  <span className="text-sm font-mono text-muted-foreground">
                    {tracker.count.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${tracker.percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground w-12 text-right">
                {tracker.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
