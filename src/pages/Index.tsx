
import React from 'react';
import Header from '@/components/Header';
import ConversionArea from '@/components/ConversionArea';
import FeaturesList from '@/components/FeaturesList';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section with Converter */}
        <section className="py-16 md:py-24 px-6 md:px-10" id='hero'>
          <ConversionArea />
        </section>
        
        {/* Divider with Wave Pattern */}
        <div className="relative h-16 md:h-24">
          <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 24.6842C240 74.0526 480 74.0526 720 24.6842C960 -24.6842 1200 -24.6842 1440 24.6842V74H0V24.6842Z" fill="white"/>
          </svg>
        </div>
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white px-6 md:px-10">
          <FeaturesList />
        </section>
        

        
        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 md:px-10">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-elevation-2 border border-primary/10 animate-fade-up">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900 relative">Ready to Convert Your PDF Files?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto relative">
              Join thousands of satisfied users who trust our tool for perfect PDF to Word conversions.
            </p>
            <div className="relative">
              <a href='#hero' className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all">
                Start Converting Now
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
