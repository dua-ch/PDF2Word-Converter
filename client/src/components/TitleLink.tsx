import React from 'react';

interface TitleLinkProps {
  onReset: () => void;
}

const TitleLink: React.FC<TitleLinkProps> = ({ onReset }) => {
  return (
    <div className="text-center">
      <a 
        href="/" 
        onClick={(e) => {
          e.preventDefault();
          onReset();
        }}
        className="inline-block"
      >
        <h1 className="text-xl font-medium text-gray-800">PDF2Word Converter</h1>
      </a>
    </div>
  );
};

export default TitleLink; 