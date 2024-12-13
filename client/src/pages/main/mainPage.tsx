// imports
import { useEffect, useRef, useState } from "react"
import { useGameContext } from "../gameContext";
import { GameBarContextProvider } from "./components/gameBarComponents/gameBar";
import { NavBar } from "./components/navBar";
import { TopBar } from "./components/topBar";
import { MeowBar } from "./components/meowBar";
// Menus
import { StoreMenu } from "./menus/store/storeMenu";
import { ItemsMenu } from "./menus/items/itemsMenu";
import { RewardsMenu } from "./menus/rewards/rewardsMenu";
import { LeaderboardsMenu } from "./menus/leaderboards/leaderboardsMenu";

import GameBackgroundAsset from "../../assets/gameBackground.png"
import CatAsset from "../../assets/Cat.png"
import { CONFIG } from "../../config";


import backgroundMusic from "../../sounds/background.mp3"

export const MainPage = () => {
    const {gameAreaElement,backgroundAreaSize, backgroundAreaElement, cats, activeCat, isInteracting, openMenu, getTotalCatsNumber} = useGameContext();
    
    /*function screenClick(){
        console.log("Click Detected")
        if(gameAreaSize.height != null && gameAreaSize.width != null){

        }

    }
    {/* Div that functions as a click detector *///}
    //<div onClick={screenClick} className="w-screen h-screen fixed top-0 left-0 z-10"/>


    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicStarted, setMusicStarted] = useState(false);
  
    useEffect(() => {
      const startMusic = () => {
        if (audioRef.current && !musicStarted) {
          audioRef.current.play().catch((err) => {
            console.error("Error playing audio:", err);
          });
          setMusicStarted(true);
          document.removeEventListener('click', startMusic);
          document.removeEventListener('keydown', startMusic);
          document.removeEventListener('pointermove', startMusic);
        }
      };
      document.addEventListener('click', startMusic);
      document.addEventListener('keydown', startMusic);
      document.addEventListener('pointermove', startMusic);
  
      return () => {
        document.removeEventListener('click', startMusic);
        document.removeEventListener('keydown', startMusic);
        document.removeEventListener('pointermove', startMusic);
      };
    }, [musicStarted]);


    return (
        <>
            {/* Audio */}
            <audio ref={audioRef} loop autoPlay>
                <source src={backgroundMusic} type="audio/mp3" />
            </audio>

            {/* Wrapper */}
            <div className="overflow-hidden max-w-screen max-h-screen w-screen h-screen relative">
                {/* Background Game Area */}
                <div ref={backgroundAreaElement} className="h-screen absolute transform top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2" style={{width:`${CONFIG.backgroundWidthPx}px`,height:`${CONFIG.backgroundHeightPx}px`}}>
                    <img className="w-full h-full absolute top-0 left-0 object-cover" src={GameBackgroundAsset}/>
                    {(backgroundAreaSize != null) && cats.map((cat, index) => (
                        (index == activeCat && isInteracting) ?
                            <div key={index} className="absolute" style={{
                                left: `${(35 / 100) * CONFIG.backgroundWidthPx}px`, 
                                top: `${(52 / 100) * CONFIG.backgroundHeightPx}px`, 
                                width: `${CONFIG.catsSizePx}px`, 
                                height: `${CONFIG.catsSizePx}px`, 
                            }}><img className="w-full h-full" src={CatAsset}/>
                            </div>
                        : index < getTotalCatsNumber() &&
                            <div key={index} className="absolute" style={{
                                left: `${(cat.x / 100) * CONFIG.backgroundWidthPx}px`, 
                                top: `${(cat.y / 100) * CONFIG.backgroundHeightPx}px`, 
                                width: `${CONFIG.catsSizePx}px`, 
                                height: `${CONFIG.catsSizePx}px`, 
                            }}><img className="w-full h-full" src={CatAsset}/>
                            </div>

                    ))}
                </div>


                {/* Game Area */}
                <div ref={gameAreaElement} className="w-screen h-screen absolute top-0 left-1/2 transform -translate-x-1/2 select-none" style={{maxWidth:`${CONFIG.backgroundWidthPx}px`}}>
                    
                    {/* Menus */}
                    <div className="w-full h-full flex items-center justify-center">
                        { openMenu == "store" ?
                            <StoreMenu className="mb-4 z-20 relative w-4/5 h-5/6 overflow-hidden"/>
                        : openMenu == "items" ?
                            <ItemsMenu className="mb-4 z-20 relative w-4/5 h-5/6 overflow-hidden"/>
                        : openMenu == "rewards" ?
                            <RewardsMenu className="mb-4 z-20 relative w-4/5 h-5/6 overflow-hidden"/>
                        : openMenu == "leaderboards" &&
                            <LeaderboardsMenu className="mb-4 z-20 relative w-4/5 h-5/6 overflow-hidden"/>
                        }
                    </div>

                    {/* Game Parts */}
                    <TopBar className="absolute top-0 left-0 w-full h-12 flex items-center select-none" />
                    <MeowBar className="absolute w-full bottom-40 h-14 flex items-center justify-center select-none "/>
                    <GameBarContextProvider className="overflow-hidden w-full absolute bottom-12 h-28 flex items-center select-none"/>
                    <NavBar className="absolute bottom-0 left-0 w-full overflow-hidden h-16 flex justify-center items-center gap-4 select-none"/>

                </div>
            </div>
        
        </>
    )

}


// Hook to use the context
export default MainPage