import { FC } from "react";
import { position } from "../../../../types/interfaces/component-interfaces";

interface FoodProps {
  position: position;
}

const Food: FC<FoodProps> = ({ position }) => {
  const { top, left } = position;
  return (
    <div
      style={{
        top: `${top}%`,
        left: `${left}%`,
      }}
      className="absolute border-2 rounded-full border-red-500"
    ></div>
  );
};

export default Food;
