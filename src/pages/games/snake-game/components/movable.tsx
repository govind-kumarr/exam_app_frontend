import { FC, memo, useEffect } from "react";
import { MovableProps } from "../../../../types/interfaces/component-interfaces";
import { canEat } from "../../../../utils/functions";
import { useGame } from "../../../../hooks/useGame";

const Movable: FC<MovableProps> = memo(
  ({ position, addSnake = () => null }) => {
    const { top, left } = position;
    const {
      foods = [],
      removeFood = () => null,
      addFood = () => null,
    } = useGame() || {};

    useEffect(() => {
      foods.map((food, index) => {
        if (canEat(food, position)) {
          addSnake();
          removeFood(index);
          addFood();
        }
      });
    }, [position]);
    return (
      <div
        className="absolute  border-2 border-black"
        style={{
          top: `${top}%`,
          left: `${left}%`,
        }}
      ></div>
    );
  }
);

export default Movable;
