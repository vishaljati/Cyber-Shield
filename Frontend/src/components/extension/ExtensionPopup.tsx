import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExtensionPopup = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Load extension state from storage
    chrome.storage.sync.get(['settings'], (result) => {
      if (result.settings) {
        setIsActive(result.settings.protectionEnabled);
      }
    });
  }, []);

  const toggleProtection = () => {
    const newState = !isActive;
    setIsActive(newState);
    
    // Save to storage
    chrome.storage.sync.get(['settings'], (result) => {
      const settings = result.settings || {};
      chrome.storage.sync.set({
        settings: {
          ...settings,
          protectionEnabled: newState
        }
      });
    });
  };

  return (
    <div className="w-80 p-4 bg-background text-foreground">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Titan Shield</h2>
        <div className="flex items-center">
          <span className="mr-2 text-sm">
            {isActive ? 'Active' : 'Inactive'}
          </span>
          <Button 
            variant={isActive ? 'destructive' : 'default'}
            size="sm"
            onClick={toggleProtection}
          >
            {isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      </div>

      <nav className="mb-4">
        <ul className="flex space-x-2 text-sm">
          <li>
            <Link to="/" className="hover:underline">Overview</Link>
          </li>
          <li>•</li>
          <li>
            <Link to="/whitelist" className="hover:underline">Whitelist</Link>
          </li>
          <li>•</li>
          <li>
            <Link to="/settings" className="hover:underline">Settings</Link>
          </li>
        </ul>
      </nav>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            View Dashboard
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Check Current Page
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Report False Positive
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtensionPopup;
