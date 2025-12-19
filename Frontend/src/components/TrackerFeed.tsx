import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, Globe } from "lucide-react";

interface TrackerEvent {
  id: string;
  domain: string;
  tracker: string;
  category: string;
  timestamp: Date;
  blocked: boolean;
}

const trackerCategories = [
  "Analytics",
  "Advertising",
  "Social Media",
  "Fingerprinting",
  "Session Recording",
];

const sampleDomains = [
  "facebook.com",
  "google-analytics.com",
  "doubleclick.net",
  "amazon-adsystem.com",
  "criteo.com",
  "hotjar.com",
  "mixpanel.com",
  "segment.io",
];

const generateEvent = (): TrackerEvent => ({
  id: Math.random().toString(36).substr(2, 9),
  domain: sampleDomains[Math.floor(Math.random() * sampleDomains.length)],
  tracker: `tracker_${Math.random().toString(36).substr(2, 5)}`,
  category: trackerCategories[Math.floor(Math.random() * trackerCategories.length)],
  timestamp: new Date(),
  blocked: Math.random() > 0.1,
});

export const TrackerFeed = () => {
  const [events, setEvents] = useState<TrackerEvent[]>([]);

  // useEffect(() => {
  //   // Initialize with some events
  //   const initialEvents = Array.from({ length: 5 }, generateEvent);
  //   setEvents(initialEvents);

  //   // Add new events periodically

  // }, []);

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Live Tracker Feed
        </h3>
        <span className="flex items-center gap-2 text-xs text-success">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg bg-secondary/50 transition-all duration-300",
              index === 0 && "animate-slide-in"
            )}
          >
            <div className="flex items-center gap-3">
              {event.blocked ? (
                <Shield className="w-4 h-4 text-success" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-warning" />
              )}
              <div>
                <p className="text-sm font-medium font-mono">{event.domain}</p>
                <p className="text-xs text-muted-foreground">{event.category}</p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  event.blocked
                    ? "bg-success/20 text-success"
                    : "bg-warning/20 text-warning"
                )}
              >
                {event.blocked ? "Blocked" : "Allowed"}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                {event.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
