import styled from "styled-components"
import Collection from "./Collections"
import Slots from "./Slots"

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
  return (
    <BarContainer>
      <Slots />
        <TimeContainer>
          <Time>Time</Time>
          <TimeCounter>0</TimeCounter>
        </TimeContainer>
      <Collection />
    </BarContainer>
  )
}