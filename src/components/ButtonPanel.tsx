import { Dispatch } from "react";

import { Button } from "components/Button";
import { SelectDifficulty } from "components/SelectDifficulty";
import { DifficultyEnums } from "enums/DifficultyEnums";
import { GameStatusEnums } from "enums/GameStatusEnums";

export const ButtonPanel = ({
  data: {
    difficulty,
    setDifficulty,
    setGame,
    solveGame,
    gameStarted,
    restartGame,
    status,
  },
}: {
  data: {
    difficulty: DifficultyEnums;
    setDifficulty: Dispatch<React.SetStateAction<DifficultyEnums>>;
    setGame: () => void;
    solveGame: () => void;
    gameStarted: boolean;
    restartGame: () => void;
    status: GameStatusEnums;
  };
}) => {
  return (
    <div className="w-full p-4 space-y-3">
      <SelectDifficulty difficulty={difficulty} setDifficulty={setDifficulty} />
      <div className="flex space-x-4 justify-center">
        <Button
          buttonText="Set Game"
          disabled={gameStarted}
          onClick={() => {
            setGame();
          }}
        />
        <Button
          buttonText="Solve"
          disabled={!gameStarted || status === GameStatusEnums.SOLVED}
          onClick={() => {
            solveGame();
          }}
        />
        <Button
          buttonText="Restart"
          disabled={!gameStarted}
          onClick={() => {
            restartGame();
          }}
        />
      </div>
    </div>
  );
};
