import ConvertApi from 'convertapi';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { ConversionType, FileMetadata } from '@shared/schema';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Initialize ConvertAPI with API key from environment variables
const apiSecret = 'secret_yg5ADx8nlrUfrsmk';
if (!apiSecret) {
  throw new Error('CONVERTAPI_SECRET environment variable is not set');
}
const convertapi = new ConvertApi(apiSecret);

export async function convertFile(
  fileMetadata: FileMetadata,
  conversionType: string
): Promise<{
  convertedFile: FileMetadata;
  wordCount: number;
  characterCount: number;
}> {
  try {
    const inputPath = path.join(process.cwd(), "uploads", fileMetadata.filename);
    const outputExt = conversionType === ConversionType.PDF_TO_WORD ? 'docx' : 'pdf';
    const outputFilename = fileMetadata.filename.replace(/\.[^/.]+$/, `.${outputExt}`);
    const outputPath = path.join(process.cwd(), "uploads", outputFilename);

    // Perform conversion
    const result = await convertapi.convert(outputExt, {
      File: inputPath
    });

    // Download the converted file
    await result.file.save(outputPath);

    // Prepare converted file metadata
    const stats = fs.statSync(outputPath);
    const convertedFile: FileMetadata = {
      originalName: fileMetadata.originalName.replace(path.extname(fileMetadata.originalName), `.${outputExt}`),
      filename: outputFilename,
      mimetype: outputExt === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: stats.size
    };

    // Read file content for word/character counting
    const fileContent = await readFile(outputPath, 'utf8');

    // Count words and characters
    const words = fileContent.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const characterCount = fileContent.replace(/\s+/g, '').length;

    return {
      convertedFile,
      wordCount,
      characterCount
    };

  } catch (error: any) {
    console.error('Conversion error:', error);
    const errorMessage = error.message || 'Unknown error';
    throw new Error(`File conversion failed: ${errorMessage}`);
  }
}

export const scheduleCleanup = (filePaths: string[], delayMs = 3600000) => {
  setTimeout(() => {
    filePaths.forEach(filePath => {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        console.error(`Failed to delete file: ${filePath}`, error);
      }
    });
  }, delayMs);
};