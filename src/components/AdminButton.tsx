import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminButtonProps {
  onAuthenticated: () => void;
}

const AdminButton = ({ onAuthenticated }: AdminButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simple password check - in production, use proper authentication
    const adminPassword = "admin123"; // Change this to your desired password
    
    if (password === adminPassword) {
      localStorage.setItem("adminAuthenticated", "true");
      onAuthenticated();
      setIsOpen(false);
      setPassword("");
      toast({
        title: "Success",
        description: "Admin access granted",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="fixed bottom-4 right-4 z-50"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Access</DialogTitle>
          <DialogDescription>
            Enter the admin password to manage content
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <Button onClick={handleLogin} disabled={isLoading}>
            <LogIn className="w-4 h-4 mr-2" />
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminButton;