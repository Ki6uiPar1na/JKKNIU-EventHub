import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-surface-variant"></div>
      <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-surface-variant/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Beginner CTF 2025</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Join Amazing{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Tech Events
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Register for competitive programming contests, hackathons, workshops, and more. 
            Connect with like-minded developers and level up your skills.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-primary hover:opacity-90 glow-primary text-lg px-8 py-6 transition-bounce"
            >
              <Link to="/register" className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 transition-bounce"
            >
              <Link to="/developers" className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>View Developers</span>
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 shadow-card">
              <div className="text-3xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Events</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 shadow-card">
              <div className="text-3xl font-bold text-secondary mb-2">50+</div>
              <div className="text-muted-foreground">Participants</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 shadow-card">
              <div className="text-3xl font-bold text-accent mb-2">10+</div>
              <div className="text-muted-foreground">Achievements</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;