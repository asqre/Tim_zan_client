// imports
import { useEffect, useRef, useState } from "react"
import { useGameContext } from "../../../gameContext";
import {CONFIG} from "../../../../config"

import RythBarBackgroundAsset from "../../../../assets/rythmBarBackground.png"

import PetButtonIcon from "../../../../assets/petButtonIcon.png"
import ScratchButtonIcon from "../../../../assets/scratchButtonIcon.png"
import RubButtonIcon from "../../../../assets/rubButtonIcon.png"

import InteractionArrowAsset from "../../../../assets/interactionArrow.png"
import InteractionBarChance70 from "../../../../assets/interactionBarChance70.png"
import InteractionBarChance30 from "../../../../assets/interactionBarChance30.png"
import InteractionBarChance15 from "../../../../assets/interactionBarChance15.png"

export const InteractionBar = ({className} : {className: string}) => {
    const {tickCount, scoreHandler, meowBarProgress, setMeowBarProgress} = useGameContext();
    const [userChancePercentage, setUserChancePercentage] = useState<number>(0);
    const [userChanceUp, setUserChanceUp] = useState<boolean>(true);
    const [ticksFromLastInteractionTick, setTicksFromLastInteractionTick] = useState<number>(0);
    const currentAction = useRef<string | null>(null);
    const arrowContainer = useRef<HTMLDivElement | null>(null);
    const changingElement = useRef<HTMLImageElement | null>(null);

    useEffect(()=>{
        if(currentAction.current != null){
            // Wait for one interaction tick to pass
            if(ticksFromLastInteractionTick > CONFIG.TickForNextInteractionTick){
                setTicksFromLastInteractionTick(0);

                if (userChanceUp){
                    if(userChancePercentage < 100){
                        setUserChancePercentage(prev => prev + CONFIG.interactionDefaultSpeedPx);
                        
                    } else {
                        setUserChanceUp(false)
                    }
                }else{
                    if(userChancePercentage > 0){
                        setUserChancePercentage(prev => prev - CONFIG.interactionDefaultSpeedPx);
                    } else {
                        setUserChanceUp(true)
                    }
                }
            } else {
                setTicksFromLastInteractionTick(prev => prev + 1);
            }
        }
    }, [tickCount])

    useEffect(()=>{
        if(arrowContainer.current != null && changingElement.current != null){
            const containerHeight = arrowContainer.current.clientHeight;
            const newPosition = (userChancePercentage / 100) * (containerHeight - 15);
            changingElement.current.style.bottom = `${newPosition}px`;
        }
    }, [userChancePercentage])

    const startHold = (buttonType: string) => {
        stopHold()
        setUserChancePercentage(Math.floor(Math.random() * 101))
        currentAction.current = buttonType;
    };

    const stopHold = () => {
        if(currentAction.current != null){
            if(currentAction.current == "pet" && userChancePercentage < CONFIG.petSuccessPercentage){
                scoreHandler.addScore((CONFIG.petSuccessPointsAward - CONFIG.petSuccessPointsAward * (CONFIG.DecreaseAwardRate / 10 * (100 - meowBarProgress))))
            } else if (currentAction.current == "pet"){
                setMeowBarProgress(prev => prev - CONFIG.FailedInteractionMeowMeterPenalty)
                scoreHandler.addScore((CONFIG.petFailPointsAward - CONFIG.petFailPointsAward * (CONFIG.DecreaseAwardRate / 10 * (100 - meowBarProgress))))
            } else if(currentAction.current == "scratch" && userChancePercentage < CONFIG.scratchSuccessPercentage){
                scoreHandler.addScore((CONFIG.scratchSuccessPointsAward - CONFIG.scratchSuccessPointsAward * (CONFIG.DecreaseAwardRate / 10 * (100 - meowBarProgress))))
            } else if (currentAction.current == "scratch"){
                setMeowBarProgress(prev => prev - CONFIG.FailedInteractionMeowMeterPenalty)
                scoreHandler.addScore((CONFIG.scratchFailPointsAward - CONFIG.scratchFailPointsAward * (CONFIG.DecreaseAwardRate / 10 * (100 - meowBarProgress))))
            } else if(currentAction.current == "rub" && userChancePercentage < CONFIG.rubSuccessPercentage){
                scoreHandler.addScore((CONFIG.rubSuccessPointsAward - CONFIG.rubSuccessPointsAward * (CONFIG.DecreaseAwardRate / 10 * (100 - meowBarProgress))))
            } else if(currentAction.current == "rub"){
                setMeowBarProgress(prev => prev - CONFIG.FailedInteractionMeowMeterPenalty)
                scoreHandler.addScore((CONFIG.rubFailPointsAward - CONFIG.rubFailPointsAward * (CONFIG.DecreaseAwardRate / 10 * (100 - meowBarProgress))))
            }
        }

        // reset everything
        currentAction.current = null;
    };

    return (
        <>  
            <div className={className}>
                <img className="absolute top-0 left-0 w-full h-full" src={RythBarBackgroundAsset}/>
                <button className="relative w-20 h-20" onTouchStart={() => startHold("pet")} onMouseDown={() => startHold("pet")} onMouseUp={stopHold} onMouseLeave={stopHold} onTouchEnd={stopHold}><img className="absolute top-0 left-0 w-full h-full pointer-events-none" src={PetButtonIcon}/></button>
                <button className="relative w-20 h-20" onTouchStart={() => startHold("scratch")} onMouseDown={() => startHold("scratch")} onMouseUp={stopHold} onMouseLeave={stopHold} onTouchEnd={stopHold}><img className="absolute top-0 left-0 w-full h-full pointer-events-none" src={ScratchButtonIcon}/></button>
                <button className="relative w-20 h-20" onTouchStart={() => startHold("rub")} onMouseDown={() => startHold("rub")} onMouseUp={stopHold} onMouseLeave={stopHold} onTouchEnd={stopHold}><img className="absolute top-0 left-0 w-full h-full pointer-events-none" src={RubButtonIcon}/></button>
                <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center">
                    {
                    currentAction.current != null &&
                        <div ref={arrowContainer} className="relative h-5/6 w-2/6">
                            <img ref={changingElement} className="absolute" style={{width: "15px", height: "15px"}} src={InteractionArrowAsset}/>
                        </div>
                    }      
                    {currentAction.current == "pet" ?
                        <img className="relative h-5/6 w-4/6" src={InteractionBarChance70}/>
                    : currentAction.current == "scratch" ? 
                        <img className="relative h-5/6 w-4/6" src={InteractionBarChance30}/>
                    : currentAction.current == "rub" &&
                        <img className="relative h-5/6 w-4/6" src={InteractionBarChance15}/>
                    }
            </div>
            </div>
        </>
    )

}