function initCanvas(canvas, bulletsModel, monsters, towerAttack) {
  canvas.style.position = 'absolute';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.zIndex = 5;

  const ctx = canvas.getContext('2d');
  
  return setInterval(() => Frame(ctx, bulletsModel, monsters, towerAttack), 1000 / 60);
}
function Frame(ctx, bulletsModel, monsters, towerAttack) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  bulletsModel.forEach((bullet, index) => {
    if (bullet.process === 100) {
      bulletsModel.splice(index, 1);
    } else {
      new NormalBullet(bullet, monsters, towerAttack).draw(ctx);
    }
  });
}

function OpacityFunc(process) {
  if (process / 100 < 0.75) {
    return 1;
  } else {
    return 1 - (process / 100 - 0.75) * 4; 
  }
}

function NormalBullet(bullet, monsters, towerAttack) {
  this.sourceCoordinate = bullet.source;
  this.targetCoordinate = bullet.target;
  bullet.process = bullet.process !== undefined ? bullet.process + 1.5 : 0;
  this.coordinate = {
    x: ((this.targetCoordinate.x - this.sourceCoordinate.x) * bullet.process) / 100 + this.sourceCoordinate.x,
    y: ((this.targetCoordinate.y - this.sourceCoordinate.y) * bullet.process) / 100 + this.sourceCoordinate.y,
  }
  let monsterId;
  const attack = !monsters.current.every(monster => {
    const monster_coordinate = {
      x: monster.dom.offsetLeft + monster.dom.offsetWidth / 2,
      y: monster.dom.offsetTop + monster.dom.offsetHeight / 2,
    }
    const distance = monster.dom.offsetWidth / 2;
    monsterId = monster.id;
    return (monster_coordinate.x - this.coordinate.x) ** 2 + (monster_coordinate.y - this.coordinate.y) ** 2 > distance ** 2;
  })
  if (attack) {
    towerAttack(monsterId);
    bullet.process = 100;
  }
  if (bullet.process > 100) {
    bullet.process = 100;
  }
  this.draw = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 255, 0, ${OpacityFunc(bullet.process)})`;
    ctx.arc(this.coordinate.x, this.coordinate.y, 5, 0, Math.PI * 2, false);
    ctx.strokeStyle = `rgba(0, 0, 0, ${OpacityFunc(bullet.process)})`;
    ctx.fill();
    ctx.stroke();
  }
}

export default initCanvas;