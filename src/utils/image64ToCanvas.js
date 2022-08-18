const image64ToImageCanvas = (image64, canvas, pixelCrop) => {
  const image = new Image()
  image.src = image64
  image.onload = () => {
    const { width, height } = image
    const { x, y, width: cropWidth, height: cropHeight } = pixelCrop
    const cropCanvas = document.createElement('canvas')
    cropCanvas.width = cropWidth
    cropCanvas.height = cropHeight
    const ctx = cropCanvas.getContext('2d')
    ctx.drawImage(image, x, y, width, height, 0, 0, cropWidth, cropHeight)
    canvas.width = cropWidth
    canvas.height = cropHeight
    canvas.getContext('2d').drawImage(cropCanvas, 0, 0)
  }
}
