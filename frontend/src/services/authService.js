import api from './api'

export async function login(username, password){
  const res = await api.post('/auth/login', { username, password })
  return res.data
}

export async function register(name, username, password, position){
  const res = await api.post('/auth/register', { name, username, password, position })
  return res.data
}
