import React from 'react';
import Menu from "../../components/Menu";
import {User} from "../../types/User";
import Container from "../../components/Container/Container";
import component from "./Header.module.scss"

const Header: React.FC = () => {

    let user: User = JSON.parse(localStorage.getItem('authenticatedUser') as string)

    return (
        <header className={component.header}>
            <Container>
                <div className={component.header__inner}>
                    <Menu firstName={user.firstName} lastName={user.lastName}/>
                </div>
            </Container>
        </header>
    );
};

export default Header;