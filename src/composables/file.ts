import Compressor from 'compressorjs'

export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', (evt) => {
      resolve(evt.target?.result as string)
    })
  })
}

export function compressImage(file: File) {
  return new Promise<File>((resolve, reject) => {
    new Compressor(file, {
      quality: 0.4,
      success(result) {
        resolve(result as File)
      },
      error(err) {
        reject(err)
      },
    })
  })
}
