// imports
import { useGameContext } from "../../../gameContext";


import MenuBackgroundAsset from "../../../../assets/menuBackground.png"
import MenuExitButtonIcon from "../../../../assets/menuExitButtonIcon.png"

import MenuStoreItemsAsset from  "../../../../assets/menuStoreItems.png"

import FishItemMenuBackground from "../../../../assets/fishItemMenuBackground.png"
import SeafoodItemMenuBackground from "../../../../assets/seafoodItemMenuBackground.png"
import MouseItemMenuBackground from "../../../../assets/mouseItemMenuBackground.png"
import FeatherItemMenuBackground from "../../../../assets/featherItemMenuBackground.png"
import CatnipItemMenuBackground from "../../../../assets/catnipItemMenuBackground.png"
import CatnipBoquetItemMenuBackground from "../../../../assets/catnipBoquetItemMenuBackground.png"

export const ItemsMenu = ({className} : {className: string}) => {
    const {setOpenMenu, itemsHandler} = useGameContext();

    function activateItem(itemName: string){

        itemsHandler.getItems().forEach(item => {
            if(item.name == itemName){
                itemsHandler.removeItem(item)
            }
        })
    }


    return (
        <>
            <div className={`${className ?? ''}`} >
                <img className="w-full h-full absolute top-0 left-0" src={MenuBackgroundAsset}/>
                <button onClick={()=>{setOpenMenu(null)}} className="absolute right-0 -top-3 w-16 h-16 "><img className="w-full h-full" src={MenuExitButtonIcon}/></button>

                <div className="w-full relative pointer-events-none -mt-28 h-full flex items-center justify-center flex-col">
                    <img className="relative w-32 h-8 bg-red-700" src={MenuStoreItemsAsset}/>
                    <div className="relative w-full h-64 flex flex-col gap-2  items-center overflow-auto ">
                        {itemsHandler.getItems().map((item, index) => (
                            <button onClick={() => activateItem(item.name)} key={index} className="relative pointer-events-auto w-11/12 min-h-20 h-20 flex flex-row items-center no-scrollbar">
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
                                <p className="absolute top-4 right-8 font-bold text-white text-xs font-pixeloid">{item.quantity}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}