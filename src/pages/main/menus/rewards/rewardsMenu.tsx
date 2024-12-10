// imports
import { useGameContext } from "../../../gameContext";

import MenuBackgroundAsset from "../../../../assets/menuBackground.png"
import MenuExitButtonIcon from "../../../../assets/menuExitButtonIcon.png"

export const RewardsMenu = ({className} : {className: string}) => {
    const {setOpenMenu} = useGameContext();
    return (
        <>
            <div></div>
            <div className={`${className ?? ''}`} >
                <img className="w-full h-full absolute top-0 left-0" src={MenuBackgroundAsset}/>
                <button onClick={()=>{setOpenMenu(null)}} className="absolute right-0 -top-3 w-16 h-16 "><img className="w-full h-full" src={MenuExitButtonIcon}/></button>
            </div>
        </>
    )

}