import React from 'react';
import { motion } from 'framer-motion';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-900 border border-white/5 rounded-2xl p-8 md:p-12"
        >
          <h1 className="text-3xl font-display font-bold text-white mb-8">Cookie Policy</h1>
          <div className="space-y-6 text-slate-400 leading-relaxed">
             <p>Last updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. What Are Cookies</h2>
              <p>Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. How We Use Cookies</h2>
              <p>Frame2Code primarily uses local storage technology to maintain your session state (such as your UI preferences) to improve your experience. We do not use intrusive third-party tracking cookies for advertising purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Managing Cookies</h2>
              <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;