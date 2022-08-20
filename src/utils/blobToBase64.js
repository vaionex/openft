const blobDOMStringToBase64 = async (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.onerror = (e) => {
      reject(e)
    }
    reader.readAsDataURL(blob)
  })
    .catch((e) => {
      console.warn(e)
    })
    .then((base64) => {
      return base64
    })
    .catch((e) => {
      console.warn(e)
    })
}

export default blobDOMStringToBase64
