import styled from "styled-components";

const HeaderContainer = styled.div`
  background: rgba(0,0,0, 0.5);
  height: 4rem;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 10;
  color: #FFF;
  display: flex;
  align-items: center;
  @media (max-width: 960px) {
    display: none;
  }
`;
const Title = styled.div`
  font-size: 2rem;
  font-family: '微软雅黑';
  padding-left: 1rem;
  user-select: none;
`;
const MenuButton = styled.div`
  width: 3rem;
  height: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  user-select: none;
  border-radius: 4px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
    cursor: pointer;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <MenuButton>Menu</MenuButton>
      <Title>空当接龙</Title>
    </HeaderContainer>
  )
}

export default Header;
