import React from 'react';
import component from "./Button.module.scss"
import {MouseEvent} from "react";

interface IButtonProps {
    text: string,
    padding: Array<number>,
    onClick: (event: MouseEvent<HTMLButtonElement>) => void,
    cls?: string,
    type: 'submit' | 'reset' | 'button'
}


const Button: React.FC<IButtonProps> = ({text, padding, onClick, cls, type}) => {
    return (
        <button
            className={`${component.button} ${cls}`}
            type={type}
            onClick={onClick}
            style={{
                padding: padding.map(value => `${value}px`).join(' ')
            }}
        >
            {text}
        </button>
    );
};

export default Button;