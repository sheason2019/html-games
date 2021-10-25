import styled from "styled-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "./cellsSlice";
import _ from 'lodash';

const MessageContainer = styled.div`
  position: fixed;
  bottom: ${(props) => (props.open ? "3rem" : "-3rem")};
  transition: 400ms;
  left: 0;
  right: 0;
  height: 2.5rem;
  width: 28rem;
  background-color: rgb(211, 47, 47);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 4px;
  color: white;
  margin: 0 auto;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
`;

function Message() {
  const message = useSelector((state) => state.cells.message);
  const timeout = React.useRef(null);
  const timestamp = React.useRef(null);
  const dispatch = useDispatch();

  const handleCloseMessage = React.useCallback(() => {
    dispatch(setMessage({ open: false }));
  }, [dispatch]);
  React.useEffect(() => {
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }
    if (message.open || message.message_id !== timestamp.current) {
      timeout.current = setTimeout(() => {
        handleCloseMessage();
      }, 2000);
      timestamp.current = message.message_id;
    }
  }, [handleCloseMessage, message.message_id, message.open]);
  React.useEffect(() => {
    console.log(message);
  }, [message]);
  return (
    <MessageContainer open={message.open}>
      <b style={{ userSelect: "none" }}>
        {message.text}
      </b>
    </MessageContainer>
  );
}

export default Message;
