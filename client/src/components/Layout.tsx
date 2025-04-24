import React from "react";
import TitleLink from "./TitleLink";

interface LayoutProps {
  children: React.ReactNode;
  onReset?: () => void;
}

export default function Layout({ children, onReset }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="ri-file-transfer-line text-primary text-2xl mr-2"></i>
              {onReset && <TitleLink onReset={onReset} />}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
            <p className="text-gray-500 text-sm text-center">© 2025 PDF2Word Converter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
