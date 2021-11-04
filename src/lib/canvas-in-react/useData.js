import React from "react";

const useData = () => {
  // 每帧需要执行的函数数组
  const shouldExecPerFrameRef = React.useRef([]);
  // 参数 index 表示该函数在更新队列中的位置，用法可以参考css里的zIndex属性
  const registUpdateFunc = ({ func, frames = 1, index = 0 }) => {
    const key = Symbol("updateFunc");
    if (shouldExecPerFrameRef.current.length === 0) {
      shouldExecPerFrameRef.current.push({
        key,
        func,
        frames,
        index,
      });
    } else {
      let insertTo = 0;
      shouldExecPerFrameRef.current.every((item, i) => {
        if (item.index <= index) {
          insertTo = i;
          return false;
        } else if (i === shouldExecPerFrameRef.current.length - 1) {
          insertTo = i;
        }
        return true;
      });
      shouldExecPerFrameRef.current.splice(insertTo, 0, {
        key,
        func,
        frames,
        index,
      })
    }
    return key;
  };
  const removeUpdateFunc = (key) => {
    shouldExecPerFrameRef.current.every((obj, index) => {
      if (obj.key === key) {
        shouldExecPerFrameRef.current.splice(index, 1);
        return false;
      } else {
        return true;
      }
    });
  };
  const updateStackForLayer = shouldExecPerFrameRef;
  return {
    registUpdateFunc,
    removeUpdateFunc,
    updateStackForLayer,
  };
};

export default useData;
