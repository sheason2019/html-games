import React from "react";
import { Shape } from ".";
import handleGetData from "./util/handleGetData";

function Rect(props) {
  const {
    shapes,
    frameKey,
    coordinate,
    size,
    color,
    type = "fill",
    lineWidth = 1,
  } = props;
  const render = React.useCallback(
    (ctx) => {
      // 使组件能同时处理ref和普通对象
      const Coordinate = handleGetData(coordinate);
      const Size = handleGetData(size);
      const Color = handleGetData(color);
      const { x, y } = Coordinate;
      let Width, Height;
      if (typeof Size === "number") {
        Width = Size;
        Height = Size;
      } else if (typeof Size === "object") {
        const { width, height } = Size;
        Width = width;
        Height = height;
      }
      if (!ctx) return;
      if (type === "fill") {
        ctx.fillStyle = Color;
        ctx.fillRect(x, y, Width, Height);
        ctx.fillStyle = "#000000";
      } else if (type === "stroke") {
        ctx.strokeStyle = Color;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, Width, Height);
        ctx.lineWidth = 1;
      } else if (type === "clear") {
        ctx.clearRect(x, y, Width, Height);
      }
    },
    [coordinate, size, type, color, lineWidth]
  );
  return <Shape frameKey={frameKey} render={render} shapes={shapes} />;
}

export default Rect;
