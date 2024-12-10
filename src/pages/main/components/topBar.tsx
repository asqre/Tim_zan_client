// imports
import { useGameContext } from "../../gameContext";

import backgroundAsset from "../../../assets/topBarBackground.png"

export const TopBar = ({className} : {className: string}) => {
    const {scoreHandler, coinsHandler} = useGameContext();
    return (
        <>
            <div className={`${className ?? ''}`} >
                <img className="w-full h-full absolute top-0 left-0 z-10" src={backgroundAsset}/>
                <button className="absolute left-0 h-full z-20 ml-2 font-bold text-white text-2xl font-pixeloid " >SCORES {scoreHandler.getScore()}</button>
                <button className="absolute right-2 h-full z-20 ml-2 font-bold text-white text-2xl font-pixeloid">{coinsHandler.getCoins()}</button>
            </div>
        </>
    )

}