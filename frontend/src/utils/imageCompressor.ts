/**
 * Helper utility to convert a File or Blob object into a Base64 encoded string.
 * This is crucial for offline storage in IndexedDB (Dexie).
 */
export const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('FileReader result is not a string'))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Heuristically resizes an image on a canvas to ensure quick Base64 encoding.
 */
export const resizeImageCanvas = (file: File, maxW = 800, maxH = 800): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > maxW) {
          height = Math.round((height * maxW) / width)
          width = maxW
        }
      } else {
        if (height > maxH) {
          width = Math.round((width * maxH) / height)
          height = maxH
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas 2D context not available'))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Canvas export blob failed'))
          }
        },
        'image/jpeg',
        0.85
      )
      URL.revokeObjectURL(img.src)
    }
    img.onerror = (err) => reject(err)
  })
}
