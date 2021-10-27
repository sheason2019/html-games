import React from 'react';
import styled from "styled-components";

const MonsterContainer = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: red;
  border: 2px solid black;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

function Monster(props) {
  const { roadMap, gameMap, monsters } = props;
  const [step, setStep] = React.useState(0);
  const [coordinate, setCoordinate] = React.useState({top: 0, left: 0});
  const monsterRef = React.useRef();
  const monsterId = React.useRef(Date.now());
  
  React.useEffect(() => {
    try {
      const { x, y } = roadMap[step];
      const dom = gameMap[y][x].dom;
      const monsterDom = monsterRef.current;
      const top = dom.offsetTop + dom.offsetHeight / 2 - monsterDom.offsetHeight / 2;
      const left = dom.offsetLeft + dom.offsetWidth / 2 - monsterDom.offsetWidth / 2;
      if (step !== 0) {
        monsterDom.style.transition = 'all 2000ms linear';
        setCoordinate({ top, left });
        if (step + 1 < roadMap.length) {
          setTimeout(() => {
            setStep(step + 1);
          }, 2000);
        }
      } else {
        setCoordinate({ top, left });
        setTimeout(() => {
          setStep(1);
        }, 800);
      }
    } catch(e) {}
  }, [gameMap, roadMap, step]);

  React.useEffect(() => {
    monsters.push({ dom: monsterRef.current, id: monsterId.current })
  }, [monsterRef, monsters]);

  return <MonsterContainer ref={monsterRef} top={coordinate.top} left={coordinate.left} {...props} />
}

export default Monster;