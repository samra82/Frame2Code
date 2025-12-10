<div align="center">
  <br />
  <a href="https://github.com/samra82/Frame2Code">
    <img src="https://img.shields.io/badge/Frame2Code-AI_Powered-7C3AED?style=for-the-badge&logo=openai&logoColor=white" alt="Frame2Code Logo" width="200" />
  </a>
  <br />

  <h1 align="center">Frame2Code 🎨 ➔ ⚛️</h1>

  <p align="center">
    <strong>Transform rough sketches into production-ready Next.js & Tailwind applications instantly.</strong>
  </p>

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-how-it-works">How It Works</a>
  </p>

  <div align="center">
    <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" />
    <img src="https://img.shields.io/badge/Gemini-1.5_Pro-orange?style=flat-square&logo=google" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-cyan?style=flat-square&logo=tailwindcss" />
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" />
    <img src="https://img.shields.io/badge/Framer_Motion-11-purple?style=flat-square&logo=framer" />
  </div>
</div>

<br />

> **"Skip the boilerplate. Dream in UI, ship in React."**

Frame2Code is a **next-generation multimodal AI application** that bridges the gap between design and engineering. Upload a napkin sketch, a whiteboard photo, or a screenshot, and watch as **Gemini 3 Pro** architecturally analyzes the visual hierarchy to generate semantic, responsive, and beautiful code.

---

## ✨ Features

### 🧠 **Multimodal Vision Engine**
Powered by Google's **Gemini 3 Pro**, Frame2Code doesn't just "OCR" your images—it *understands* them. It recognizes navigation patterns, grid layouts, form elements, and visual hierarchy to generate code that a Senior Engineer would approve of.

### ⚡ **Instant Preview & Code Gen**
*   **Live HTML Preview:** See your generated UI instantly in a safe sandboxed environment.
*   **Syntax Highlighting:** Inspect the generated React/Next.js code directly in the browser.
*   **Zip Export:** Download a pre-configured project ready for `npm install`.

### 🎨 **Intelligent Refinement**
Not happy with the padding? Want to add animations?
*   **Conversational Editing:** Chat with your code! "Make the buttons rounded," or "Add a dark mode toggle."
*   **Context Aware:** The AI understands the current state of your code and applies surgical updates.

### 💎 **Premium UI/UX**
*   **Glassmorphism Design:** A stunning, dark-themed interface built with Tailwind CSS.
*   **Smooth Animations:** Powered by `framer-motion` for a fluid user experience.
*   **Drag & Drop:** Intuitive file management for complex user flows.

---

## 🛠 Tech Stack

Frame2Code is built with a modern, type-safe stack designed for performance and scalability.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite | High-performance component-based UI. |
| **Styling** | Tailwind CSS | Utility-first CSS for rapid UI development. |
| **AI Engine** | Google Gemini API | Utilizing `gemini-3-pro-preview` for vision and coding. |
| **Languages** | TypeScript | Strict type safety for robust application logic. |
| **Motion** | Framer Motion | Complex layout animations and micro-interactions. |
| **Icons** | Lucide React | Clean, consistent SVG iconography. |
| **Routing** | React Router v6 | Client-side routing for SPA experience. |

---

## 🧠 How It Works

1.  **Ingestion:** The user uploads an image. We convert this to a base64 string.
2.  **Prompt Engineering:** We construct a complex system prompt that instructs Gemini to act as a "Senior Frontend Engineer."
3.  **Vision Analysis:** Gemini analyzes the image for layout structures (Flexbox/Grid), components, and content.
4.  **Synthesis:** The model generates a JSON object containing the file structure (`page.tsx`, `components/`, `preview.html`).
5.  **Rendering:** The app parses the JSON, renders the preview in an iframe, and displays the code blocks.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by <strong>Samra Shafiq</strong></p>
  <p>
    <a href="https://www.linkedin.com/in/samrashafiq16/">LinkedIn</a> •
    <a href="https://github.com/samra82">GitHub</a>
  </p>
</div>