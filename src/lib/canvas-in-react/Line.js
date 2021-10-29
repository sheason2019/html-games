import React from "react";
import { Shape } from ".";
import handleGetData from "./util/handleGetData";

function Line(props) {
  const {
    shapes,
    frameKey,
    sourcePoint,
    targetPoint,
    color,
    data,
    lineWidth = 1,
  } = props;
  const render = React.useCallback(
    (ctx) => {
      // 使组件能同时处理ref和普通对象
      const SourcePoint = handleGetData(sourcePoint, data);
      const TargetPoint = handleGetData(targetPoint, data);
      const LineWidth = handleGetData(lineWidth, data);
      if (!ctx) return;
      ctx.lineWidth = LineWidth;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(SourcePoint.x, SourcePoint.y);
      ctx.lineTo(TargetPoint.x, TargetPoint.y);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000000';
      ctx.fillStyle = '#000000';
    },
    [sourcePoint, data, targetPoint, lineWidth, color]
  );
  return <Shape frameKey={frameKey} render={render} shapes={shapes} />;
}

export default Line;
