import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Software Development",
      excerpt: "Explore how artificial intelligence is revolutionizing the way we build software, from automated code generation to intelligent debugging.",
      author: "John Smith",
      date: "March 15, 2024",
      category: "AI & Technology",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "Building Scalable Payment Systems: Lessons Learned",
      excerpt: "Our journey building Smart Payment Routing and the architectural decisions that enabled us to process millions of transactions reliably.",
      author: "Sarah Johnson",
      date: "March 10, 2024",
      category: "Engineering",
      readTime: "8 min read",
      featured: false
    },
    {
      id: 3,
      title: "Natural Language Processing in E-commerce Search",
      excerpt: "How we implemented NLP to make product discovery more intuitive in our Shoppin platform, improving user experience by 300%.",
      author: "Mike Chen",
      date: "March 5, 2024",
      category: "Machine Learning",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 4,
      title: "Cloud Infrastructure Best Practices for Startups",
      excerpt: "Essential cloud architecture patterns and cost optimization strategies for scaling your startup infrastructure on AWS and Azure.",
      author: "Emily Davis",
      date: "February 28, 2024",
      category: "Cloud & DevOps",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 5,
      title: "The Rise of Location Intelligence",
      excerpt: "Understanding how AI-powered location services are transforming industries from retail to logistics and beyond.",
      author: "David Wilson",
      date: "February 22, 2024",
      category: "AI & Technology",
      readTime: "4 min read",
      featured: false
    },
    {
      id: 6,
      title: "Full-Stack Development in 2024: Modern Trends",
      excerpt: "Latest trends in full-stack development, from serverless architectures to JAMstack and the tools that are shaping the future.",
      author: "Lisa Rodriguez",
      date: "February 18, 2024",
      category: "Web Development",
      readTime: "9 min read",
      featured: false
    }
  ];

  const categories = [
    "All",
    "AI & Technology", 
    "Engineering",
    "Machine Learning",
    "Cloud & DevOps",
    "Web Development"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
              Insights & Innovation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the latest trends in AI, software development, and technology through our expert insights and real-world experiences.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {blogPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="bg-gradient-card border-border shadow-card mb-12">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="default" className="bg-gradient-accent">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground hover:text-accent transition-smooth cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="outline">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => !post.featured).map((post) => (
                <Card key={post.id} className="bg-gradient-card border-border hover:shadow-card transition-spring hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground hover:text-accent transition-smooth">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Stay Updated
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest insights on AI, technology, and software development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-input text-foreground"
              />
              <Button variant="hero">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;