export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', (evt) => {
      resolve(evt.target?.result as string)
    })
  })
}
