import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setState } from "../slice";

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Item = styled.div`
  width: 12rem;
  height: 4rem;
  margin: 1rem;
  background-color: rgba(0, 0, 0, 0.15);
  border: 4px solid rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
`;

function Welcome(props) {
  const dispatch = useDispatch();
  const handleOnGameStart = () => {
    dispatch(setState(1));
  };
  return (
    <Container>
      <h1>E LUO SI FANG KUAI</h1>
      <Item onClick={handleOnGameStart}>Game Start</Item>
      <Item>Help</Item>
    </Container>
  );
}

export default Welcome;