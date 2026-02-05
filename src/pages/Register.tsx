import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hub: choose a registration form */}
      <section className="bg-gradient-to-br from-background via-surface to-surface-variant py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge className="bg-gradient-primary text-primary-foreground">Club Recruitment</Badge>
            <h1 className="mt-4 text-4xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">
              Choose a Registration Form
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pick the form you want to apply to. Each card takes you to a dedicated page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Midday Recruit Card */}
            <Card className="bg-card/60 backdrop-blur-sm border-border shadow-card hover:shadow-elevated transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
                    <Calendar className="w-5 h-5" />
                  </span>
                  <div>
                    <CardTitle>Midday Recruit</CardTitle>
                    <CardDescription>MidDay Programming Club</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Open to eligible participants</li>
                  <li>Submit basic info and payment details</li>
                  <li><strong>Fee:</strong> 200 Tk</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="bg-gradient-primary hover:opacity-90 glow-primary">
                  <Link to="/club-recruitment/midday">Open Midday Form</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* CSC Recruitment Card */}
            <Card className="bg-card/60 backdrop-blur-sm border-border shadow-card hover:shadow-elevated transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
                    <Users className="w-5 h-5" />
                  </span>
                  <div>
                    <CardTitle>CSC Recruitment</CardTitle>
                    <CardDescription>JKKNIU Cyber Security Club</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Open for all (within JKKNIU)</li>
                  <li>Includes status check and bKash option</li>
                  <li><strong>Fee:</strong> 250 Tk</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="bg-gradient-primary hover:opacity-90 glow-primary">
                  <Link to="/club-recruitment/csc">Open CSC Form</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Register;