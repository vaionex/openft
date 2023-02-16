export default function getRandomNum() {
  const timestamp = Math.floor(100000 + Math.random() * 900000)
  return timestamp.toString()
}
