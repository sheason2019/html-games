import React from "react";

function Layer(props) {
  const { width, height, clear = true } = props;
  // 获取canvas实例
  const canvasRef = React.useRef();
  // 每帧需要绘制的图形
  const shapes = React.useRef([]);
  // 每帧的id，避免一帧里产生多个重复的渲染函数
  const frameKey = React.useRef(Date.now());
  const fps = 60;
  const [ctx, setCtx] = React.useState(null);
  React.useEffect(() => {
    console.log(shapes.current)
  }, [shapes.current.length]);
  React.useEffect(() => {
    if (ctx === null) return;
    const interval = setInterval(() => {
      if (clear) {
        ctx.clearRect(0, 0, width, height);
      }
      for (let shape of shapes.current) {
        shape.render(ctx);
      }
      frameKey.current = Date.now();
    }, 1000 / fps);
    return () => {
      clearInterval(interval);
    }
  }, [clear, ctx, height, width]);
  React.useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
  }, []);
  return (
    <>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      {React.Children.map(props.children, child => (
        React.cloneElement(child, {
          shapes: shapes.current,
          ctx,
          frameKey: frameKey.current,
        })
      ))}
    </>
  );
}

export default Layer;