import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload from '@/components/FileUpload'; // Adjust the import based on your file structure
import React from 'react';

test('renders UI elements correctly', () => {
  render(<FileUpload onFileSelected={jest.fn()} />);

  const fileInput = screen.getByText(/drag and drop your file here/i);
  const browseButton = screen.getByText(/browse files/i);
  const uploadInfo = screen.getByText(/supported formats: pdf, docx, doc/i);
  const fileSizeInfo = screen.getByText(/max file size: 10mb/i);

  expect(fileInput).toBeInTheDocument();
  expect(browseButton).toBeInTheDocument();
  expect(uploadInfo).toBeInTheDocument();
  expect(fileSizeInfo).toBeInTheDocument();
});
