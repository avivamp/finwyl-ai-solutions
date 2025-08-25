import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminButton from "@/components/AdminButton";
import ProjectEditor from "@/components/ProjectEditor";
import { CreditCard, MapPin, ShoppingCart, ExternalLink } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Projects = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "Smart Payment Routing",
      description: "Intelligent payment processing system that automatically routes transactions through the most efficient payment gateways, reducing costs and improving success rates.",
      icon: "CreditCard",
      status: "In Development",
      technologies: ["Node.js", "Python", "AI/ML", "PostgreSQL", "Redis"],
      features: [
        "Real-time routing optimization",
        "Cost reduction algorithms", 
        "Failure prediction & prevention",
        "Multi-gateway integration"
      ]
    },
    {
      id: "2",
      title: "AI Places Search",
      description: "Advanced location discovery platform powered by AI that understands natural language queries and provides contextually relevant place recommendations.",
      icon: "MapPin",
      status: "Beta Testing",
      technologies: ["React", "Python", "OpenAI", "Google Maps API", "FastAPI"],
      features: [
        "Natural language processing",
        "Contextual recommendations",
        "Real-time location data",
        "User preference learning"
      ]
    },
    {
      id: "3",
      title: "Shoppin - Natural Language Product Search",
      description: "Revolutionary e-commerce search platform that allows users to find products using natural language queries, making online shopping more intuitive and efficient.",
      icon: "ShoppingCart",
      status: "Production Ready",
      technologies: ["React", "Node.js", "Elasticsearch", "AI/ML", "AWS"],
      features: [
        "Natural language search",
        "Visual product matching",
        "Price comparison",
        "Personalized recommendations"
      ]
    }
  ]);

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated");
    setIsAdmin(adminAuth === "true");
    
    // Load projects from Firebase
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const firebaseProjects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (firebaseProjects.length > 0) {
        setProjects(firebaseProjects as any);
      }
    } catch (error) {
      console.log("Using default projects data");
    }
  };

  const handleAdminAuth = () => {
    setIsAdmin(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
              Our Current Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Innovative solutions we're building to solve real-world problems through AI and modern technology
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project) => {
                const getIconComponent = (iconName: string) => {
                  switch(iconName) {
                    case "CreditCard": return CreditCard;
                    case "MapPin": return MapPin;
                    case "ShoppingCart": return ShoppingCart;
                    default: return CreditCard;
                  }
                };
                const IconComponent = typeof project.icon === 'string' 
                  ? getIconComponent(project.icon) 
                  : project.icon;
                return (
                  <Card key={project.id} className="bg-gradient-card border-border hover:shadow-card transition-spring hover:scale-105 relative group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-primary rounded-lg shadow-glow">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <Badge 
                          variant={project.status === "Production Ready" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Key Features</h4>
                          <ul className="space-y-1">
                            {project.features.map((feature, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button variant="outline" className="w-full mt-4">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can bring your innovative ideas to life with cutting-edge technology
            </p>
            <Button variant="hero" size="lg">
              Start Your Project
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      
      {!isAdmin && <AdminButton onAuthenticated={handleAdminAuth} />}
      {isAdmin && <ProjectEditor projects={projects} onProjectsChange={setProjects} />}
    </div>
  );
};

export default Projects;