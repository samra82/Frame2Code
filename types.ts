export interface UploadedFile {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
  language: string;
}

export interface GenerationResult {
  files: GeneratedFile[];
  mainDescription?: string;
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';