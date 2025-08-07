import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import backend from '~backend/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any, token: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => 
      backend.portfolio.login(data),
    onSuccess: (response) => {
      onLoginSuccess(response.user, response.token);
      setLoginData({ email: '', password: '' });
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: { email: string; password: string; name: string }) => 
      backend.portfolio.register(data),
    onSuccess: (response) => {
      toast({
        title: 'Registration Successful',
        description: response.message,
      });
      setRegisterData({ email: '', password: '', name: '' });
      // Auto-switch to login tab
      const loginTab = document.querySelector('[data-state="inactive"]') as HTMLElement;
      loginTab?.click();
    },
    onError: (error: any) => {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }
    loginMutation.mutate(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.email || !registerData.password || !registerData.name) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }
    if (registerData.password.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }
    registerMutation.mutate(registerData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-gray-100">
            Access Aaron's Portfolio
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-700">
            <TabsTrigger value="login" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Register
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-gray-200">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Enter your email"
                  disabled={loginMutation.isPending}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 pr-10"
                    placeholder="Enter your password"
                    disabled={loginMutation.isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-400">
              <p>Demo credentials:</p>
              <p>Email: admin@aaron.dev</p>
              <p>Password: admin123</p>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4 mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-gray-200">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Enter your full name"
                  disabled={registerMutation.isPending}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-gray-200">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Enter your email"
                  disabled={registerMutation.isPending}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showRegisterPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 pr-10"
                    placeholder="Enter your password (min 6 characters)"
                    disabled={registerMutation.isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
