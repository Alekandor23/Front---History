import axios from 'axios'

 const baseURL = 'https://historybackend.onrender.com'

const api = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    responseType: 'json',
    withCredentials: true,
});


export const getBooks = () => api.get('/libros/libros')
export const getBookByID = (id) => api.get(`/libros/libros/titulo/${id}`)
export const getDetailsByID = (id) => api.get(`/libros/libros/detalles/${id}`)
export const getCategorysByID = (id) => api.get(`/libros/libros/categorias/${id}`)
export const getDescriptionsByID = (id) => api.get(`/libros/libros/descripcion/${id}`)
export const getSummaryByID = (id) => api.get(`/libros/libros/resumen/${id}`)