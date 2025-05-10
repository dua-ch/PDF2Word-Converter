import { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { upload } from "./middlewares/fileUpload";
import { convertFile, scheduleCleanup } from "./services/fileConversion";
import path from "path";
import fs from "fs";
import { conversionRequestSchema, fileMetadataSchema, conversionResultSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Handle file uploads
  app.post("/api/upload", upload.single("file"), (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Create file metadata
      const fileMetadata = fileMetadataSchema.parse({
        originalName: req.file.originalname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      res.status(200).json({ file: fileMetadata });
    } catch (error) {
      console.error("Error uploading file:", error);
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid file data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to upload file", error: error.message });
    }
  });

  // Handle file conversion
  app.post("/api/convert", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const { conversionType } = conversionRequestSchema.parse(req.body);
      const fileMetadata = fileMetadataSchema.parse(req.body.file);

      // Convert the file
      const { convertedFile, wordCount, characterCount } = await convertFile(
        fileMetadata,
        conversionType
      );

      // Prepare the conversion result
      const result = conversionResultSchema.parse({
        originalFile: fileMetadata,
        convertedFile,
        wordCount,
        characterCount,
        conversionType
      });

      // Schedule cleanup of both files after 1 hour
      const originalFilePath = path.join(uploadsDir, fileMetadata.filename);
      const convertedFilePath = path.join(uploadsDir, convertedFile.filename);
      scheduleCleanup([originalFilePath, convertedFilePath], 3600000);

      res.status(200).json(result);
    } catch (error) {
      console.error("Error converting file:", error);
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: error instanceof Error ? error.message : "Failed to convert file" });
    }
  });

  // Serve converted files for download
  app.get("/api/download/:filename", (req: Request, res: Response) => {
    try {
      const { filename } = req.params;
      
      // Sanitize the filename to prevent directory traversal attacks
      const sanitizedFilename = path.basename(filename);
      const filePath = path.join(uploadsDir, sanitizedFilename);
      
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
      }

      // Get the file MIME type
      const mimeType = path.extname(filename) === '.pdf' ? 'application/pdf' : 'application/octet-stream';
      res.setHeader("Content-Type", mimeType);
      
      // Set appropriate headers for the file download
      res.setHeader("Content-Disposition", `attachment; filename="${sanitizedFilename}"`);
      
      // Send the file
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).json({ message: "Failed to send file" });
        } else {
          // Cleanup the file after sending it
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file after download:", err);
          });
        }
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).json({ message: "Failed to download file", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
