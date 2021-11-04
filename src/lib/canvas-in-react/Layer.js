import React from "react";

function Layer(props) {
  const {
    width,
    height,
    clear = true,
    fps = 60,
    updateStackForLayer = [],
  } = props;
  // 获取canvas实例
  const canvasRef = React.useRef();
  // 每帧需要绘制的图形
  const shapes = React.useRef([]);
  // 每帧的id，避免一帧里产生多个重复的渲染函数
  const frameKey = React.useRef(0);
  const [ctx, setCtx] = React.useState(null);

  React.useEffect(() => {
    if (ctx === null) return;
    const interval = setInterval(() => {
      if (clear) {
        ctx.clearRect(0, 0, width, height);
      }
      // 循环注册的更新函数
      for (let updater of updateStackForLayer.current) {
        // 如果当前的更新帧是更新函数注册时指定的间隔帧的整数倍
        if (frameKey.current % updater.frames === 0) {
          updater.func();
        }
      }
      for (let shape of shapes.current) {
        shape.render(ctx);
      }
      frameKey.current++;
    }, 1000 / fps);
    return () => {
      clearInterval(interval);
    };
  }, [clear, ctx, fps, height, updateStackForLayer, width]);
  React.useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));
  }, []);
  return (
    <>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, {
          shapes: shapes.current,
          ctx,
          frameKey: frameKey.current,
        })
      )}
    </>
  );
}

export default Layer;
