import { BASE } from "constants/base";

const getRecordThirdPosition = (index: number) => {
  const baseKeys = Object.keys(BASE);
  const baseValue = Object.values(BASE);
  for (let i = 0; i < baseValue.length; i++) {
    const head = baseValue[i];
    const tail = baseValue[i] + 2;
    if (
      (head <= index && index <= tail) ||
      (head + 9 <= index && index <= tail + 9) ||
      (head + 18 <= index && index <= tail + 18)
    ) {
      return Number(baseKeys[i]);
    }
  }
  return 0;
};

export const initGridRecords = () => {
  const record: {
    [key: string]: [number, number, number];
  } = {};

  for (let i = 0; i < 81; i++) {
    record[i.toString() as keyof typeof record] = [
      // first row
      Math.floor(i / 9),
      // second row
      (i % 9) + 9,
      // third row
      getRecordThirdPosition(i),
    ];
  }
  return record;
};
