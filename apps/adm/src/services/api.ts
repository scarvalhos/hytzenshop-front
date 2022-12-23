import axios from 'axios'

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND

export const api = axios.create({
  baseURL: URL_BACKEND,
})
