// imports
import { useGameContext } from "../../gameContext";

import backgroundAsset from "../../../assets/topBarBackground.png"

export const TopBar = ({className} : {className: string}) => {
    const {score} = useGameContext();
    return (
        <>
            <div className={`${className ?? ''}`} >
                <img className="w-full h-full absolute top-0 left-0 z-10" src={backgroundAsset}/>
                <button className="h-full z-20 ml-2 font-bold text-xl">SCORES {score}</button>

            </div>
        </>
    )

}