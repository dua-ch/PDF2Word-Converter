import { ConversionResult, ConversionTypeValue, FileMetadata, UploadResponse } from "./types";

/**
 * Upload a file to the server
 */
export async function uploadFile(file: File): Promise<FileMetadata> {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to upload file");
  }
  
  const data: UploadResponse = await response.json();
  return data.file;
}

/**
 * Convert a file
 */
export async function convertFile(
  file: FileMetadata,
  conversionType: ConversionTypeValue
): Promise<ConversionResult> {
  const response = await fetch("/api/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file,
      conversionType,
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to convert file");
  }
  
  return await response.json();
}

/**
 * Get download URL for a file
 */
export function getDownloadUrl(filename: string): string {
  return `/api/download/${filename}`;
}
