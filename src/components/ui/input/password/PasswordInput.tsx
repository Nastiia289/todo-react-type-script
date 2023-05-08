import { memo, useCallback, useState } from "react";
import CustomInput, { ICustomInput } from "../CustomInput";
import CustomButton from "../../button/CustomButton";

const PasswordInput = memo(({ type = "password", ...prop }: ICustomInput) => {
  const [inputType, setInputType] = useState(type);
  const onSwitchType = useCallback(() => {
    setInputType(inputType === "password" ? "text" : "password");
  },[inputType]);
  return (
    <div>
      <CustomInput type={inputType} {...prop} />
      <CustomButton onClick={onSwitchType}>switch</CustomButton>
    </div>
  );
});

export default PasswordInput;
