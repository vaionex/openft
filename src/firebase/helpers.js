export const mergeData = (data1, data2) => {
  const merged = [...data1]

  data2.forEach((item) => {
    const existingIndex = merged.findIndex((i) => i.tokenId === item.tokenId)
    if (existingIndex > -1) {
      merged[existingIndex] = { ...merged[existingIndex], ...item }
    } else {
      merged.push(item)
    }
  })

  return merged
}
