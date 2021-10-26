import { createSlice } from "@reduxjs/toolkit";
import { initCards, initCollections, initColumns, initSlots } from "./init";

const getMoveLength = (slots, columns, target) => {
  const slot = slots.filter((item) => item === null).length;
  const empty = columns.filter(
    (item, index) => item.length === 0 && index !== target
  ).length;
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
    type: "column",
  },
  // 游戏是否开始的标识符
  start: false,
  // status 游戏状态
  status: "index",
  // 提示信息的数据结构
  message: {
    open: false,
    text: "",
    message_id: 0,
  },
  history: [],
  justCancel: false,
  blockAutoCollection: false,
};

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    initColumn(state) {
      const cards = initCards();
      const columns = initColumns();
      let index = 0;
      while (cards.length > 0) {
        const cardIndex = Math.floor(Math.random() * cards.length);
        const temp = cards.splice(cardIndex, 1)[0];
        columns[index++].push(temp);
        if (index > 7) {
          index = 0;
        }
      }
      state.columns = columns;
      state.history = [];
      state.collections = initCollections();
      state.slots = initSlots();
      state.time = 0;
      state.start = false;
      state.blockAutoCollection = false;
    },
    selectColumn(state, payload) {
      Object.assign(state.temp, payload.payload, { timeStamp: Date.now() });
    },
    moveCard(state, payload) {
      const { target, length } = payload.payload;
      const moveableLength = getMoveLength(state.slots, state.columns, target);
      if (state.temp.index === -1) {
        return;
      } else if (length > moveableLength) {
        if (state.columns[target].length !== 0) {
          state.message.open = true;
          state.message.text = `移动卡牌失败，您试图移动${length}张牌，但现在只能移动${moveableLength}张`;
          state.message.message_id = new Date().getTime();
          return;
        }
      }
      if (state.temp.type === "column") {
        const stack = [];
        for (let i = 0; i < Math.min(length, moveableLength); i++) {
          const item = state.columns[state.temp.index].pop();
          stack.push(item);
        }
        stack.reverse();
        for (let i of stack) {
          state.columns[target].push(i);
        }
        state.temp = { index: -1, stack: [] };
      } else if (state.temp.type === "slot") {
        state.columns[target].push(state.slots[state.temp.index]);
        state.slots[state.temp.index] = null;
      }
      state.start = true;
      state.blockAutoCollection = false;
    },
    moveToSlot(state, payload) {
      const { target } = payload.payload;
      if (state.temp.stack.length === 0 || state.slots[target] !== null) {
        return;
      } else {
        let item;
        if (state.temp.type === 'column') {
          item = state.columns[state.temp.index].pop();
        } else if (state.temp.type === 'slot') {
          item = state.slots[state.temp.index];
          state.slots[state.temp.index] = null;
        } else {
          return;
        }
        state.slots[target] = item;
        state.temp.index = -1;
        state.temp.stack = [];
        state.start = true;
        state.blockAutoCollection = false;
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
        if (state.temp.type === "slot") {
          source = state.slots[index];
          item = state.slots[index];
          state.slots[index] = null;
        } else if (state.temp.type === "column") {
          source = state.columns[index];
          item = source.pop();
        }
        state.collections[target].push(item);
        state.temp = { index: -1, stack: [] };
        state.start = true;
        state.blockAutoCollection = false;
      }
      let isEnd = true;
      state.collections.forEach((item) => {
        if (item.length === 0) {
          return;
        } else if (item[item.length - 1].value !== 12) {
          isEnd = false;
        }
      });
      state.start = !isEnd;
      if (isEnd) {
        state.status = 'end';
        localStorage.setItem('completePatch', parseInt(localStorage.getItem('completePatch')) + 1);
      }
    },
    setTime(state, payload) {
      state.time = payload.payload;
    },
    setMessage(state, payload) {
      Object.assign(state.message, payload.payload);
    },
    setStatus(state, payload) {
      state.status = payload.payload;
    },
    pushIntoHistory(state, payload) {
      if (state.justCancel) {
        state.justCancel = false;
        return;
      }
      if (state.start) {
        state.history.push(payload.payload);
      } else {
        state.history[0] = payload.payload;
      }
    },
    cancelAction(state, payload) {
      if (state.status === 'end') {
        return;
      }
      if (state.history.length > 1) {
        const item = payload.payload;
        state.history.pop();
        state.collections = Object.assign([], item.collections);
        state.columns = Object.assign([], item.columns);
        state.slots = Object.assign([], item.slots);
        state.justCancel = true;
        state.blockAutoCollection = true;
        state.temp = {
          index: -1,
          stack: [],
          type: 'column',
        };
      }
    },
  },
});

export const {
  initColumn,
  selectColumn,
  moveCard,
  moveToSlot,
  moveToCollection,
  setTime,
  setMessage,
  setStatus,
  cancelAction,
  pushIntoHistory,
} = cellsSlice.actions;

export default cellsSlice.reducer;
