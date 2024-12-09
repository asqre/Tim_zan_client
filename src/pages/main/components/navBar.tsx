// imports


import storeIcon from "../../../assets/storePawIcon.png"
import itemsIcon from "../../../assets/itemsPawIcon.png"
import rewardsIcon from "../../../assets/rewardsPawIcon.png"
import leaderboardsIcon from "../../../assets/leaderboardsIcon.png"

export const NavBar = ({className} : {className: string}) => {
    return (
        <>
            <div className={`${className ?? ''}`} >
                <button className="h-full"><img className="w-full h-full" src={storeIcon}></img></button>
                <button className="h-full"><img className="w-full h-full" src={itemsIcon}></img></button>
                <button className="h-full"><img className="w-full h-full" src={rewardsIcon}></img></button>
                <button className="h-full"><img className="w-full h-full" src={leaderboardsIcon}></img></button>
            </div>
        </>
    )

}