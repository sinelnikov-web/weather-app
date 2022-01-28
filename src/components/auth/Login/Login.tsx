import React, {ChangeEvent, FocusEvent, FormEvent, MouseEvent, useState} from 'react';
import component from "../Auth.module.scss"
import Button from "../../../ui/Button";
import {ViewType} from "../../../pages/Auth/Auth";
import Input from "../../../ui/Input";
import Container from "../../Container/Container";
import Form from "../../../ui/Form";
import {ErrorsType, validate} from "../../../validation/helpers";
import {LoginDataType, loginSchema, LoginValidationType, RegistrationDataType} from "../../../validation/shemas";
import {DatabaseResponseStatuses, getUserFromDatabase} from "../../../database/database";
import {IconType} from "../../../ui/Icon/Icon";
import Loader from "../../../ui/Loader";

interface ILoginProps {
    setView: (view: ViewType) => void
}

type FieldType = {
    id: number,
    name: keyof LoginDataType,
    type: 'text' | 'email' | 'password',
    icon: IconType,
    placeholder: string
}


const Login: React.FC<ILoginProps> = ({setView}) => {

    const fieldsArray: Array<FieldType> = [
        {
            id: 0,
            name: 'email',
            type: 'email',
            placeholder: 'example@mail.com',
            icon: 'email'
        },
        {
            id: 1,
            name: 'password',
            type: 'password',
            placeholder: 'Enter password',
            icon: 'lock'
        }
    ]

    const [fields, setFields] = useState<LoginDataType>({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState<ErrorsType>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChangeView = (event: MouseEvent<HTMLAnchorElement>, view: ViewType) => {
        event.preventDefault()
        setView(view)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFields(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const runValidation = (name?: keyof RegistrationDataType): Promise<boolean> => {
        return new Promise<boolean>(resolve => {
            validate<LoginDataType, LoginValidationType>(fields, loginSchema).then((result) => {
                if (typeof result !== 'boolean') {
                    if (name) {
                        setErrors(prev => ({
                            ...prev,
                            [name]: result[name]
                        }))
                    } else {
                        setErrors(result)
                    }
                    resolve(false)
                } else {
                    setErrors({
                        email: '',
                        password: ''
                    })
                }
                resolve(true)
            })
        })
    }

    const onSubmit = (e: FormEvent) => {
        runValidation().then(result => {
            if (result) {
                setIsSubmitting(true)
                getUserFromDatabase(fields.email, fields.password)
                    .then(r => {
                        localStorage.setItem('authenticatedUser', JSON.stringify(r.data))
                        window.location.reload()
                    })
                    .catch(err => {
                        if (err.status === DatabaseResponseStatuses.CredentialsError || err.status === DatabaseResponseStatuses.NotFound) {
                            setErrors(prev => ({
                                ...prev,
                                email: 'Email or password invalid',
                                password: 'Email or password invalid'
                            }))
                        }
                    })
                    .finally(() => setIsSubmitting(false))
            }
        })
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        runValidation(e.target.name as keyof RegistrationDataType)
    }

    return (
        <Container>
            {isSubmitting && <Loader/>}
            <div className={component.auth}>
                <h1 className={component.auth__title}>Login</h1>
                <Form className={component.auth__form} onSubmit={onSubmit}>
                    {fieldsArray.map(field => {
                        return (
                            <Input
                                key={field.id}
                                type={field.type}
                                icon={field.icon}
                                name={field.name}
                                value={fields[field.name]}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                padding={[15, 15, 15, 30]}
                                error={errors[field.name]}
                            />
                        )
                    })}
                    <Button
                        text={'Login'}
                        type={'submit'}
                        onClick={() => {
                        }}
                        padding={[15, 15, 15, 15]}
                    />
                </Form>
                <p>Don't have an account? <a onClick={(e) => handleChangeView(e, 'register')}>Register Now</a></p>
            </div>
        </Container>
    );
}
;

export default Login;