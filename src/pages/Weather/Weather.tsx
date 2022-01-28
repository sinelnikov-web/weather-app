import React, {ChangeEvent, useState, MouseEvent} from 'react';
import component from "./Weather.module.scss"
import Input from "../../ui/Input";
import {Slide, Slider} from "../../components/Slider";
import {updateFavourites, UserType} from "../../database/database";
import Loader from "../../ui/Loader";
import {WeatherResponseType} from "../../api/weather";
import WeatherModal from "../../components/WeatherModal";

const Weather = () => {

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [currentWeather, setCurrentWeather] = useState<WeatherResponseType | null>(null)

    let [currentUser, setCurrentUser] = useState<UserType>(JSON.parse(localStorage.getItem('authenticatedUser') as string | 'null'))

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const setFavourite = (cityName: string, event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        setLoading(true)
        let result = updateFavourites(currentUser.email, cityName)
        localStorage.setItem('authenticatedUser', JSON.stringify(result))
        setCurrentUser(prev => ({...prev, favourites: [...result.favourites]}))
        setSearch('')
        setTimeout(() => setLoading(false), 1000)
    }

    const handleClickSlide = (weather: WeatherResponseType) => {
        setCurrentWeather(weather)
        setShowModal(true)
    }

    return (
        <section className={component.weather}>
            <div className={component['weather__search-block']}>
                <div className={component['weather__search-head']}>
                    <h1 className={component.weather__title}>Location</h1>
                    <p className={component.weather__description}>
                        Find the area or city that you want to know the detailed weather info at this time
                    </p>
                    <Input
                        name={'city'}
                        placeholder={'Type city name'}
                        cls={component.weather__search}
                        icon={'search'}
                        type={'text'}
                        onChange={handleSearch}
                        value={search}
                        padding={[10, 10, 10, 30]}
                    />
                </div>
                <div className={component['weather__search-result']}>
                    {search && <Slide onClick={handleClickSlide} setFavourite={setFavourite} debounced cityName={search} favourites={currentUser.favourites} active/>}
                </div>
            </div>
            <h1 className={component.weather__title}>Favourites</h1>
            <Slider currentUser={currentUser} setFavourite={setFavourite} onSlideClick={handleClickSlide}/>
            {loading && <Loader/>}
            {(showModal && currentWeather) && <WeatherModal currentWeather={currentWeather} setShowModal={setShowModal}/> }
        </section>
    );
};

export default Weather;