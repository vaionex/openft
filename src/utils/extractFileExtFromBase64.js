const extractImageFileExtensionFromBase64 = (base64Data) => {
  return base64Data.substring(
    'data:image/'.length,
    base64Data.indexOf(';base64'),
  )
}

export default extractImageFileExtensionFromBase64
