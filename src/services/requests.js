import api from '../axios-orders'
import axios from 'axios'

const API_KEY = 'AIzaSyBXvKdgVio0epZPlCutZIS7CUaHIsAWwcs'

export const fetchIngredients = () => {
  return api
    .get('/ingredients.json')
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const postOrder = (data, token = null) => {
  return api
    .post(`/orders.json${token ? '?auth=' + token : ''}`, data)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const getOrders = (token = null, userId = null) => {
  return api
    .get(`/orders.json?${token ? 'auth=' + token : ''}${userId ? '&orderBy="userId"&equalTo="' + userId + '"' : ''}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const authorize = (data, method) => {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
  if (method === 'signin') {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
  }
  return axios
    .post(url, data)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error.response.data
    })
}
