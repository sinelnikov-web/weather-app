import React, {ChangeEvent, HTMLProps, useState, Fragment} from 'react';
import component from "./Input.module.scss"
import Icon from "../Icon";
import {IconType} from "../Icon/Icon";

interface IInputProps {
    placeholder?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    type: 'text' | 'email' | 'password',
    padding: Array<number>,
    icon?: IconType,
    cls?: string,
    name?: string,
    value: any,
    error?: string
}

const Input: React.FC<IInputProps & HTMLProps<HTMLInputElement>> = ({placeholder, type, onChange, padding, icon, cls, name, error, value, ...props}) => {

    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    return (
       <Fragment>
           <div className={component.input__wrapper}>
               <div className={component.input__field}>
                   {icon && <div className={component.input__icon}>
                       <Icon name={icon}/>
                   </div>}
                   <input
                       className={`${component.input__input} ${cls ? cls : ''} ${error ? component.error : ''}`}
                       placeholder={placeholder}
                       type={type === 'password' && showPassword ? 'text' : type}
                       onChange={onChange}
                       name={name}
                       value={value}
                       style={{
                           padding: padding.map(value => `${value}px`).join(' ')
                       }}
                       {...props}
                   />
                   {type === 'password' && <div className={component['input__show-password']} onClick={handleShowPassword}>
                       <Icon name={'eye'}/>
                   </div>}
               </div>
               {error && <p className={component.input__error}>{error}</p>}
           </div>
       </Fragment>
    );
};

export default Input;