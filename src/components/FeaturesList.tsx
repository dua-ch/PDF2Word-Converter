
import React from 'react';
import { Shield, Clock, Wand2, FileCheck, Zap, Laptop } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-start p-6 bg-white rounded-xl border border-gray-100 shadow-elevation-1 hover:shadow-elevation-2 transition-all hover:translate-y-[-2px]">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesList: React.FC = () => {
  const features = [
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Accurate Conversion",
      description: "Preserve formatting, images, tables, and text layout in your converted documents."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Processing",
      description: "Convert your files in seconds with our high-speed processing technology."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your files are encrypted and automatically deleted after conversion."
    },
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "Advanced OCR",
      description: "Extract text from scanned documents with our advanced OCR technology."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Batch Processing",
      description: "Convert multiple files at once to save time and boost productivity."
    },
    {
      icon: <Laptop className="h-6 w-6" />,
      title: "Works Everywhere",
      description: "Use our converter on any device - no software installation required."
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="text-center mb-12 animate-fade-up">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">Why Choose Our PDF to Word Converter</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our tool offers premium features that ensure perfect conversion every time
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
        {features.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;
