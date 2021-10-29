import Cells from "../cells";
import Header from "../layout/Header";
import TowerDefense from "../tower-defense";
import RussiaCube from "../russia-cube";

export const router = [
  {
    title: '空当接龙',
    link: '/cells',
    component: (
      <>
        <Header />
        <Cells />
      </>
    )
  },
  {
    title: '塔防游戏',
    link: '/towerdefense',
    component: (
      <TowerDefense />
    ),
  },
  {
    title: '俄罗斯方块',
    link: '/russia-cube',
    component: (
      <RussiaCube />
    ),
  },
]