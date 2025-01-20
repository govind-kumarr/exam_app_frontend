import { createContext, FC, ReactNode, useCallback, useState } from "react";
import { position } from "../types/interfaces/component-interfaces";
import { getRandomNumber } from "../utils/functions";

interface IGameContext {
  foods: position[];
  removeFood: (index: number) => void;
  addFood: () => void;
}

const GameContext = createContext<IGameContext | null>(null);

interface GameContextProviderProps {
  children: ReactNode;
}

const GameContextProvider: FC<GameContextProviderProps> = ({ children }) => {
  const [foods, setFoods] = useState([
    {
      top: 50,
      left: 50,
    },
  ]);

  const removeFood = useCallback(
    (index: number) => {
      const newFoods = foods.slice(0);
      newFoods.splice(index, 1);
      setFoods(newFoods);
    },
    [setFoods, foods]
  );

  const addFood = useCallback(() => {
    setFoods((prev) => [...prev, getRandomNumber()]);
  }, [setFoods]);

  return (
    <GameContext.Provider
      value={{
        foods,
        removeFood,
        addFood,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameContextProvider };
