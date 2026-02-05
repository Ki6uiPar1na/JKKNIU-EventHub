import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Calendar, Users, Code, Mail, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Calendar },
    // { path: "/register", label: "Register", icon: Calendar },
    { path: "/developers", label: "Developers", icon: Code },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center glow-primary">
              <img src="/img/logo.png" alt="Logo" className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              JKKNIU EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  asChild
                  className="transition-smooth hover:glow-primary"
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}

            {/* Club Recruitment dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={(isActive("/club-recruitment/midday") || isActive("/club-recruitment/csc")) ? "default" : "ghost"}
                  className="transition-smooth hover:glow-primary flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Club Recruitment</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              {/* Ensure visible background and contrast */}
              <DropdownMenuContent
                align="end"
                className="min-w-[220px] bg-card/95 text-foreground backdrop-blur-md border-border shadow-elevated"
              >
                <DropdownMenuItem asChild>
                  <Link to="/club-recruitment/midday" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Midday Recruit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/club-recruitment/csc" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>CSC Recruitment</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-card/90 backdrop-blur-md border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"}
                    asChild
                    className="justify-start transition-smooth"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to={item.path} className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                );
              })}

              {/* Mobile: Club Recruitment links */}
              <Button
                variant={(isActive("/club-recruitment/midday") || isActive("/club-recruitment/csc")) ? "default" : "ghost"}
                asChild
                className="justify-start transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/club-recruitment/midday" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Club Recruitment — Midday</span>
                </Link>
              </Button>
              <Button
                variant={(isActive("/club-recruitment/midday") || isActive("/club-recruitment/csc")) ? "default" : "ghost"}
                asChild
                className="justify-start transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/club-recruitment/csc" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Club Recruitment — CSC</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;