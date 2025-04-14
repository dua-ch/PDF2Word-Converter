
import React from 'react';
import Header from '@/components/Header';
import ConversionArea from '@/components/ConversionArea';
import FeaturesList from '@/components/FeaturesList';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';
import SupportSection from '@/components/SupportSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section with Converter */}
        <section className="py-16 md:py-24 px-6 md:px-10">
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
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 px-6 md:px-10 bg-gray-50">
          <PricingSection />
        </section>
        
        {/* Support Section */}
        <section id="support" className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <SupportSection />
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-12 animate-fade-up">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users say about our PDF to Word converter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-up">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-elevation-1 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-medium">JD</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "This converter saved me hours of reformatting work. The converted document maintained all my tables and images perfectly."
              </p>
              <div className="mt-4 flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-elevation-1 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-medium">AS</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Alex Smith</h4>
                  <p className="text-sm text-gray-500">Legal Assistant</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I work with legal documents daily and this tool has been a lifesaver. The conversion quality is outstanding and saves me so much time."
              </p>
              <div className="mt-4 flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-elevation-1 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-medium">MJ</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Maria Johnson</h4>
                  <p className="text-sm text-gray-500">Teacher</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As an educator, I often need to edit PDF resources. This converter makes it incredibly easy to modify materials for my students."
              </p>
              <div className="mt-4 flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i === 4 ? 'text-gray-300' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
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
              <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all">
                Start Converting Now
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
