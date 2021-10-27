import Cells from "../cells";
import Header from "../layout/Header";
import TowerDefense from "../tower-defense";

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
  }
]