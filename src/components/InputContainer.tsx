import clsx from "clsx";
import { ReactNode } from "react";

interface InputContainerProps {
  children?: ReactNode;
  label?: string;
}

export const InputContainer = (props: InputContainerProps) => {
  return (
    <div className={clsx("flex flex-col gap-1")}>
      <p className="text-sm">{props.label}:</p>
      {props.children}
    </div>
  );
};
