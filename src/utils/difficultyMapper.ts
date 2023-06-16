import { DifficultyEnums } from "enums/DifficultyEnums";

export const difficultyMapper = (level: DifficultyEnums) => {
  switch (level) {
    case DifficultyEnums.EASY:
      return 4;
    case DifficultyEnums.MEDIUM:
      return 5;
    case DifficultyEnums.HARD:
      return 6;
    default:
      return 5;
  }
};
