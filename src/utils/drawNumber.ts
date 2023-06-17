import { ONE_TO_NINE_IN_ZERO } from "constants/oneToNine";
import { oneToNineInZeroType } from "types";

export const drawNumber = (
  records: number[][],
  combinationIndexes: [number, number, number]
) => {
  const oneToNine = { ...ONE_TO_NINE_IN_ZERO };

  const firstIndex = records[combinationIndexes[0]];
  const secondIndex = records[combinationIndexes[1]];
  const thirdIndex = records[combinationIndexes[2]];
  const passNumbers: number[] = [];
  for (let i = 1; i < 10; i++) {
    if (firstIndex.indexOf(i) !== -1) {
      oneToNine[i.toString() as oneToNineInZeroType]++;
    }
    if (secondIndex.indexOf(i) !== -1) {
      oneToNine[i.toString() as oneToNineInZeroType]++;
    }

    if (thirdIndex.indexOf(i) !== -1) {
      oneToNine[i.toString() as oneToNineInZeroType]++;
    }

    if (oneToNine[i.toString() as oneToNineInZeroType] === 3) {
      passNumbers.push(i);
    }
  }
  if (passNumbers.length === 0) {
    return "";
  }
  const drawIndex = Math.floor(Math.random() * passNumbers.length);
  return passNumbers[drawIndex].toString();
};
