// imports
import { useEffect, useRef, useState } from "react"
import { useGameContext } from "../../gameContext";
import {CONFIG} from "../../../config"

import MeowBarFillAsset from "../../../assets/meowBarFill.png"
import MeowBarOutlineAsset from "../../../assets/meowBarOutline.png"


export const MeowBar = ({className} : {className: string}) => {
    const {gameAreaSize, chooseActiveCat, isInteracting, setIsInteracting, itemsHandler, tickCount, meowBarProgress, setMeowBarProgress, cats} = useGameContext();
    const barElement = useRef<HTMLDivElement | null>(null);
    const [barAreaSize, setBarAreaSize] = useState<{width : number | null, height: number | null}>({
        width: null,
        height: null
    });
    const [meowBarTickProgress, setMeowBarTickProgress] = useState<number>(0);
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
            var multiplier = 1;
            

            if (!isInteracting){
                if(meowBarProgress < 100){
                    if(itemsHandler.checkItem(CONFIG.catsItem)){
                        //multiplier = multiplier + CONFIG.progressMultiplierItem;
                        cats.forEach((cat) => {
                            console.log(`Processing cat at (${cat.x}, ${cat.y})`);
                            multiplier = multiplier + CONFIG.progressSpeedMultiplierPerCat
                            // Add your logic here for each cat with requiresItem: false
                        });
                    } else {
                        cats.forEach((cat) => {
                            if (!cat.requiresItem) {
                            console.log(`Processing cat at (${cat.x}, ${cat.y})`);
                            multiplier = multiplier + CONFIG.progressSpeedMultiplierPerCat
                            // Add your logic here for each cat with requiresItem: false
                            }
                        });
                    }
                    setMeowBarProgress(prev => prev + 1)
                } else {
                    setIsInteracting(true)
                }
                
            } else { 
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