'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  images: Array<{ imageUrl: string; altText: string }>
  onImagesChange: (images: Array<{ imageUrl: string; altText: string }>) => void
  maxImages?: number
}

export default function ImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 5 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const uploadImage = useCallback(async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro no upload')
    }

    return await response.json()
  }, [])

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || images.length >= maxImages) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).slice(0, maxImages - images.length).map(uploadImage)
      const uploadResults = await Promise.all(uploadPromises)
      
      const newImages = uploadResults.map(result => ({
        imageUrl: result.imageUrl,
        altText: ''
      }))

      onImagesChange([...images, ...newImages])
    } catch (error) {
      console.error('Erro no upload:', error)
      alert('Erro ao fazer upload das imagens')
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files)
    }
  }, [handleFileSelect])

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const updateAltText = (index: number, altText: string) => {
    const newImages = images.map((img, i) => 
      i === index ? { ...img, altText } : img
    )
    onImagesChange(newImages)
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${dragActive 
              ? 'border-rose-500 bg-rose-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${uploading ? 'opacity-50 pointer-events-none' : ''}
          `}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {uploading ? 'Fazendo upload...' : 'Clique ou arraste imagens aqui'}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WebP até 5MB ({images.length}/{maxImages})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.altText || `Imagem ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Primary Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Principal
                </div>
              )}

              {/* Alt Text Input */}
              <input
                type="text"
                placeholder="Texto alternativo"
                value={image.altText}
                onChange={(e) => updateAltText(index, e.target.value)}
                className="mt-2 w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-500"
              />

              {/* Move Buttons */}
              <div className="flex justify-between mt-1">
                <button
                  type="button"
                  onClick={() => moveImage(index, Math.max(0, index - 1))}
                  disabled={index === 0}
                  className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  ← Mover
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(index, Math.min(images.length - 1, index + 1))}
                  disabled={index === images.length - 1}
                  className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  Mover →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">Nenhuma imagem adicionada</p>
        </div>
      )}
    </div>
  )
}
