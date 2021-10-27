import React from "react";
import styled from "styled-components";
import { TOWER_TYPE } from "./constant";

const StyledAttackRange = styled.div`
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  border-radius: 50%;
  position: absolute;
  background-color: rgba(135, 205, 235, 0.25);
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

function AttackRange(props) {
  const { centerNode } = props;
  const [coordinate, setCoordinate] = React.useState({ top: 0, left: 0 });
  const attackRangeRef = React.useRef();
  React.useEffect(() => {
    try {
      const { dom } = centerNode;
      const current = attackRangeRef.current;
      const top = dom.offsetTop + dom.offsetHeight / 2 - current.offsetHeight / 2;
      const left = dom.offsetLeft + dom.offsetWidth / 2 - current.offsetWidth / 2;
      setCoordinate({ top, left });
    } catch (e) {}
  }, [centerNode]);
  if (centerNode === null) {
    return null;
  }
  return (
    <StyledAttackRange
      top={coordinate.top}
      left={coordinate.left}
      ref={attackRangeRef}
      radius={
        TOWER_TYPE[centerNode.type]
          ? TOWER_TYPE[centerNode.type].attack_range
          : 0
      }
    />
  );
}

export default AttackRange;
