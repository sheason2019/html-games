import styled from "styled-components";

const FloatActionButton = styled.div`
  position: fixed;
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  top: ${props => props.top};
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  background-color: rgba(0,0,0,0.5);
  border: 2px solid rgba(0,0,0,0.75);
  &:hover {
    background-color: rgba(0,0,0,0.75);
    cursor: pointer;
  }
`;

function FAB(props) {
  return (
    <FloatActionButton {...props}>{props.children}</FloatActionButton>
  )
}

export default FAB;
