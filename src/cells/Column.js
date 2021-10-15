import Card from "./Card";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { moveCard, moveToCollection, selectColumn } from "./cellsSlice";
import React from "react";

const ColumnWrapper = styled.div`
  margin: 0 0.75rem;
  position: relative;
  align-self: flex-start;
`;
const EmptyCard = styled.div`
  width: 8rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 0.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const searchMoveableCard = (column) => {
  const temp = {};
  const stack = [];
  const length = column.length;
  let index = 0;
  while (true) {
    if (index >= length) {
      break;
    }
    if (temp.value === undefined) {
      Object.assign(temp, column[length - 1]);
      index++;
    } else {
      if (
        column[length - 1 - index].value === temp.value + 1 &&
        column[length - 1 - index].color % 2 !== temp.color % 2
      ) {
        Object.assign(temp, column[length - 1 - index]);
        index++;
      } else {
        break;
      }
    }
    stack.unshift(Object.assign({}, temp));
  }
  return stack;
};

const tryMoveCard = (stack, column) => {
  const result = {
    allowMove: false,
    length: 0,
  };
  if (column.length === 0) {
    return {
      allowMove: true,
      length: stack.length,
    };
  }
  const target = column[column.length - 1];
  stack.forEach((item, index) => {
    if (
      item.color % 2 !== target.color % 2 &&
      item.value === target.value - 1
    ) {
      result.allowMove = true;
      result.length = stack.length - index;
    }
  });
  return result;
};

export default function Column(props) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.cells.temp);
  const collections = useSelector((state) => state.cells.collections);
  const columns = useSelector((state) => state.cells.columns);
  const start = useSelector((state) => state.cells.start);
  const data = columns[props.index];

  const handleOnClick = React.useCallback((e) => {
    if (e) {
      e.stopPropagation();
    }
    const moveInfo = tryMoveCard(
      selected.stack,
      data
    );
    if (moveInfo.allowMove) {
      dispatch(moveCard({ target: props.index, length: moveInfo.length }));
    } else {
      const stack = searchMoveableCard(data);
      dispatch(
        selectColumn({ index: props.index, stack: stack, type: "column" })
      );
    }
  }, [data, dispatch, props.index, selected.stack]);

  const shouldBackdropOpen = (index) => {
    if (selected.type === "column") {
      return (
        props.index === selected.index &&
        !data.length - index <= selected.stack.length
      );
    } else {
      return false;
    }
  };
  const checkToCollection = React.useCallback(() => {
    const data = columns[props.index];
    if (data.length === 0) {
      return;
    } else {
      const item = data[data.length - 1];
      const collection = collections[item.color];
      let min = 13;
      collections.forEach(item => {
        if (item.length === 0) {
          min = 0;
        } else if (item[item.length - 1].value < min) {
          min = item[item.length - 1].value;
        }
      })
      if (item.value > min + 2) {
        return;
      }
      if (collection.length === 0) {
        if (item.value === 0) {
          handleOnClick();
          dispatch(moveToCollection({ target: item.color }));
        }
      } else {
        if (collection[collection.length - 1].value + 1 === item.value) {
          handleOnClick();
          dispatch(moveToCollection({ target: item.color }));
        }
      }
    }
  }, [collections, columns, dispatch, handleOnClick, props.index]);
  React.useEffect(() => {
    if (start) {
      checkToCollection();
    }
  }, [checkToCollection, start]);

  return (
    <ColumnWrapper onClick={handleOnClick}>
      {data.length === 0 ? (
        <EmptyCard />
      ) : (
        data.map((card, index) => (
          <Card
            key={index}
            data={card}
            backdrop={shouldBackdropOpen(index)}
            last={index === data.length - 1}
          />
        ))
      )}
      <MoveAbleColumn
        show={selected.index === props.index && selected.type === "column"}
      />
    </ColumnWrapper>
  );
}

const MoveAbleColumnWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.space * 3}rem;
  box-shadow: 0px 1px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
`;

const MoveAbleColumn = (props) => {
  const selected = useSelector((state) => state.cells.temp);
  const column = useSelector((state) => state.cells.columns[selected.index]);
  const dispatch = useDispatch();
  const handleOnClick = (e) => {
    e.stopPropagation();
    dispatch(selectColumn({ index: -1, stack: [] }));
  };
  if (!props.show) {
    return null;
  } else {
    return (
      <MoveAbleColumnWrapper
        onClick={handleOnClick}
        space={column.length - selected.stack.length}
      >
        {selected.stack.map((item, index) => (
          <Card
            key={index}
            data={item}
            last={index === selected.stack.length - 1}
          />
        ))}
      </MoveAbleColumnWrapper>
    );
  }
};
