import React, {useEffect, useState, Fragment, MouseEvent} from 'react';
import component from "./Slider.module.scss";
import Icon from "../../ui/Icon";
import {CityType} from "./Slider";
import {Weather as WeatherAPI, WeatherResponseType} from "../../api/weather";
import {Image} from "../../api/image";
import {useDebounce} from "../../hooks/useDebounce";
import Loader from "../../ui/Loader";

interface ISlideProps {
    setFavourite: (cityName: string, event: MouseEvent<HTMLDivElement>) => void,
    cityName: string,
    debounced: boolean,
    favourites: Array<string>,
    active?: boolean,
    onClick: (weather: WeatherResponseType) => void
}

const Slide: React.FC<ISlideProps> = ({setFavourite, cityName, debounced, favourites, active, onClick}) => {

    const [imageLoaded, setImageLoaded] = useState(false)
    const [city, setCity] = useState<CityType | null>(null)
    const [weather, setWeather] = useState<WeatherResponseType | null>(null)
    const [isFetching, setIsFetching] = useState(false)

    const handleImageLoad = () => {
        if (!imageLoaded) {
            setImageLoaded(true)
        }
    }

    const fetchQuery = (query: string) => {
        setIsFetching(true)
        WeatherAPI.getWeather(query).then(data => {
            if (data) {
                Image.getImage(data.name).then(res => {
                    let cityObject: CityType = {
                        id: data.id,
                        name: data.name,
                        temperature: +(data.main.temp - 273.15).toFixed(1),
                        image: res?.urls.small || '',
                        favourite: false
                    }
                    setCity(cityObject)
                    setWeather(data)
                })
            }
        }).finally(() => setIsFetching(false))
    }

    const debouncedFetchQuery = useDebounce(() => fetchQuery(cityName), 1000)

    useEffect(() => {
        if (debounced) {
            debouncedFetchQuery()
        } else {
            fetchQuery(cityName)
        }
    }, [cityName])

    return (
        <Fragment>
            {(city && weather) && <div onClick={() => onClick(weather)} style={{height: imageLoaded ? 'auto' : '281px'}} className={`${component.slider__slide} ${component.slide} ${active ? component.active : ''}`}>
                <div className={component.slide__info}>
                    <div className={component.slide__inner}>
                        <h2 className={component.slide__title}>{city?.name}</h2>
                        <span className={component.slide__temperature}>{city?.temperature}°C</span>
                        <div onClick={(e) => setFavourite(city.name, e)} className={component.slide__favourite}>
                            <Icon name={favourites.includes(city.name) ? 'star-active' : 'star-disabled'}/>
                        </div>
                    </div>
                </div>
                <img onLoad={handleImageLoad} className={component.slide__image} src={city?.image} alt=""/>
            </div>}
            {isFetching && <Loader/>}
        </Fragment>
    );
};

export default Slide;