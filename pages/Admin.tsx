import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Trash2, Mail, Search, AlertCircle, RefreshCw, LogOut } from 'lucide-react';
import Button from '../components/Button';

interface Message {
  id: string;
  date: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Define your admin password here
  const ADMIN_PASSWORD = "admin";

  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
    }
  }, [isAuthenticated]);

  const loadMessages = () => {
    const data = localStorage.getItem('frame2code_db');
    if (data) {
      // Sort by newest first
      const parsed = JSON.parse(data) as Message[];
      setMessages(parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('frame2code_db', JSON.stringify(updated));
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-900 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4 border border-white/5">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-slate-400 text-sm">Restricted Area</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-center tracking-widest"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm justify-center">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <Button type="submit" className="w-full">
              Unlock Database
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Message Database</h1>
          <p className="text-slate-400">Manage incoming inquiries securely.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={loadMessages} icon={<RefreshCw className="w-4 h-4" />}>
            Refresh
          </Button>
          <Button variant="secondary" onClick={() => setIsAuthenticated(false)} icon={<LogOut className="w-4 h-4" />}>
            Logout
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or content..."
          className="w-full bg-dark-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-900 border border-white/5 p-6 rounded-xl">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Total Messages</h3>
          <p className="text-3xl font-bold text-white">{messages.length}</p>
        </div>
        <div className="bg-dark-900 border border-white/5 p-6 rounded-xl">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Unread</h3>
          <p className="text-3xl font-bold text-primary">{messages.length}</p> {/* Simplified for demo */}
        </div>
        <div className="bg-dark-900 border border-white/5 p-6 rounded-xl">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Database Status</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white font-medium">Active (Local)</span>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-dark-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        {filteredMessages.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-500">
            <Mail className="w-12 h-12 mb-4 opacity-20" />
            <p>No messages found in database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-dark-800 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sender</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {new Date(msg.date).toLocaleDateString()} <br/>
                      <span className="text-xs text-slate-600">{new Date(msg.date).toLocaleTimeString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-sm">{msg.name}</span>
                        <span className="text-slate-500 text-xs">{msg.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-300 text-sm line-clamp-2 max-w-lg">{msg.message}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => deleteMessage(msg.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;