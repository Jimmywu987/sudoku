import { Dispatch, useMemo } from "react";
import { cn } from "utils/cn";

const INTEGER_REGEX = /^[1-9]*$/;

type LineType = { numbers: number[]; drawerText: string };

type PaintLineType = {
  [lineNumber: string]: LineType;
};

export const Board = ({
  data: { sudokuBoard, setSudokuBoard, gameStarted },
}: {
  data: {
    sudokuBoard: string[];
    setSudokuBoard: Dispatch<React.SetStateAction<string[]>>;
    gameStarted: boolean;
  };
}) => {
  const allLines = useMemo(() => {
    const paintLines: PaintLineType = {
      upperHorizontalLineNumbers: {
        numbers: [],
        drawerText: ` border-b-2 border-b-gray-700 `,
      },
      leftVerticalLineNumbers: {
        numbers: [],
        drawerText: ` border-r-2 border-r-gray-700 `,
      },
      rightVerticalLineNumbers: {
        numbers: [],
        drawerText: ` border-l-2 border-l-gray-700 `,
      },
      lowerHorizontalLineNumbers: {
        numbers: [],
        drawerText: ` border-t-2 border-t-gray-700 `,
      },
    };
    for (let i = 18; i <= 26; i++) {
      paintLines.upperHorizontalLineNumbers.numbers.push(i);
    }
    for (let i = 2; i <= 74; i += 9) {
      paintLines.leftVerticalLineNumbers.numbers.push(i);
    }
    for (let i = 6; i <= 78; i += 9) {
      paintLines.rightVerticalLineNumbers.numbers.push(i);
    }
    for (let i = 54; i <= 62; i++) {
      paintLines.lowerHorizontalLineNumbers.numbers.push(i);
    }
    return paintLines;
  }, []);

  const lineDrawer = (index: number): string => {
    let lineDrawer = "";
    const allLinesList = Object.values(allLines);
    for (let i = 0; i < allLinesList.length; i++) {
      if (allLinesList[i].numbers.includes(index)) {
        lineDrawer += allLinesList[i].drawerText;
      }
    }
    return lineDrawer;
  };
  return (
    <div
      className={cn(
        "grid grid-cols-9 flex-wrap border-2 mx-2",
        gameStarted ? "border-gray-700" : "border-gray-200"
      )}
    >
      {sudokuBoard.map((each: string | number, indx) => {
        const drawLine = lineDrawer(indx).replaceAll(
          "7",
          gameStarted ? "7" : "3"
        );
        return (
          <div key={indx}>
            {each === "" ? (
              <input
                disabled={!gameStarted}
                className={cn(
                  "focus:bg-gray-300 outline-0 caret-transparent w-10 h-10 md:w-16 md:h-16 border p-1 text-2xl font-bold text-gray-600",
                  gameStarted && "cursor-pointer",
                  drawLine
                )}
                value={each}
                type="text"
                onChange={({ target }) =>
                  setSudokuBoard((prevBoard) => {
                    if (target.value.match(INTEGER_REGEX)) {
                      prevBoard[indx] = target.value;
                    }
                    return [...prevBoard];
                  })
                }
              />
            ) : (
              <div
                className={cn(
                  "w-10 h-10 md:w-16 md:h-16 border flex justify-center items-center text-2xl font-bold text-gray-600",
                  drawLine
                )}
              >
                {each}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
