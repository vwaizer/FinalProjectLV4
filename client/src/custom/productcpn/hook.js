import { useEffect, useState } from "react";

export const useDebounce = ({value, delay= 2000}) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebounceValue(value)
        },delay)
        return () => clearTimeout(timeOut)
    },[value, delay])
    return debounceValue;
}