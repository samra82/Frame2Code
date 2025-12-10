import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Cpu, Eye, Zap, Code2, GitBranch, Globe, Database, Lock, ArrowRight, Layers, FileJson } from 'lucide-react';

const Documentation: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-300 text-xs font-mono uppercase tracking-wider">System Architecture v1.0</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
            The Engineering Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
              Frame2Code
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            We are bridging the gap between static design and dynamic execution using Gemini 3 Pro's multimodal capabilities. 
            Explore how we transform raw pixels into semantic, production-grade React components.
          </motion.p>
        </motion.div>

        {/* The Core Engine Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="relative bg-dark-800/30 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-6">Multimodal Vision Engine</h2>
                <div className="prose prose-invert text-slate-400">
                  <p className="mb-4">
                    At the heart of Frame2Code lies <strong>Gemini 3 Pro</strong>, a state-of-the-art multimodal model. Unlike traditional OCR which only reads text, Gemini "sees" the UI like a human designer does.
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <Eye className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span>
                        <strong className="text-white block">Visual Hierarchy Analysis</strong>
                        Identifies container relationships, grid systems, and flexbox alignments automatically.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Layers className="w-6 h-6 text-secondary shrink-0 mt-1" />
                      <span>
                        <strong className="text-white block">Component Recognition</strong>
                        Distinguishes between navigation bars, cards, modals, and form inputs based on visual context.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Code2 className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                      <span>
                        <strong className="text-white block">Semantic Code Mapping</strong>
                        Translates visual elements directly into semantic HTML5 and Tailwind utility classes.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Abstract Visualization */}
              <div className="relative h-[400px] bg-dark-900 rounded-2xl border border-white/10 p-6 flex flex-col justify-between group">
                {/* Simulated Wireframe Input */}
                <div className="absolute top-6 left-6 w-32 h-40 bg-dark-800 rounded-lg border border-white/5 p-2 transform -rotate-6 transition-transform group-hover:rotate-0 duration-500">
                  <div className="w-full h-2 bg-slate-700 rounded mb-2" />
                  <div className="w-2/3 h-2 bg-slate-700 rounded" />
                </div>
                
                {/* Connection Line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                
                {/* Simulated Code Output */}
                <div className="absolute bottom-6 right-6 w-48 h-48 bg-[#0d1117] rounded-lg border border-white/10 p-4 font-mono text-[10px] text-slate-400 transform rotate-3 transition-transform group-hover:rotate-0 duration-500 shadow-2xl">
                  <span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-400">App</span>() {'{'}
                  <br />&nbsp;&nbsp;<span className="text-purple-400">return</span> (
                  <br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">div</span> <span className="text-slate-500">className</span>="<span className="text-blue-300">flex</span>"&gt;
                  <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
                  <br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-green-400">div</span>&gt;
                  <br />&nbsp;&nbsp;)
                  <br />{'}'}
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
                  <Cpu className="w-10 h-10 text-white relative z-10" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Architecture Specs */}
        <div className="mb-32">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-center text-white mb-16"
          >
            Technical Stack Specification
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Globe className="w-6 h-6 text-blue-400" />,
                title: "Next.js 14",
                desc: "We generate code using the App Router architecture, ensuring modern routing, server components, and optimal performance out of the box."
              },
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: "Tailwind CSS",
                desc: "Styling is handled via utility classes. No arbitrary CSS files. We use standard Tailwind config for maximum portability."
              },
              {
                icon: <FileJson className="w-6 h-6 text-green-400" />,
                title: "Type Safety",
                desc: "All generated code includes TypeScript interfaces for props and data structures, reducing runtime errors."
              },
              {
                icon: <Layers className="w-6 h-6 text-purple-400" />,
                title: "Lucide Icons",
                desc: "We integrate the Lucide React library for consistent, clean, and lightweight SVG iconography."
              },
              {
                icon: <GitBranch className="w-6 h-6 text-orange-400" />,
                title: "Atomic Structure",
                desc: "Code is split into reusable components (Buttons, Cards, Navbars) rather than a single monolithic file."
              },
              {
                icon: <Database className="w-6 h-6 text-red-400" />,
                title: "Zero Config",
                desc: "The output zip file includes a pre-configured package.json. Just 'npm install' and 'npm run dev'."
              }
            ].map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-dark-900/50 border border-white/5 p-6 rounded-2xl hover:bg-dark-800 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-dark-800 rounded-lg border border-white/5">
                    {spec.icon}
                  </div>
                  <h3 className="font-bold text-white">{spec.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {spec.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-white mb-16">The Conversion Pipeline</h2>
          
          <div className="space-y-12 relative before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-primary before:to-secondary before:opacity-20 md:before:left-1/2">
            {[
              {
                step: "01",
                title: "Ingestion & Pre-processing",
                desc: "Images are optimized and encoded. We handle multiple screens simultaneously to understand the full user flow."
              },
              {
                step: "02",
                title: "Semantic Analysis",
                desc: "Gemini 3 Pro segments the UI into logical regions (Header, Hero, Footer) and identifies repeating patterns."
              },
              {
                step: "03",
                title: "Code Synthesis",
                desc: "The AI writes the React code, iterating on class names to match the visual style (colors, spacing, typography) of the original sketch."
              },
              {
                step: "04",
                title: "Bundling",
                desc: "Files are organized into a standard project structure, zipped, and prepared for instant download."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center md:justify-between gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="hidden md:block w-5/12" />
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-dark-900 border-4 border-dark-800 flex items-center justify-center z-10 shadow-xl shadow-black/50">
                  <span className="font-display font-bold text-white">{item.step}</span>
                </div>
                <div className="w-full md:w-5/12 pl-20 md:pl-0">
                  <div className="bg-dark-800/50 border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Documentation;