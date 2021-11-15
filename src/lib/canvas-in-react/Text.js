import React from "react";
import { Shape } from ".";
import handleGetData from "./util/handleGetData";

function Text(props) {
  const {
    shapes,
    frameKey,
    coordinate,
    font = "16px YaHei",
    text = "",
    align = "",
    width = undefined,
    data,
  } = props;
  const render = React.useCallback(
    (ctx) => {
      if (text === '') return;
      // 使组件能同时处理ref和普通对象
      const Coordinate = handleGetData(coordinate, data);
      ctx.font = handleGetData(font, data);
      ctx.textAlign = handleGetData(align, data);
      ctx.fillText(handleGetData(text, data), Coordinate.x, Coordinate.y, width);
      ctx.textAlign = null;
      ctx.font = null;
    },
    [align, coordinate, data, font, text, width]
  );
  return <Shape frameKey={frameKey} render={render} shapes={shapes} />;
}

export default Text;
