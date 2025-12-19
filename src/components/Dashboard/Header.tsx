import { Bell, Search, User, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    console.log(isSignUp ? 'Sign up' : 'Login', 'submitted:', { username });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close login form"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Welcome to CyberShield</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your username"
                required
                className="w-full"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {!isSignUp && (
                  <button 
                    type="button" 
                    className="text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => console.log('Forgot password clicked')}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your password"
                required
                className="w-full"
                autoComplete="current-password"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Button type="submit" className="w-full">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </span>{' '}
              <button 
                type="button" 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-foreground hover:underline font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Header = ({ title, subtitle }: HeaderProps) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-primary-foreground font-bold">
            3
          </span>
        </Button>

        {/* Login/Signup Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => setShowLogin(true)}
        >
          <LogIn className="w-4 h-4" />
          <span className="hidden sm:inline">Login / Sign Up</span>
        </Button>

        {/* Profile */}
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>

        {/* Login/Signup Modal */}
        {showLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        )}
      </div>
    </header>
  );
};
