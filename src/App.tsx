import { Board } from "components/Board";
import { ButtonPanel } from "components/ButtonPanel";
import { EMPTY_BOARD } from "constants/emptyBoard";
import { ONE_TO_NINE_IN_ONE } from "constants/oneToNine";
import { DifficultyEnums } from "enums/DifficultyEnums";
import { GameStatusEnums } from "enums/GameStatusEnums";
import { useEffect, useMemo, useState } from "react";
import { oneToNineInOneType } from "types";
import { cn } from "utils/cn";
import { difficultyMapper } from "utils/difficultyMapper";
import { gameStatusDisplayMapper } from "utils/gameStatusDisplayMapper";

import { SUDOKU_RECORDS } from "constants/sudokuRecords";
import { checkAllGridFilled } from "utils/checkAllGridFilled";
import { drawNumber } from "utils/drawNumber";
import { initAllCombinations } from "utils/initAllCombinations";
import { initGridRecords } from "utils/initGridRecords";
import { SelectDifficulty } from "components/SelectDifficulty";

function App() {
  const [sudokuBoard, setSudokuBoard] = useState(EMPTY_BOARD);
  const [storedPlaySudoku, setStoredPlaySudoku] = useState<string[]>([]);

  const [difficulty, setDifficulty] = useState<DifficultyEnums>(
    DifficultyEnums.EASY
  );
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const [status, setStatus] = useState<GameStatusEnums>(
    GameStatusEnums.NOT_STARTED
  );

  const { gridRecords, allCombinations } = useMemo(() => {
    const records = initGridRecords();
    const allCombinations = initAllCombinations(records);
    return {
      gridRecords: records,
      allCombinations,
    };
  }, []);

  const handleCombinationCheck = (check: number[]) => {
    const copyOneToNineInOne = { ...ONE_TO_NINE_IN_ONE };
    for (let i = 0; i < check.length; i++) {
      const intInString = check[i].toString() as oneToNineInOneType;

      if (copyOneToNineInOne[intInString]) {
        copyOneToNineInOne[intInString]--;
      } else if (copyOneToNineInOne[intInString] === 0) {
        return false;
      }
    }
    return true;
  };

  const checkIfValid = (board: string[] = sudokuBoard) => {
    const copyBoard = [...board];

    for (let i = 0; i < 27; i++) {
      const currentCombinationOfGridNumber: number[] = [];
      for (let x = 0; x < copyBoard.length; x++) {
        if (allCombinations[i].includes(x)) {
          currentCombinationOfGridNumber.push(Number(copyBoard[x]));
        }
      }

      if (!handleCombinationCheck(currentCombinationOfGridNumber)) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (checkAllGridFilled(sudokuBoard) && checkIfValid(sudokuBoard)) {
      setStatus(GameStatusEnums.SOLVED);
    }
  }, [sudokuBoard]);

  const generateSudoku = (play = false) => {
    const copySudokuBoard = [...sudokuBoard];
    const copySudokuRecords = [...SUDOKU_RECORDS];
    for (let i = 0; i < 81; i++) {
      if (copySudokuBoard[i] === "") {
        const getCombinationIndex = gridRecords[i.toString()];
        const drawnNumber: string = drawNumber(
          copySudokuRecords,
          getCombinationIndex
        );
        copySudokuBoard[i] = drawnNumber;
        for (let x = 0; x < getCombinationIndex.length; x++) {
          copySudokuRecords[getCombinationIndex[x]] = copySudokuRecords[
            getCombinationIndex[x]
          ].filter((record: number) => Number(drawnNumber) !== record);
        }
      }
    }

    // if the sudoku board is not filled, generate again
    if (copySudokuBoard.some((grid) => grid === "")) {
      generateSudoku(play);
      return;
    }

    if (play) {
      setStoredPlaySudoku([...copySudokuBoard]);

      const copySudokuRecords = [...SUDOKU_RECORDS];

      // base on the difficulty, empty out some of the grids
      for (let i = 0; i < copySudokuBoard.length; i++) {
        const filterIndexes = Math.floor(Math.random() * 10);
        if (filterIndexes < difficultyMapper(difficulty)) {
          copySudokuBoard[i] = "";
          continue;
        }

        const recordIndexes = gridRecords[i.toString()];
        for (let x = 0; x < recordIndexes.length; x++) {
          copySudokuRecords[recordIndexes[x]] = copySudokuRecords[
            recordIndexes[x]
          ].filter((e: number) => {
            return Number(e) !== Number(copySudokuBoard[i]);
          });
        }
      }
    }
    setSudokuBoard(copySudokuBoard);
  };

  const setGame = () => {
    setGameStarted(true);
    if (!gameStarted) {
      generateSudoku(true);
    }
  };
  const solveGame = () => {
    if (checkIfValid()) {
      if (storedPlaySudoku.length !== 0) {
        setSudokuBoard(storedPlaySudoku);
        return;
      }
      generateSudoku();
      return;
    }
    setStatus(GameStatusEnums.CAN_NOT_BE_SOLVED);
  };
  const restartGame = () => {
    setSudokuBoard(EMPTY_BOARD);
    setStoredPlaySudoku([]);
    setGameStarted(false);
    setStatus(GameStatusEnums.NOT_STARTED);
  };

  const gameStatueMessage = useMemo(
    () => gameStatusDisplayMapper(status),
    [status]
  );
  return (
    <div className="flex justify-center items-center my-10 flex-col container mx-auto space-y-3">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Sudoku</h1>
        <span
          className={cn(
            "text-xl font-bold whitespace-nowrap h-6",
            status === GameStatusEnums.SOLVED
              ? "text-green-600"
              : "text-red-600"
          )}
        >
          {gameStatueMessage}
        </span>
      </div>
      <SelectDifficulty difficulty={difficulty} setDifficulty={setDifficulty} />
      <ButtonPanel
        data={{
          setGame,
          solveGame,
          gameStarted,
          restartGame,
          status,
        }}
      />
      <Board
        data={{
          sudokuBoard,
          setSudokuBoard,
          gameStarted,
        }}
      />
    </div>
  );
}

export default App;
