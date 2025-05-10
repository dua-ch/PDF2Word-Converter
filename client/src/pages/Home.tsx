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
  
  const [cancelProgress, setCancelProgress] = useState<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (cancelProgress) {
        cancelProgress(); // Cleanup progress simulation on unmount
      }
    };
  }, [cancelProgress]);

  const handleDismissError = () => {
    setState((prev) => ({
      ...prev,
      errorMessage: "",
    }));
  };

  const handleFileSelected = (file: FileMetadata) => {
    setState((prev) => ({
      ...prev,
      step: "options",
      selectedFile: file,
      errorMessage: "",
      conversionProgress: 0,  // Reset progress when new file is selected
    }));

    // Auto-detect conversion type based on file mimetype
    const isPdf = file.mimetype === "application/pdf"; 
    setState((prev) => ({
      ...prev,
      conversionType: isPdf ? ConversionType.PDF_TO_WORD : ConversionType.WORD_TO_PDF,
    }));
  };

  const handleConversionTypeChange = (type: ConversionTypeValue) => {
    setState((prev) => ({
      ...prev,
      conversionType: type,
    }));
  };

  const handleBackToUpload = () => {
    setState((prev) => ({
      ...prev,
      step: "upload",
      selectedFile: null,
      conversionProgress: 0,  // Reset progress when going back to upload
    }));
  };

  const handleStartConversion = async () => {
    if (!state.selectedFile) return;

    // Check if file exceeds size limit (e.g., 10MB)
    if (state.selectedFile.size > 10 * 1024 * 1024) {
      setState((prev) => ({
        ...prev,
        errorMessage: "File size exceeds 10MB. Please upload a smaller file.",
      }));
      return;
    }

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

      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          step: "results",
          isConverting: false,
          convertedFile: result.convertedFile,
          wordCount: result.wordCount,
          characterCount: result.characterCount,
        }));
      }, 500);  // Delay to show 100% progress before moving to results
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isConverting: false,
        errorMessage: error instanceof Error ? error.message : "Failed to convert file",
      }));
    } finally {
      cancel();  // Clean up progress simulation
      setCancelProgress(null);
    }
  };

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
      {state.errorMessage && (
        <ErrorState errorMessage={state.errorMessage} onDismiss={handleDismissError} />
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
