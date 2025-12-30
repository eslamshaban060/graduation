import { Battery, Zap, LineChart, Shield, Cloud, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/solar-hero.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-Time Monitoring",
      description: "Track your solar station performance with live data updates and instant alerts"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive reports and insights for optimizing energy production"
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Battery Management",
      description: "Monitor battery health, charge levels, and optimize storage efficiency"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Inverter Control",
      description: "Remote control and monitoring of all inverters and controllers"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Weather Integration",
      description: "Real-time weather data to predict and optimize power generation"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-medium text-sm">Smart Energy Management</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Monitor Your
                <span className="block gradient-hero bg-clip-text text-transparent">
                  Solar Station
                </span>
                Efficiently
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Advanced monitoring and control system for solar power stations. 
                Real-time data visualization, intelligent analytics, and comprehensive management tools.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="gradient-hero hover:opacity-90 transition-smooth text-lg px-8 py-6 shadow-glow"
                >
                  Get Started
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 hover:border-primary hover:text-primary transition-smooth"
                >
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-primary">Real-time</div>
                  <div className="text-sm text-muted-foreground">Updates</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 gradient-hero opacity-20 blur-3xl rounded-full"></div>
              <img 
                src={heroImage} 
                alt="Solar Power Station" 
                className="relative rounded-2xl shadow-card hover-glow transition-smooth"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to monitor and optimize your solar power station
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 bg-card rounded-xl border border-border hover:border-primary transition-smooth hover-scale shadow-card hover:shadow-glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-lg gradient-hero flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-smooth">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-12 sm:p-16 text-center shadow-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-glow/20 to-transparent"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground">
                Ready to Optimize Your Solar Station?
              </h2>
              <p className="text-xl text-primary-foreground/90">
                Join engineers and administrators monitoring their solar stations efficiently
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-background text-primary hover:bg-background/90 transition-smooth text-lg px-8 py-6 mt-4"
              >
                Start Monitoring Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 Smart Solar Monitor - Minia University. All rights reserved.</p>
          <p className="mt-2">Supervised by Dr. Ebtisam</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
