import React from "react";
import { Group, Rect } from "../../../lib/canvas-in-react";
import { AddInterval } from "./gameitem-interval";

function GameItem(props) {
  const { row, column, data, coordinate = null, preview = false } = props;
  const x = coordinate
      ? coordinate.x
      : window.innerWidth / 2 - 150 + column * 30 + 2,
    y = coordinate ? coordinate.y : window.innerHeight / 2 + row * 30 - 300 + 2;

  const colorRef = React.useRef("");

  React.useEffect(() => {
    AddInterval(() => {
      let opacity = 0.15;
      const Column = preview ? column + 3 : column;
      const Row = preview ? row - 3 : row;
      if (data.gameModel.current[column][row].value === 1) {
        opacity = 0.5;
      } else {
        data.fallingBlock.current.shape.forEach((item) => {
          if (item.row === Row && item.column === Column) {
            opacity = 0.5;
          }
        });
      }
      colorRef.current = `rgba(0, 0, 0, ${opacity})`;
    });
  }, [column, data.fallingBlock, data.gameModel, preview, row]);
  return (
    <Group {...props}>
      <Rect type="stroke" lineWidth={0.5} coordinate={{ x, y }} size={26} />
      <Rect
        type="fill"
        color={colorRef}
        lineWidth={0.5}
        coordinate={{ x, y }}
        size={26}
      />
    </Group>
  );
}

export default GameItem;
