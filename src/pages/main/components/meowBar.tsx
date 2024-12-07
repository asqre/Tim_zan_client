// imports
import { useEffect, useRef, useState } from "react"
import { useGameContext } from "../../gameContext";


export const MeowBar = ({className} : {className: string}) => {
    const {gameAreaSize, meowBarProgress} = useGameContext();
    const barElement = useRef<HTMLDivElement | null>(null);
    const [barAreaSize, setBarAreaSize] = useState<{width : number | null, height: number | null}>({
        width: null,
        height: null
    });
    const changingElement = useRef<HTMLDivElement | null>(null);

    // Set barsize as soon as the game loads
    useEffect(() => {
        if (barElement.current != null){
            setBarAreaSize({
                width: barElement.current.clientWidth,
                height: barElement.current.clientHeight
            })
        }
    }, [gameAreaSize])

    // Updates bar each time the progress changes
    useEffect(() => {   
        if (changingElement.current != null && barAreaSize.width != null) {
            const maxWidth = barAreaSize.width;
            const newWidth = (meowBarProgress / 100) * barAreaSize.width;
            changingElement.current.style.width = `${Math.min(newWidth, maxWidth)}px`;
        }
    }, [meowBarProgress])
    
    return (
        <>
            <div className={`${className ?? ''}`} >
                <div ref={barElement} className="relative h-full w-2/3 bg-gray-800">
                    <div ref={changingElement} className="absolute h-full left-0 top-0 bg-white"></div>
                </div>
            </div>
        </>
    )

}