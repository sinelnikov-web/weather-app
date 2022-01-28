import React from 'react';
import component from "./Loader.module.scss"

const Loader = () => {
    return (
        <div className={component.loader}>
            <div className={component.loader__circle}></div>
        </div>
    );
};

export default Loader;