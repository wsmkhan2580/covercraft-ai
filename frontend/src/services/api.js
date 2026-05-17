import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
})

api.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
)

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      (err.code === 'ECONNABORTED'
        ? 'Request timed out. Please try again.'
        : null) ||
      (err.code === 'ERR_NETWORK'
        ? 'Cannot reach the server. Please check your connection.'
        : null) ||
      err.message ||
      'Something went wrong'

    return Promise.reject(new Error(message))
  }
)

export async function generateCoverLetter(formData) {
  const res = await api.post('/api/generate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}

export async function parseResumePDF(file) {
  const fd = new FormData()
  fd.append('resume', file)

  const res = await api.post('/api/parse-resume', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}

export async function checkApiStatus() {
  const res = await api.get('/api/status')
  return res.data
}

export default api