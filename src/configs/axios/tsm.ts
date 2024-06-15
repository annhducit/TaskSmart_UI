import axios from 'axios';

const tsmAxios = axios.create({ baseURL: `${import.meta.env.VITE_TASKSMART_BACKEND_API}/api` });

tsmAxios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default tsmAxios;
