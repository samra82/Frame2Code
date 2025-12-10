import React, { useState } from 'react';
import Button from '../components/Button';
import { Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Use FormSubmit.co for direct email sending without backend
      const response = await fetch("https://formsubmit.co/ajax/samrashafiq16@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Frame2Code Inquiry from ${formData.name}`,
          _template: 'table' // Formats the email nicely
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 min-h-[80vh] flex flex-col justify-center">
      <div className="bg-dark-800/50 border border-white/5 rounded-3xl p-10 backdrop-blur-sm relative overflow-hidden">
        
        {/* Success Overlay */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-dark-900/95 flex flex-col items-center justify-center text-center p-8"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-slate-400 mb-6">Thanks for reaching out. I'll get back to you shortly at samrashafiq16@gmail.com.</p>
              <Button onClick={() => setStatus('idle')} variant="secondary">
                Send Another
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-3xl font-display font-bold text-white mb-2">Get in touch</h1>
        <p className="text-slate-400 mb-8">Have feedback or feature requests? Send a message directly.</p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50" 
                placeholder="john@example.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
            <textarea 
              name="message"
              rows={4} 
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50" 
              placeholder="Tell me about your project..." 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={status === 'submitting'} icon={status === 'submitting' ? <Loader2 className="animate-spin w-4 h-4"/> : <Send className="w-4 h-4" />}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </Button>
            
            {status === 'error' && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;