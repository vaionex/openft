import getExtFromType from '@/utils/getExtFromType'

export const checkImageType = (file, acceptableFileTypes) => {
  const ext = getExtFromType(file.type)

  const accepted = acceptableFileTypes.some(
    (type) => type.toLowerCase() === ext,
  )

  if (accepted) return true
  return false
}

export const checkImageResolution = (file, limit) => {
  const _URL = window.URL || window.webkitURL
  const img = new Image()
  img.src = _URL.createObjectURL(file)
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const width = img.naturalWidth
      const height = img.naturalHeight
      if (width > limit.width || height > limit.height) {
        resolve(false)
      }
      resolve(true)
    }
  })
}

export const checkImageSize = (file, maxSize) => {
  return new Promise((resolve, reject) => {
    const fileSize = file.size
    if (fileSize > maxSize) {
      resolve(false)
    }
    resolve(true)
  })
}

export const checkValidation = async (
  file,
  acceptableFileTypes,
  limit,
  resolutionLimit,
) => {
  return new Promise(async (resolve, reject) => {
    if (!checkImageType(file, acceptableFileTypes)) {
      resolve({
        type: 'imageType',
        message: `File type is not supported, plase select ${acceptableFileTypes}`,
      })
    } else {
      if (!(await checkImageSize(file, limit))) {
        resolve({
          type: 'imageSize',
          message: `Image size must be less than ${limit / 1000 / 1000}MB`,
        })
      }

      if (!(await checkImageResolution(file, resolutionLimit))) {
        resolve({
          type: 'imageResolution',
          message: `Image resolution must be less than ${resolutionLimit.width}x${resolutionLimit.height}`,
        })
      }
    }
    resolve(false)
  })
}
