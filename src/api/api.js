import axios from "axios";


export const ImageApi = axios.create({
    baseURL: "https://api.unsplash.com/",
    headers: {
        "Authorization": "Client-ID rj38A3TbirAQGzEihWJ8RSWXVQ-bft1ByoWgNXDAz7I"
    }
})

ImageApi.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)

export const WeatherApi = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/"
})

WeatherApi.defaults.params = {
    "appid": "437624f295b11a76ee385ab650b5582e"
}