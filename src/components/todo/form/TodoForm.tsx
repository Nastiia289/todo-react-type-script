import { ChangeEvent, useCallback, useState } from "react";
import CustomButton from "../../ui/button/CustomButton";
import CustomInput from "../../ui/input/CustomInput";
import { createTodoAsync } from "../../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const Form = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(({ user }) => user.isTodoCreateLoading);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  },[]);
  const onAdd = useCallback(() => {
    if (!value) return;
    dispatch(createTodoAsync(value));
    setValue("");
  }, [value, dispatch]);
  return (
    <form>
      <CustomInput value={value} name="todo" onChange={onChange} />
      <CustomButton onClick={onAdd} disabled={isLoading}>
        Add
      </CustomButton>
    </form>
  );
};

export default Form;
