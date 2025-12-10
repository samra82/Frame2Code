import JSZip from 'jszip';
import { GeneratedFile } from '../types';

export const createZip = async (files: GeneratedFile[]): Promise<Blob> => {
  const zip = new JSZip();

  files.forEach(file => {
    zip.file(file.path, file.content);
  });

  return await zip.generateAsync({ type: 'blob' });
};