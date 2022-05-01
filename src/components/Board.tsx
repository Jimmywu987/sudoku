import { Dispatch, useMemo } from "react";

type eachLine = { nums: number[]; drawerText: string };

type allLines = {
  upperHorizontalLineNums: eachLine;
  leftVerticalLineNums: eachLine;
  rightVerticalLineNums: eachLine;
  lowerHorizontalLineNums: eachLine;
};

const Board = ({
  data: { sudokuArray, setSudokuArray, gameStarted },
}: {
  data: {
    sudokuArray: (number | string)[];
    setSudokuArray: Dispatch<React.SetStateAction<(number | string)[]>>;
    gameStarted: boolean;
  };
}) => {
  const checkIfInteger = /^[1-9]*$/;
  const allLines = useMemo(() => {
    const allLines: allLines = {
      upperHorizontalLineNums: {
        nums: [],
        drawerText: ` border-b-2 border-b-gray-700 `,
      },
      leftVerticalLineNums: {
        nums: [],
        drawerText: ` border-r-2 border-r-gray-700 `,
      },
      rightVerticalLineNums: {
        nums: [],
        drawerText: ` border-l-2 border-l-gray-700 `,
      },
      lowerHorizontalLineNums: {
        nums: [],
        drawerText: ` border-t-2 border-t-gray-700 `,
      },
    };
    for (let i = 18; i <= 26; i++) {
      allLines.upperHorizontalLineNums.nums.push(i);
    }
    for (let i = 2; i <= 74; i += 9) {
      allLines.leftVerticalLineNums.nums.push(i);
    }
    for (let i = 6; i <= 78; i += 9) {
      allLines.rightVerticalLineNums.nums.push(i);
    }
    for (let i = 54; i <= 62; i++) {
      allLines.lowerHorizontalLineNums.nums.push(i);
    }
    return allLines;
  }, []);

  const lineDrawer = (index: number): string => {
    let allLineDrawrs = "";
    const allLinesList = Object.values(allLines);
    for (let i = 0; i < allLinesList.length; i++) {
      if (allLinesList[i].nums.includes(index)) {
        allLineDrawrs += allLinesList[i].drawerText;
      }
    }
    return allLineDrawrs;
  };
  return (
    <div
      className={`grid grid-cols-9 flex-wrap border-2 ${
        gameStarted ? "border-gray-700" : "border-gray-200"
      } mx-2`}
    >
      {sudokuArray.map((each: string | number, indx: number) =>
        each === "" ? (
          <input
            disabled={!gameStarted}
            key={indx}
            className={`focus:bg-gray-300 outline-0 caret-transparent w-10 h-10 md:w-16 md:h-16 border p-1 text-2xl font-bold text-gray-600 ${
              gameStarted ? "cursor-pointer" : ""
            } ${lineDrawer(indx).replaceAll("7", gameStarted ? "7" : "3")}`}
            value={each}
            type="text"
            onChange={({ target }) =>
              setSudokuArray((arr) => {
                if (target.value.match(checkIfInteger)) {
                  arr[indx] = Number(target.value);
                }
                return [...arr];
              })
            }
          />
        ) : (
          <div
            key={indx}
            className={` w-10 h-10 md:w-16 md:h-16 border flex justify-center items-center text-2xl font-bold text-gray-600 ${lineDrawer(
              indx
            ).replaceAll("7", gameStarted ? "7" : "3")}`}
          >
            {each}
          </div>
        )
      )}
    </div>
  );
};

export default Board;
