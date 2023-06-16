import { useState, useMemo, useEffect } from "react";
import { Board } from "components/Board";
import { ButtonPanel } from "components/ButtonPanel";
import { cn } from "utils/cn";
import { GameStatusEnums } from "enums/GameStatusEnums";
import { gameStatusDisplayMapper } from "utils/gameStatusDisplayMapper";
import { DifficultyEnums } from "enums/DifficultyEnums";
import { difficultyMapper } from "utils/difficultyMapper";
import { EMPTY_BOARD } from "constants/emptyBoard";
import { ONE_TO_NINE } from "constants/oneToNine";
import { oneToNineType } from "types";

import { checkAllGridFilled } from "utils/checkAllGridFilled";
import { initGridRecords } from "utils/initGridRecords";

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

  const gridRecords = useMemo(() => initGridRecords(), []);

  const handleCheck = (check: number[]) => {
    const number: any = {
      "1": 1,
      "2": 1,
      "3": 1,
      "4": 1,
      "5": 1,
      "6": 1,
      "7": 1,
      "8": 1,
      "9": 1,
    };
    for (let i = 0; i < check.length; i++) {
      if (number[`${check[i]}`]) {
        number[`${check[i]}`]--;
      } else if (number[`${check[i]}`] === 0) {
        return false;
      }
    }
    return true;
  };

  const checkIfValid = (board: string[] = sudokuBoard) => {
    const keys: string[] = Object.keys(gridRecords);
    const values: number[][] = Object.values(gridRecords);
    const copyBoard = [...board];

    for (let i = 0; i < 27; i++) {
      const checks: number[] = [];
      for (let x = 0; x < values.length; x++) {
        if (values[x].includes(i)) {
          checks.push(Number(keys[x]));
        }
      }

      const secondCheck: number[] = [];
      for (let x = 0; x < copyBoard.length; x++) {
        if (checks.includes(x)) {
          secondCheck.push(Number(copyBoard[x]));
        }
      }
      if (!handleCheck(secondCheck)) {
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

  const randomDrawNumber = (newArr: any, arr: any) => {
    const oneToNine = { ...ONE_TO_NINE };
    const allHave: number[] = [];
    const first = newArr[arr[0]];
    const second = newArr[arr[1]];
    const third = newArr[arr[2]];

    for (let i = 1; i < 10; i++) {
      if (first.indexOf(i) !== -1) {
        oneToNine[i.toString() as oneToNineType]++;
      }
      if (second.indexOf(i) !== -1) {
        oneToNine[i.toString() as oneToNineType]++;
      }

      if (third.indexOf(i) !== -1) {
        oneToNine[i.toString() as oneToNineType]++;
      }

      if (oneToNine[i.toString() as oneToNineType] === 3) {
        allHave.push(i);
      }
    }
    if (allHave.length === 0) {
      return "";
    }
    const drawIndex = Math.floor(Math.random() * allHave.length);
    return allHave[drawIndex];
  };

  const generateSudoku = (play = false) => {
    const sudokuRecords = new Array(27).fill(
      // get an array of 1 to 9
      [...Array(9)].map((_, index) => index + 1)
    );

    const copySudokuBoard = [...sudokuBoard];

    for (let i = 0; i < 81; i++) {
      if (copySudokuBoard[i] === "") {
        let deductArr = gridRecords[`${i}`];
        let drawnNum: number | string = randomDrawNumber(
          sudokuRecords,
          deductArr
        );
        copySudokuBoard[i] = drawnNum.toString();
        for (let x = 0; x < deductArr.length; x++) {
          sudokuRecords[deductArr[x]] = sudokuRecords[deductArr[x]].filter(
            (e: number) => {
              return drawnNum !== e;
            }
          );
        }
      }
    }

    if (copySudokuBoard.some((grid) => grid === "")) {
      generateSudoku(play);
      return;
    }

    if (play) {
      setStoredPlaySudoku([...copySudokuBoard]);
      const checkAllArr = new Array(27).fill(
        [...Array(9)].map((_, index) => index + 1)
      );
      for (let i = 0; i < copySudokuBoard.length; i++) {
        let filterOut = Math.floor(Math.random() * 10);
        if (filterOut < difficultyMapper(difficulty)) {
          copySudokuBoard[i] = "";
        } else {
          let deductArray = gridRecords[`${i}`];
          for (let x = 0; x < deductArray.length; x++) {
            checkAllArr[deductArray[x]] = checkAllArr[deductArray[x]].filter(
              (e: number) => {
                return Number(e) !== Number(copySudokuBoard[i]);
              }
            );
          }
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
    <div className="flex justify-center items-center my-10 flex-col container mx-auto">
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
      <ButtonPanel
        data={{
          difficulty,
          setDifficulty,
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
