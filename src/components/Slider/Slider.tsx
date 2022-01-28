import React, {useEffect, useState, TouchEvent, MouseEvent} from 'react';
import component from './Slider.module.scss'
import Slide from "./Slide";
import {UserType} from "../../database/database";
import {WeatherResponseType} from "../../api/weather";

export type CityType = {
    id: number,
    name: string,
    image: string,
    temperature: number,
    favourite: boolean
}

interface ISliderProps {
    currentUser: UserType,
    setFavourite: (city: string, event: MouseEvent<HTMLDivElement>) => void,
    onSlideClick: (weather: WeatherResponseType) => void
}

const Slider: React.FC<ISliderProps> = ({currentUser, setFavourite, onSlideClick}) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [favouriteCities, setFavouriteCities] = useState<Array<string>>([])
    const [touchData, setTouchData] = useState({
        x: 0,
        y: 0
    })
    const [touchMoveDir, setTouchMoveDir] = useState('')

    useEffect(() => {
        if (currentUser) {
            setFavouriteCities(currentUser.favourites)
        }
    }, [currentUser])

    useEffect(() => {
        if (checkEmptySpace()) {
            prevSlide()
        }
    }, [favouriteCities])

    const nextSlide = () => {
        setCurrentSlide(prev => prev + 1 > currentUser.favourites.length - 1 ? 0 : prev + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => prev - 1 < 0 ? currentUser.favourites.length - 1 : prev - 1)
    }

    const checkEmptySpace = () => {
        return (currentSlide > currentUser.favourites.length - 1) && currentUser.favourites.length
    }

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        const firstTouch = event.touches[0]
        setTouchData({x: firstTouch.clientX, y: firstTouch.clientY})
    }

    const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
        let currentTouch = event.touches[0]
        let xDiff = currentTouch.clientX - touchData.x
        let yDiff = currentTouch.clientY - touchData.y
        console.log(xDiff)
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                setTouchMoveDir('left')
            } else if (xDiff < 0) {
                setTouchMoveDir('right')
            }
        }
    }

    const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
        if (touchMoveDir === 'left') {
            prevSlide()
        } else if (touchMoveDir === 'right') {
            nextSlide()
        }
        setTouchMoveDir('')
    }

    return (
        <div className={component.slider}>
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={component.slider__line}
                style={{transform: `translateX(${60 * -currentSlide + 20}%)`}}
            >
                {favouriteCities?.map((city, index) => {
                    return (
                        <Slide
                            onClick={onSlideClick}
                            active={index === currentSlide}
                            key={city}
                            setFavourite={setFavourite}
                            cityName={city}
                            debounced={false}
                            favourites={favouriteCities}
                        />
                    )
                })}
            </div>
            <div onClick={prevSlide} className={component.slider__left}>
                <span className={`${component.slider__arrow} ${component['slider__arrow--left']}`}/>
            </div>
            <div onClick={nextSlide} className={component.slider__right}>
                <span className={`${component.slider__arrow} ${component['slider__arrow--right']}`}/>
            </div>
            <div className={component.slider__dots}>
                {favouriteCities?.map((city, index) => {
                    return(
                        <div key={city} onClick={() => setCurrentSlide(index)} className={`${component.slider__dot} ${index === currentSlide ? component.active : ''}`}/>
                    )
                })}
            </div>
        </div>
    );
}
;

export default Slider;