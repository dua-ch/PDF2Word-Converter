// Import the schemas and types from shared schema
import { 
  ConversionType,
  ConversionTypeValue,
  FileMetadata,
  ConversionResult
} from "@shared/schema";

// Re-export them for client usage
export { 
  ConversionType,
  type ConversionTypeValue,
  type FileMetadata,
  type ConversionResult
};

// Define application-specific types
export interface UploadResponse {
  file: FileMetadata;
}

export type ConversionStep = "upload" | "options" | "converting" | "results";

export interface ConversionState {
  step: ConversionStep;
  selectedFile: FileMetadata | null;
  conversionType: ConversionTypeValue;
  isConverting: boolean;
  conversionProgress: number;
  convertedFile: FileMetadata | null;
  wordCount: number;
  characterCount: number;
  errorMessage: string;
}
