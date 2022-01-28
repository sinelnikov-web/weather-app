import {AnyObjectSchema, ValidationError} from "yup";

export type ErrorsType = {
    [key: string]: string
}

export function validate<D, S>(data: D, schema: AnyObjectSchema): Promise<boolean | ErrorsType> {
    return new Promise(resolve => {
        schema.validate(data, { abortEarly: false }).then(res => resolve(true)).catch((err: ValidationError) => {
            let errors: ErrorsType = Object.keys(data).reduce((obj, key) => ({ ...obj, [key]: ''}), {})
            err.inner.forEach(e => e.path && (errors[e.path] = e.message))
            resolve(errors)
        })
    })
}