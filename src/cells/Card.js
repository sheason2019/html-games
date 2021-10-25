import styled from "styled-components";
import React from "react";

const CardContainer = styled.div`
  width: 8rem;
  height: 10rem;
  background-color: white;
  border-radius: 0.5rem;
  margin-bottom: ${props => props.last ? 0 : '-7rem'};
  box-shadow: ${props => props.selected ? '0px 1px 2px 4px rgba(0, 0, 0, 0.5)' : '0px 1px 2px 0px rgba(0, 0, 0, 0.75)'};
  position: relative;
  overflow: hidden;
`;
const Para = styled.div`
  font-size: 1.25rem;
  display: flex;
  padding-top: 0.25rem;
  padding-left: 0.25rem;
  color: ${(props) => (props.color % 2 === 0 ? "black" : "red")};
  user-select: none;
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.25);
  visibility: ${props => props.open ? 'normal' : 'hidden'};
`;

const color = ["♠", "♥", "♣️", "♦️"];
const getCardValue = (num) => {
  switch (num) {
    case 0:
      return "A";
    case 10:
      return "J";
    case 11:
      return "Q";
    case 12:
      return "K";
    default:
      return String(num + 1);
  }
};

function Card(props) {
  const ref = React.useRef();
  const [shouldMove, setShouldMove] = React.useState(false);
  const handleOnMouseMove = (e) => {
    return;
  };
  const handleOnMouseDown = () => {
    setShouldMove(true);
  };
  const handleOnMouseUp = () => {
    setShouldMove(false);
  };
  return (
    <CardContainer
      ref={ref}
      shouldMove={shouldMove}
      selected={props.selected}
      last={props.last}
      onMouseMove={handleOnMouseMove}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
    >
      <Backdrop open={props.backdrop} />
      <Para color={props.data.color}>
        <Icon color={props.data.color}>{color[props.data.color]}</Icon>
        <span>{getCardValue(props.data.value)}</span>
      </Para>
    </CardContainer>
  );
}

export default Card;
