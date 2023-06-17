import { Button } from "components/Button";
import { GameStatusEnums } from "enums/GameStatusEnums";

export const ButtonPanel = ({
  data: { setGame, solveGame, gameStarted, restartGame, status },
}: {
  data: {
    setGame: () => void;
    solveGame: () => void;
    restartGame: () => void;
    gameStarted: boolean;
    status: GameStatusEnums;
  };
}) => {
  return (
    <div className="w-full flex space-x-4 justify-center">
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
  );
};
