const base64StringToBlob = (image) => {
  if (image?.file) {
    const {
      file: { src, type },
    } = image
    const byteString = Buffer.from(src, 'base64')
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const int8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString[i]
    }

    const blob = new Blob([int8Array], { type })
    return blob
  }
}

export default base64StringToBlob
