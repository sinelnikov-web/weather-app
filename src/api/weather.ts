import {ImageApi, WeatherApi} from "./api";
import {AxiosResponse} from "axios";


export type WeatherResponseType = {
    coord: {
        lon: number,
        lat: number,
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string,
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number,
    },
    timezone: number,
    id: number,
    name: string,
    cod: number,
}

export class Weather {
    static async getWeather(city: string): Promise<WeatherResponseType | undefined> {
        try {
            const response = await WeatherApi.get<WeatherResponseType>(`weather?q=${city}`)
            return Promise.resolve(response.data)
        } catch (err) {
            console.log(err)
        }
    }
}