import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
`;
const Block = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;
const Wall = styled(Block)`
  background-color: gray;
`;
const Road = styled(Block)``;

function MapBlock({ type }) {
  if (type === 0) {
    return <Wall />;
  }
  if (type === 1) {
    return <Road />;
  }
  return null;
}

function Battleland(props) {
  const { handleSetDomForMap } = props;
  if (!props.gameMap) return null;
  return (
    <>
      {props.gameMap.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((item, itemIndex) => (
            <div key={itemIndex} ref={(ref) => handleSetDomForMap(rowIndex, itemIndex, ref)}>
              <MapBlock type={item.type} />
            </div>
          ))}
        </Row>
      ))}
    </>
  );
}
export default Battleland;
