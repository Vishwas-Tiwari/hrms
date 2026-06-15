import api from './api'

export async function login(username, password){
  const res = await api.post('/auth/login', { username, password })
  return res.data
}

export async function register(username, password, role){
  const res = await api.post('/auth/register', { username, password, role })
  return res.data
}
