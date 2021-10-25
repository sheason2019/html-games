import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setStatus } from './cellsSlice';

const HelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  flex-grow: 1;
`;
const HelpItem = styled.div`
  padding: 1.5rem;
  width: 35rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #000;
  margin: 0.5rem 0;
  border-radius: 4px;
  color: white;
  user-select: none;
  p {
    margin: 0;
  }
`;

function Help() {
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(setStatus('index'));
  };
  return (
    <HelpContainer onClick={handleBack}>
      <HelpItem>
        <h3 style={{ textAlign: 'center' }}>帮助&amp;介绍</h3>
        <h4>游戏目标</h4>
        <p>在四个回收单元中各创建一叠牌，每叠 13 张，且花色相同。每叠牌必须按从小 (A) 到大 (K) 的顺序排列。</p>
        <h4>如何玩牌</h4>
        <p>空当接龙仅使用一副牌玩，共 52 张，牌的正面朝上，排成八列。通过从这八列中移牌来创建四叠牌：</p>
        <p>左上角是四个“可用单元”，移牌时可以在其中临时放牌。</p>
        <p>右上角是四个“回收单元”，在其中构建获胜所需的牌叠。</p>
        <h4>具体玩法</h4>
        <p>从每列底部拖牌，并按以下方式移动：</p>
        <p>从列到可用单元。每个可用单元一次只能放一张牌。</p>
        <p>从列到列（或从可用单元到列）。在列中必须按降序依次放牌，而且红黑花色交替。</p>
        <p>从列到回收单元。每叠牌必须由同一花色组成，并从 A 开始。</p>
        <p>每一列中只能移动最下面的牌，被压住的牌是不能直接移动的。左上的中转单元中的牌都可以移动。</p>
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>*点击背景任意位置返回菜单*</p>
      </HelpItem>
    </HelpContainer>
  )
}

export default Help;