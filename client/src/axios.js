import axios from 'axios';

/**
 * Gunakan ini ketika merequest endpoint yang di protek
 * Otomatis instance axios ini akan menyertakan header x-auth-token
 * Yang akan di cek di server
 */
export function createAxios (baseUrl) {
  const instance = axios.create({
    baseURL: baseUrl
  }); 

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('dr_gadget_token');

    if (token) {
      config.headers['x-access-token'] = token;
    }

    return config;
  })

  return instance;
}