export const resolverVerifier = (data, type) => {
  return data.some(data => data?.factorId === type)
}
export const returnResolver = (data, type) => {
  return data.find(data => data.factorId === type)
}