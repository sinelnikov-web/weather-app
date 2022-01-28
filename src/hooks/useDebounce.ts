import {useState} from "react";


export function useDebounce(fn: Function, ms: number) {

    const [timer, setTimer] = useState<null | ReturnType<typeof setTimeout>>(null)

    return function (...args: any) {
        if (timer != undefined) {
            clearTimeout(timer)
            setTimer(null)
        }
        setTimer(setTimeout(() => {
            fn(args)
        }, ms))
    }
}
