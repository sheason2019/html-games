import Tower from "./tower";

function Towers({ towers, gameMap, towersModel, setCenterNode, monsters, requestFire }) {
  return (
    <div>
      {towersModel.map((tower) => (
        <Tower
          key={tower.id}
          towers={towers}
          monsters={monsters}
          type={tower.type}
          requestFire={requestFire}
          gameMap={gameMap}
          setCenterNode={setCenterNode}
          coordinate={tower.coordinate}
        />
      ))}
    </div>
  );
}

export default Towers;
