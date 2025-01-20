/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  directions,
  MovableProps,
  position,
} from "../../../../types/interfaces/component-interfaces";
import Movable from "./movable";
import { useGame } from "../../../../hooks/useGame";
import Food from "./food";

const getNewPosition = (currPos: position, direction: directions) => {
  const { top, left } = currPos;
  if (direction === "left") {
    if (left >= 1) return { top, left: left - 1 };
  }
  if (direction === "right") {
    if (left <= 99) return { top, left: left + 1 };
  }
  if (direction === "up") {
    if (top >= 1) return { top: top - 1, left };
  }
  if (direction === "down") {
    if (top <= 99) return { top: top + 1, left };
  }
  return currPos;
};

const getNewSnakePos = (tailPos: position, direction: directions) => {
  const { top, left } = tailPos;
  if (direction === "left") {
    if (left >= 1) return { top, left: left + 1 };
  }
  if (direction === "right") {
    if (left <= 99) return { top, left: left - 1 };
  }
  if (direction === "up") {
    if (top >= 1) return { top: top + 1, left };
  }
  if (direction === "down") {
    if (top <= 99) return { top: top - 1, left };
  }
  return tailPos;
};

const Boundary = () => {
  const [direction, setDirection] = useState<directions>("right");
  const [snake, setSnake] = useState<MovableProps[]>([
    { position: { top: 50, left: 0 }, direction, stop: false },
  ]);

  const speedRef = useRef(100);

  const { foods = [] } = useGame() || {};
  const handleArrowKeys = (e: KeyboardEvent): void => {
    switch (e.key) {
      case "ArrowUp":
        setDirection("up");
        console.log("arrow up");
        break;
      case "ArrowDown":
        setDirection("down");
        console.log("arrow down");
        break;
      case "ArrowLeft":
        setDirection("left");
        console.log("arrow left");
        break;
      case "ArrowRight":
        setDirection("right");
        console.log("arrow right");
        break;
    }
  };

  const addSnake2 = useCallback(() => {
    const tail = snake[snake.length - 1];
    const { position } = tail;
    setSnake((prev) => [
      ...prev,
      {
        position: getNewSnakePos(position, tail.direction),
        stop: false,
        direction: tail.direction,
      },
    ]);
    setTimeout(() => {
      setSnake((prev) => {
        const newSnake = prev.slice(0);
        const part = prev[snake.length];
        newSnake.splice(snake.length, 1, { ...part, direction });
        return newSnake;
      });
    }, snake.length * speedRef.current);
  }, [setSnake, snake]);

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeys);
    return () => document.removeEventListener("keydown", handleArrowKeys);
  }, []);

  const intervalIdRef = useRef<number | null>(null);
  console.log({ direction });

  useEffect(() => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(() => {
      setSnake((prev) => {
        const newSnake = prev.map((p) => ({
          ...p,
          position: getNewPosition(p.position, p.direction),
        }));
        return newSnake;
      });
    }, speedRef.current);
  }, []);

  useEffect(() => {
    snake.map((_, index) => {
      setTimeout(() => {
        setSnake((prev) => {
          const newSnake = prev.slice(0);
          const part = prev[index];
          newSnake.splice(index, 1, { ...part, direction });
          return newSnake;
        });
      }, index * speedRef.current);
    });
  }, [direction]);

  return (
    <div className="w-96 h-96 relative border-2">
      {foods &&
        foods.map((food) => {
          const { top, left } = food;
          return <Food position={{ top, left }} />;
        })}
      {snake.map((snakeProps) => {
        return <Movable {...snakeProps} addSnake={addSnake2} />;
      })}
    </div>
  );
};

export default Boundary;
