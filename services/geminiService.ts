import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedFile } from "../types";

// Helper to check for API key
export const checkApiKey = async (): Promise<boolean> => {
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return !!process.env.API_KEY;
};

// Helper to prompt for API key selection
export const requestApiKey = async (): Promise<void> => {
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    await (window as any).aistudio.openSelectKey();
  } else {
    console.warn("AI Studio environment not detected.");
  }
};

export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateAppCode = async (files: File[]): Promise<GeneratedFile[]> => {
  // Ensure we have a fresh client with the potentially newly selected key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-3-pro-preview for complex coding tasks
  const modelId = 'gemini-3-pro-preview';
  
  const imageParts = await Promise.all(files.map(fileToGenerativePart));

  const prompt = `
    You are Frame2Code, an expert Senior Frontend Engineer and UI/UX Designer.
    
    TASK:
    Analyze the provided UI sketches/wireframes. These images represent a sequence of screens for a web application.
    Your goal is to turn these visual designs into a fully functional, production-ready Next.js 14 application using Tailwind CSS and Lucide React icons.
    
    REQUIREMENTS:
    1. **Structure**: Create a logical folder structure (e.g., app/page.tsx, components/Header.tsx).
    2. **Styling**: Use Tailwind CSS for all styling. Make it look premium, modern, and pixel-perfect to the sketches.
    3. **Interactivity**: Add basic interactivity (links between pages, hover states, mobile menus) where appropriate based on the sketches.
    4. **Responsiveness**: Ensure the code is responsive (mobile-first).
    5. **Icons**: Use 'lucide-react' for icons.
    6. **Content**: Use placeholder text (Lorem Ipsum) or infer content from the images.
    7. **Preview File**: You MUST generate a file named 'preview.html'. This file should be a standalone, single-file HTML version of the main page (or a representative screen) using Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>). It should NOT use React syntax. It should use generic <img> placeholders or data URIs. This allows the user to instantly preview the design in an iframe.
    
    OUTPUT FORMAT:
    You MUST return a JSON object ONLY. The structure must be:
    {
      "files": [
        {
          "path": "app/page.tsx",
          "content": "..."
        },
        {
          "path": "preview.html",
          "content": "<html>...</html>"
        }
      ]
    }
    
    Do not include any markdown formatting like \`\`\`json. Return pure JSON string.
    Ensure "path" includes the full relative path from the project root.
    Include a 'README.md' explaining how to run the project.
    Include a 'package.json' with necessary dependencies (next, react, react-dom, tailwindcss, lucide-react, clsx, tailwind-merge, framer-motion).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          ...imageParts,
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        // We use a high token limit to ensure full code generation
        maxOutputTokens: 20000, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);
    
    if (parsed.files && Array.isArray(parsed.files)) {
      return parsed.files as GeneratedFile[];
    } else {
      throw new Error("Invalid JSON structure returned by Gemini");
    }

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const refineAppCode = async (currentFiles: GeneratedFile[], instruction: string): Promise<GeneratedFile[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelId = 'gemini-3-pro-preview';

  // Contextualize the code
  const fileContext = currentFiles.map(f => `
--- FILE: ${f.path} ---
${f.content}
  `).join('\n');

  const prompt = `
    You are Frame2Code, an expert Senior Frontend Engineer.
    
    TASK:
    Update the existing codebase based on the user's specific request.
    
    CURRENT CODE:
    ${fileContext}
    
    USER REQUEST:
    "${instruction}"
    
    REQUIREMENTS:
    1. Return the FULL content of all files that need to be changed.
    2. If a file is NOT changed, you MAY omit it from the response, but if it is critical for context, include it. 
    3. Ensure Next.js 14 + Tailwind CSS compatibility.
    4. If asked for animations, use 'framer-motion' (ensure 'use client' is added where hooks are used).
    5. If asked for functionality, implement React state (useState), useEffect, and mock data handlers.
    6. ALWAYS update 'preview.html' if the visual changes are significant, otherwise you can omit it.
    
    OUTPUT FORMAT:
    Return JSON object ONLY:
    {
      "files": [
        { "path": "app/page.tsx", "content": "..." }
      ]
    }
    
    Do not include any markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 20000,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);
    
    if (parsed.files && Array.isArray(parsed.files)) {
      // Merge logic: If AI returns a subset of files, we merge with existing.
      // However, the function returns the array to be merged by the caller or just the result.
      // Let's return the complete set by merging here for safety.
      
      const newFiles = parsed.files as GeneratedFile[];
      const newFilesMap = new Map<string, GeneratedFile>(
        newFiles.map((f) => [f.path, f])
      );
      
      const mergedFiles = currentFiles.map(original => {
        if (newFilesMap.has(original.path)) {
          const newFile = newFilesMap.get(original.path);
          newFilesMap.delete(original.path);
          return newFile!;
        }
        return original;
      });

      // Add any new files that weren't in the original list
      newFilesMap.forEach((file) => {
        mergedFiles.push(file);
      });

      return mergedFiles;
    } else {
      throw new Error("Invalid JSON structure returned by Gemini");
    }

  } catch (error) {
    console.error("Gemini Refinement Error:", error);
    throw error;
  }
};