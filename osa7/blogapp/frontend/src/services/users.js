import axios from "axios"
const baseUrl = "/api/"

const getAll = async () => {
  const resp = await axios.get(baseUrl + "users")
  return resp.data
}

const login = async (credentials) => {
  const resp = await axios.post(baseUrl + "login", credentials)
  return resp.data
}

export default { login, getAll }
