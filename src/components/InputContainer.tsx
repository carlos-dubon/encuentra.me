import clsx from "clsx";
import { ReactNode } from "react";

interface InputContainerProps {
  children?: ReactNode;
}

export const InputContainer = (props: InputContainerProps) => {
  return <div className={clsx("flex flex-col gap-1")}>{props.children}</div>;
};
