// imports
import {createContext, useContext, useEffect, useRef, useState} from "react"
import {CatsType, ItemsType} from "../common/interfaces"
import {CONFIG} from "../config"


interface GameContextType {
  itemsHandler: {
    checkItem: (item: string) => boolean;
  };
  scoreHandler: {
    addScore: (points: number) => void;
    resetScore: () => void;
    getScore: () => number;
  };
  coinsHandler: {
    addCoins: (coins: number) => void;
    getCoins: () => number;
  };

  // Methods
  handleResize: () => void;
  chooseActiveCat: () => void;

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

    const [isInteracting, setIsInteracting] = useState<Boolean>(false)
    const [activeCat, setActiveCat] = useState<number | null>(null);

    // TO INTEGRATE WITH API
    const [items] = useState<ItemsType>([]); 
    const [score, setScore] = useState<number>(0); 
    const [coins, setCoins] = useState<number>(0); 

    // Items Handling Functions
    const itemsHandler = {
      checkItem: (item: string) => {
        if(items.includes(item)){
          return true
        } else {
          return false
        }
      },
    };

    // Score Handling Functions
    const scoreHandler = {
      addScore: (points: number) => {
        setScore((prev) => prev + Math.floor(points));
      },
      resetScore: () => {
        setScore(0);
      },
      getScore: () => {
        return score;
      },
    };
  
    // Coins Handling Functions
    const coinsHandler = {
      addCoins: (coins: number) => {
        setCoins((prev) => prev + Math.floor(coins));
      },
      getCoins: () => {
        return coins;
      },
    };

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
      if(items.includes(CONFIG.catsItem)){
        setActiveCat(Math.floor(Math.random() * 5));
      } else {
        setActiveCat(Math.floor(Math.random() * 3));
      }
    }


    return (
      <GameContext.Provider value={{scoreHandler, itemsHandler, coinsHandler, handleResize, tickCount, gameInterval, gameAreaElement, gameAreaSize, setGameAreaSize, backgroundAreaElement, backgroundAreaSize, setBackgroundAreaSize, cats, activeCat, setActiveCat, chooseActiveCat, isInteracting, setIsInteracting, meowBarProgress, setMeowBarProgress}}>
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