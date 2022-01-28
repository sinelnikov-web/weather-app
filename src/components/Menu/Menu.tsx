import React from 'react';
import {Fragment} from "react";
import component from "./Menu.module.scss"
import {Link} from "react-router-dom";
import Button from "../../ui/Button";
import {MouseEvent} from "react";

interface IMenuProps {
    firstName: string,
    lastName: string
}


const Menu: React.FC<IMenuProps> = ({firstName, lastName}) => {

    const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
        localStorage.removeItem('authenticatedUser')
        window.location.reload()
    }

    return (
        <Fragment>
            <nav className={component.menu}>
                <ul className={component.menu__list}>
                    <li className={component.menu__item}>
                        <Link to={'/weather'}>
                            <span>Погода</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={component.menu__right}>
                <span className={component.menu__user}>{firstName} {lastName[0]}.</span>
                <Button type={'button'} text={'Logout'} padding={[5, 5, 5, 5]} onClick={handleLogout}/>
            </div>
        </Fragment>
    );
};

export default Menu;