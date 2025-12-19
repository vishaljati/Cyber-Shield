import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Globe, Check } from "lucide-react";
import { Button } from "./ui/button";

interface WhitelistEntry {
  id: string;
  domain: string;
  addedAt: Date;
}

const initialWhitelist: WhitelistEntry[] = [
  { id: "1", domain: "trusted-site.com", addedAt: new Date("2024-01-15") },
  { id: "2", domain: "my-bank.com", addedAt: new Date("2024-01-20") },
  { id: "3", domain: "work-portal.io", addedAt: new Date("2024-02-01") },
];

export const WhitelistManager = () => {
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>(initialWhitelist);
  const [newDomain, setNewDomain] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (newDomain.trim()) {
      setWhitelist([
        ...whitelist,
        {
          id: Math.random().toString(36).substr(2, 9),
          domain: newDomain.trim(),
          addedAt: new Date(),
        },
      ]);
      setNewDomain("");
      setIsAdding(false);
    }
  };

  const handleRemove = (id: string) => {
    setWhitelist(whitelist.filter((entry) => entry.id !== id));
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Check className="w-5 h-5 text-success" />
          Whitelisted Sites
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="w-4 h-4" />
          Add Site
        </Button>
      </div>

      {isAdding && (
        <div className="mb-4 flex gap-2 animate-fade-in">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="Enter domain (e.g., example.com)"
            className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button onClick={handleAdd} variant="glow" size="default">
            Add
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {whitelist.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No whitelisted sites. Add trusted domains that should bypass protection.
          </p>
        ) : (
          whitelist.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 group hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium font-mono">{entry.domain}</p>
                  <p className="text-xs text-muted-foreground">
                    Added {entry.addedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(entry.id)}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
