import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConversionResult, ConversionType } from "@/lib/types";
import { formatFileSize, formatNumber, getFileIcon } from "@/lib/utils";
import { getDownloadUrl } from "@/lib/api";

interface ConversionResultsProps {
  result: ConversionResult;
  onNewConversion: () => void;
}

export default function ConversionResults({ result, onNewConversion }: ConversionResultsProps) {
  const { originalFile, convertedFile, wordCount, characterCount, conversionType } = result;
  
  const handleDownload = () => {
    // Create link and trigger download
    const downloadLink = document.createElement("a");
    downloadLink.href = getDownloadUrl(convertedFile.filename);
    downloadLink.download = convertedFile.originalName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  
  return (
    <div className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Conversion Complete</h2>
            <button 
              className="text-primary hover:text-blue-700 text-sm font-medium flex items-center"
              onClick={onNewConversion}
            >
              Convert another file
            </button>
          </div>
          
          {/* Success message */}
          <div className="p-4 bg-green-50 border border-green-100 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="ri-checkbox-circle-fill text-secondary text-lg"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Your file has been successfully converted!
                </p>
              </div>
            </div>
          </div>
          
          {/* Original and converted file information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Original file */}
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md">
                  <i className={`${getFileIcon(originalFile.mimetype)} text-xl text-gray-500`}></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Original File</h3>
                  <p className="text-xs text-gray-500">{originalFile.originalName}</p>
                </div>
              </div>
            </div>
            
            {/* Converted file */}
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md">
                  <i className={`${getFileIcon(convertedFile.mimetype)} text-xl text-gray-500`}></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Converted File</h3>
                  <p className="text-xs text-gray-500">{convertedFile.originalName}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  className="px-4 py-2 bg-primary text-white text-sm"
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
          
          {/* Document statistics */}
          <div className="bg-gray-50 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Document Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Word Count</p>
                <p className="text-lg font-medium text-gray-900">{formatNumber(wordCount)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Character Count</p>
                <p className="text-lg font-medium text-gray-900">{formatNumber(characterCount)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
