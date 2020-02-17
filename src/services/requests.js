import axios from '../axios-orders'

export const fetchIngredients = () => {
  return axios
    .get('/ingredients.json')
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const postOrder = data => {
  return axios
    .post('/orders.json', data)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
