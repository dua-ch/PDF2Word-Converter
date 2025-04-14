
import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import FileUploader from './FileUploader';
import { Button } from "@/components/ui/button";

const ConversionArea: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsConverted(false);
  };
  
  const handleConversion = () => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      setIsConverted(true);
    }, 2000);
  };
  
  const handleDownload = () => {
    // In a real app, this would trigger a file download
    console.log('Downloading converted file...');
    
    // Reset the state after "download"
    setTimeout(() => {
      setSelectedFile(null);
      setIsConverted(false);
    }, 1000);
  };
  
  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-up">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <Sparkles className="mr-1 h-3 w-3" />
          Convert PDF to Word in seconds
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
          PDF to Word Converter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Convert your PDF documents to editable Word files with perfect formatting
        </p>
      </div>
      
      <div className="mb-8">
        {isConverted ? (
          <div className="max-w-lg mx-auto bg-white rounded-xl p-8 text-center border border-gray-100 shadow-elevation-2 animate-scale-in">
            <div className="w-16 h-16 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">Conversion Complete!</h3>
            <p className="text-gray-600 mb-6">Your file has been successfully converted to Word format.</p>
            <Button 
              onClick={handleDownload}
              className="shadow-elevation-1 hover:shadow-elevation-2 transition-all"
            >
              Download Word Document
            </Button>
          </div>
        ) : (
          <FileUploader onFileSelect={handleFileSelect} />
        )}
      </div>
      
      {selectedFile && !isConverted && (
        <div className="text-center animate-fade-in">
          <Button 
            onClick={handleConversion}
            disabled={isConverting}
            className="shadow-elevation-1 hover:shadow-elevation-2 transition-all"
          >
            {isConverting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Converting...
              </>
            ) : (
              <>
                Convert to Word <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConversionArea;
