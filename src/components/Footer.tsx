import { Link } from "react-router-dom";
import { Brain, Mail, Linkedin, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                Finwyl AI
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Specializing in AI-driven software development, full-stack solutions, 
              and cloud infrastructure. Building the future of technology.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-smooth"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-smooth"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-smooth">
                  AI Development
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-smooth">
                  Full Stack Development
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-smooth">
                  Cloud Solutions
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-smooth">
                  Maintenance & Support
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/projects" 
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Finwyl AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;