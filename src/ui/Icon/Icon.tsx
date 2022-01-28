import React from 'react';
import icons from "./icons.json"
import component from "./Icon.module.scss"

export type IconType = 'user' | 'lock' | 'email' | 'eye' | 'search' | 'star-active' | 'star-disabled'

interface IIconProps {
    name: IconType,
    cls?: string
}

const Icon: React.FC<IIconProps> = ({name, cls}) => {
    return (
        <div
            className={`${component.icon} ${cls}`}
            dangerouslySetInnerHTML={{__html: icons[name]}}
        >
        </div>
    );
};

export default Icon;