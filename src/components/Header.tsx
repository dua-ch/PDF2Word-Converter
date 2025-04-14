
import React, { useState, useEffect } from 'react';
import { FileText, Menu, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Header: React.FC = () => {



  return (
    <header className="w-full py-4 px-6 md:px-10 bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm fixed top-0 z-50 border-b border-gray-100 dark:border-gray-800 animate-fade-in">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold">PDF2Word<span className="text-primary">Converter</span></span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#" active>Home</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#support">Support</NavLink>
        </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active }) => {
  return (
    <a 
      href={href} 
      className={`text-sm font-medium transition-all hover:text-primary relative ${
        active ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
      }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </a>
  );
};

export default Header;
