import React from "react";
import initCanvas from "./initCanvas";

function Bullets({ bulletsModel, monsters, towerAttack }) {
  React.useEffect(() => {
    const interval = initCanvas(canvasRef.current, bulletsModel, monsters, towerAttack );
    return () => {
      clearInterval(interval);
    }
  }, [bulletsModel, monsters, towerAttack]);
  const canvasRef = React.useRef();
  return (
    <canvas ref={canvasRef}></canvas>
  );
}

export default Bullets;
