import {array} from "yup";

export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    favourites: Array<string>
}

type Users = {
    [key: string]: UserType
}

export type DatabaseType = {
    users: Users
}

export type DatabaseActionStatusType = 'OK' | 'NOT_FOUND' | 'ALREADY_EXIST' | "CREDENTIALS_ERROR"

export enum DatabaseResponseStatuses {
    OK = 'OK',
    NotFound = "NOT_FOUND",
    AlreadyExist = "ALREADY_EXIST",
    CredentialsError = "CREDENTIALS_ERROR"
}

export type ResponseType = {
    status: DatabaseActionStatusType,
    data: UserType | null
}

export function getDatabase(): DatabaseType {

    let database = JSON.parse(localStorage.getItem('database') as string | 'null')

    return database || {users: {}}
}

export function getUserFromDatabase(email: string, password: string): Promise<ResponseType> {
    return new Promise<ResponseType>((resolve, reject) => {
        setTimeout(() => {
            let database = getDatabase()
            let response: ResponseType = {
                status: DatabaseResponseStatuses.OK,
                data: null
            }
            if (database.users.hasOwnProperty(email)) {
                if (database.users[email].password === password) {
                    response.data = database.users[email]
                    resolve(response)
                } else {
                    response.status = DatabaseResponseStatuses.CredentialsError
                    reject(response)
                }
            } else {
                response.status = DatabaseResponseStatuses.NotFound
                reject(response)
            }
        }, 3000)
    })
}

export function updateFavourites(email: string, cityName: string) {
    let database = getDatabase()
    let check = database.users[email].favourites.findIndex(city => city === cityName)
    if (check !== -1) {
        database.users[email].favourites.splice(check, 1)
    } else {
        database.users[email].favourites.push(cityName)
    }
    saveDatabase(database)
    return database.users[email]
}

function saveDatabase(data: DatabaseType) {
    localStorage.setItem('database', JSON.stringify(data))
}

export function addUserToDatabase(email: string, data: UserType): Promise<ResponseType> {
    return new Promise<ResponseType>((resolve, reject) => {
        setTimeout(() => {
            let database = getDatabase()
            let response: ResponseType = {
                status: DatabaseResponseStatuses.OK,
                data: null
            }
            if (database.users.hasOwnProperty(email)) {
                response.status = DatabaseResponseStatuses.AlreadyExist
                reject(response)
            } else {
                database.users[email] = data
                saveDatabase(database)
                resolve(response)
            }
        }, 3000)
    })
}
