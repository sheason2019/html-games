import styled from "styled-components"

const EmptyCard = styled.div`
  width: 8rem;
  height: 10rem;
  margin: 5px;
  border: 1px solid white;
`;

const EmptyContainer = styled.div`
  display: flex;
  padding: 5px;
`;

export default function Empty() {
  return (
    <EmptyContainer>
      <EmptyCard />
      <EmptyCard />
      <EmptyCard />
      <EmptyCard />
    </EmptyContainer>
  )
}