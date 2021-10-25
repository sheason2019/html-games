import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { cancelAction, initColumn, pushIntoHistory, selectColumn } from "./cellsSlice";
import ControlBar from "./ControlBar";
import End from "./End";
import FAB from "./FAB";
import GamePanel from "./GamePanel";
import Help from "./Help";
import Message from "./Message";
import Welcome from './Welcome';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Cells() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.cells.status);
  const history = useSelector((state) => state.cells.history);
  const state = useSelector((state) => state.cells);
  const shortcut = React.useRef(new Map());
  const handleCancelSelected = (e) => {
    dispatch(selectColumn({ index: -1, stack: [] }));
  };
  const handleCancelAction = (e) => {
    e.stopPropagation();
    if (history.length > 1) {
      dispatch(cancelAction(history[history.length - 2]));
    }
  };

  React.useEffect(() => {
    dispatch(initColumn());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(pushIntoHistory({
      columns: state.columns,
      slots: state.slots,
      collections: state.collections,
    }));
  }, [state.columns, state.slots, state.collections, dispatch]);
  React.useEffect(() => {
    document.onkeydown = (e) => {
      shortcut.current.set(e.code, true);
      if (shortcut.current.get('ControlLeft') && shortcut.current.get('KeyZ')) {
        handleCancelAction(e);
      }
    };
    document.onkeyup = (e) => {
      shortcut.current.set(e.code, false);
    };
    return () => {
      document.onkeydown = () => {};
      document.onkeyup = () => {};
    };
  })

  let content;
  if (status === "index") {
    content = <Welcome />;
  } else if (status === "game") {
    content = (
      <>
        <ControlBar />
        <GamePanel />
        <Message />
        <FAB onClick={handleCancelAction}>撤销</FAB>
      </>
    );
  } else if (status === "help") {
    content = (<Help />);
  } else if (status === "end") {
    content = (<End />);
  }
  return (
    <Background onClick={handleCancelSelected} onContextMenu={e => e.preventDefault()}>
      {content}
    </Background>
  );
}

export default Cells;
