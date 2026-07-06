import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Camera, FileImage } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface ImageUploaderProps {
  onImageSelected: (file: File) => void
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelected(acceptedFiles[0])
    }
  }, [onImageSelected])

  const onDropRejected = useCallback(() => {
    toast.error('Invalid file! Please upload a JPEG, PNG, or WebP image under 5MB.')
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB before client compression
    multiple: false
  })

  return (
    <div className="flex flex-col gap-4 w-full" {...getRootProps()}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`
          w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 min-h-[300px]
          ${isDragActive 
            ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-glow-green scale-102' 
            : 'border-slate-300 dark:border-slate-700/60 bg-white/40 dark:bg-darkCard/30 hover:border-primary/60 dark:hover:border-primary/40'
          }
        `}
      >
        <input { ...getInputProps() } />
        
        {/* Upload Icon Stack */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 mb-4 group-hover:scale-105 transition-transform">
          <Upload size={24} className="text-primary" />
        </div>

        <h3 className="font-display font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">
          Drag & Drop Leaf Photo
        </h3>
        
        <p className="text-xs text-slate-500 dark:text-slate-500 mb-6 max-w-xs">
          Supports JPEG, PNG, and WebP up to 5MB. Large files will be compressed in a background worker automatically.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-dark text-white shadow-sm"
          >
            <FileImage size={16} />
            Browse Files
          </button>
          
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200"
          >
            <Camera size={16} />
            Take Photo
          </button>
        </div>
      </motion.div>
    </div>
  )
}
export default ImageUploader
