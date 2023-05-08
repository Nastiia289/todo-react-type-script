import { ChangeEvent, memo } from "react";

type InputTypes = "text" | "email" | "password" | "number";

export interface ICustomInput {
  type?: InputTypes;
  value: string;
  placeholder?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = memo(({
  type = 'text',
  value,
  placeholder = '',
  name,
  onChange,
  ...prop
}: ICustomInput) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      name={name}
      {...prop}
    />
  );
});

export default CustomInput;
