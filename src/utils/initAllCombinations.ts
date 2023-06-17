import { initGridRecords } from "utils/initGridRecords";

export const initAllCombinations = (
  records: ReturnType<typeof initGridRecords>
) => {
  const keys: string[] = Object.keys(records);
  const values: number[][] = Object.values(records);
  const allCombinations: number[][] = [];
  for (let i = 0; i < 27; i++) {
    const combinationOfPosition: number[] = [];
    for (let x = 0; x < values.length; x++) {
      if (values[x].includes(i)) {
        combinationOfPosition.push(Number(keys[x]));
      }
    }
    allCombinations.push(combinationOfPosition);
  }
  return allCombinations;
};
