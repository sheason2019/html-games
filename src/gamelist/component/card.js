import styled from "styled-components";

const CardWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: white;
  margin: 0.5rem;
  box-shadow: 0 0 4px 1px lightgray;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  &:hover {
    box-shadow: 0 0 6px 2px lightgray;
    cursor: pointer;
  }
`;

function Card(props) {
  return (
    <CardWrapper {...props} />
  );
}

export default Card;
