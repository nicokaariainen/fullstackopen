import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5'
const api_key = process.env.REACT_APP_API_KEY

const get = (latlng) => {
    const request = axios.get(
        `${baseUrl}/weather`, 
        {
            params: {
                appid: api_key,
                lat: latlng[0],
                lon: latlng[1]
            }
        })
    return request.then(response => response.data)
    }

export default { get }