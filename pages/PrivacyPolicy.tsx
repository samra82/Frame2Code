import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-900 border border-white/5 rounded-2xl p-8 md:p-12"
        >
          <h1 className="text-3xl font-display font-bold text-white mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-slate-400 leading-relaxed">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you use Frame2Code, specifically the images and wireframes you upload for conversion. We do not require account registration or store personal identification information.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. How We Use Information</h2>
              <p>Your uploaded images are processed securely using Google's Gemini API to generate the corresponding code. We do not store your uploaded images on our servers permanently; they are processed in real-time and discarded after the session.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Third-Party Services</h2>
              <p>We use Google Gemini API for AI processing. By using our service, you acknowledge that your data is shared with Google for the purpose of generating the code. Please review Google's Privacy Policy for more details on how they handle data.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Data Security</h2>
              <p>We implement reasonable security measures to protect the information we process. However, please be aware that no method of transmission over the internet is 100% secure.</p>
            </section>

             <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at samrashafiq16@gmail.com.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;