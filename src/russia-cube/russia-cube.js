import React from "react";
import { Canvas, Layer, Rect, Group, useData } from "../lib/canvas-in-react";
import GamePanel from "./components/gamepanel";
import Preview from "./components/preview";

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
    <>
      <Canvas>
        <Layer fps={1}>
          <Container />
        </Layer>
        <Layer updateStackForLayer={updateStackForLayer} fps={30}>
          <GamePanel />
          <Preview />
        </Layer>
      </Canvas>
    </>
  );
}

function Container(props) {
  const width = 304,
    height = 604;
  const x = window.innerWidth / 2 - width / 2,
    y = window.innerHeight / 2 - height / 2;
  return (
    <Group {...props}>
      <Rect
        type="stroke"
        coordinate={{ x, y }}
        size={{
          width,
          height,
        }}
      />
      <Rect
        type="fill"
        color="rgba(0, 0, 0, 0.1)"
        coordinate={{ x, y }}
        size={{
          width,
          height,
        }}
      />
    </Group>
  );
}

export default RussiaCube;
