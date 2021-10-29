import React from "react";

function Group(props) {
  const { shapes, ctx, frameKey } = props;
  return React.Children.map(props.children, child => (
    React.cloneElement(child, {
      shapes: shapes,
      ctx,
      frameKey: frameKey,
    })
  ));
}

export default Group;