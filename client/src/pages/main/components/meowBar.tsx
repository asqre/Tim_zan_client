// imports
import { useEffect, useRef, useState } from "react"
import { useGameContext } from "../../gameContext";
import {CONFIG} from "../../../config"

import MeowBarFillAsset from "../../../assets/meowBarFill.png"
import MeowBarOutlineAsset from "../../../assets/meowBarOutline.png"


export const MeowBar = ({className} : {className: string}) => {
    const {gameAreaSize, chooseActiveCat, isInteracting, setIsInteracting, tickCount, meowBarProgress, setMeowBarProgress, cats, score, getTotalCatsNumber} = useGameContext();
    const barElement = useRef<HTMLDivElement | null>(null);
    const [barAreaSize, setBarAreaSize] = useState<{width : number | null, height: number | null}>({
        width: null,
        height: null
    });
    const [meowBarTickProgress, setMeowBarTickProgress] = useState<number>(0);
    const [lastScore, setLastScore] = useState<number>(0);
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

    // Updates on each tick
    useEffect(() => {
        if(meowBarTickProgress >= CONFIG.progressBarEveryTicks){
            setMeowBarTickProgress(0)

            if (isInteracting) { 
                if (meowBarProgress > 0){
                    setMeowBarProgress(prev => prev - 1)
                } else {
                    setIsInteracting(false)
                    chooseActiveCat()
                }  
            }
    
        } else {
          setMeowBarTickProgress(prev => prev + 1)
        }
    }, [tickCount])

    // On score added progress meow bar
    useEffect(() => {
        if (!isInteracting){
            var multiplier = 0;
            //multiplier = multiplier + CONFIG.progressMultiplierItem;
            cats.map((_, index) => {
                if(index < getTotalCatsNumber()){
                    multiplier = multiplier + CONFIG.progressSpeedMultiplierPerCat
                }
            });


            var scoreNeeded = CONFIG.progressBarEveryPoints - (CONFIG.progressBarEveryPoints * multiplier)
            //if(itemsHandler.checkItem(CONFIG.scoreMultiplierItem)){scoreNeeded = scoreNeeded * CONFIG.scoreMultiplierModifier}
            if(score >= scoreNeeded + lastScore){
                setLastScore(score)
                setMeowBarProgress(prev => prev + CONFIG.progressBarEveryPointsBy)
            }
            if (meowBarProgress >= 100) {
                setMeowBarProgress(100)
                setIsInteracting(true)
            }

        }
    }, [score])

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
                {/* Wrapper */}
                <div ref={barElement} className="relative h-full overflow-hidden select-none" style={{width: `${gameAreaSize.width !=null ? (3 / 5) * gameAreaSize.width : ""}px`}}>
                    <img className="absolute top-0 left-0 w-full h-full select-none" src={MeowBarOutlineAsset}></img>
                    <div ref={changingElement} className="absolute h-full left-0 top-0 overflow-hidden select-none"><img className="absolute left-0 top-0 w-60 h-full pointer-events-none select-none" style={{minWidth: `${gameAreaSize.width !=null ? (3 / 5) * gameAreaSize.width : ""}px`}} src={MeowBarFillAsset}/></div>
                </div>
            </div>
        </>
    )

}