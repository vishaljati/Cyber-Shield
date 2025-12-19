import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogEntry {
  id: string;
  timestamp: Date;
  domain: string;
  tracker: string;
  category: string;
  action: "blocked" | "allowed";
  source: string;
}

const generateLogs = (): LogEntry[] => {
  const categories = ["Analytics", "Advertising", "Social Media", "Fingerprinting"];
  const domains = [
    "google-analytics.com",
    "facebook.net",
    "doubleclick.net",
    "amazon-adsystem.com",
    "criteo.com",
    "hotjar.com",
  ];
  const sources = ["example.com", "news-site.com", "shopping.com", "blog.net"];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `log-${i}`,
    timestamp: new Date(Date.now() - i * 60000 * Math.random() * 10),
    domain: domains[Math.floor(Math.random() * domains.length)],
    tracker: `tracker_${Math.random().toString(36).substr(2, 6)}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    action: Math.random() > 0.1 ? "blocked" : "allowed",
    source: sources[Math.floor(Math.random() * sources.length)],
  }));
};

const Logs = () => {
  const [logs] = useState(generateLogs());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || log.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <Header
        title="Tracker Logs"
        subtitle="Detailed history of all tracker activity"
      />

      {/* Filters */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by domain or source..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Analytics">Analytics</option>
              <option value="Advertising">Advertising</option>
              <option value="Social Media">Social Media</option>
              <option value="Fingerprinting">Fingerprinting</option>
            </select>
            <Button variant="outline" size="default">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="default">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Tracker Domain
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {log.action === "blocked" ? (
                        <Shield className="w-4 h-4 text-success" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      )}
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          log.action === "blocked"
                            ? "bg-success/20 text-success"
                            : "bg-warning/20 text-warning"
                        )}
                      >
                        {log.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground font-mono">
                    {log.timestamp.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                    {log.domain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {log.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {log.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Logs;
