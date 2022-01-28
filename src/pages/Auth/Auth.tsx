import React, {useState} from 'react';
import {Login, Register} from "../../components/auth";
import component from "./Auth.module.scss"


export type ViewType = 'login' | 'register'

const Auth: React.FC = (props) => {

    const [currentView, setCurrentView] = useState<ViewType>('login')


    const renderView = () => {
        switch (currentView) {
            case 'login': {
                return <Login setView={setCurrentView}/>
            }
            case 'register': {
                return <Register setView={setCurrentView}/>
            }
        }
    }

    return (
        <section className={component.auth}>
            {renderView()}
        </section>
    );
}

export default Auth;