import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./Card";
import { moveToSlot, selectColumn, moveToCollection } from "./cellsSlice";

const EmptyCard = styled.div`
  width: 8rem;
  height: 10rem;
  margin: 5px;
  border: 1px solid white;
  border-radius: 0.5rem;
`;

const EmptyContainer = styled.div`
  display: flex;
  padding: 5px;
`;

export default function Empty() {
  const dispatch = useDispatch();
  const slots = useSelector((state) => state.cells.slots);
  const temp = useSelector((state) => state.cells.temp);
  const collections = useSelector((state) => state.cells.collections);
  const start = useSelector(state => state.cells.start);
  const handleClickSlot = React.useCallback(
    (num) => {
      if (slots[num] === null) {
        dispatch(moveToSlot({ target: num }));
      } else {
        dispatch(
          selectColumn({ index: num, stack: [slots[num]], type: "slot" })
        );
      }
    },
    [dispatch, slots]
  );

  const checkToCollection = React.useCallback(() => {
    slots.forEach((item, index) => {
      if (item === null) {
        return;
      }

      const collection = collections[item.color];
      if (collection.length === 0) {
        if (item.value === 0) {
          handleClickSlot(index);
          dispatch(moveToCollection({ target: item.color }));
        }
      } else {
        if (collection[collection.length - 1].value + 1 === item.value) {
          handleClickSlot(index);
          dispatch(moveToCollection({ target: item.color }));
        }
      }
    });
  }, [collections, dispatch, handleClickSlot, slots]);

  React.useEffect(() => {
    if (start) {
      checkToCollection();
    }
  }, [checkToCollection, start]);

  return (
    <EmptyContainer>
      {slots.map((slot, index) => (
        <EmptyCard
          key={index}
          onClick={(e) => {
            handleClickSlot(index);
            e.stopPropagation();
          }}
        >
          {slot === null ? null : (
            <Card
              data={slot}
              selected={temp.type === "slot" && temp.index === index}
            />
          )}
        </EmptyCard>
      ))}
    </EmptyContainer>
  );
}
