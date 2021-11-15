import React from 'react';
import { Group, Rect, Text } from '../../../lib/canvas-in-react';
import { initFallingBlock, getKey, setNextKey, setRegenerateNextKey } from '../../util/initGame';
import GameItem from '../gameitem';
import { getScore } from '../score';
import { getPause } from '../gamepanel/pause';
import { useSelector } from "react-redux";

const Preview = (props) => {
  const x = window.innerWidth / 2 + 202, y = window.innerHeight / 2 - 242;
  const gameModelRef = React.useRef(initGameModel());
  const fallingBlock = React.useRef([]);
  const state = useSelector(state => state.cube.state);
  
  React.useEffect(() => {
    const func = () => {
      const key = getKey();
      setNextKey(key);
      fallingBlock.current = initFallingBlock(key);
    }
    func();
    setRegenerateNextKey(func);
  }, []);
  const stateTitle = (() => {
    if (state !== -1) {
      return `State: ${getPause() ? 'Pause' : 'Play'}`
    } else {
      return "State: Game Over";
    }
  })();
  const stateDescribe = (() => {
    if (state !== -1) {
      return `Press key 'P' to ${getPause() ? 'containue' : 'pause'}`;
    } else {
      return `'Space': new game.`;
    }
  })();
  const stateDescribe2 = state === -1 ? `'ESC': back to menu.` : '';
  return (
    <Group {...props}>
      <Rect
        type="stroke"
        coordinate={{ x, y }}
        size={{ width: 124, height: 124}}
      />
      <Rect
        type="fill"
        color="rgba(0, 0, 0, 0.1)"
        coordinate={{ x, y }}
        size={{
          width: 124,
          height: 124,
        }}
      />
      <Text
        coordinate={{ x: x + 61, y: y - 20 }}
        text="Next Item"
      />
      {initGameModel().map((column, columnIndex) =>
        column.map((item, itemIndex) => (
          <GameItem
            key={`[${itemIndex}, ${columnIndex}]`}
            column={columnIndex}
            preview={true}
            row={itemIndex}
            data={{
              gameModel: gameModelRef,
              fallingBlock: fallingBlock,
            }}
            coordinate={{
              x: 4 + x + 30 * columnIndex,
              y: 4 + y + 30 * itemIndex,
            }}
          />
        ))
      )}
      <Text
        coordinate={{ x: x + 61, y: y + 220 }}
        text="Score"
        font="24px YaHei"
        width={200}
        align="center"
      />
      <Text
        coordinate={{ x: x + 61, y: y + 255 }}
        text={() => getScore()}
        width={200}
        align="center"
      />  
      <Text
        coordinate={{ x: x + 61, y: y + 335 }}
        text={stateTitle}
        font="24px YaHei"
        width={200}
        align="center"
      />
      <Text
        coordinate={{ x: x + 61, y: y + 365 }}
        text={stateDescribe}
        align="center"
      />
      <Text
        coordinate={{ x: x + 61, y: y + 385 }}
        text={stateDescribe2}
        align="center"
      />
    </Group>
  );
};

function initGameModel() {
  const result = [];
  for (let i = 0; i < 4; i++) {
    const column = [];
    for (let j = 0; j < 4; j++) {
      const item = {
        value: 0,
      };
      column.push(item);
    }
    result.push(column);
  }
  return result;
}

export default Preview;