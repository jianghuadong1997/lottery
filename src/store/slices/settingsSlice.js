import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage } from '../../utils/localStorage';

const initialState = {
  maxPeriodsWithoutWin: loadFromStorage('maxPeriodsWithoutWin', 10),
  warningPeriodsThreshold: loadFromStorage('warningPeriodsThreshold', 7),
  soundEnabled: loadFromStorage('soundEnabled', true),
  theme: loadFromStorage('theme', 'light'),
  autoSave: loadFromStorage('autoSave', true),
  // UI控制状态
  showPeriodsSettings: loadFromStorage('showPeriodsSettings', true),
  showPoolSection: loadFromStorage('showPoolSection', true),
  // 密码保护状态（固定启用，不可切换）
  isPoolUnlocked: false, // 不持久化，每次启动都需要重新验证
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMaxPeriodsWithoutWin: (state, action) => {
      state.maxPeriodsWithoutWin = action.payload;
      saveToStorage('maxPeriodsWithoutWin', action.payload);
    },
    
    setWarningPeriodsThreshold: (state, action) => {
      state.warningPeriodsThreshold = action.payload;
      saveToStorage('warningPeriodsThreshold', action.payload);
    },
    
    setSoundEnabled: (state, action) => {
      state.soundEnabled = action.payload;
      saveToStorage('soundEnabled', action.payload);
    },
    
    setTheme: (state, action) => {
      state.theme = action.payload;
      saveToStorage('theme', action.payload);
    },
    
    setAutoSave: (state, action) => {
      state.autoSave = action.payload;
      saveToStorage('autoSave', action.payload);
    },
    
    // UI控制actions
    togglePeriodsSettings: (state) => {
      state.showPeriodsSettings = !state.showPeriodsSettings;
      saveToStorage('showPeriodsSettings', state.showPeriodsSettings);
    },
    
    togglePoolSection: (state) => {
      state.showPoolSection = !state.showPoolSection;
      saveToStorage('showPoolSection', state.showPoolSection);
    },
    
    // 密码保护相关actions
    unlockPool: (state) => {
      state.isPoolUnlocked = true;
    },
    
    lockPool: (state) => {
      state.isPoolUnlocked = false;
    },
    
    resetSettings: (state) => {
      state.maxPeriodsWithoutWin = 10;
      state.warningPeriodsThreshold = 7;
      state.soundEnabled = true;
      state.theme = 'light';
      state.autoSave = true;
      state.showPeriodsSettings = true;
      state.showPoolSection = true;
      state.isPoolUnlocked = false;
      
      // 清除本地存储
      saveToStorage('maxPeriodsWithoutWin', 10);
      saveToStorage('warningPeriodsThreshold', 7);
      saveToStorage('soundEnabled', true);
      saveToStorage('theme', 'light');
      saveToStorage('autoSave', true);
      saveToStorage('showPeriodsSettings', true);
      saveToStorage('showPoolSection', true);
    },
    
    loadSettings: (state) => {
      state.maxPeriodsWithoutWin = loadFromStorage('maxPeriodsWithoutWin', 10);
      state.warningPeriodsThreshold = loadFromStorage('warningPeriodsThreshold', 7);
      state.soundEnabled = loadFromStorage('soundEnabled', true);
      state.theme = loadFromStorage('theme', 'light');
      state.autoSave = loadFromStorage('autoSave', true);
      state.showPeriodsSettings = loadFromStorage('showPeriodsSettings', true);
      state.showPoolSection = loadFromStorage('showPoolSection', true);
      state.isPoolUnlocked = false; // 始终从锁定状态开始
    },
    
    updateSettings: (state, action) => {
      const { maxPeriodsWithoutWin, warningPeriodsThreshold, soundEnabled } = action.payload;
      
      if (maxPeriodsWithoutWin !== undefined) {
        state.maxPeriodsWithoutWin = maxPeriodsWithoutWin;
        saveToStorage('maxPeriodsWithoutWin', maxPeriodsWithoutWin);
      }
      if (warningPeriodsThreshold !== undefined) {
        state.warningPeriodsThreshold = warningPeriodsThreshold;
        saveToStorage('warningPeriodsThreshold', warningPeriodsThreshold);
      }
      if (soundEnabled !== undefined) {
        state.soundEnabled = soundEnabled;
        saveToStorage('soundEnabled', soundEnabled);
      }
    },
  },
});

export const {
  setMaxPeriodsWithoutWin,
  setWarningPeriodsThreshold,
  setSoundEnabled,
  setTheme,
  setAutoSave,
  togglePeriodsSettings,
  togglePoolSection,
  unlockPool,
  lockPool,
  resetSettings,
  loadSettings,
  updateSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer; 