import styled from "styled-components";

const CardWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: white;
  box-shadow: 0 0 4px 1px lightgray;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin: 0 0.5rem;
  &:hover {
    box-shadow: 0 0 6px 2px lightgray;
    cursor: pointer;
  }
  @media(max-width: 768px) {
    width: 44vw;
    margin: 0;
  }
`;

function Card(props) {
  return (
    <CardWrapper {...props} />
  );
}

export default Card;
