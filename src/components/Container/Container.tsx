import React from 'react';
import component from "./Container.module.scss"

const Container:React.FC = ({children}) => {
    return (
        <div className={component.container}>
            {children}
        </div>
    );
};

export default Container;