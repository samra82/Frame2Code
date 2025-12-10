import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Zap, Image as ImageIcon, Code2, Cpu, Sparkles, Layers, Box, Terminal, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        {/* Background Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold text-white mb-8 tracking-tight leading-[1.1]">
              Transform Wireframes into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                Production-Ready Code
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Skip the boilerplate. Upload your sketches, whiteboard photos, or Figma screenshots, and get clean, responsive Next.js & Tailwind components in seconds.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <NavLink to="/converter">
                <Button className="w-full sm:w-auto h-14 text-lg px-8 shadow-xl shadow-primary/20 hover:shadow-primary/40">
                  Generate Code Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </NavLink>
              <NavLink to="/documentation">
                <Button variant="secondary" className="w-full sm:w-auto h-14 text-lg px-8">
                  View Documentation
                </Button>
              </NavLink>
            </motion.div>

            {/* Visual Demo */}
            <motion.div variants={itemVariants} className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-3xl blur opacity-30"></div>
              <div className="relative bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {/* Left: Input Simulation */}
                  <div className="p-8 bg-dark-800/50">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                        <span className="text-sm font-mono text-slate-400">input_sketch.png</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-white/10 text-slate-400">Original</span>
                    </div>
                    {/* CSS Wireframe Representation */}
                    <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 aspect-[4/3] flex flex-col gap-4 opacity-50 relative group">
                      <div className="h-8 w-1/3 bg-slate-600 rounded"></div>
                      <div className="flex gap-4">
                        <div className="w-1/3 h-32 bg-slate-600 rounded"></div>
                        <div className="w-2/3 flex flex-col gap-3">
                          <div className="h-4 w-full bg-slate-600 rounded"></div>
                          <div className="h-4 w-5/6 bg-slate-600 rounded"></div>
                          <div className="h-4 w-4/6 bg-slate-600 rounded"></div>
                          <div className="mt-auto h-10 w-32 bg-slate-600 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <span className="bg-dark-900 px-3 py-1 text-xs text-slate-400 border border-white/10 rounded-full font-mono">Hand-drawn Sketch</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Output Simulation */}
                  <div className="p-8 bg-dark-900">
                     <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-primary" />
                        <span className="text-sm font-mono text-primary">Generated Component</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary border border-primary/20">Live Preview</span>
                    </div>
                    {/* CSS UI Representation */}
                    <div className="border border-white/5 bg-dark-800 rounded-xl p-6 aspect-[4/3] flex flex-col gap-4 shadow-lg relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-20">
                          <Code2 className="w-24 h-24 text-primary" />
                       </div>
                      <div className="h-8 w-1/3 bg-white rounded-lg mb-2"></div>
                      <div className="flex gap-4 relative z-10">
                        <div className="w-1/3 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-lg shadow-lg"></div>
                        <div className="w-2/3 flex flex-col gap-3">
                          <div className="h-4 w-full bg-slate-700 rounded"></div>
                          <div className="h-4 w-5/6 bg-slate-700 rounded"></div>
                          <div className="h-4 w-4/6 bg-slate-700 rounded"></div>
                          <div className="mt-auto h-10 w-32 bg-primary rounded-lg shadow-lg shadow-primary/20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Processing Bar */}
                <div className="bg-dark-950 px-6 py-3 border-t border-white/5 flex items-center gap-4 text-xs font-mono text-slate-500">
                  <Terminal className="w-4 h-4" />
                  <span className="text-green-400">➜</span>
                  <span>Generating component structure...</span>
                  <span className="ml-auto text-slate-600">32ms</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-dark-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Built for Modern Development</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We don't just generate HTML. We generate intelligent, semantic, and reusable React components tailored for the Next.js ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: "Instant Conversion",
                desc: "From image upload to downloadable code in under 30 seconds."
              },
              {
                icon: <Palette className="w-6 h-6 text-pink-400" />,
                title: "Tailwind CSS",
                desc: "Beautifully styled with utility classes. No messy custom CSS files."
              },
              {
                icon: <Layers className="w-6 h-6 text-blue-400" />,
                title: "Atomic Design",
                desc: "Smart component splitting for better code maintainability."
              },
              {
                icon: <Cpu className="w-6 h-6 text-primary" />,
                title: "Context Aware",
                desc: "Understands navigation flows and interactive states from static images."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-dark-900 border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-dark-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Ready to speed up your workflow?</h2>
          <p className="text-xl text-slate-400 mb-10">Join thousands of developers using AI to prototype faster.</p>
          <NavLink to="/converter">
             <Button className="h-16 text-xl px-10 rounded-full">
               Start Building for Free
             </Button>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;