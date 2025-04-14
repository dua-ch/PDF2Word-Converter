
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PricingSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 animate-fade-up">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">Simple, Transparent Pricing</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan that works for your needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up">
        {/* Free Plan */}
        <div className="bg-white p-8 rounded-xl shadow-elevation-1 border border-gray-100 flex flex-col h-full transform transition-all hover:shadow-elevation-2 hover:-translate-y-1">
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Basic</h3>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-bold text-gray-900">Free</span>
              <span className="text-gray-500 ml-1 mb-1">forever</span>
            </div>
            <p className="text-gray-600">Perfect for occasional use and small files</p>
          </div>
          
          <div className="space-y-4 mb-8 flex-grow">
            <Feature>Convert up to 2 files per day</Feature>
            <Feature>Max file size: 5MB</Feature>
            <Feature>Standard conversion quality</Feature>
            <Feature>Basic formatting preservation</Feature>
            <Feature>Email support</Feature>
          </div>
          
          <Button variant="outline" className="w-full">Get Started</Button>
        </div>
        
        {/* Pro Plan - Highlighted */}
        <div className="bg-white p-8 rounded-xl shadow-elevation-2 border border-primary/30 flex flex-col h-full relative transform transition-all hover:shadow-elevation-3 hover:-translate-y-1">
          <div className="absolute -top-4 left-0 right-0 flex justify-center">
            <span className="bg-primary text-white text-sm font-medium py-1 px-4 rounded-full">Most Popular</span>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Pro</h3>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-bold text-gray-900">$9.99</span>
              <span className="text-gray-500 ml-1 mb-1">/month</span>
            </div>
            <p className="text-gray-600">Great for regular use and professional needs</p>
          </div>
          
          <div className="space-y-4 mb-8 flex-grow">
            <Feature>Convert unlimited files</Feature>
            <Feature>Max file size: 50MB</Feature>
            <Feature>Enhanced conversion quality</Feature>
            <Feature>Full formatting preservation</Feature>
            <Feature>Priority email support</Feature>
            <Feature>Batch processing</Feature>
            <Feature>Secure cloud storage (7 days)</Feature>
          </div>
          
          <Button className="w-full">Choose Pro</Button>
        </div>
        
        {/* Business Plan */}
        <div className="bg-white p-8 rounded-xl shadow-elevation-1 border border-gray-100 flex flex-col h-full transform transition-all hover:shadow-elevation-2 hover:-translate-y-1">
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Business</h3>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-bold text-gray-900">$24.99</span>
              <span className="text-gray-500 ml-1 mb-1">/month</span>
            </div>
            <p className="text-gray-600">Ideal for teams and high-volume needs</p>
          </div>
          
          <div className="space-y-4 mb-8 flex-grow">
            <Feature>Everything in Pro</Feature>
            <Feature>Max file size: 200MB</Feature>
            <Feature>Premium conversion quality</Feature>
            <Feature>OCR technology included</Feature>
            <Feature>24/7 dedicated support</Feature>
            <Feature>Team management</Feature>
            <Feature>Secure cloud storage (30 days)</Feature>
            <Feature>API access</Feature>
          </div>
          
          <Button variant="outline" className="w-full">Choose Business</Button>
        </div>
      </div>
      
      {/* FAQ Note */}
      <div className="mt-12 text-center animate-fade-up">
        <p className="text-gray-600">
          Have questions about our plans? Check our <a href="#" className="text-primary font-medium hover:underline">FAQ</a> or <a href="#" className="text-primary font-medium hover:underline">contact us</a>.
        </p>
      </div>
    </div>
  );
};

interface FeatureProps {
  children: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ children }) => {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1 bg-primary/10 rounded-full p-1">
        <CheckIcon className="h-4 w-4 text-primary" />
      </div>
      <span className="text-gray-700">{children}</span>
    </div>
  );
};

export default PricingSection;
