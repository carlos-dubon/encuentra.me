import clsx from "clsx";

interface SeparatorProps {
  className?: string;
}

export const Separator = (props: SeparatorProps) => {
  return (
    <div className={clsx("h-[1px] bg-gray-300 w-full", props.className)}></div>
  );
};
