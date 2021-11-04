import React from "react";
import {
  Canvas,
  Layer,
  Rect,
  Circle,
  Line,
  Group,
  useData,
} from "../lib/canvas-in-react";

function RussiaCube() {
  const coordinate = React.useRef({ x: 0, y: 0 });
  const variableSize = React.useRef(0);
  const { updateStackForLayer, registUpdateFunc, removeUpdateFunc } = useData();

  React.useEffect(() => {
    const key = registUpdateFunc({
      func: () => {
        coordinate.current.y++;
        coordinate.current.x++;
        variableSize.current++;
      },
      frames: 1,
      index: 0,
    });
    setTimeout(() => {
      removeUpdateFunc(key);
    }, 3000);
  }, [registUpdateFunc, removeUpdateFunc]);

  return (
    <Canvas>
      <Layer updateStackForLayer={updateStackForLayer} fps={60}>
        <LineWithRect
          registUpdateFunc={registUpdateFunc}
          removeUpdateFunc={removeUpdateFunc}
          variableSize={variableSize}
          coordinate={coordinate}
        />
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
      {
        source: {
          x: 150,
          y: 120,
        },
        target: {
          x: coordinate.current.x,
          y: coordinate.current.y,
        },
      },
    ];
  };
  const lineRef = React.useRef(calcuLineRef());
  React.useEffect(() => {
    const key = props.registUpdateFunc({
      func: () => {
        lineRef.current = calcuLineRef();
      },
      frames: 1,
      index: 1,
    });
    setTimeout(() => {
      props.removeUpdateFunc(key);
    }, 3000);
  }, []);
  return (
    <Group {...props}>
      {lineRef.current.map((_line, index) => (
        <Line
          key={index}
          data={lineRef}
          sourcePoint={(data) => data[index].source}
          targetPoint={(data) => data[index].target}
        />
      ))}
      <Rect
        type="stroke"
        coordinate={{ x: 150, y: 120 }}
        lineWidth={1}
        color="#00FF00"
        size={variableSize}
      />
      <Rect coordinate={coordinate} color="#ff00ff" size={50} />
    </Group>
  );
}

export default RussiaCube;
