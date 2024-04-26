import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export default function LogOut() {
  const { isLogggingOut, logoutMutate } = useLogout();
  return (
    <ButtonIcon disabled={isLogggingOut}>
      {isLogggingOut ? (
        <SpinnerMini />
      ) : (
        <HiArrowRightOnRectangle onClick={logoutMutate} />
      )}
    </ButtonIcon>
  );
}
