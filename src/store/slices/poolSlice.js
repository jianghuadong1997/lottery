import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadFromStorage, saveToStorage } from '../../utils/localStorage';

const initialState = {
  groups: loadFromStorage('numberGroups', []),
  selectedGroups: [],
};

const poolSlice = createSlice({
  name: 'pool',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      const newGroup = {
        id: uuidv4(),
        numbers: action.payload.numbers,
        createdAt: Date.now(),
        periodsWithoutWin: 0,
        lastWinPeriod: null,
      };
      state.groups.push(newGroup);
      saveToStorage('numberGroups', state.groups);
    },
    
    removeGroup: (state, action) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
      state.selectedGroups = state.selectedGroups.filter(id => id !== action.payload);
      saveToStorage('numberGroups', state.groups);
    },
    
    removeSelectedGroups: (state) => {
      state.groups = state.groups.filter(group => !state.selectedGroups.includes(group.id));
      state.selectedGroups = [];
      saveToStorage('numberGroups', state.groups);
    },
    
    updateGroup: (state, action) => {
      const { id, numbers } = action.payload;
      const group = state.groups.find(g => g.id === id);
      if (group) {
        group.numbers = numbers;
        saveToStorage('numberGroups', state.groups);
      }
    },
    
    incrementPeriodsWithoutWin: (state, action) => {
      const winningGroupIds = action.payload || [];
      state.groups.forEach(group => {
        if (winningGroupIds.includes(group.id)) {
          // 中奖的组重置计数器
          group.periodsWithoutWin = 0;
          group.lastWinPeriod = Date.now();
        } else {
          // 未中奖的组增加计数器
          group.periodsWithoutWin += 1;
        }
      });
      saveToStorage('numberGroups', state.groups);
    },
    
    toggleGroupSelection: (state, action) => {
      const groupId = action.payload;
      if (state.selectedGroups.includes(groupId)) {
        state.selectedGroups = state.selectedGroups.filter(id => id !== groupId);
      } else {
        state.selectedGroups.push(groupId);
      }
    },
    
    clearSelection: (state) => {
      state.selectedGroups = [];
    },
    
    loadGroups: (state) => {
      state.groups = loadFromStorage('numberGroups', []);
    },
  },
});

export const {
  addGroup,
  removeGroup,
  removeSelectedGroups,
  updateGroup,
  incrementPeriodsWithoutWin,
  toggleGroupSelection,
  clearSelection,
  loadGroups,
} = poolSlice.actions;

export default poolSlice.reducer; 