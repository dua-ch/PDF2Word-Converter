
import React, { useState, useCallback } from 'react';
import { Upload, File, AlertCircle, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const validateFile = (file: File): boolean => {
    // Check if file is a PDF
    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return false;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);
  
  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
    // Reset the input value
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }, []);
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      {selectedFile ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 animate-scale-in shadow-elevation-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <File className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 truncate max-w-[240px] sm:max-w-sm">
                  {selectedFile.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleRemoveFile} 
              className="text-gray-500 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="mt-4 flex justify-center">
            <Button className="shadow-elevation-1 hover:shadow-elevation-2 transition-all">
              <Check className="mr-2 h-4 w-4" /> Convert to Word
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl p-8 transition-colors duration-200 ease-in-out flex flex-col items-center justify-center ${
            isDragging
              ? 'border-primary bg-primary/5'
              : error
              ? 'border-destructive/40 bg-destructive/5'
              : 'border-gray-200 bg-white hover:border-primary/50 hover:bg-primary/5'
          } animate-fade-up shadow-elevation-1`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Upload className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Drag & Drop Your PDF File</h3>
          <p className="text-gray-500 text-center mb-6 max-w-md">
            Upload your PDF file to convert to an editable Word document
          </p>
          
          {error && (
            <div className="flex items-center space-x-2 text-destructive mb-4">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              type="button"
              onClick={() => document.getElementById('file-input')?.click()}
              className="shadow-elevation-1 hover:shadow-elevation-2 transition-all"
            >
              Choose File
            </Button>
            <span className="text-sm text-gray-500">or drop file here</span>
          </div>
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
