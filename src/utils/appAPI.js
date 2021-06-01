import axiosInstance from './apiConfig';

const API = {
  books: {
    getList: (config) => axiosInstance.get('/volumes', config),
    getSingle: (bookId, config) =>
      axiosInstance.get(`/volumes/${bookId}`, config),
  },
};

export default API;
