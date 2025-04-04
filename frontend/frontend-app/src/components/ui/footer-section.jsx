import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Switch } from "./switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react";

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  // const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
            <p className="mb-6 text-muted-foreground">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative">
              <Input type="email" placeholder="Enter your email" className="pr-12 backdrop-blur-sm" />
              <Button type="submit" size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              {['Home', 'About Us', 'Services', 'Products', 'Contact'].map((link, index) => (
                <a key={index} href="#" className="block transition-colors hover:text-primary">{link}</a>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@example.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              {[{ icon: Facebook, label: "Facebook" }, { icon: Twitter, label: "Twitter" }, { icon: Instagram, label: "Instagram" }, { icon: Linkedin, label: "LinkedIn" }].map((social, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <social.icon className="h-4 w-4" />
                        <span className="sr-only">{social.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on {social.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">Toggle dark mode</Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 Your Company. All rights reserved.</p>
          <nav className="flex gap-4 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((policy, index) => (
              <a key={index} href="#" className="transition-colors hover:text-primary">{policy}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
