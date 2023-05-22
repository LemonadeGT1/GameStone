import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const atlasApi = Axios.create({
  baseURL: 'https://api.boardgameatlas.com/api',
  timeout: 15000,
  params: { client_id: "xA1YCEmTwL", fields: "id,name,description,image_url,min_players,max_players,min_playtime,max_playtime,categories,mechanics,min_age", order_by: "rank", limit: "20" }
})