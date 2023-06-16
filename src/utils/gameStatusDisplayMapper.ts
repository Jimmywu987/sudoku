import { GameStatusEnums } from "enums/GameStatusEnums";

export const gameStatusDisplayMapper = (status: GameStatusEnums) => {
  switch (status) {
    case GameStatusEnums.NOT_STARTED:
      return "";
    case GameStatusEnums.SOLVED:
      return "Solved!";
    case GameStatusEnums.CAN_NOT_BE_SOLVED:
      return "Can't be solved";
    default:
      return "";
  }
};
