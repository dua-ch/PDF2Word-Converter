
import React from 'react';
import { MessageCircle, Mail, HelpCircle, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";

const SupportSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 animate-fade-up">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">Need Help?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're here to assist you with any questions or issues you might have
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up">
        {/* Help Center */}
        <div className="bg-white p-8 rounded-xl shadow-elevation-1 border border-gray-100 transition-all hover:shadow-elevation-2">
          <div className="flex items-start mb-6">
            <div className="bg-primary/10 p-3 rounded-lg mr-4">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Help Center</h3>
              <p className="text-gray-600">Browse our comprehensive knowledge base for answers to common questions</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">Visit Help Center</Button>
        </div>
        
        {/* Email Support */}
        <div className="bg-white p-8 rounded-xl shadow-elevation-1 border border-gray-100 transition-all hover:shadow-elevation-2">
          <div className="flex items-start mb-6">
            <div className="bg-primary/10 p-3 rounded-lg mr-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600">Reach out to our team directly for personalized assistance with your issues</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">Contact Us</Button>
        </div>
        
        {/* Live Chat */}
        <div className="bg-white p-8 rounded-xl shadow-elevation-1 border border-gray-100 transition-all hover:shadow-elevation-2">
          <div className="flex items-start mb-6">
            <div className="bg-primary/10 p-3 rounded-lg mr-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600">Chat with our support team in real-time for immediate assistance</p>
            </div>
          </div>
          <Button className="w-full">Start Chat</Button>
        </div>
        
        {/* Documentation */}
        <div className="bg-white p-8 rounded-xl shadow-elevation-1 border border-gray-100 transition-all hover:shadow-elevation-2">
          <div className="flex items-start mb-6">
            <div className="bg-primary/10 p-3 rounded-lg mr-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600">Explore our detailed guides and documentation for in-depth information</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">View Documentation</Button>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-16 animate-fade-up">
        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-900">Frequently Asked Questions</h3>
        <div className="space-y-6 max-w-4xl mx-auto">
          <FAQ 
            question="How accurate is the PDF to Word conversion?" 
            answer="Our conversion engine maintains high accuracy, preserving formatting, images, tables, and text layouts. For complex documents, we recommend reviewing the output to ensure perfect formatting."
          />
          <FAQ 
            question="Is there a file size limit for conversion?" 
            answer="Yes, there are file size limits based on your plan. Free users can convert files up to 5MB, Pro users up to 50MB, and Business users up to 200MB per file."
          />
          <FAQ 
            question="How is my data protected during conversion?" 
            answer="We take data security seriously. All uploaded files are encrypted, processed in secure servers, and automatically deleted after processing. We never share your files with third parties."
          />
          <FAQ 
            question="Can I convert password-protected PDF files?" 
            answer="Yes, but you'll need to enter the password during the upload process to allow our system to process the file. We don't store the password after conversion."
          />
          <FAQ 
            question="How long does the conversion process take?" 
            answer="Most conversions complete within seconds to a minute, depending on the file size and complexity. Larger files with many images may take slightly longer to process."
          />
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="mt-16 bg-white p-8 rounded-xl shadow-elevation-1 border border-gray-100 max-w-3xl mx-auto animate-fade-up">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">Still Have Questions?</h3>
        <p className="text-center text-gray-600 mb-8">
          Fill out the form below and our support team will get back to you within 24 hours
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                placeholder="Your email address"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              id="subject" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
              placeholder="How can we help you?"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              rows={5} 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
              placeholder="Please describe your issue in detail"
            ></textarea>
          </div>
          <Button className="w-full py-3">Send Message</Button>
        </form>
      </div>
    </div>
  );
};

interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: React.FC<FAQProps> = ({ question, answer }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-sm transition-shadow">
      <h4 className="font-medium text-gray-900 mb-2">{question}</h4>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
};

export default SupportSection;
