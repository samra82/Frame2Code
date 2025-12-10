import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, FileCode, Play, Download, ArrowUp, ArrowDown, Settings, Eye, Globe, Wand2, Zap, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import LoadingScreen from '../components/LoadingScreen';
import { UploadedFile, AppState, GeneratedFile } from '../types';
import * as GeminiService from '../services/geminiService';
import { createZip } from '../services/zipService';

const Converter: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [selectedFileContent, setSelectedFileContent] = useState<GeneratedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Refinement States
  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [refinementMessage, setRefinementMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to Array and map explicitly typing the file
      const newFiles: UploadedFile[] = Array.from(e.target.files).map((file: File) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    if (direction === 'up' && index > 0) {
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    }
    setFiles(newFiles);
  };

  const handleConvert = async () => {
    setError(null);
    setState(AppState.GENERATING);

    try {
      // 1. Check API Key
      let hasKey = await GeminiService.checkApiKey();
      if (!hasKey) {
        await GeminiService.requestApiKey();
      }

      // 2. Prepare files
      const rawFiles = files.map(f => f.file);
      
      // 3. Call Gemini
      const results = await GeminiService.generateAppCode(rawFiles);
      setGeneratedFiles(results);
      
      // Prefer selecting preview.html first, otherwise the first file
      const previewFile = results.find(f => f.path === 'preview.html');
      setSelectedFileContent(previewFile || results[0]);
      
      setState(AppState.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during generation. Please try again.");
      setState(AppState.ERROR);
    }
  };

  const handleRefine = async (instruction: string, loadingMsg: string) => {
    if (generatedFiles.length === 0) return;
    
    setError(null);
    setIsRefining(true);
    setRefinementMessage(loadingMsg);

    try {
      const refinedFiles = await GeminiService.refineAppCode(generatedFiles, instruction);
      setGeneratedFiles(refinedFiles);
      
      // Update selected file if it was modified
      if (selectedFileContent) {
        const updatedSelected = refinedFiles.find(f => f.path === selectedFileContent.path);
        if (updatedSelected) {
          setSelectedFileContent(updatedSelected);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to refine code: " + err.message);
    } finally {
      setIsRefining(false);
      setRefinementPrompt('');
    }
  };

  const handleDownload = async () => {
    const zipBlob = await createZip(generatedFiles);
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'frame2code-project.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-80px)]">
      
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">App Converter</h1>
          <p className="text-slate-400">Upload wireframes, arrange flow, and generate code.</p>
        </div>
        {state === AppState.IDLE && files.length > 0 && (
          <Button onClick={handleConvert} icon={<Play className="w-4 h-4 fill-current" />}>
            Generate App
          </Button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl mb-8 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => { setError(null); if(state === AppState.ERROR) setState(AppState.IDLE); }}><X className="w-5 h-5" /></button>
        </div>
      )}

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        
        {/* STATE: IDLE / UPLOADING */}
        {(state === AppState.IDLE || state === AppState.ERROR) && (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Upload Area */}
            <div className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 hover:border-primary/50 bg-dark-800/30 hover:bg-dark-800/50 rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 group min-h-[400px] flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 bg-dark-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 shadow-xl">
                  <Upload className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Drop sketches here</h3>
                <p className="text-slate-400 max-w-xs mx-auto mb-6">Support for PNG, JPG, WEBP. Upload multiple screens to generate a full flow.</p>
                <Button variant="secondary" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                  Browse Files
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  multiple 
                  accept="image/*"
                />
              </div>
            </div>

            {/* File List & Reordering */}
            <div className="bg-dark-800/30 border border-white/5 rounded-3xl p-8 min-h-[400px]">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Sequence & Flow
              </h3>
              
              {files.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                  <p>No files uploaded yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {files.map((file, index) => (
                    <motion.div 
                      layout
                      key={file.id} 
                      className="bg-dark-900 border border-white/5 p-4 rounded-xl flex items-center gap-4 group"
                    >
                      <span className="w-6 h-6 rounded-full bg-dark-800 text-xs flex items-center justify-center text-slate-400 font-mono">
                        {index + 1}
                      </span>
                      <div className="relative group/img cursor-pointer" onClick={() => setPreviewImage(file.previewUrl)}>
                        <img src={file.previewUrl} alt="Preview" className="w-12 h-12 rounded-lg object-cover bg-dark-800" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-white truncate">{file.name}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setPreviewImage(file.previewUrl)}
                          className="p-1.5 hover:bg-dark-800 rounded-lg text-slate-400 hover:text-primary md:hidden"
                          title="View Image"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => moveFile(index, 'up')} 
                          disabled={index === 0}
                          className="p-1.5 hover:bg-dark-800 rounded-lg disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          onClick={() => moveFile(index, 'down')} 
                          disabled={index === files.length - 1}
                          className="p-1.5 hover:bg-dark-800 rounded-lg disabled:opacity-30"
                        >
                          <ArrowDown className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          onClick={() => removeFile(file.id)}
                          className="p-1.5 hover:bg-red-500/20 rounded-lg"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* STATE: GENERATING (First Pass) */}
        {state === AppState.GENERATING && !isRefining && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingScreen />
          </motion.div>
        )}

        {/* STATE: REFINING (Second Pass) */}
        {isRefining && (
           <motion.div
            key="refining"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingScreen message={refinementMessage} />
          </motion.div>
        )}

        {/* STATE: COMPLETE */}
        {state === AppState.COMPLETE && !isRefining && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-[75vh]"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
              <div className="flex gap-4">
                <Button onClick={() => { setState(AppState.IDLE); setFiles([]); setGeneratedFiles([]); }} variant="secondary">
                  Start Over
                </Button>
                <Button onClick={handleDownload} icon={<Download className="w-4 h-4" />}>
                  Download Project
                </Button>
              </div>

               {/* Quick Refinement Actions */}
              <div className="flex items-center gap-2 bg-dark-800/50 p-1.5 rounded-xl border border-white/5">
                 <button
                    onClick={() => handleRefine("Add smooth Framer Motion entrance animations to the main container, cards, and list items. Use simple fade-in and slide-up variants. Ensure 'use client' is added.", "Adding animations...")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                   <Wand2 className="w-4 h-4 text-purple-400" />
                   Add Animations
                 </button>
                 <div className="w-px h-6 bg-white/10 mx-1" />
                 <button
                    onClick={() => handleRefine("Make the app functional. 1) Convert static data to React state using useState. 2) Implement simple handle functions for buttons. 3) Add proper 'next/link' navigation. 4) If there are forms, add onSubmit handlers that alert/log the data.", "Wiring up logic...")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                   <Zap className="w-4 h-4 text-yellow-400" />
                   Make Functional
                 </button>
              </div>
            </div>

            <div className="flex-grow grid grid-cols-12 gap-6 min-h-0 bg-dark-800/30 border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
              
              {/* Sidebar File Explorer */}
              <div className="col-span-3 bg-dark-900/50 border-r border-white/5 p-4 overflow-y-auto flex flex-col">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Generated Files</h3>
                <div className="space-y-1 flex-grow">
                  {generatedFiles.map((file) => (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFileContent(file)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-colors flex items-center gap-2 ${
                        selectedFileContent?.path === file.path 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {file.path === 'preview.html' ? <Globe className="w-4 h-4" /> : <FileCode className="w-4 h-4" />}
                      <span className="truncate">{file.path}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Instruction Box */}
                <div className="mt-4 pt-4 border-t border-white/5">
                   <div className="relative">
                     <input 
                        type="text" 
                        value={refinementPrompt}
                        onChange={(e) => setRefinementPrompt(e.target.value)}
                        placeholder="e.g. Change primary color to red..."
                        className="w-full bg-dark-800 border border-white/10 rounded-lg pl-3 pr-10 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && refinementPrompt.trim()) {
                            handleRefine(refinementPrompt, "Refining code...");
                          }
                        }}
                     />
                     <button 
                      disabled={!refinementPrompt.trim()}
                      onClick={() => handleRefine(refinementPrompt, "Refining code...")}
                      className="absolute right-1 top-1 p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white disabled:opacity-30"
                     >
                        <MessageSquare className="w-4 h-4" />
                     </button>
                   </div>
                </div>
              </div>

              {/* Code Viewer / Previewer */}
              <div className="col-span-9 bg-[#0d1117] relative">
                {selectedFileContent ? (
                  selectedFileContent.path.endsWith('.html') ? (
                    <div className="w-full h-full bg-white flex flex-col">
                      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-xs text-slate-500 flex justify-between items-center">
                        <span>Live Preview (Static HTML)</span>
                        <span className="text-amber-600">Interactivity may be limited in static preview</span>
                      </div>
                      <iframe 
                        srcDoc={selectedFileContent.content}
                        className="w-full h-full border-none"
                        title="Preview"
                        sandbox="allow-scripts"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full overflow-auto p-6">
                      <pre className="text-sm font-mono text-slate-300">
                        <code>{selectedFileContent.content}</code>
                      </pre>
                    </div>
                  )
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-600">
                    Select a file to view code
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-full"
            >
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img src={previewImage} alt="Full Preview" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-white/10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Converter;