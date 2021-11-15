import React from "react";

function Shape(props) {
  const { render, shapes, frameKey } = props;
  const lastFrameKey = React.useRef(null);
  const shapeId = React.useRef(Symbol("shape"));
  React.useEffect(() => {
    const shape_id = shapeId.current;
    shapes.push({ render, shapeId: shapeId.current });
    lastFrameKey.current = frameKey;
    return () => {
      for (let i in shapes) {
        const shape = shapes[i];
        if (shape.shapeId === shape_id) {
          shapes.splice(i, 1);
        }
      }
    };
  }, [frameKey, render, shapes]);
  return null;
}

export default Shape;
