import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setStatus } from "./cellsSlice";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
const WelcomeItem = styled.div`
  width: 25rem;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #000;
  margin: 0.5rem 0;
  border-radius: 4px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  opacity: ${props => props.disable ? 0.5 : 1};
  ${
    props => props.disable ? 'cursor: not-allowed;' : 
  `
    &:hover {
      background-color: rgba(0, 0, 0, 0.75);
      cursor: pointer;
    }
  `
  }
`;

function Welcome() {
  const dispatch = useDispatch();

  const handleNewGame = () => {
    dispatch(setStatus('game'));
  };
  const handleHelp = () => {
    dispatch(setStatus('help'));
  }
  return (
    <WelcomeContainer>
      <WelcomeItem disable={true}>继续游戏(构建中...)</WelcomeItem>
      <WelcomeItem onClick={handleNewGame}>新的游戏</WelcomeItem>
      <WelcomeItem onClick={handleHelp}>游戏帮助</WelcomeItem>
    </WelcomeContainer>
  )
}

export default Welcome;
