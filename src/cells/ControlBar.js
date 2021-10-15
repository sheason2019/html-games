import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import Collection from "./Collections"
import Slots from "./Slots"
import { setTime } from './cellsSlice';

const BarContainer = styled.div`
  display: flex;
`;
const TimeContainer = styled.div`
  width: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Time = styled.div`
  font-size: 24px;
  font-weight: 600;
  user-select: none;
`;
const TimeCounter = styled.div`
  background-color: rgba(0,0,0,0.25);
  width: 80%;
  height: 3rem;
  color: rgba(255,255,255,0.9);
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  user-select: none;
`;

export default function ControlBar() {
  const time = useSelector(state => state.cells.time);
  const start = useSelector(state => state.cells.start);
  const dispatch = useDispatch();
  const timeout = React.useRef(null);
  React.useEffect(() => {
    if (start) {
      setTimeout(() => {
        dispatch(setTime(time + 1));
      }, 1000);
    } else {
    }
  }, [dispatch, start, time]);
  return (
    <BarContainer>
      <Slots />
        <TimeContainer>
          <Time>Time</Time>
          <TimeCounter>{time}</TimeCounter>
        </TimeContainer>
      <Collection />
    </BarContainer>
  )
}