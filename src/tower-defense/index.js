import React from "react";
import styled from "styled-components";
import Battleland from "./battleland";
import Monsters from "./monsters";
import Towers from "./towers";
import AttackRange from "./attack-range";
import Bullets from "./bullets";

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const initMap = () => {
  const map = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push({ type: i % 2 === 0 ? 0 : 1 });
    }
    map.push(row);
  }
  return map;
};
const initRoadMap = () => {
  const roadmap = [];
  for (let i = 0; i < 9; i++) {
    roadmap.push({ x: i, y: 1 });
  }
  return roadmap;
};

function TowerDefense() {
  const [DemoMap, setDemoMap] = React.useState([]);
  // 防御塔实例
  const towers = React.useRef([]);
  // 防御塔模型
  const [towersModel, setTowersModel] = React.useState([
    { type: "normal", coordinate: { x: 2, y: 0 }, id: 0 },
  ]);
  // 怪物实例
  const monsters = React.useRef([]);
  // 怪物模型
  const [monstersModel, setMonstersModel] = React.useState([
    { type: "normal", id: 0, hp: 10, maxHp: 10, },
    { type: "normal", id: 1, hp: 10, maxHp: 20, },
    { type: "normal", id: 2, hp: 10, maxHp: 10, },
  ]);
  // 默认怪物行进路线
  const defaultRoadmap = initRoadMap();
  const handleNewGame = () => {
    setDemoMap(initMap());
  };
  // 当前指向的节点
  const [centerNode, setCenterNode] = React.useState(null);
  // 子弹模型
  const bulletsModel = React.useRef([]).current;
  // 把地图方块的DOM存储到index.js的state中
  const handleSetDomForMap = (row, col, dom) => {
    const newDemoMap = [...DemoMap];
    if (newDemoMap[row][col].dom) {
      return;
    } else {
      newDemoMap[row][col].dom = dom;
      setDemoMap(newDemoMap);
    }
  };
  // 子弹key
  const bulletKey = React.useRef(0);
  // 请求开火
  const requestFire = (bullet) => {
    bulletsModel.push({ ...bullet, key: bulletKey.current++ });
    if (bulletKey.current > 99999999) {
      bulletKey.current = 0;
    }
  };
  // 清理子弹
  const cleanBullet = (key) => {
    const newBulletsModel = [...bulletsModel];
    let index = null;
    newBulletsModel.every((bullet, i) => {
      if (bullet.key === key) {
        index = i;
        return false;
      }
      return true;
    });
    if (index === null) {
      return;
    } else {
      bulletsModel.splice(index, 1);
    }
  };
  const towerAttack = (monsterId) => {
    const newMonstersModel = [...monstersModel];
    newMonstersModel.forEach((monster) => {
      if (monster.id === monsterId) {
        --monster.hp;
      }
    });
    setMonstersModel(newMonstersModel);
  };
  const removeMonster = (monsterId) => {
    const newMonstersModel = [...monstersModel];
    let deleteIndex = null;
    newMonstersModel.forEach((monster, index) => {
      if (monster.id === monsterId) {
        deleteIndex = index;
      }
      return false;
    });
    if (deleteIndex !== null) {
      newMonstersModel.splice(deleteIndex, 1);
      setMonstersModel(newMonstersModel);
    }
  };
  React.useEffect(() => {
    handleNewGame();
  }, []);
  return (
    <GameContainer>
      <Battleland gameMap={DemoMap} handleSetDomForMap={handleSetDomForMap} />
      <Monsters
        monsters={monsters.current}
        removeMonster={removeMonster}
        gameMap={DemoMap}
        defaultRoadmap={defaultRoadmap}
        monstersModel={monstersModel}
      />
      <Towers
        towers={towers.current}
        monsters={monsters.current}
        towersModel={towersModel}
        gameMap={DemoMap}
        requestFire={requestFire}
        setCenterNode={setCenterNode}
      />
      <Bullets
        bulletsModel={bulletsModel}
        cleanBullet={cleanBullet}
        towerAttack={towerAttack}
        monsters={monsters}
      />
      <AttackRange centerNode={centerNode} />
    </GameContainer>
  );
}

export default TowerDefense;
