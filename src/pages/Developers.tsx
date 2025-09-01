import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, Code, Palette, Database, Cpu } from "lucide-react";

const developers = [
  {
    id: 1,
    name: "Md. Khairul Islam",
    role: "Cyber Security Enthusiast | CTF Player | Security Researcher | Competitive Programmer",
    department: "Computer Science & Engineering",
    session: "2021-22",
    bio: "CSE undergraduate passionate about competitive programming, cybersecurity, and building impactful applications. Experienced in Android development, web technologies and problem solving.",
    skills: ["Java", "Android", "Firebase", "PHP", "Laravel", "React", "Node.js", "MongoDB"],
    contact: {
      email: "Ki6uiPar1na@proton.me",
      github: "Ki6uiPar1na",
      linkedin: "mdkhairulislamtushar",
    },
    icon: Code,
    image: "/img/khairul.jpeg",  // 👈 add image path
  },
  {
    id: 2,
    name: "Md. Jahid Hassan Khan Ornob",
    role: "Web Developer | Software Developer",
    department: "Computer Science & Engineering",
    session: "2021-22",
    bio: "CSE undergraduate passionate about cybersecurity, and building impactful applications. Experienced in Android development, web technologies and problem solving.",
    skills: ["Java", "Firebase", "PHP", "Laravel", "React", "Node.js", "MongoDB"],
    contact: {
      email: "khanornob20@gmail.com",
      github: "monoNai",
      linkedin: "ornob-khan-bb268a284",
    },
    icon: Code,
    image: "/img/ornob.jpg",  // 👈 add image path
  }
];



const Developers = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-background via-surface to-surface-variant">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet Our{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Developers
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The talented team behind EventHub. We're passionate developers who love creating 
              amazing experiences for tech events and the developer community.
            </p>
          </div>
        </div>
      </section>

      {/* Developers Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {developers.map((dev) => {
              const IconComponent = dev.icon;
              return (
                <Card key={dev.id} className="bg-card/50 backdrop-blur-sm border-border shadow-card hover:shadow-elevated transition-smooth group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      {/* Developer Image */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={dev.image}
                          alt={dev.name}
                          className="w-full h-full object-cover border-2 border-primary/30"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold mb-2">{dev.name}</CardTitle>
                        <div className="space-y-1">
                          <p className="text-primary font-semibold">{dev.role}</p>
                          <p className="text-muted-foreground text-sm">{dev.department}</p>
                          <p className="text-muted-foreground text-sm">Session: {dev.session}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  
                  <CardContent className="space-y-6">
                    {/* Bio */}
                    <p className="text-muted-foreground">{dev.bio}</p>
                    
                    {/* Skills */}
                    <div>
                      <h4 className="font-semibold mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {dev.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Contact */}
                    <div>
                      <h4 className="font-semibold mb-3">Contact</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" asChild className="hover:glow-primary">
                          <a href={`mailto:${dev.contact.email}`} target="_blank" rel="noopener noreferrer">
                            <Mail className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="outline" size="icon" asChild className="hover:glow-primary">
                          <a href={`https://github.com/${dev.contact.github}`} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="outline" size="icon" asChild className="hover:glow-primary">
                          <a href={`https://linkedin.com/in/${dev.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Developers;