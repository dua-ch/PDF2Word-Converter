import { z } from "zod";

// Conversion types
export const ConversionType = {
  PDF_TO_WORD: "pdf-to-word",
  WORD_TO_PDF: "word-to-pdf",
} as const;

export type ConversionTypeValue = typeof ConversionType[keyof typeof ConversionType];

// File metadata schema
export const fileMetadataSchema = z.object({
  originalName: z.string(),
  filename: z.string(),
  mimetype: z.string(),
  size: z.number(),
});

export type FileMetadata = z.infer<typeof fileMetadataSchema>;

// Conversion result schema
export const conversionResultSchema = z.object({
  originalFile: fileMetadataSchema,
  convertedFile: fileMetadataSchema,
  wordCount: z.number(),
  characterCount: z.number(),
  conversionType: z.enum([ConversionType.PDF_TO_WORD, ConversionType.WORD_TO_PDF]),
});

export type ConversionResult = z.infer<typeof conversionResultSchema>;

// Conversion request schema
export const conversionRequestSchema = z.object({
  conversionType: z.enum([ConversionType.PDF_TO_WORD, ConversionType.WORD_TO_PDF]),
});

export type ConversionRequest = z.infer<typeof conversionRequestSchema>;
