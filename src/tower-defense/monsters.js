import Monster from "./monster";

function Monsters(props) {
  const { gameMap, defaultRoadmap, monsters, monstersModel, removeMonster } = props;
  return (
    <>
      {monstersModel.map((monster, index) => (
        <Monster
          key={monster.id}
          roadMap={defaultRoadmap}
          gameMap={gameMap}
          monsters={monsters}
          monsterId={monster.id}
          hp={monster.hp}
          maxHp={monster.maxHp}
          speed={index + 1}
          removeMonster={removeMonster}
        />
      ))}
    </>
  );
}

export default Monsters;
