import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const agentLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional()
});

type AgentLoginForm = z.infer<typeof agentLoginSchema>;

interface AgentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentLoginModal({ isOpen, onClose }: AgentLoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<AgentLoginForm>({
    resolver: zodResolver(agentLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const agentLogin = useMutation({
    mutationFn: async (data: AgentLoginForm) => {
      const response = await apiRequest("POST", "/api/agents/login", {
        email: data.email,
        password: data.password
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${data.agent.name}!`,
      });
      onClose();
      form.reset();
      // In a real app, you would redirect to the agent dashboard here
      alert("Login successful! Redirecting to dashboard...");
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: AgentLoginForm) => {
    agentLogin.mutate(data);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Agent Login</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="agent@finflow.com"
              className="mt-2"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...form.register("password")}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={form.watch("rememberMe")}
                onCheckedChange={(checked) => form.setValue("rememberMe", checked as boolean)}
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</Label>
            </div>
            <a href="#" className="text-sm text-finflow-primary hover:text-blue-800 transition-colors duration-200">
              Forgot password?
            </a>
          </div>
          
          <Button 
            type="submit" 
            className="w-full finflow-primary"
            disabled={agentLogin.isPending}
          >
            {agentLogin.isPending ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>Login to Dashboard
              </>
            )}
          </Button>
        </form>
        
        <div className="text-center text-sm text-gray-500">
          <p>Default credentials: agent@finflow.com / admin123</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
