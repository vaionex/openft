const bytesToSize = (x, decimals = 2) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  // k is 1000 because compatibility with file system sizes (not 1024)
  const k = 1000
  let l = 0,
    n = parseInt(x, 10) || 0
  while (n >= k && ++l) {
    n = n / k
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
}

export default bytesToSize
