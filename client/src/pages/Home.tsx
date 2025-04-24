import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import ConversionOptions from "@/components/ConversionOptions";
import ConversionProgress from "@/components/ConversionProgress";
import ConversionResults from "@/components/ConversionResults";
import ErrorState from "@/components/ErrorState";

import { ConversionState, ConversionType, ConversionTypeValue, FileMetadata, ConversionResult } from "@/lib/types";
import { simulateProgress } from "@/lib/utils";
import { convertFile } from "@/lib/api";

export default function Home() {
  const [state, setState] = useState<ConversionState>({
    step: "upload",
    selectedFile: null,
    conversionType: ConversionType.PDF_TO_WORD,
    isConverting: false,
    conversionProgress: 0,
    convertedFile: null,
    wordCount: 0,
    characterCount: 0,
    errorMessage: "",
  });
  
  // Store cancel function for cleanup
  const [cancelProgress, setCancelProgress] = useState<(() => void) | null>(null);
  
  // Clean up progress simulation when component unmounts
  useEffect(() => {
    return () => {
      if (cancelProgress) {
        cancelProgress();
      }
    };
  }, [cancelProgress]);
  
  // Reset error state
  const handleDismissError = () => {
    setState((prev) => ({
      ...prev,
      errorMessage: "",
    }));
  };
  
  // Handle file selection from upload component
  const handleFileSelected = (file: FileMetadata) => {
    setState((prev) => ({
      ...prev,
      step: "options",
      selectedFile: file,
      errorMessage: "",
    }));
    
    // Auto-detect conversion type based on file
    const isPdf = file.mimetype === "application/pdf";
    setState((prev) => ({
      ...prev,
      conversionType: isPdf ? ConversionType.PDF_TO_WORD : ConversionType.WORD_TO_PDF,
    }));
  };
  
  // Handle conversion type change
  const handleConversionTypeChange = (type: ConversionTypeValue) => {
    setState((prev) => ({
      ...prev,
      conversionType: type,
    }));
  };
  
  // Go back to file upload
  const handleBackToUpload = () => {
    setState((prev) => ({
      ...prev,
      step: "upload",
      selectedFile: null,
    }));
  };
  
  // Start the conversion process
  const handleStartConversion = async () => {
    if (!state.selectedFile) return;
    
    setState((prev) => ({
      ...prev,
      step: "converting",
      isConverting: true,
      conversionProgress: 0,
      errorMessage: "",
    }));
    
    // Start progress simulation
    const cancel = simulateProgress((progress) => {
      setState((prev) => ({
        ...prev,
        conversionProgress: progress,
      }));
    });
    
    setCancelProgress(() => cancel);
    
    try {
      // Perform the actual conversion
      const result = await convertFile(state.selectedFile, state.conversionType);
      
      // Ensure progress reaches 100% before showing results
      setState((prev) => ({
        ...prev,
        conversionProgress: 100,
      }));
      
      // Slight delay to show 100% progress before showing results
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          step: "results",
          isConverting: false,
          convertedFile: result.convertedFile,
          wordCount: result.wordCount,
          characterCount: result.characterCount,
        }));
      }, 500);
    } catch (error) {
      // Handle error
      setState((prev) => ({
        ...prev,
        isConverting: false,
        errorMessage: error instanceof Error ? error.message : "Failed to convert file",
      }));
    } finally {
      // Clean up progress simulation
      cancel();
      setCancelProgress(null);
    }
  };
  
  // Start a new conversion
  const handleNewConversion = () => {
    setState({
      step: "upload",
      selectedFile: null,
      conversionType: ConversionType.PDF_TO_WORD,
      isConverting: false,
      conversionProgress: 0,
      convertedFile: null,
      wordCount: 0,
      characterCount: 0,
      errorMessage: "",
    });
  };
  
  return (
    <Layout onReset={handleNewConversion}>
      {/* Show error state if there's an error */}
      {state.errorMessage && (
        <ErrorState 
          errorMessage={state.errorMessage}
          onDismiss={handleDismissError}
        />
      )}
      
      {/* File upload step */}
      {state.step === "upload" && !state.errorMessage && (
        <FileUpload onFileSelected={handleFileSelected} />
      )}
      
      {/* Conversion options step */}
      {state.step === "options" && state.selectedFile && !state.errorMessage && (
        <ConversionOptions
          selectedFile={state.selectedFile}
          conversionType={state.conversionType}
          onConversionTypeChange={handleConversionTypeChange}
          onStartConversion={handleStartConversion}
          onBackToUpload={handleBackToUpload}
        />
      )}
      
      {/* Conversion progress step */}
      {state.step === "converting" && state.isConverting && !state.errorMessage && (
        <ConversionProgress progress={state.conversionProgress} />
      )}
      
      {/* Results step */}
      {state.step === "results" && state.convertedFile && !state.errorMessage && (
        <ConversionResults
          result={{
            originalFile: state.selectedFile!,
            convertedFile: state.convertedFile,
            wordCount: state.wordCount,
            characterCount: state.characterCount,
            conversionType: state.conversionType,
          }}
          onNewConversion={handleNewConversion}
        />
      )}

     
    </Layout>
  );
}
