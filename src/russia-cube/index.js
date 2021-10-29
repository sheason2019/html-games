import React from "react";
import {
  Canvas,
  Layer,
  Rect,
  Circle,
  Line,
  Group,
} from "../lib/canvas-in-react";

function RussiaCube() {
  const coordinate = React.useRef({ x: 0, y: 0 });
  const variableSize = React.useRef(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      coordinate.current.y++;
      coordinate.current.x++;
      variableSize.current++;
      setTimeout(() => clearInterval(interval), 3000);
    }, 1000 / 60);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Canvas>
      <Layer>
        <LineWithRect variableSize={variableSize} coordinate={coordinate} />
        <Circle
          type="stroke"
          coordinate={{ x: 150, y: 120 }}
          radius={120}
          color="#000000"
        />
      </Layer>
    </Canvas>
  );
}

function LineWithRect(props) {
  const { variableSize, coordinate } = props;
  const calcuLineRef = () => {
    return [
      {
        source: {
          x: 150 + variableSize.current,
          y: 120 + variableSize.current,
        },
        target: {
          x: coordinate.current.x + 50,
          y: coordinate.current.y + 50,
        },
      },
      {
        source: {
          x: 150,
          y: 120 + variableSize.current,
        },
        target: {
          x: coordinate.current.x,
          y: coordinate.current.y + 50,
        },
      },
      {
        source: {
          x: 150 + variableSize.current,
          y: 120,
        },
        target: {
          x: coordinate.current.x + 50,
          y: coordinate.current.y,
        },
      },
    ];
  };
  const lineRef = React.useRef(calcuLineRef());
  React.useEffect(() => {
    const interval = setInterval(() => {
      lineRef.current = calcuLineRef();
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, []);
  return (
    <Group {...props}>
      <Rect
        type="stroke"
        coordinate={{ x: 150, y: 120 }}
        lineWidth={1}
        color="#00FF00"
        size={variableSize}
      />
      <Line
        sourcePoint={{ x: 150, y: 120 }}
        color="#000000"
        targetPoint={coordinate}
      />
      <Rect coordinate={coordinate} color="#ff00ff" size={50} />
      {lineRef.current.map((_line, index) => (
        <Line
          key={index}
          data={lineRef}
          sourcePoint={(data) => data[index].source}
          targetPoint={(data) => data[index].target}
        />
      ))}
    </Group>
  );
}

export default RussiaCube;
