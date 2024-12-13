// imports
import { createContext, useContext} from "react"
import { useGameContext } from "../../../gameContext";
import { InteractionBar } from "./interactionBar";
import { RythmBar } from "./rythmBar";

interface GameBarContextType {
}

const GameBarContext = createContext<GameBarContextType | undefined>(undefined);

export const GameBarContextProvider = ({className} : {className: string}) => {
    const {isInteracting} = useGameContext();
    return (
      <GameBarContext.Provider value={{}}>
        { isInteracting ?
            <InteractionBar className={`${className} justify-center gap-5`}/>
            :
            <RythmBar className={className}/>
        }
      </GameBarContext.Provider>
    );
  };



export const useGameBarContext = () => {
    const context = useContext(GameBarContext);
    if (!context) {
      throw new Error('useGameContext must be used within a GameContext.Provider');
    }
    return context;
  };

export default {GameBarContextProvider};