import { createSlice } from '@reduxjs/toolkit';
import { initCards, initCollections, initColumns, initSlots } from './init';

const getMoveLength = (slots, columns, target) => {
  const slot = slots.filter(item => item === null).length;
  const empty = columns.filter((item, index) => item.length === 0 && index !== target).length;
  return (slot + 1) * 2 ** empty;
};

const initialState = {
  // 耗时
  time: 0,
  // 左上角的插槽 index为 8-11
  slots: initSlots(),
  // 右上角的插槽
  collections: initCollections(),
  // 列
  columns: initColumns(),
  // 选中的栈
  temp: {
    index: -1,
    stack: [],
    type: 'column',
  },
  // 游戏是否开始的标识符
  start: false,
}

export const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    initColumn(state) {
      const cards = initCards();
      const columns = initColumns();
      let index = 0;
      while(cards.length > 0) {
        const cardIndex = Math.floor(Math.random() * cards.length);
        const temp = cards.splice(cardIndex, 1)[0];
        columns[index++].push(temp);
        if (index > 7) {
          index = 0;
        }
      }
      state.columns = columns;
    },
    selectColumn(state, payload) {
      Object.assign(state.temp, payload.payload);
    },
    moveCard(state, payload) {
      const { target, length } = payload.payload;
      const moveableLength = getMoveLength(state.slots, state.columns, target);
      if (state.temp.index === -1) {
        return;
      } else if (length > moveableLength) {
        if (state.columns[target].length !== 0) {
          console.log('超出了可移动的卡片数量');
          return;
        }
      }
      if (state.temp.type === 'column') {
        const stack = [];
        for (let i = 0; i < Math.min(length, moveableLength); i++ ) {
          const item = state.columns[state.temp.index].pop();
          stack.push(item);
        }
        stack.reverse();
        for (let i of stack) {
          state.columns[target].push(i);
        }
        state.temp = { index: -1, stack: [] };
      } else if (state.temp.type === 'slot') {
        state.columns[target].push(state.slots[state.temp.index]);
        state.slots[state.temp.index] = null;
      }
      state.start = true;
    },
    moveToSlot(state, payload) {
      const { target } = payload.payload;
      if (state.temp.stack.length === 0 || state.slots[target] !== null) {
        return;
      } else {
        const item = state.columns[state.temp.index].pop();
        state.slots[target] = item;
        state.temp.index = -1;
        state.temp.stack = [];
        state.start = true;
      }
    },
    moveToCollection(state, payload) {
      const { target } = payload.payload;
      const index = state.temp.index;
      if (state.temp.stack.length === 0) {
        return;
      } else {
        let source;
        let item;
        if (state.temp.type === 'slot') {
          source = state.slots[index];
          item = state.slots[index];
          state.slots[index] = null;
        } else if (state.temp.type === 'column') {
          source = state.columns[index];
          item = source.pop();
        }
        state.collections[target].push(item);
        state.temp = { index: -1, stack: [] };
      }
    },
    setTime(state, payload) {
      state.time = payload.payload;
    },
  }
})

export const { initColumn, selectColumn, moveCard, moveToSlot, moveToCollection, setTime } = cellsSlice.actions;

export default cellsSlice.reducer;
