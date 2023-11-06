import clsx from "clsx";

interface Form {
  touched?: Record<string, boolean>;
  errors?: Record<string, string>;
}

export interface InputErrorProps {
  form: Form | any;
  inputName: string;
}

export const InputError = (props: InputErrorProps) => {
  const hasError =
    props.form.touched?.[props.inputName] &&
    props.form.errors?.[props.inputName];

  const error = props.form.errors?.[props.inputName];

  return (
    <div
      className={clsx(
        "text-red-500 text-xs transition-all max-h-[0px] overflow-hidden",
        hasError && "!max-h-[16px]"
      )}
    >
      {error}
    </div>
  );
};
