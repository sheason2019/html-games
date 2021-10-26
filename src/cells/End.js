import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { initColumn, setStatus } from "./cellsSlice";

const EndWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EndContainer = styled.div`
  padding: 1.5rem;
  width: 35rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #000;
  margin: 0.5rem 0;
  border-radius: 4px;
  color: white;
  user-select: none;
  p {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 80%;
`;
const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NewGameButton = styled.div`
  width: 80%;
  height: 3rem;
  margin-top: 1rem;
  background-color: #1b7ced;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.75rem;
  border-radius: 4px;
`;
const MenuButton = styled.div`
  width: 80%;
  height: 2rem;
  margin-top: 1rem;
  background-color: #e44c51;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  border-radius: 4px;
`;

function End() {
  const time = useSelector(state => state.cells.time);
  const completedPatch = React.useRef(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    completedPatch.current = localStorage.getItem('completePatch')
  }, []);

  const handleNewGame = () => {
    dispatch(initColumn());
    dispatch(setStatus('game'));
  };
  const handleBackToMenu = () => {
    dispatch(initColumn());
    dispatch(setStatus('index'));
  };
  return (
    <EndWrapper>
      <EndContainer>
        <h2 style={{ marginTop: 0 }}>恭喜通关</h2>
        <InfoContainer>
          <InfoItem>
            <p>时间</p>
            <p>{time}</p>
          </InfoItem>
          <InfoItem>
            <p>已完成场次：</p>
            <p>{completedPatch.current}</p>
          </InfoItem>
        </InfoContainer>
        <NewGameButton onClick={handleNewGame}>新的游戏</NewGameButton>
        <MenuButton onClick={handleBackToMenu}>返回菜单</MenuButton>
      </EndContainer>
    </EndWrapper>
  )
}

export default End;
