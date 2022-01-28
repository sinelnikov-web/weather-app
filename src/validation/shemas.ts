import { object, string, number, date, InferType, ref } from 'yup';

export const registrationSchema = object({
    firstName: string().required('First Name is required'),
    lastName: string().required('Last Name is required'),
    email: string().email().required('Email is required'),
    password: string().min(6, "Password should be more than 5 letters").required('Password is required'),
    rePassword: string().oneOf([ref('password'), null], 'Passwords must match')
})

export type RegistrationDataType = InferType<typeof registrationSchema>

export type RegistrationValidationType = ReturnType<typeof registrationSchema.validate>

export const loginSchema = object({
    email: string().email().required('Email is required'),
    password: string().required('Password is required'),
})

export type LoginDataType = InferType<typeof loginSchema>

export type LoginValidationType = ReturnType<typeof loginSchema.validate>


