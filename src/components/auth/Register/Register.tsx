import React, {ChangeEvent, FocusEvent, FormEvent, MouseEvent, useState} from 'react';
import component from "../Auth.module.scss"
import Button from "../../../ui/Button";
import {ViewType} from "../../../pages/Auth/Auth";
import Input from "../../../ui/Input";
import Container from "../../Container/Container";
import {IconType} from "../../../ui/Icon/Icon";
import {RegistrationDataType, registrationSchema, RegistrationValidationType} from "../../../validation/shemas";
import Form from "../../../ui/Form";
import {ErrorsType, validate} from "../../../validation/helpers";
import {addUserToDatabase, DatabaseResponseStatuses} from "../../../database/database";
import Loader from "../../../ui/Loader";

interface IRegisterProps {
    setView: (view: ViewType) => void
}

type FieldType = {
    id: number,
    name: keyof RegistrationDataType,
    type: 'text' | 'email' | 'password',
    icon: IconType,
    placeholder: string
}

const Register: React.FC<IRegisterProps> = ({setView}) => {

    const fieldsArray: Array<FieldType> = [
        {
            id: 0,
            name: 'firstName',
            type: 'text',
            icon: 'user',
            placeholder: 'Enter your first name'
        },
        {
            id: 1,
            name: 'lastName',
            type: 'text',
            icon: 'user',
            placeholder: 'Enter your last name'
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            icon: 'email',
            placeholder: 'example@mail.com'
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            icon: 'lock',
            placeholder: "Enter password"
        },
        {
            id: 4,
            name: 'rePassword',
            type: 'password',
            icon: 'lock',
            placeholder: "Repeat password"
        },
    ]

    const [fields, setFields] = useState<RegistrationDataType>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: ''
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
            validate<RegistrationDataType, RegistrationValidationType>(fields, registrationSchema)
                .then((result) => {
                    if (typeof result !== 'boolean') {
                        if (name) {
                            setErrors(prev => ({...prev, [name]: result[name]}))
                        } else {
                            setErrors(result)
                        }
                        resolve(false)
                    } else {
                        setErrors({
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            rePassword: ''
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
                addUserToDatabase(fields.email, {...fields, favourites: ["Moscow", "Paris", "London", "Nur-Sultan", "Beijing"]})
                    .then(r => window.location.reload())
                    .catch(err => {
                        if (err.status === DatabaseResponseStatuses.AlreadyExist) {
                            setErrors(prev => ({...prev, email: 'User with this email already exist'}))
                        }
                    }).finally(() => setIsSubmitting(false))
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
                <h1 className={component.auth__title}>Sign Up</h1>
                <Form onSubmit={onSubmit} className={component.auth__form}>
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
                        text={'Register'}
                        type={'submit'}
                        onClick={() => {
                        }}
                        padding={[15, 15, 15, 15]}
                    />
                </Form>
                <p>Already have an account? <a onClick={(e) => handleChangeView(e, 'login')}>Login</a></p>
            </div>
        </Container>
    );
};

export default Register;