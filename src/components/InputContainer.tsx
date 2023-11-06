import clsx from "clsx";
import { ReactNode } from "react";

interface InputContainerProps {
  children?: ReactNode;
  isOptional?: boolean;
  label?: string;
}

export const InputContainer = (props: InputContainerProps) => {
  return (
    <div className={clsx("flex flex-col gap-1")}>
      <p className="text-sm">
        {props.label}:{" "}
        {props.isOptional && <span className="text-gray-500">(opcional)</span>}
      </p>
      {props.children}
    </div>
  );
};
