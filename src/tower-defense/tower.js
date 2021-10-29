import React from "react";
import styled from "styled-components";
import { TOWER_TYPE } from "./constant";

const TowerNode = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  border: 2px solid blue;
  background-color: skyblue;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  z-index: 10;
`;

const Bullet = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: green;
`;

function Tower(props) {
  const {
    towers,
    gameMap,
    coordinate,
    setCenterNode,
    type,
    monsters,
    requestFire,
  } = props;
  const towerId = React.useRef(Date.now());
  const CD = React.useRef(true);
  const cooldownTime = 100;
  const [towerCoordinate, setTowerCoordinate] = React.useState({
    top: 0,
    left: 0,
  });
  const towerRef = React.useRef();

  const handlePushToTowers = (ref) => {
    let shouldPush = true;
    towerRef.current = ref;
    towers.forEach((item) => {
      if (item.id === towerId.current) {
        shouldPush = false;
      }
    });
    if (shouldPush) {
      towers.push({ dom: ref, id: towerId.current });
    }
  };

  const handleShouldAttack = React.useCallback(() => {
    const coordinate_tower = {
      x: towerRef.current.offsetLeft + towerRef.current.offsetWidth / 2,
      y: towerRef.current.offsetTop + towerRef.current.offsetHeight / 2,
    };
    monsters.forEach((monster) => {
      const coordinate_monster = {
        x: monster.dom.offsetLeft + monster.dom.offsetWidth / 2,
        y: monster.dom.offsetTop + monster.dom.offsetHeight / 2,
      };

      if (CD.current) {
        if (
          (coordinate_tower.x - coordinate_monster.x) ** 2 +
            (coordinate_tower.y - coordinate_monster.y) ** 2 <
          (TOWER_TYPE[type].attack_range + monster.dom.offsetHeight / 2) ** 2
        ) {
          const A = coordinate_tower, B = coordinate_monster;
          const target = {x: 0, y: 0};
          const radius = 300;
          target.y = (radius * (B.y - A.y)) / ((B.x - A.x) ** 2 + (B.y - A.y) ** 2) ** 0.5 + A.y;
          target.x = (B.x - A.x) * (target.y - A.y) / (B.y - A.y) + A.x;
          requestFire({ source: coordinate_tower, target, component: <Bullet /> });
          CD.current = false;
          setTimeout(() => (CD.current = true), cooldownTime);
        }
      }
    });
  }, [monsters, requestFire, type]);

  React.useEffect(() => {
    try {
      const { x, y } = coordinate;
      const dom = gameMap[y][x].dom;
      const tower = towerRef.current;
      setTowerCoordinate({
        top: dom.offsetTop + dom.offsetHeight / 2 - tower.offsetHeight / 2,
        left: dom.offsetLeft + dom.offsetWidth / 2 - tower.offsetWidth / 2,
      });
    } catch (e) {}
  }, [coordinate, gameMap]);
  React.useEffect(() => {
    const timeout = setInterval(handleShouldAttack, 1000 / 30);
    return () => {
      clearInterval(timeout);
    };
  }, [handleShouldAttack]);
  return (
    <TowerNode
      top={towerCoordinate.top}
      left={towerCoordinate.left}
      ref={handlePushToTowers}
      onMouseEnter={() => setCenterNode({ dom: towerRef.current, type })}
      onMouseLeave={() => setCenterNode(null)}
      {...props}
    />
  );
}

export default Tower;
