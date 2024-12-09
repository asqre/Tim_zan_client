// imports
import { useEffect, useRef, useState } from "react"
import { useGameContext } from "../../../gameContext";
import {CONFIG} from "../../../../config"

import RythBarBackgroundAsset from "../../../../assets/rythmBarBackground.png"
import PSMovingElementAsset from "../../../../assets/PSElement.png"
import PSTargetElementAsset from "../../../../assets/PSTarget.png"

import PsSoundEffect from "../../../../sounds/pspsps.mp3"

interface MovingElementsType {
    id: string; 
    speedVariation: number;
  }

export const RythmBar = ({className} : {className: string}) => {
    const {tickCount,gameAreaSize, scoreHandler} = useGameContext();
    const barElement = useRef<HTMLDivElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [barAreaSize, setBarAreaSize] = useState<{width : number | null, height: number | null}>({
        width: null,
        height: null
    });
    const dotElement = useRef<HTMLDivElement | null>(null);
    const [movingElements, setMovingElements] = useState<MovingElementsType[]>([]);
    const [ticksForNextPS, setTicksForNextPS] = useState<number>(0);
    const [ticksFromLastPS, setTicksFromLastPS] = useState<number>(0);

    const [ticksFromLastPSTick, setTicksFromLastPSTick] = useState<number>(0);

    // Called on each tick
    useEffect(() => {
        if(ticksFromLastPSTick > CONFIG.TickForNextPSTick){
            setTicksFromLastPSTick(0)
            if (barElement.current != null && movingElements.length > 0) {
                movingElements.forEach((movingElementId) => {
                    const movingElement = document.getElementById(movingElementId.id);
                    if(movingElement != null && barElement.current != null && barAreaSize.width != null){
                        // Checks if the moving element is "outside" the bar
                        if((barAreaSize.width + barElement.current.getBoundingClientRect().left) > movingElement.offsetLeft){
                            movingElement.style.left = (movingElement.offsetLeft +  movingElementId.speedVariation).toString() + "px";
                        } else {
                            movingElement.style.left = (-96).toString() + "px";
                        }
                    }
                })
            }
            if(movingElements.length < 5){
                if(ticksFromLastPS > ticksForNextPS){
                    const newMovingElement: MovingElementsType = {
                        id: Math.random().toString(), 
                        speedVariation: CONFIG.PSDefaultSpeedPx + (Math.random() * (2 * CONFIG.PSMAXSpeedVariationPx) - CONFIG.PSMAXSpeedVariationPx) 
                    };
                    setMovingElements((prev) => [...prev, newMovingElement]);
                    setTicksFromLastPS(0)
                    setTicksForNextPS(CONFIG.PSDefaultSpawnDelayTicks * (1 + (Math.random() * (CONFIG.PSMAXSpawnDelayVariation * 2) - CONFIG.PSMAXSpawnDelayVariation)))
                } else {
                    setTicksFromLastPS(prev => prev + 1)
                }
            }
        } else {
            setTicksFromLastPSTick(prev => prev + 1)
        }
    }, [tickCount])

    // Set barsize as soon as the game loads
    useEffect(() => {
        if (barElement.current != null){
            setBarAreaSize({
                width: barElement.current.clientWidth,
                height: barElement.current.clientHeight
            })
        }
    }, [gameAreaSize])

    function resetPositions(){
        if (barElement.current != null && barAreaSize.width != null && barAreaSize.height != null) {
            if(dotElement.current != null){

                const newMovingElement: MovingElementsType = {
                    id: Math.random().toString(), 
                    speedVariation: CONFIG.PSDefaultSpeedPx + (Math.random() * (2 * CONFIG.PSMAXSpeedVariationPx) - CONFIG.PSMAXSpeedVariationPx) , 
                };
                //movingElement.current.style.left = (400).toString() + "px";
                setMovingElements([newMovingElement]);

                setTicksFromLastPS(0)
                setTicksForNextPS(CONFIG.PSDefaultSpawnDelayTicks * (1 + (Math.random() * (CONFIG.PSMAXSpawnDelayVariation * 2) - CONFIG.PSMAXSpawnDelayVariation)))


                dotElement.current.style.left = ((barAreaSize.width - dotElement.current.clientWidth) - barAreaSize.width/40).toString() + "px";
            }
        }
    }
    // Reset positions
    useEffect(() => {resetPositions()}, [barAreaSize])

    // Bar gets clicked
    function barClicked(){
        if (barElement.current != null && movingElements.length > 0) {
            movingElements.forEach((movingElementId) => {
                const movingElement = document.getElementById(movingElementId.id);
                if (movingElement != null && dotElement.current != null) {
                    const movingElementRect = movingElement.getBoundingClientRect();
                    const dotElementRect = dotElement.current.getBoundingClientRect();
                    // Checks if the moving element is within the box with a margin of acceptance
                    if (
                        movingElementRect.left >= dotElementRect.left - dotElement.current.clientWidth * CONFIG.PSMAXPerfectAcceptanceMargin &&
                        movingElementRect.right <= dotElementRect.right + dotElement.current.clientWidth * CONFIG.PSMAXPerfectAcceptanceMargin
                    ){
                        scoreHandler.addScore(CONFIG.PSPerfectPoints)
                        setMovingElements(movingElements.filter(id => id !== movingElementId));
                        if (audioRef.current) {audioRef.current.play();}
                    
                    } else if (
                        movingElementRect.left >= dotElementRect.left - dotElement.current.clientWidth * CONFIG.PSMAXAcceptanceMargin &&
                        movingElementRect.right <= dotElementRect.right + dotElement.current.clientWidth * CONFIG.PSMAXAcceptanceMargin
                    ) {
                        scoreHandler.addScore(CONFIG.PSPartialPoints)
                        setMovingElements(movingElements.filter(id => id !== movingElementId));
                        if (audioRef.current) {audioRef.current.play();}
                    }
                }
            })
        }
    }


    return (
        <>  
            <audio ref={audioRef}>
                <source src={PsSoundEffect} type="audio/mp3" />
            </audio>
            <div ref={barElement} onClick={barClicked} className={className}>
                <img className="absolute top-0 left-0 w-full h-full pointer-events-none select-none" src={RythBarBackgroundAsset}/>
                <div ref={dotElement} className="absolute w-28 h-22 "><img className="w-full h-full pointer-events-none select-none" src={PSTargetElementAsset}/></div>
                {/*<div ref={movingElement} className="absolute w-16 h-16 bg-gray-500"></div>*/}
                {movingElements.map((clone) => (
                    <div key={clone.id} id={clone.id} className="absolute -left-24 w-24 h-16 pointer-events-none select-none"><img className="w-full h-full pointer-events-none select-none" src={PSMovingElementAsset}/></div>
                ))}
            </div>
        </>
    )

}