import React from "react";
import { Shape } from ".";

function Circle(props) {
  const {
    shapes,
    frameKey,
    coordinate,
    radius,
    startAngle = 0,
    endAngle = Math.PI * 2,
    color,
    type = "fill",
    lineWidth = 1,
  } = props;
  const render = React.useCallback(
    (ctx) => {
      if (!ctx) return;
      // 使组件能同时处理ref和普通对象
      const Coordinate = !!coordinate.current ? coordinate.current : coordinate;
      const Radius = !!radius.current ? radius.current : radius;
      const { x, y } = Coordinate;
      ctx.beginPath();
      ctx.arc(x, y, Radius, startAngle, endAngle);
      if (type === "fill") {
        ctx.fillStyle = color;
        ctx.fill();
      } else if (type === "stroke") {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    },
    [coordinate, radius, startAngle, endAngle, type, color, lineWidth]
  );
  return <Shape frameKey={frameKey} render={render} shapes={shapes} />;
}

export default Circle;
