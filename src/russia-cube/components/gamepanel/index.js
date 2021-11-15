import React from "react";
import { Group } from "../../../lib/canvas-in-react";
import GameItem from "../gameitem";
import { initFallingBlock, initTransform, getKey } from "../../util/initGame";
import { eliminateScore, mergeScore, initScore } from "../score";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../slice";
import { getPause, setPause } from "./pause";

function GamePanel(props) {
  const gameModelRef = React.useRef(initGameModel());
  const fallingBlock = React.useRef([]);
  const transfromModel = React.useRef({});
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cube.state);
  
  const initGame = React.useCallback(() => {
    gameModelRef.current = initGameModel();
    const key = getKey();
    fallingBlock.current = initFallingBlock(key);
    transfromModel.current = initTransform(key);
    dispatch(setState(1));
  }, [dispatch]);
  
  React.useEffect(() => {
    const move = (where) => {
      if (where === "left") {
        let allowMove = true;
        fallingBlock.current.shape.forEach((item) => {
          if (item.column === 0) {
            allowMove = false;
          } else if (
            gameModelRef.current[item.column - 1][item.row] &&
            gameModelRef.current[item.column - 1][item.row].value !== 0
          ) {
            allowMove = false;
          }
        });
        if (allowMove) {
          fallingBlock.current.shape.forEach((item) => {
            item.column--;
          });
          fallingBlock.current.offset.col--;
        }
      } else if (where === "right") {
        let allowMove = true;
        fallingBlock.current.shape.forEach((item) => {
          if (item.column === 9) {
            allowMove = false;
          } else if (
            gameModelRef.current[item.column + 1][item.row] &&
            gameModelRef.current[item.column + 1][item.row].value !== 0
          ) {
            allowMove = false;
          }
        });
        if (allowMove) {
          fallingBlock.current.shape.forEach((item) => {
            item.column++;
          });
          fallingBlock.current.offset.col++;
        }
      } else if (where === "down") {
        let status;
        const changedRow = [];
        let shouldSpliceRow = [];
        fallingBlock.current.shape.forEach((item) => {
          if (item.row < 0) {
            status = 0;
          } else if (
            item.row < 19 &&
            gameModelRef.current[item.column][item.row + 1].value === 0 &&
            status !== -1
          ) {
            // 成功向下移动后返回0
            status = 0;
          } else {
            // 落地后返回-1
            status = -1;
          }
        });
        if (status === 0) {
          fallingBlock.current.offset.row++;
        }
        fallingBlock.current.shape.forEach((item) => {
          if (status === 0) {
            item.row++;
          } else {
            gameModelRef.current[item.column][item.row].value = 1;
            changedRow.push(item.row);
          }
        });
        // 重新生成下落方块
        if (status === -1) {
          const key = getKey();
          mergeScore(fallingBlock.current.shape.length);
          fallingBlock.current = initFallingBlock(key);
          transfromModel.current = initTransform(key);
          fallingBlock.current.shape.forEach((item) => {
            if (
              gameModelRef.current[item.column][item.row] &&
              gameModelRef.current[item.column][item.row].value === 1
            ) {
              dispatch(setState(-1));
            }
          });
        }
        // 检查是否需要进行消除
        changedRow.forEach((row) => {
          gameModelRef.current.every((column) => column[row].value === 1) &&
            shouldSpliceRow.push(row);
        });
        // 行消除函数
        shouldSpliceRow = Array.from(new Set(shouldSpliceRow)).sort(
          (a, b) => a - b
        );
        for (let j = 0; j < shouldSpliceRow.length; j++) {
          const row = shouldSpliceRow[j];
          for (let i = 0; i < gameModelRef.current.length; i++) {
            gameModelRef.current[i].splice(row, 1);
            gameModelRef.current[i].unshift({ value: 0 });
          }
        }
        eliminateScore(shouldSpliceRow.length);
        return status;
      } else if (where === "up") {
        let point = transfromModel.current.point;
        const lastPoint = point;
        const group = transfromModel.current.group;
        const offset = fallingBlock.current.offset;
        const gameModel = gameModelRef.current;
        if (point === group.length - 1) {
          point = 0;
        } else {
          point++;
        }
        transfromModel.current.point = point;
        const targetShape = JSON.parse(JSON.stringify(group[point]));
        // 是否合并到shape的标识符
        let merge = true;
        targetShape.forEach((item) => {
          item.row += offset.row;
          item.column += offset.col;
          if (item.column < 0 || item.column > 9) {
            merge = false;
          } else if (
            gameModel[item.column][item.row] &&
            gameModel[item.column][item.row].value === 1
          ) {
            merge = false;
          }
        });
        if (merge) {
          fallingBlock.current.shape = targetShape;
        } else {
          transfromModel.current.point = lastPoint;
        }
      } else if (where === "space") {
        while (move("down") !== -1) {}
      }
    };

    // 暂停
    const handlePause = () => {
      const pause = getPause();
      setPause(!pause);
    }

    document.onkeydown = (e) => {
      const pause = getPause();
      if (state === 1) {
        switch (e.code) {
          case "ArrowRight":
            !pause && move("right");
            break;
          case "ArrowLeft":
            !pause && move("left");
            break;
          case "ArrowUp":
            !pause && move("up");
            break;
          case "ArrowDown":
            !pause && move("down");
            break;
          case "Space":
            !pause && move("space");
            break;
          case "KeyP":
            handlePause();
            break;
          default:
            return;
        }
      } else if (state === -1) {
        switch (e.code) {
          case "Space":
            initGame();
            initScore();
            break;
          case "Escape":
            dispatch(setState(0));
            initScore();
            break;
          default:
            break;
        }
      }
    };

    const initKey = getKey();
    fallingBlock.current = initFallingBlock(initKey);
    transfromModel.current = initTransform(initKey);
 
    const interval = setInterval(() => {
      const pause = getPause();
      if (state === 1 && !pause) {
        move("down");
      }
      if (state === -1) {
        clearInterval(interval);
      }
    }, 750);
    return () => clearInterval(interval);
  }, [dispatch, initGame, state]);
  return (
    <Group {...props}>
      {initGameModel().map((column, columnIndex) =>
        column.map((item, itemIndex) => (
          <GameItem
            column={columnIndex}
            row={itemIndex}
            data={{
              gameModel: gameModelRef,
              fallingBlock: fallingBlock,
            }}
          />
        ))
      )}
    </Group>
  );
}

function initGameModel() {
  const result = [];
  for (let i = 0; i < 10; i++) {
    const column = [];
    for (let j = 0; j < 20; j++) {
      const item = {
        value: 0,
      };
      column.push(item);
    }
    result.push(column);
  }
  return result;
}

export default GamePanel;
