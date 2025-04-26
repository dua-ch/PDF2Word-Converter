import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileMetadata } from "@/lib/types";
import { uploadFile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileSelected: (file: FileMetadata) => void;
}

export default function FileUpload({ onFileSelected }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  
const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
  
    const file = acceptedFiles[0];
  
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB.",
        variant: "destructive",
      });
      return;
    }
  
    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
  
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      setIsUploading(true);
      const uploadedFile = await uploadFile(file);
      onFileSelected(uploadedFile);
      } catch (error) {
        toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
       });
    } finally {
     setIsUploading(false);
    }
  }, [onFileSelected, toast]);
  
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isUploading,
  });
  
  return (
    <div className="mb-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Document</h2>
          <p className="text-gray-500 mb-6">
            Upload a PDF or Word document to convert it to another format or analyze its content.
          </p>
          
          {/* File upload dropzone */}
          <div 
            {...getRootProps()} 
            className={`file-upload-container rounded-lg p-8 mb-6 text-center cursor-pointer ${
              isDragActive ? "border-primary bg-blue-50" : "border-dashed border-gray-200"
            }`}
          >
            <input {...getInputProps()} data-testid="file-input" />
            <input {...getInputProps()} />
            <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2"></i>
            <p className="text-gray-700 font-medium mb-1">
              {isDragActive ? "Drop the file here" : "Drag and drop your file here"}
            </p>
            <p className="text-gray-500 text-sm mb-4">or</p>
            <Button 
              disabled={isUploading}
              className="bg-primary hover:bg-blue-600 text-white"
            >
              {isUploading ? "Uploading..." : "Browse Files"}
            </Button>
            <p className="text-gray-500 text-xs mt-4">Supported formats: PDF, DOCX, DOC</p>
          </div>
          
          {/* Upload limitations info */}
          <div className="bg-gray-50 rounded-md p-4">
            <div className="flex items-start">
              <i className="ri-information-line text-gray-400 mt-0.5 mr-2"></i>
              <div>
                <p className="text-gray-600 text-sm">
                  Max file size: 10MB. The conversion process may take a moment depending on the file size and complexity.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
