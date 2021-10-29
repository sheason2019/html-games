import React from "react";
import styled from "styled-components";

const MonsterContainer = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  border: 2px solid black;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Blank = styled.div`
  flex-grow: ${props => props.maxHp - props.hp};
  background-color: #FFF;
`;
const Hp = styled.div`
  flex-grow: ${props => props.hp};
  background-color: red;
`;

function Monster(props) {
  const { roadMap, gameMap, monsters, hp, maxHp, speed, removeMonster, monsterId } = props;
  const [step, setStep] = React.useState(0);
  const [coordinate, setCoordinate] = React.useState({ top: 0, left: 0 });
  const monsterRef = React.useRef();
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    try {
      const { x, y } = roadMap[step];
      const dom = gameMap[y][x].dom;
      const monsterDom = monsterRef.current;
      const top =
        dom.offsetTop + dom.offsetHeight / 2 - monsterDom.offsetHeight / 2;
      const left =
        dom.offsetLeft + dom.offsetWidth / 2 - monsterDom.offsetWidth / 2;
      if (step !== 0) {
        monsterDom.style.transition = `all ${ 4000 / speed }ms linear`;
        setCoordinate({ top, left });
        if (step + 1 < roadMap.length) {
          if (timeoutRef.current === null) {
            timeoutRef.current = setTimeout(() => {
              timeoutRef.current = null;
              setStep(step + 1);
            }, 4000 / speed);
          }
        }
      } else {
        setCoordinate({ top, left });
        setTimeout(() => {
          setStep(1);
        }, 800);
      }
    } catch (e) {}
  }, [gameMap, hp, roadMap, speed, step]);

  React.useLayoutEffect(() => {
    if (hp === 0) {
      clearTimeout(timeoutRef.current);
      removeMonster(monsterId);
    }
  }, [hp, monsterId, removeMonster]);

  React.useEffect(() => {
    monsters.push({ dom: monsterRef.current, id: monsterId });
  }, [monsterId, monsterRef, monsters]);

  return (
    <MonsterContainer
      ref={monsterRef}
      top={coordinate.top}
      left={coordinate.left}
      {...props}
    >
      <Blank hp={hp} maxHp={maxHp} />
      <Hp hp={hp} />
    </MonsterContainer>
  );
}

export default Monster;
