import { ReactElement, memo } from "react";
import { ButtonStyles } from "./styles";

interface ICustomButton {
  children: ReactElement | string | string[];
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const CustomButton = memo(({ children, onClick, type="button", ...prop }: ICustomButton) => {
  return (
    <ButtonStyles onClick={onClick} {...prop} type={type}>
      {children}
    </ButtonStyles>
  );
});

export default CustomButton;
