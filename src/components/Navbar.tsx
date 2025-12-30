import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
              <Sun className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Solar Monitor</h1>
              <p className="text-xs text-muted-foreground">Minia University</p>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/login')}
            className="gradient-hero hover:opacity-90 transition-smooth"
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
