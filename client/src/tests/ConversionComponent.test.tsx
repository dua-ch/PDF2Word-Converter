import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConversionOptions from "@/components/ConversionOptions";
import { ConversionType, FileMetadata } from "@/lib/types";


const mockFile: FileMetadata = {
  originalName: "sample.pdf",
  filename: "sample.pdf", 
  size: 1024,
  mimetype: "application/pdf",
};

const mockOnConversionTypeChange = jest.fn();
const mockOnStartConversion = jest.fn();
const mockOnBackToUpload = jest.fn();

describe("ConversionOptions", () => {
  it("should render conversion options and handle PDF to Word conversion", () => {
    render(
      <ConversionOptions
        selectedFile={mockFile}
        conversionType={ConversionType.PDF_TO_WORD}
        onConversionTypeChange={mockOnConversionTypeChange}
        onStartConversion={mockOnStartConversion}
        onBackToUpload={mockOnBackToUpload}
      />
    );

    // Check if the component renders correctly
    expect(screen.getByText("Conversion Options")).toBeInTheDocument();
    expect(screen.getByText("sample.pdf")).toBeInTheDocument();
    expect(screen.getByText("PDF to Word")).toBeInTheDocument();
    expect(screen.getByText("Word to PDF")).toBeInTheDocument();

    // Simulate changing conversion type
    fireEvent.click(screen.getByLabelText("Word to PDF"));
    expect(mockOnConversionTypeChange).toHaveBeenCalledWith(ConversionType.WORD_TO_PDF);

    // Simulate starting conversion
    fireEvent.click(screen.getByText("Convert Document"));
    expect(mockOnStartConversion).toHaveBeenCalled();
  });
});
