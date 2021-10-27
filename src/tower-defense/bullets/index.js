import React from "react";
import styled from "styled-components";

const bulletDuration = 900;
const BulletWrapper = styled.div`
  transition: all ${bulletDuration}ms ease-in, opacity ${bulletDuration / 3}ms;
  position: absolute;
  top: ${(props) => props.coordinate.y}px;
  left: ${(props) => props.coordinate.x}px;
  opacity: ${(props) => props.opacity};
`;
function Bullet(props) {
  const { sourceC, targetC, bulletKey, cleanBullet } = props;
  const [coordinate, setCoordinate] = React.useState(sourceC);
  const [opacity, setOpacity] = React.useState(1);
  const handleClean = React.useCallback(() => {
    setTimeout(() => cleanBullet(bulletKey), bulletDuration);
  }, [bulletKey, cleanBullet]);
  React.useEffect(() => {
    setCoordinate(targetC);
  }, [targetC]);
  React.useEffect(() => {
    setTimeout(() => setOpacity(0), (bulletDuration * 2) / 3);
  }, []);
  React.useEffect(() => {
    handleClean();
  }, [bulletKey, cleanBullet, handleClean]);
  return <BulletWrapper opacity={opacity} coordinate={coordinate} {...props} />;
}

function Bullets({ bulletsModel, cleanBullet }) {
  return (
    <div>
      {bulletsModel.map((bullet) => (
        <Bullet
          sourceC={bullet.source}
          targetC={bullet.target}
          key={bullet.key}
          bulletKey={bullet.key}
          cleanBullet={cleanBullet}
        >
          {bullet.component}
        </Bullet>
      ))}
    </div>
  );
}

export default Bullets;
