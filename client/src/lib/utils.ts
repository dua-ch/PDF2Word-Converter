import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats file size in a human-readable format
 */
export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
}

/**
 * Formats a number with commas as thousands separators
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Determines file type icon based on mimetype
 */
export function getFileIcon(mimetype: string): string {
  if (mimetype.includes("pdf")) {
    return "ri-file-pdf-line";
  } else if (mimetype.includes("word") || mimetype.includes("msword") || mimetype.includes("openxmlformats")) {
    return "ri-file-word-line";
  } else {
    return "ri-file-line";
  }
}

/**
 * Simulates a conversion progress which updates the progress every 100ms
 * and completes in the given time frame
 */
export function simulateProgress(
  onProgress: (progress: number) => void,
  timeMs: number = 3000
): () => void {
  let progress = 0;
  const interval = 100; // Update every 100ms
  const step = 100 / (timeMs / interval);
  
  const timer = setInterval(() => {
    progress += step;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
    }
    
    onProgress(Math.min(Math.round(progress), 100));
  }, interval);
  
  // Return a function to cancel the progress simulation
  return () => clearInterval(timer);
}
