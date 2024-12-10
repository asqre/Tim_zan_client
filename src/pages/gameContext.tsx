// imports
import {createContext, useContext, useEffect, useRef, useState} from "react"
import {CatsType, ItemsType, ItemType} from "../common/interfaces"
import {CONFIG} from "../config"


interface GameContextType {
  itemsHandler: {
    checkItem: (item: string) => boolean;
    addItem: (item: ItemType) => void;
    removeItem: (item: ItemType) => void;
    getItems: () => ItemsType;
  };
  activeItemsHandler: {
    checkActiveItem: (item: string) => boolean;
    getExtraCats: () => number;
    getScoreMultiplier: () => number;
    getActiveItems: () => ItemsType;
  };
  scoreHandler: {
    addScore: (points: number) => void;
    resetScore: () => void;
    getScore: () => number;
  };
  coinsHandler: {
    addCoins: (coins: number) => void;
    removeCoins: (coins: number) => void;
    getCoins: () => number;
  };

  // Methods
  handleResize: () => void;
  chooseActiveCat: () => void;
  getTotalCatsNumber: () => number;

  // Attributes
  tickCount: number;
  gameInterval: React.MutableRefObject<number | null>;
  gameAreaElement: React.MutableRefObject<HTMLDivElement | null>;
  gameAreaSize: { width: number | null; height: number | null };
  setGameAreaSize: React.Dispatch<React.SetStateAction<{ width: number | null; height: number | null }>>;
  backgroundAreaElement: React.MutableRefObject<HTMLDivElement | null>;
  backgroundAreaSize: { width: number | null; height: number | null };
  setBackgroundAreaSize: React.Dispatch<React.SetStateAction<{ width: number | null; height: number | null }>>;
  cats: CatsType;
  activeCat: number | null;
  setActiveCat: React.Dispatch<React.SetStateAction<number | null>>;
  isInteracting: Boolean;
  setIsInteracting: React.Dispatch<React.SetStateAction<Boolean>>;
  meowBarProgress: number;
  setMeowBarProgress: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  openMenu: string | null;
  setOpenMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);
export const GameContextProvider = ({children} : {children : React.ReactNode}) => {
    const [tickCount, setTickCount] = useState(0);
    const gameInterval = useRef<number | null>(null)
    const gameAreaElement = useRef<HTMLDivElement | null>(null);
    const [gameAreaSize, setGameAreaSize] = useState<{width : number | null, height: number | null}>({
        width: null,
        height: null
    });
    const backgroundAreaElement = useRef<HTMLDivElement | null>(null);
    const [backgroundAreaSize, setBackgroundAreaSize] = useState<{width : number | null, height: number | null}>({
        width: null,
        height: null
    });
    const [cats] = useState<CatsType>(CONFIG.cats); 

    const [meowBarProgress, setMeowBarProgress] = useState<number>(0);

    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isInteracting, setIsInteracting] = useState<Boolean>(false)
    const [activeCat, setActiveCat] = useState<number | null>(null);

    // TO INTEGRATE WITH API
    const [items] = useState<ItemsType>([]); 
    const [activeItems, setActiveItems] = useState<ItemsType>([]); 
    const [score, setScore] = useState<number>(0); 
    const [coins, setCoins] = useState<number>(10); 

    // -- HANDLERS --
    // Items Handling Functions
    const itemsHandler = {
      checkItem: (itemToCheck: string) => {
        items.forEach(item => {
          if(item.name == itemToCheck){
            return true
          }
        });
        return false
      },
      addItem: (itemToAdd: ItemType) => {
        var found = false;
        items.forEach(item => {
          if(item.name == itemToAdd.name){
            found = true
            item.quantity = item.quantity + 1;
          }
        })
        if(!found){
          items.push(itemToAdd)
        }
      },
      removeItem: (itemToRemove: ItemType) => {
        items.forEach((item, index) => {
          if(item.name == itemToRemove.name){
            if(item.quantity == 1){
              items.splice(index, 1);
            } else {
              item.quantity = item.quantity - 1;
            }
          }
        })
      },
      getItems: () => {
        return items;
      }
    
    };

    const activeItemsHandler = {
      checkActiveItem: (itemToCheck: string) => {
        activeItems.forEach(item => {
          if(item.name == itemToCheck){
            return true
          }
        });
        return false
      },

      getExtraCats: () => {
        var extraCats = 0
        activeItems.forEach(item => {
          if(item.addedCats > extraCats){
            extraCats = item.addedCats
          }
        });
        return extraCats;
      },
      getScoreMultiplier: () => {
        var multiplier = 1
        activeItems.forEach(item => {
          if(item.scoreMultiplier > multiplier){
            multiplier = item.scoreMultiplier
          }
        });
        console.log(multiplier)
        return multiplier;
      },

      // Meant to get the active items from the api
      getActiveItems: () => {
        return activeItems;
      }
    };

    // Score Handling Functions
    const scoreHandler = {
      addScore: (points: number) => {
        var pointsToAdd = points
        pointsToAdd = pointsToAdd * activeItemsHandler.getScoreMultiplier()
        pointsToAdd = Math.floor(pointsToAdd)
        setScore((prev) => prev + pointsToAdd);
      },
      resetScore: () => {
        setScore(0);
      },
      // Meant to update the score using api
      getScore: () => {
        return score;
      },
    };
  
    // Coins Handling Functions
    const coinsHandler = {
      addCoins: (coins: number) => {
        setCoins((prev) => prev + Math.floor(coins));
      },
      removeCoins: (coins: number) => {
        if(coinsHandler.getCoins() >= Math.floor(coins)){
          setCoins((prev) => prev - Math.floor(coins));
        }
      },
      // Meant to update the coins using api
      getCoins: () => {
        return coins;
      },
    };
    // ----------------

    function getTotalCatsNumber(){
      return activeItemsHandler.getExtraCats() + 3;
    }

    // Clears everything
    function resetGame(){
      gameInterval.current != null ? clearInterval(gameInterval.current) : null
      setIsInteracting(false)
      setActiveCat(null)
      chooseActiveCat()
    }
    // Starts again the game
    function startGame(){
      resetGame()
      setActiveItems(activeItemsHandler.getActiveItems())
      handleResize()
      gameInterval.current = setInterval(() => {
        setTickCount((prevTick) => prevTick + 1); 
      }, CONFIG.tickDurationMs)
    }

    // Sets the gameAreaSize and backgroundAreaSize
    const handleResize = () => {
      console.log("resized")
      if(gameAreaElement.current != null && backgroundAreaElement.current != null){
          setGameAreaSize({
              width: gameAreaElement.current.clientWidth,
              height: gameAreaElement.current.clientHeight
          })
          setBackgroundAreaSize({
            width: backgroundAreaElement.current.clientWidth,
            height: backgroundAreaElement.current.clientHeight
          })
      }
    }

    // Listener for screen resizements
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      startGame()
      return () => {
          window.removeEventListener('resize',handleResize);
          gameInterval.current != null ? clearInterval(gameInterval.current) : null
      };
    }, [])

    // Chooses a cat for interaction
    function chooseActiveCat(){
      setActiveCat(Math.floor(Math.random() * getTotalCatsNumber()));
    }


    return (
      <GameContext.Provider value={{scoreHandler, score, itemsHandler, coinsHandler, handleResize, tickCount, gameInterval, gameAreaElement, gameAreaSize, setGameAreaSize, backgroundAreaElement, backgroundAreaSize, setBackgroundAreaSize, cats, activeCat, setActiveCat, chooseActiveCat, getTotalCatsNumber, isInteracting, setIsInteracting, meowBarProgress, setMeowBarProgress, openMenu, setOpenMenu, activeItemsHandler}}>
        {children}
      </GameContext.Provider>
    );
  };



export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
      throw new Error('useGameContext must be used within a GameContext.Provider');
    }
    return context;
  };

export default {GameContextProvider};