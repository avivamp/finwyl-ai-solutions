import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, Code, Cloud, Wrench, Zap, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const specializations = [
    {
      icon: Brain,
      title: "AI-Driven Software",
      description: "Cutting-edge artificial intelligence solutions that transform business operations and user experiences.",
      features: ["Machine Learning Models", "Natural Language Processing", "Predictive Analytics", "Computer Vision"]
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "End-to-end web and mobile applications using modern technologies like React, Node.js, and Python.",
      features: ["React & Next.js", "Node.js & Python", "Database Design", "API Development"]
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment strategies on AWS, Azure, and other platforms.",
      features: ["AWS & Azure", "Microservices", "DevOps & CI/CD", "Auto Scaling"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description: "Ongoing maintenance, updates, and technical support to keep your systems running smoothly.",
      features: ["24/7 Monitoring", "Performance Optimization", "Security Updates", "Technical Support"]
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "10+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            Building the Future with AI
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Finwyl AI specializes in cutting-edge software development, AI solutions, and cloud infrastructure 
            that transforms your business vision into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="shadow-accent-glow">
              <Zap className="w-5 h-5 mr-2" />
              Start Your Project
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">
                View Our Work
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Specializations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine expertise in modern technologies with innovative approaches to deliver exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {specializations.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-card transition-spring hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-gradient-primary rounded-lg shadow-glow">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {spec.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {spec.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {spec.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Current Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Innovative solutions we're building to solve real-world problems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border hover:shadow-card transition-spring hover:scale-105">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-4">In Development</Badge>
                <CardTitle className="text-foreground">Smart Payment Routing</CardTitle>
                <CardDescription className="text-muted-foreground">
                  AI-powered payment processing that optimizes transaction routing for better success rates and lower costs.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-card border-border hover:shadow-card transition-spring hover:scale-105">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-4">Beta Testing</Badge>
                <CardTitle className="text-foreground">AI Places Search</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Natural language location discovery platform that understands context and provides relevant recommendations.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-card border-border hover:shadow-card transition-spring hover:scale-105">
              <CardHeader>
                <Badge variant="default" className="w-fit mb-4">Production Ready</Badge>
                <CardTitle className="text-foreground">Shoppin</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Revolutionary e-commerce search that allows users to find products using natural language queries.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Why Choose Finwyl AI?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We're not just developers – we're innovation partners who understand the intersection of technology and business.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Award className="w-5 h-5 text-accent mr-3" />
                  <span className="text-foreground">Proven expertise in AI and modern technologies</span>
                </li>
                <li className="flex items-center">
                  <Users className="w-5 h-5 text-accent mr-3" />
                  <span className="text-foreground">Collaborative approach with transparent communication</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-accent mr-3" />
                  <span className="text-foreground">Fast delivery without compromising quality</span>
                </li>
                <li className="flex items-center">
                  <Cloud className="w-5 h-5 text-accent mr-3" />
                  <span className="text-foreground">Scalable solutions built for growth</span>
                </li>
              </ul>
            </div>
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Ready to Get Started?</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Let's discuss your project and how we can bring your vision to life.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/contact">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link to="/blog">
                      Read Our Blog
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
