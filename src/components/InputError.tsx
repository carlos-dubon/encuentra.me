import clsx from "clsx";

export interface InputErrorProps {
  isShown?: boolean;
  errorMessage?: string;
}

export const InputError = (props: InputErrorProps) => {
  return (
    <div
      className={clsx(
        "text-red-500 text-xs transition-all max-h-[0px] overflow-hidden",
        props.isShown && "!max-h-[16px]"
      )}
    >
      {props.errorMessage}
    </div>
  );
};
