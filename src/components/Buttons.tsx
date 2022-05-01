import { Dispatch, useState } from "react";

const Buttons = ({
  data: {
    difficulty,
    setDifficulty,
    setGame,
    solveGame,
    gameStarted,
    restartGame,
    isSolved,
  },
}: {
  data: {
    difficulty: string;
    setDifficulty: Dispatch<React.SetStateAction<string>>;
    setGame: () => void;
    solveGame: () => void;
    gameStarted: boolean;
    restartGame: () => void;
    isSolved: boolean;
  };
}) => {
  const [solveOnClick, setSolveOnClick] = useState<boolean>(false);
  const [gameSetterOnClick, setGameSetterOnClick] = useState<boolean>(false);
  const [restartOnClick, setRestartOnClick] = useState<boolean>(false);
  return (
    <div className="w-full p-4 space-y-3 ">
      <div className="flex justify-center items-center space-x-3">
        <label>Difficulty:</label>
        <select
          className="border py-1 px-2 rounded border-gray-700"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="4">Easy</option>
          <option value="5">Medium</option>
          <option value="6">Hard</option>
        </select>
      </div>
      <div className="flex space-x-4 justify-center">
        <button
          className={`px-3 py-1 border rounded-lg ${
            gameSetterOnClick && "bg-gray-200"
          } ${
            gameStarted
              ? "border-gray-300 text-gray-300"
              : "border-gray-700 text-gray-700"
          }`}
          disabled={gameStarted}
          onClick={() => {
            setGameSetterOnClick(true);
            setGame();
            setTimeout(() => {
              setGameSetterOnClick(false);
            }, 100);
          }}
        >
          Set Game
        </button>
        <button
          className={`px-3 py-1 border border-gray-700 rounded-lg ${
            solveOnClick && "bg-gray-200"
          } ${
            !gameStarted || isSolved
              ? "border-gray-300 text-gray-300"
              : "border-gray-700 text-gray-700"
          }`}
          onClick={() => {
            setSolveOnClick(true);
            solveGame();
            setTimeout(() => {
              setSolveOnClick(false);
            }, 100);
          }}
          disabled={!gameStarted || isSolved}
        >
          Solve
        </button>
        <button
          className={`px-3 py-1 border border-gray-700 rounded-lg ${
            restartOnClick && "bg-gray-200"
          } ${
            !gameStarted
              ? "border-gray-300 text-gray-300"
              : "border-gray-700 text-gray-700"
          }`}
          onClick={() => {
            setRestartOnClick(true);
            restartGame();
            setTimeout(() => {
              setRestartOnClick(false);
            }, 100);
          }}
          disabled={!gameStarted}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Buttons;
