import axios from '@/axios'
import {
  LOGIN,
  CURRENT
} from './url'

export async function login (payload) {
  try {
    const url = LOGIN

    const response = await axios.post(`${url}`, payload)

    return response.data
  } catch (err) {
    if (err.response) {
      throw Error(err.response.data.message)
    }
    throw err
  }
}

export async function getCurrent () {
  try {
    const url = CURRENT

    const response = await axios.get(`${url}`)

    return response.data
  } catch (err) {
    if (err.response) {
      throw Error(err.response.data.message)
    }
    throw err
  }
}
