import {ImageApi} from "./api";


export type ImageType = {
    id: string,
    urls: {
        raw: string,
        full: string,
        regular: string,
        small: string,
        thumb: string
    }
}

export type ImageResponseType = {
    results: Array<ImageType>
}

export class Image {
    static async getImage(query: string): Promise<ImageType | undefined> {
        try {
            const response = await ImageApi.get<ImageResponseType>(`search/photos?page=1&query=${query}&per_page=1`)
            return Promise.resolve(response.data.results[0])
        } catch (err) {
            console.log(err)
        }
    }
}