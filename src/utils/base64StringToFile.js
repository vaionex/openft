const base64StringToFile = (base64String, fileName) => {
  var arr = base64String.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = Buffer.from(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr[n]
  }
  return new File([u8arr], fileName, { type: mime })
}

export default base64StringToFile

export function downloadBase64File(base64Data, filename) {
  const link = document.createElement('a')
  link.href = base64Data
  link.download = filename
  link.click()
}
