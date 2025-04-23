import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ConversionType, ConversionTypeValue, FileMetadata } from "@/lib/types";
import { formatFileSize, getFileIcon } from "@/lib/utils";

interface ConversionOptionsProps {
  selectedFile: FileMetadata;
  conversionType: ConversionTypeValue;
  onConversionTypeChange: (type: ConversionTypeValue) => void;
  onStartConversion: () => void;
  onBackToUpload: () => void;
}

export default function ConversionOptions({
  selectedFile,
  conversionType,
  onConversionTypeChange,
  onStartConversion,
  onBackToUpload,
}: ConversionOptionsProps) {
  return (
    <div className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Conversion Options</h2>
            <button 
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
              onClick={onBackToUpload}
            >
              <i className="ri-arrow-left-line mr-1"></i> Change file
            </button>
          </div>
          
          {/* Selected file info */}
          <div className="flex items-center p-4 bg-gray-50 rounded-md mb-6">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md">
              <i className={`${getFileIcon(selectedFile.mimetype)} text-xl text-gray-500`}></i>
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.originalName}</p>
              <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          
          {/* Conversion type selection */}
          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700 mb-2">Select conversion type:</Label>
            <RadioGroup
              value={conversionType}
              onValueChange={(value) => onConversionTypeChange(value as ConversionTypeValue)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className={`border rounded-md p-4 flex items-center cursor-pointer ${
                conversionType === ConversionType.PDF_TO_WORD ? 'border-primary bg-blue-50' : 'border-gray-200'
              }`}>
                <RadioGroupItem
                  value={ConversionType.PDF_TO_WORD}
                  id="pdf-to-word"
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="ml-3">
                  <Label htmlFor="pdf-to-word" className="block text-sm font-medium text-gray-700">PDF to Word</Label>
                  <span className="block text-xs text-gray-500">Convert PDF document to editable Word format</span>
                </div>
              </div>
              
              <div className={`border rounded-md p-4 flex items-center cursor-pointer ${
                conversionType === ConversionType.WORD_TO_PDF ? 'border-primary bg-blue-50' : 'border-gray-200'
              }`}>
                <RadioGroupItem
                  value={ConversionType.WORD_TO_PDF}
                  id="word-to-pdf"
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="ml-3">
                  <Label htmlFor="word-to-pdf" className="block text-sm font-medium text-gray-700">Word to PDF</Label>
                  <span className="block text-xs text-gray-500">Convert Word document to portable PDF format</span>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end">
            <Button
              className="px-5 py-2 bg-primary text-white"
              onClick={onStartConversion}
            >
              Convert Document
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
