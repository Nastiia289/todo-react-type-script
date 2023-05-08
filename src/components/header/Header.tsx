import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../store/slices/userSlice";
import CustomButton from "../ui/button/CustomButton";
import { HeaderStyles, LiStyle } from "./styles";

const Header = () => {
  const email = useAppSelector(({user})=>user.user.email);
  const dispatch = useAppDispatch();
  return (
    <HeaderStyles>
      <nav>
        <ul>
          <LiStyle>
            <span>{email}</span>
            {email &&  <CustomButton onClick={()=>dispatch(logout())}>Log out</CustomButton> }
          </LiStyle>
        </ul>
      </nav>
    </HeaderStyles>
  );
};

export default Header;
