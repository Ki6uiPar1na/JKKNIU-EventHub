import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                JKKNIU EventHub
              </span>
            </div>
            <p className="text-muted-foreground">
              Your gateway to amazing tech events, workshops, and competitions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-muted-foreground hover:text-primary transition-smooth">
                Home
              </a>
              <a href="/register" className="block text-muted-foreground hover:text-primary transition-smooth">
                Register
              </a>
              <a href="/developers" className="block text-muted-foreground hover:text-primary transition-smooth">
                Developers
              </a>
            </div>
          </div>

          {/* Events */}
          <div>
            <h3 className="font-semibold mb-4">Events</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-smooth">
                Competitive Programming
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-smooth">
                Capture The Flag
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-smooth">
                Hackathons
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-smooth">
                Workshops
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">JKKNIU Campus</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+8801609853998</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Ki6uiPar1na@proton.me</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © 2024 JKKNIU EventHub. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="ghost" size="icon" className="hover:glow-primary">
              <Github className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:glow-primary">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:glow-primary">
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;