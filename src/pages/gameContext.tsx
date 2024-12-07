// imports
import {createContext, useContext, useEffect, useRef, useState} from "react"
import {CatsType, ItemsType} from "../common/interfaces"
import {CONFIG} from "../config"


interface GameContextType {
  // Methods
  handleResize: () => void;

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
  items: ItemsType;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  meowBarProgress: number;
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
    const [meowBarTickProgress, setMeowBarTickProgress] = useState<number>(0);

    // TO INTEGRATE WITH API
    const [items] = useState<ItemsType>([]); 
    const [score, setScore] = useState<number>(0); 

    // Clears everything and starts again the game
    function startGame(){
      gameInterval.current != null ? clearInterval(gameInterval.current) : null
      gameInterval.current = setInterval(() => {
        setTickCount((prevTick) => prevTick + 1); 
      }, CONFIG.tickDurationMs)
    }

    // Sets the gameAreaSize and backgroundAreaSize
    const handleResize = () => {
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

    // Updates on each tick
    useEffect(() => {
      if(meowBarTickProgress >= CONFIG.progressBarEveryTicks){
        setMeowBarProgress(prev => prev + 1)
        setMeowBarTickProgress(0)
      } else {
        setMeowBarTickProgress(prev => prev + 1)
      }
    }, [tickCount])



    return (
      <GameContext.Provider value={{handleResize, tickCount, gameInterval, gameAreaElement, gameAreaSize, setGameAreaSize, backgroundAreaElement, backgroundAreaSize, setBackgroundAreaSize, cats, items, score, setScore, meowBarProgress}}>
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