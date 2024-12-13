// imports
import { useGameContext } from "../../gameContext"

import storeIcon from "../../../assets/storePawIcon.png"
import itemsIcon from "../../../assets/itemsPawIcon.png"
import rewardsIcon from "../../../assets/rewardsPawIcon.png"
import leaderboardsIcon from "../../../assets/leaderboardsIcon.png"

export const NavBar = ({className} : {className: string}) => {
    const {setOpenMenu} = useGameContext();

    return (
        <>
            <div className={`${className ?? ''}`} >
                <button onClick={()=>{setOpenMenu("store")}} className="h-full"><img className="w-full h-full" src={storeIcon}></img></button>
                <button onClick={()=>{setOpenMenu("items")}} className="h-full"><img className="w-full h-full" src={itemsIcon}></img></button>
                <button onClick={()=>{setOpenMenu("rewards")}} className="h-full"><img className="w-full h-full" src={rewardsIcon}></img></button>
                <button onClick={()=>{setOpenMenu("leaderboards")}} className="h-full"><img className="w-full h-full" src={leaderboardsIcon}></img></button>
            </div>
        </>
    )

}