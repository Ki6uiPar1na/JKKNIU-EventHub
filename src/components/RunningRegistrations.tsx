import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

type RegistrationItem = {
  title: string;
  description: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const items: RegistrationItem[] = [
  {
    title: "Mid Day Recruit 2026 - Registration",
    description: "Join amazing tech events — register today.",
    to: "/club-recruitment/midday",
    icon: Calendar,
    badge: "Open",
  },
  {
    title: "JKKNIU Cyber Security Club — Recruitment",
    description: "Apply to become a CSC member.",
    to: "/club-recruitment/csc",
    icon: Users,
    badge: "Open",
  },
  {
    title: "Register for Competitive Programming",
    description: "Compete and grow your problem-solving skills.",
    to: "/club-recruitment/midday",
    icon: Trophy,
    badge: "Open",
  },
];

const RunningRegistrations = () => {
  // Duplicate list for seamless marquee loop
  const loopItems = [...items, ...items];

  return (
    <section aria-label="Running registrations" className="py-6">
      <div className="container mx-auto px-4">
        <div className="marquee-container">
          <div className="marquee-track">
            {loopItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={`${item.title}-${idx}`}
                  className="w-[320px] bg-card/70 backdrop-blur-sm border-border shadow-card hover:shadow-elevated transition-smooth"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div className="min-w-0">
                        <CardTitle className="truncate">{item.title}</CardTitle>
                        <CardDescription className="truncate">{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    {item.badge && (
                      <Badge className="bg-gradient-primary text-primary-foreground">{item.badge}</Badge>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="bg-gradient-primary hover:opacity-90 glow-primary w-full">
                      <Link to={item.to}>View & Apply</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RunningRegistrations;
