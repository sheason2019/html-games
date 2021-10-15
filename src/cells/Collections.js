import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import Card from "./Card";
import { moveToCollection, selectColumn } from "./cellsSlice";

const EmptyCard = styled.div`
  width: 8rem;
  height: 10rem;
  margin: 5px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 0.5rem;
  user-select: none;
`;

const EmptyContainer = styled.div`
  display: flex;
  padding: 5px;
`;

const ColorBackground = styled.div`
  color: ${props => props.index % 2 === 0 ? 'black' : 'red'};
  font-size: 5rem;
  opacity: 0.25;
`;

export default function Collections() {
  const collections = useSelector(state => state.cells.collections);
  const selected = useSelector(state => state.cells.temp);
  const dispatch = useDispatch();
  const handleOnClick = (e, target) => {
    e.stopPropagation();
    const collection = collections[target];
    const item = selected.stack[selected.stack.length - 1];
    if (!item) {
      return;
    }
    if (item.color === target && item.value === collection.length) {
      dispatch(moveToCollection({target}));
    }
    dispatch(selectColumn({ index: -1, stack: [] }));
  }
  return (
    <EmptyContainer>
      {
        collections.map((collection, index) => (
          <EmptyCard key={index} onClick={(e) => handleOnClick(e, index)}>
            <Collection collection={collection} index={index} />
          </EmptyCard>
        ))
      }
    </EmptyContainer>
  )
}

function Collection({index, collection}) {
  const colors = ["♠", "♥", "♣️", "♦️"];
  if (collection.length === 0) {
    return <ColorBackground index={index}>{colors[index]}</ColorBackground>;
  } else {
    return (
      <div style={{ position: 'absolute', zIndex: collection.value, top: 0 }}>
        <Card data={collection[collection.length - 1]} />
      </div>
    );
  }
}
