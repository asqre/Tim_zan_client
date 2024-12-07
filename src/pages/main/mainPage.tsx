// imports
import { useEffect } from "react"
import { useGameContext } from "../gameContext";
import { RythmBar } from "./components/rythmBar";
import { NavBar } from "./components/navBar";
import { TopBar } from "./components/topBar";
import { MeowBar } from "./components/meowBar";

import GameBackgroundAsset from "../../assets/gameBackground.png"
import CatAsset from "../../assets/Cat.png"
import { CONFIG } from "../../config";

export const MainPage = () => {
    const {handleResize, gameAreaElement,backgroundAreaSize, backgroundAreaElement, cats, items} = useGameContext();

    /*function screenClick(){
        console.log("Click Detected")
        if(gameAreaSize.height != null && gameAreaSize.width != null){

        }

    }
    {/* Div that functions as a click detector *///}
    //<div onClick={screenClick} className="w-screen h-screen fixed top-0 left-0 z-10"/>

    
    useEffect(() => {
        handleResize()
      }, [])

    return (
        <>
            {/* Wrapper */}
            <div className="overflow-hidden max-w-screen max-h-screen w-screen h-screen relative">
                {/* Background Game Area */}
                <div ref={backgroundAreaElement} className="h-screen absolute transform top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2" style={{width:`${CONFIG.backgroundWidthPx}px`,height:`${CONFIG.backgroundHeightPx}px`}}>
                    <img className="w-full h-full absolute top-0 left-0 object-cover" src={GameBackgroundAsset}/>
                    {(backgroundAreaSize != null) && cats.map((cat, index) => (
                        cat.requiresItem ?
                            items.includes(CONFIG.catsItem) &&
                                <div key={index} className="absolute" style={{
                                    left: `${(cat.x / 100) * CONFIG.backgroundWidthPx}px`, 
                                    top: `${(cat.y / 100) * CONFIG.backgroundHeightPx}px`, 
                                    width: `${CONFIG.catsSizePx}px`, 
                                    height: `${CONFIG.catsSizePx}px`, 
                                }}><img className="w-full h-full" src={CatAsset}/>
                                </div>
                        :
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
                <div ref={gameAreaElement} className="w-screen h-screen absolute top-0 left-1/2 transform -translate-x-1/2" style={{maxWidth:`${CONFIG.backgroundWidthPx}px`}}>
                    <TopBar className="absolute top-0 left-0 w-full h-12 flex items-center" />
                    <MeowBar className="absolute w-full bottom-44 h-8 flex items-center justify-center "/>
                    <RythmBar className="overflow-hidden w-full absolute bottom-12 h-28 flex items-center"/>
                    <NavBar className="absolute bottom-0 left-0 w-full overflow-hidde h-16 flex justify-center items-center gap-4 "/>
                </div>
            </div>
        
        </>
    )

}


// Hook to use the context
export default MainPage