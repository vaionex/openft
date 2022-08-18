const base64toFile = (base64String, fileName) => {
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = Buffer.from(arr[1], 'base64')
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.readUInt8(n)
  }
  return new File([u8arr], fileName, { type: mime })
}

export default base64toFile
