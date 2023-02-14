import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://api.relysia.com',
})
const projectServiceId = '7a8ca3a7-02bb-42e8-9d70-dec87390c0fd'
export default instance

export { projectServiceId }
