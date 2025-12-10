import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout as LayoutIcon, Github, Twitter, Linkedin, Heart, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-dark-900/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                <LayoutIcon className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">Frame2Code</span>
            </NavLink>
            
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>Home</NavLink>
              <NavLink to="/converter" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>Converter</NavLink>
              <NavLink to="/documentation" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>Documentation</NavLink>
              <NavLink to="/about" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>About Me</NavLink>
              <NavLink to="/contact" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>Contact</NavLink>
            </div>

            <div className="md:hidden">
              {/* Mobile menu placeholder */}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow relative">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-white/5 bg-dark-900/50 backdrop-blur-sm pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <LayoutIcon className="text-white w-4 h-4" />
                </div>
                <span className="font-display font-bold text-xl text-white">Frame2Code</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Empowering developers to transform ideas into production-ready code with the power of Multimodal AI.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><NavLink to="/converter" className="hover:text-primary transition-colors">Converter</NavLink></li>
                <li><NavLink to="/documentation" className="hover:text-primary transition-colors">Features</NavLink></li>
                <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><NavLink to="/documentation" className="hover:text-primary transition-colors">Documentation</NavLink></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><NavLink to="/contact" className="hover:text-primary transition-colors">Support</NavLink></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><NavLink to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</NavLink></li>
                <li><NavLink to="/terms" className="hover:text-primary transition-colors">Terms of Service</NavLink></li>
                <li><NavLink to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</NavLink></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Frame2Code. All rights reserved.</p>
            <div className="flex items-center gap-1 text-slate-600 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" />
              <span>by Samra Shafiq</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;