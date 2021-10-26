import styled from "styled-components";
import { router } from "./router";
import Card from './component/card';
import { Link } from "react-router-dom";

const GameListWrapper = styled.div`
  min-height: 100vh;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GameListContainer = styled.div`
  @media (min-width: 1180px) {
    width: 1180px;
    padding: 0;
  }
  width: 100vw;
  padding: 0 1rem;
  box-sizing: border-box;
`;
const Cards = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Title = styled.h1`
  margin: 0;
  padding: 1rem 0;
`;

function GameList() {
  return (
    <GameListWrapper>
      <GameListContainer>
        <Title>- Game List</Title>
        <Cards>
          {router.map((item) => (
            <Link to={item.link} key={item.title} style={{ textDecoration: 'none' }}>
              <Card>{item.title}</Card>
            </Link>
          ))}
        </Cards>
      </GameListContainer>
    </GameListWrapper>
  );
}

export default GameList;
