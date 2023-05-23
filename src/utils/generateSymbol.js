function generateSymbol() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters.charAt(randomIndex)
  }

  return id
}
export default generateSymbol
