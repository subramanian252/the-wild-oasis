import styled from "styled-components";
import { useDarkModeContext } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkMode } = useDarkModeContext();
  return (
    <StyledLogo>
      <Img src={!darkMode ? "/logo-light.png" : "/logo-dark.png"} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
