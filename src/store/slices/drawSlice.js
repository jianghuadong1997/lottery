import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage } from '../../utils/localStorage';
import { checkWinning } from '../../utils/winningDetection';

const initialState = {
  currentDraw: [],
  drawHistory: loadFromStorage('drawHistory', []),
  lastCheckResult: {
    winningGroups: [],
    checkedAt: null,
    drawNumbers: [],
  },
  isChecking: false,
};

const drawSlice = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    setCurrentDraw: (state, action) => {
      state.currentDraw = action.payload;
    },
    
    clearCurrentDraw: (state) => {
      state.currentDraw = [];
    },
    
    addDrawResult: (state, action) => {
      const newDraw = {
        period: state.drawHistory.length + 1,
        winningNumbers: action.payload.numbers,
        timestamp: Date.now(),
        winningGroups: action.payload.winningGroups || [],
      };
      state.drawHistory.push(newDraw);
      saveToStorage('drawHistory', state.drawHistory);
    },
    
    setCheckResult: (state, action) => {
      state.lastCheckResult = {
        winningGroups: action.payload.winningGroups,
        checkedAt: Date.now(),
        drawNumbers: action.payload.drawNumbers,
      };
    },
    
    setChecking: (state, action) => {
      state.isChecking = action.payload;
    },
    
    clearDrawHistory: (state) => {
      state.drawHistory = [];
      saveToStorage('drawHistory', []);
    },
    
    loadDrawHistory: (state) => {
      state.drawHistory = loadFromStorage('drawHistory', []);
    },
  },
});

// Thunk action for checking winning numbers
export const checkWinningNumbers = (drawNumbers, groups) => (dispatch) => {
  dispatch(setChecking(true));
  
  // 模拟异步检测过程
  setTimeout(() => {
    const winningGroups = checkWinning(drawNumbers, groups);
    
    dispatch(setCheckResult({
      winningGroups: winningGroups, // 保存完整的中奖组数据
      drawNumbers,
    }));
    
    dispatch(addDrawResult({
      numbers: drawNumbers,
      winningGroups: winningGroups.map(group => group.id), // 历史记录只保存ID
    }));
    
    dispatch(setChecking(false));
  }, 1000);
};

export const {
  setCurrentDraw,
  clearCurrentDraw,
  addDrawResult,
  setCheckResult,
  setChecking,
  clearDrawHistory,
  loadDrawHistory,
} = drawSlice.actions;

export default drawSlice.reducer; 