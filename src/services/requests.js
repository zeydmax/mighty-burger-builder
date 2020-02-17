import axios from '../axios-orders'

export const fetchIngredients = () => {
  return axios
    .get('/ingredients.json')
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.data
    })
}
