import React, {useState} from 'react';
import {WeatherResponseType} from "../../api/weather";
import component from "./WeatherModal.module.scss";

interface IWeatherModalProps {
    currentWeather: WeatherResponseType,
    setShowModal: (state: boolean) => void,
}

const WeatherModal: React.FC<IWeatherModalProps> = ({currentWeather, setShowModal}) => {

    const [animation, setAnimation] = useState(false)

    const handleCloseModal = () => {
        setAnimation(true)
    }

    const handleAnimationEnd = () => {
        setAnimation(false)
        setShowModal(false)
    }


    return (
        <div className={component.modal}>
            <div onAnimationEnd={handleAnimationEnd} className={`${component.modal__background} ${animation ? component.closing : ''}`}/>
            <div className={`${component.modal__body} ${animation ? component.closing : ''}`}>
                <span onClick={handleCloseModal} className={component.modal__close}/>
                <h1 className={component.modal__title}>{currentWeather.name}</h1>
                <span className={component.modal__date}>{new Date().toDateString()}</span>
                <img className={component.modal__image} src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt=""/>
                <div className={component["modal__current-data"]}>
                    <ul className={component.modal__list}>
                        <li className={component.modal__item}>
                            <h3 className={component['modal__item-title']}>Temperature</h3>
                            <span className={component['modal__item-value']}>{(currentWeather.main.temp - 273.15).toFixed(1)}°C</span>
                        </li>
                        <li className={component.modal__item}>
                            <h3 className={component['modal__item-title']}>Wind</h3>
                            <span className={component['modal__item-value']}>{currentWeather.wind.speed}km/h</span>
                        </li>
                        <li className={component.modal__item}>
                            <h3 className={component['modal__item-title']}>Humidity</h3>
                            <span className={component['modal__item-value']}>{currentWeather.main.humidity}%</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WeatherModal;