import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { signInAsync, signUpAsync } from "../../store/slices/userSlice";
import CustomInput from "../ui/input/CustomInput";
import CustomButton from "../ui/button/CustomButton";
import PasswordInput from "../ui/input/password/PasswordInput";
import { Column, FormStyles, FullWidth } from "./styles";

const Auth = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
    [values]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(isLogin ? signInAsync(values) : signUpAsync(values));
    },
    [dispatch, isLogin, values]
  );

  const onChangeForm = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  return (
    <FormStyles onSubmit={onSubmit}>
      <h2>{isLogin ? "Login" : "Registration"}</h2>
      <Column>
        <FullWidth>
          <CustomInput
            value={values.email}
            onChange={onChange}
            name="email"
            type="email"
            placeholder="Email"
          />
        </FullWidth>
        <div>
          <PasswordInput
            value={values.password}
            onChange={onChange}
            name="password"
            placeholder="Password"
          />
        </div>
      </Column>
      <CustomButton type="submit"> Submit </CustomButton>
      <CustomButton onClick={onChangeForm}>
        {" "}
        {isLogin ? "Registration" : "Login"}{" "}
      </CustomButton>
    </FormStyles>
  );
};

export default Auth;
