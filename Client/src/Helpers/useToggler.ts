import {useState} from "react"

export default function useToggler(defaultOnValue: boolean){
    const [isToggledOn, setIsToggledOn] = useState(defaultOnValue)
    
    function toggle() {
        setIsToggledOn(prev => !prev)
    }
    
    return [isToggledOn, toggle] as const
}
