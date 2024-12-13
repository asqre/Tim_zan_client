// imports
import { useGameContext } from "../../../gameContext";
import { CONFIG } from "../../../../config";

import MenuBackgroundAsset from "../../../../assets/menuBackground.png"
import MenuExitButtonIcon from "../../../../assets/menuExitButtonIcon.png"

import MenuStoreTopUpAsset from  "../../../../assets/menuStoreTopUp.png"
import MenuStoreItemsAsset from  "../../../../assets/menuStoreItems.png"

import FishItemMenuBackground from "../../../../assets/fishItemMenuBackground.png"
import SeafoodItemMenuBackground from "../../../../assets/seafoodItemMenuBackground.png"
import MouseItemMenuBackground from "../../../../assets/mouseItemMenuBackground.png"
import FeatherItemMenuBackground from "../../../../assets/featherItemMenuBackground.png"
import CatnipItemMenuBackground from "../../../../assets/catnipItemMenuBackground.png"
import CatnipBoquetItemMenuBackground from "../../../../assets/catnipBoquetItemMenuBackground.png"


export const StoreMenu = ({className} : {className: string}) => {
    const {setOpenMenu, itemsHandler, coinsHandler} = useGameContext();

    function buyItem(itemName: string){

        CONFIG.items.forEach(item => {
            if(item.name == itemName){
                if(coinsHandler.getCoins() >= item.cost){
                    itemsHandler.addItem(item)
                    coinsHandler.removeCoins(item.cost)
                }
            }
        })
    }

    return (
        <>
            <div className={`${className ?? ''}`} >
                <img className="w-full h-full absolute top-0 left-0 z-0" src={MenuBackgroundAsset}/>
                <button onClick={()=>{setOpenMenu(null)}} className="absolute right-0 -top-3 w-16 h-16 "><img className="w-full h-full" src={MenuExitButtonIcon}/></button>
                <div className="absolute top-1 w-full flex items-center justify-center pointer-events-none"><h1 className="font-bold text-white text-xl font-pixeloid">Store</h1></div>
                <div className="h-1"/>
                <div className="mt-14 relative w-full h-fit flex flex-col gap-2 justify-center items-center">
                    <img className="w-32 h-8" src={MenuStoreTopUpAsset}/>
                    <div className="relative bg-[#F6CA9E] w-8/12 h-10 flex flex-row items-center">
                        <img className="w-10 h-10 bg-red-600" />
                        <p className="ml-1 font-bold text-white text-xl font-pixeloid">1000</p>
                        <div className="bg-[#FFC724] w-10 h-5 absolute right-2 top-1 rounded-md flex items-center justify-center">
                            <p className="font-bold text-white text-xl font-pixeloid">${CONFIG.cost1000Coins}</p>
                        </div>
                    </div>
                    <div className="relative bg-[#F6CA9E] w-8/12 h-10 flex flex-row items-center">
                        <img className="w-10 h-10 bg-red-600" />
                        <p className="ml-1 font-bold text-white text-xl font-pixeloid">5000</p>
                        <div className="bg-[#FFC724] w-10 h-5 absolute right-2 top-1 rounded-md flex items-center justify-center">
                            <p className="font-bold text-white text-xl font-pixeloid">${CONFIG.cost5000Coins}</p>
                        </div>
                    </div>
                    <div className="relative bg-[#F6CA9E] w-8/12 h-10 flex flex-row items-center">
                        <img className="w-10 h-10 bg-red-600" />
                        <p className="ml-1 font-bold text-white text-xl font-pixeloid">10000</p>
                        <div className="bg-[#FFC724] w-10 h-5 absolute right-2 top-1 rounded-md flex items-center justify-center">
                            <p className="font-bold text-white text-xl font-pixeloid">${CONFIG.cost10000Coins}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full relative -mt-28 h-full flex items-center justify-center flex-col">
                    <img className="relative w-32 h-8 bg-red-700" src={MenuStoreItemsAsset}/>
                    <div className="relative w-full h-64 flex flex-col gap-2  items-center overflow-auto ">
                        {CONFIG.items.map((item, index) => (
                            <button onClick={() => buyItem(item.name)} key={index} className="relative w-11/12 min-h-20 h-20 flex flex-row items-center no-scrollbar">
                                {item.name == "Fish Platter" ?
                                    <img src={FishItemMenuBackground} className="absolute w-full h-full object-cover"/>
                                :item.name == "Seafood Platter" ?
                                    <img src={SeafoodItemMenuBackground} className="absolute w-full h-full object-cover"/>
                                :item.name == "Mouse Toy" ?
                                    <img src={MouseItemMenuBackground} className="absolute w-full h-full object-cover"/>
                                :item.name == "Feather Toy" ?
                                    <img src={FeatherItemMenuBackground} className="absolute w-full h-full object-cover"/>
                                :item.name == "Catnip Leaft" ?
                                    <img src={CatnipItemMenuBackground} className="absolute w-full h-full object-cover"/>
                                :item.name == "Catnip Bocquet" &&
                                    <img src={CatnipBoquetItemMenuBackground} className="absolute w-full h-full object-cover"/>
                                }
                                <p className="absolute top-2 left-10 font-bold text-white text-base font-pixeloid">{item.name}</p>
                                <p className="absolute top-9 left-24 w-36 max-w-40 font-bold text-white text-xs font-pixeloid" style={{fontSize: "10px"}}>{item.description}</p>
                                <p className="absolute top-4 right-8 font-bold text-white text-xs font-pixeloid">{item.cost}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}