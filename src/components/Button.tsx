import { ButtonHTMLAttributes, FC, useState } from "react";
import { cn } from "utils/cn";

interface ButtonProps {
  buttonText: string;
  onClick: () => void;
}

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ buttonText, onClick, ...props }) => {
  const [onClickMoment, setOnClickMoment] = useState<boolean>(false);

  return (
    <button
      className={cn(
        "px-3 py-1 border border-gray-700 rounded-lg",
        onClickMoment && "bg-gray-200",
        props.disabled
          ? "border-gray-300 text-gray-300"
          : "border-gray-700 text-gray-700"
      )}
      onClick={() => {
        setOnClickMoment(true);
        onClick();
        setTimeout(() => {
          setOnClickMoment(false);
        }, 100);
      }}
      {...props}
    >
      {buttonText}
    </button>
  );
};
