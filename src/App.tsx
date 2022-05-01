import { useState, useMemo, useEffect } from "react";
import Board from "./components/Board";
import Buttons from "./components/Buttons";

function App() {
  const [sudokuArray, setSudokuArray] = useState(new Array(9 * 9).fill(""));
  const [storedPlaySudoku, setStoredPlaySudoku] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<string>("4");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isSolved, getIsSolved] = useState<boolean>(false);
  const [solvedStatus, setSolvedStatus] = useState<string>("");

  const checkWithinGrid = (index: number) => {
    let base = {
      "18": 0,
      "19": 3,
      "20": 6,
      "21": 27,
      "22": 30,
      "23": 33,
      "24": 54,
      "25": 57,
      "26": 60,
    };
    let baseValue = Object.values(base);
    let baseKeys = Object.keys(base);
    for (let i = 0; i < baseValue.length; i++) {
      let head = baseValue[i];
      let tail = baseValue[i] + 2;
      if (
        (head <= index && index <= tail) ||
        (head + 9 <= index && index <= tail + 9) ||
        (head + 18 <= index && index <= tail + 18)
      ) {
        return Number(baseKeys[i]);
      }
    }
  };

  const eachTracking = useMemo(() => {
    let record: any = {};
    for (let i = 0; i < 9 * 9; i++) {
      record[`${i}`] = [Math.floor(i / 9), (i % 9) + 9, checkWithinGrid(i)];
    }
    return record;
  }, []);

  const arrChecking = (arr: any[]) => {
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
    for (let i = 0; i < arr.length; i++) {
      if (number[`${arr[i]}`]) {
        number[`${arr[i]}`]--;
      } else if (number[`${arr[i]}`] === 0) {
        return false;
      }
    }

    return true;
  };
  const checkIfValid = (sudokuArr: (string | number)[] = sudokuArray) => {
    let keys: string[] = Object.keys(eachTracking);
    let values: number[][] = Object.values(eachTracking);
    let newSudokuArr = [...sudokuArr];

    for (let i = 0; i < 9 * 3; i++) {
      let eachChecking: number[] = [];
      for (let x = 0; x < values.length; x++) {
        if (values[x].includes(i)) {
          eachChecking.push(Number(keys[x]));
        }
      }

      let anotherArr: number[] = [];
      for (let x = 0; x < newSudokuArr.length; x++) {
        if (eachChecking.includes(x)) {
          anotherArr.push(Number(newSudokuArr[x]));
        }
      }
      if (!arrChecking(anotherArr)) {
        return false;
      }
    }
    return true;
  };

  const allFilled = (arr: (string | number)[]) => {
    return arr.every((e) => typeof e === "number");
  };
  useEffect(() => {
    if (allFilled(sudokuArray)) {
      if (checkIfValid(sudokuArray)) {
        setSolvedStatus("Solved!");
      } else {
        setSolvedStatus("Not solved");
      }
    }
  }, [sudokuArray]);

  const randomDrawNumber = (newArr: any, arr: any) => {
    const number: any = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
    };
    let allHave: number[] = [];
    let first = newArr[arr[0]];
    let second = newArr[arr[1]];
    let third = newArr[arr[2]];

    for (let i = 1; i < 10; i++) {
      if (first.indexOf(i) !== -1) {
        number[`${i}`]++;
      }
      if (second.indexOf(i) !== -1) {
        number[`${i}`]++;
      }

      if (third.indexOf(i) !== -1) {
        number[`${i}`]++;
      }

      if (number[`${i}`] === 3) {
        allHave.push(i);
      }
    }
    if (allHave.length === 0) {
      return "";
    }
    let drawIndex = Math.floor(Math.random() * allHave.length);
    return allHave[drawIndex];
  };

  const repeatIfFail = (play: boolean = false) => {
    let newArr = new Array(9 * 3).fill(
      [...Array(9)].map((_, index) => index + 1)
    );
    let newSukodu = [...sudokuArray];
    for (let i = 0; i < 9 * 9; i++) {
      if (newSukodu[i] === "") {
        let deductArr = eachTracking[`${i}`];
        let drawnNum: number | string = randomDrawNumber(newArr, deductArr);
        newSukodu[i] = drawnNum;
        for (let x = 0; x < deductArr.length; x++) {
          newArr[deductArr[x]] = newArr[deductArr[x]].filter((e: number) => {
            return drawnNum !== e;
          });
        }
      }
    }

    if (newSukodu.some((e) => e === "")) {
      repeatIfFail(play);
    } else {
      if (play) {
        setStoredPlaySudoku([...newSukodu]);
        let checkAllArr = new Array(9 * 3).fill(
          [...Array(9)].map((_, index) => index + 1)
        );
        for (let i = 0; i < newSukodu.length; i++) {
          let filterOut = Math.floor(Math.random() * 10);
          if (filterOut < Number(difficulty)) {
            newSukodu[i] = "";
          } else {
            let deductArray = eachTracking[`${i}`];
            for (let x = 0; x < deductArray.length; x++) {
              checkAllArr[deductArray[x]] = checkAllArr[deductArray[x]].filter(
                (e: number) => {
                  return Number(e) !== Number(newSukodu[i]);
                }
              );
            }
          }
        }
        setSudokuArray(newSukodu);
      } else {
        setSudokuArray(newSukodu);
      }
    }
  };

  const setGame = () => {
    setGameStarted(true);
    if (!gameStarted) {
      repeatIfFail(true);
    }
  };
  const solveGame = () => {
    if (checkIfValid()) {
      if (storedPlaySudoku.length !== 0) {
        setSudokuArray(storedPlaySudoku);
      } else {
        repeatIfFail();
      }
    } else {
      setSolvedStatus("Can't be solved");
    }
    getIsSolved(true);
  };
  const restartGame = () => {
    setSudokuArray(new Array(9 * 9).fill(""));
    setStoredPlaySudoku([]);
    setGameStarted(false);
    getIsSolved(false);
    setSolvedStatus("");
  };

  return (
    <div className="flex justify-center items-center my-10 flex-col container mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Sudoku</h1>
        <span
          className={`text-xl top-9 left-4 font-bold whitespace-nowrap h-6 ${
            solvedStatus === "Solved!" ? "text-green-600" : "text-red-600"
          }`}
        >
          {solvedStatus}
        </span>
      </div>
      <Buttons
        data={{
          difficulty,
          setDifficulty,
          setGame,
          solveGame,
          gameStarted,
          restartGame,
          isSolved,
        }}
      />
      <Board data={{ sudokuArray, setSudokuArray, gameStarted }} />
    </div>
  );
}

export default App;
