// imports
import { useEffect, useRef, useState } from "react"
import { useGameContext } from "../../gameContext";
import {CONFIG} from "../../../config"

import RythBarBackgroundAsset from "../../../assets/rythmBarBackground.png"
import PSMovingElementAsset from "../../../assets/PSElement.png"
import PSTargetElementAsset from "../../../assets/PSTarget.png"

interface MovingElementsType {
    id: string; 
    speedVariation: number;
  }

export const RythmBar = ({className} : {className: string}) => {
    const {tickCount,gameAreaSize,setScore} = useGameContext();
    const barElement = useRef<HTMLDivElement | null>(null);
    const [barAreaSize, setBarAreaSize] = useState<{width : number | null, height: number | null}>({
        width: null,
        height: null
    });
    const dotElement = useRef<HTMLDivElement | null>(null);
    const [movingElements, setMovingElements] = useState<MovingElementsType[]>([]);
    const [ticksForNextPS, setTicksForNextPS] = useState<number>(0);
    const [ticksFromLastPS, setTicksFromLastPS] = useState<number>(0);

    // Called on each tick
    useEffect(() => {
        if (barElement.current != null && movingElements.length > 0) {
            movingElements.forEach((movingElementId) => {
                const movingElement = document.getElementById(movingElementId.id);
                if(movingElement != null && barElement.current != null && barAreaSize.width != null){
                    // Checks if the moving element is "outside" the bar
                    if((barAreaSize.width + barElement.current.getBoundingClientRect().left) > movingElement.offsetLeft){
                        movingElement.style.left = (movingElement.offsetLeft + (5 * movingElementId.speedVariation)).toString() + "px";
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
                    speedVariation: CONFIG.PSDefaultSpeed * (1 + (Math.random() * (CONFIG.PSMAXSpeedVariation * 2) - CONFIG.PSMAXSpeedVariation)), 
                };
                setMovingElements((prev) => [...prev, newMovingElement]);

                setTicksFromLastPS(0)
                setTicksForNextPS(CONFIG.PSDefaultSpawnDelayTicks * (1 + (Math.random() * (CONFIG.PSMAXSpawnDelayVariation * 2) - CONFIG.PSMAXSpawnDelayVariation)))
            } else {
                setTicksFromLastPS(prev => prev + 1)
            }
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

    // Reset positions
    useEffect(() => {
        if (barElement.current != null && barAreaSize.width != null && barAreaSize.height != null) {
            if(dotElement.current != null){

                const newMovingElement: MovingElementsType = {
                    id: Math.random().toString(), 
                    speedVariation: CONFIG.PSDefaultSpeed * (1 + (Math.random() * (CONFIG.PSMAXSpeedVariation * 2) - CONFIG.PSMAXSpeedVariation)), 
                };
                //movingElement.current.style.left = (400).toString() + "px";
                setMovingElements([newMovingElement]);

                setTicksFromLastPS(0)
                setTicksForNextPS(CONFIG.PSDefaultSpawnDelayTicks * (1 + (Math.random() * (CONFIG.PSMAXSpawnDelayVariation * 2) - CONFIG.PSMAXSpawnDelayVariation)))


                dotElement.current.style.left = ((barAreaSize.width - dotElement.current.clientWidth) - barAreaSize.width/40).toString() + "px";
            }
        }
    }, [barAreaSize])

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
                        setScore(prev=>prev+CONFIG.PSPerfectPoints)
                        setMovingElements(movingElements.filter(id => id !== movingElementId));
                    } else if (
                        movingElementRect.left >= dotElementRect.left - dotElement.current.clientWidth * CONFIG.PSMAXAcceptanceMargin &&
                        movingElementRect.right <= dotElementRect.right + dotElement.current.clientWidth * CONFIG.PSMAXAcceptanceMargin
                    ) {
                        setScore(prev=>prev+CONFIG.PSPartialPoints)
                        setMovingElements(movingElements.filter(id => id !== movingElementId));
                
                    }
                }
            })
        }
    }


    return (
        <>
            <div ref={barElement} onClick={barClicked} className={className}>
                <img className="absolute top-0 left-0 w-full h-full" src={RythBarBackgroundAsset}/>
                <div ref={dotElement} className="absolute w-28 h-22 "><img className="w-full h-full" src={PSTargetElementAsset}/></div>
                {/*<div ref={movingElement} className="absolute w-16 h-16 bg-gray-500"></div>*/}
                {movingElements.map((clone) => (
                    <div key={clone.id} id={clone.id} className="absolute -left-24 w-24 h-16"><img className="w-full h-full" src={PSMovingElementAsset}/></div>
                ))}
            </div>
        </>
    )

}