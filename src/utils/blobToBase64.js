const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export default blobToBase64
