import { DifficultyEnums } from "enums/DifficultyEnums";
import { Dispatch } from "react";

export const SelectDifficulty = ({
  difficulty,
  setDifficulty,
}: {
  difficulty: DifficultyEnums;
  setDifficulty: Dispatch<React.SetStateAction<DifficultyEnums>>;
}) => {
  return (
    <div className="flex justify-center items-center space-x-3 ">
      <label>Difficulty:</label>
      <select
        className="border py-1 px-2 rounded border-gray-700 w-24"
        value={difficulty}
        onChange={(event) =>
          setDifficulty(event.target.value as DifficultyEnums)
        }
      >
        {Object.values(DifficultyEnums).map((level, index) => (
          <option value={level} key={index}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
};
