import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Code, Terminal, Coffee, Heart, ExternalLink, Github, Linkedin, Mail, Globe, Award, Bot } from 'lucide-react';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';

const AboutMe: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-dark-800/30 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm overflow-hidden mb-12"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="w-40 h-40 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
               <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center overflow-hidden relative group">
                 <img 
                   src="./profile.png" 
                   alt="Samra Shafiq" 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                   onError={(e) => {
                     // Fallback if image fails to load
                     e.currentTarget.style.display = 'none';
                     e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                     const icon = document.createElement('div');
                     icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                     e.currentTarget.parentElement?.appendChild(icon);
                   }}
                 />
               </div>
            </div>
            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-slate-300 text-xs font-mono uppercase tracking-wider">Open for Opportunities</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Samra Shafiq</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-xl mb-6">
               Frontend Engineer & UI/UX enthusiast. Passionate about building AI-powered applications that bridge the gap between design and code.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a href="https://github.com/samra82/" target="_blank" rel="noreferrer" className="p-2 bg-dark-900 rounded-lg border border-white/10 hover:border-primary/50 hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/samrashafiq16/" target="_blank" rel="noreferrer" className="p-2 bg-dark-900 rounded-lg border border-white/10 hover:border-primary/50 hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <NavLink to="/contact">
                   <Button variant="secondary" className="h-10 px-6 text-sm">
                     <Mail className="w-4 h-4 mr-2" />
                     Contact Me
                   </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-900 border border-white/5 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-primary" />
                Who I Am
              </h2>
              <div className="prose prose-invert text-slate-400">
                <p className="mb-4">
                  I am a passionate software engineer with a deep love for creating intuitive and beautiful user interfaces. I specialize in the modern JavaScript ecosystem, particularly React, Next.js, and TypeScript.
                </p>
                <p>
                  My journey began with a curiosity about how the web works, which quickly turned into an obsession with pixel-perfect implementations. I believe that good code is like art—it should be clean, expressive, and impactful. Frame2Code is a testament to my drive to innovate and solve real-world problems for developers.
                </p>
              </div>
            </motion.div>

             {/* Experience Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-dark-900 border border-white/5 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-secondary" />
                Hackathon Experience
              </h2>
              <div className="space-y-8">
                <div className="relative pl-8 border-l border-white/10 pb-2">
                  <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-primary" />
                  <h3 className="text-lg font-bold text-white">NASA International Space Apps Challenge</h3>
                  <p className="text-primary text-sm mb-2">Participant • 2025</p>
                  <p className="text-slate-400 text-sm">
                    Participated in the world's largest annual global hackathon. Collaborated with a multidisciplinary team to build innovative solutions addressing real-world challenges on Earth and in space using NASA's open data.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-white/10 pb-2">
                  <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <h3 className="text-lg font-bold text-white">NASA International Space Apps Challenge</h3>
                  <p className="text-slate-500 text-sm mb-2">Participant • 2024</p>
                  <p className="text-slate-400 text-sm">
                    Engaged in intense 48-hour problem-solving and rapid prototyping. Developed creative applications and visualizations to solve critical space-related problems, demonstrating strong teamwork and technical agility.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Details */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-dark-900 border border-white/5 rounded-2xl p-6"
            >
              <h3 className="font-bold text-white mb-4">Details</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  Pakistan
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  Available for Hire
                </li>
              </ul>
            </motion.div>

            {/* Skills */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-dark-900 border border-white/5 rounded-2xl p-6"
            >
              <h3 className="font-bold text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript','Express js', 'Tailwind', 'Node.js','Sanity','mongodb','Framer Motion', 'Figma', 'Git', 'AI Integration'].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

             {/* Interests */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-dark-900 border border-white/5 rounded-2xl p-6"
            >
              <h3 className="font-bold text-white mb-4">Interests</h3>
              <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-sm text-slate-400">
                  <Bot className="w-4 h-4 text-purple-400" /> Artificial Intelligence
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-400">
                  <Code className="w-4 h-4 text-blue-400" /> Open Source
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-400">
                  <Award className="w-4 h-4 text-amber-500" /> Hackathons
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-400">
                  <Heart className="w-4 h-4 text-pink-500" /> UI Design
                </li>
                 <li className="flex items-center gap-2 text-sm text-slate-400">
                  <Coffee className="w-4 h-4 text-emerald-400" /> Tea Enthusiast
                </li>
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutMe;