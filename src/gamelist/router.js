import Cells from "../cells";
import Header from "../layout/Header";

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
]