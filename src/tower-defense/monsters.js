import Monster from "./monster";

function Monsters(props) {
  const { gameMap, defaultRoadmap, monsters, monstersModel } = props;
  return (
    <>
      {monstersModel.map((monster) => (
        <Monster
          key={monster.id}
          roadMap={defaultRoadmap}
          gameMap={gameMap}
          monsters={monsters}
        />
      ))}
    </>
  );
}

export default Monsters;
