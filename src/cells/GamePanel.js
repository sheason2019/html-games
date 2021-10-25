import React from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components"
import Column from "./Column";

const ColumnContainer = styled.div`
  display: flex;
  margin-top: 2rem;

  @media (max-width: 960px) {
    transform: scale(0.5);
    margin-top: -2rem;
    transform-origin: 50% 0;
  }
`;

export default function GamePanel() {
  const columns = useSelector(state => state.cells.columns);
  return (
    <ColumnContainer>
    {
      columns.map((column, index) => <Column key={index} index={index} />)
    }
    </ColumnContainer>
  )
}