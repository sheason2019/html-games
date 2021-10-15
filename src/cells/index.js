import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { initColumn, selectColumn } from "./cellsSlice";
import ControlBar from "./ControlBar"
import GamePanel from "./GamePanel";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Cells() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(initColumn());
  }, [dispatch]);
  const handleCancelSelected = (e) => {
    dispatch(selectColumn({ index: -1, stack: [] }))
  }
  return (
    <Background onClick={handleCancelSelected}>
      <ControlBar />
      <GamePanel />
    </Background>
  )
}

export default Cells;