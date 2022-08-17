const checkImageResolution = (image, maxWidth, maxHeight) => {
  const _URL = window.URL || window.webkitURL
  const img = new Image()
  img.src = _URL.createObjectURL(image)
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const width = img.naturalWidth
      const height = img.naturalHeight
      if (width > maxWidth || height > maxHeight) {
        resolve(false)
      }
      resolve(true)
    }
  })
}

export default checkImageResolution
