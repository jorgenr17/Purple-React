import axiosInstance from './axios'

export const GET = ({ url, baseURL, headers }) => {
  return axiosInstance({
    url,
    baseURL,
    method: 'GET',
    headers
  })
}

export const POST = ({ data, url, baseURL, headers }) => {
  return axiosInstance({
    url: url,
    baseURL,
    method: 'POST',
    data,
    headers
  })
}
