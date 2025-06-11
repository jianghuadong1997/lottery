/**
 * 保存数据到本地存储
 * @param {string} key - 存储键名
 * @param {any} data - 要存储的数据
 * @returns {boolean} - 是否保存成功
 */
export const saveToStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error('保存到本地存储失败:', error);
    return false;
  }
};

/**
 * 从本地存储加载数据
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 * @returns {any} - 加载的数据或默认值
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('从本地存储加载失败:', error);
    return defaultValue;
  }
};

/**
 * 删除本地存储中的指定数据
 * @param {string} key - 存储键名
 * @returns {boolean} - 是否删除成功
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('删除本地存储数据失败:', error);
    return false;
  }
};

/**
 * 清空所有本地存储数据
 * @returns {boolean} - 是否清空成功
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('清空本地存储失败:', error);
    return false;
  }
};

/**
 * 检查本地存储是否可用
 * @returns {boolean} - 是否可用
 */
export const isStorageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 获取本地存储的使用情况
 * @returns {Object} - 存储使用情况信息
 */
export const getStorageInfo = () => {
  try {
    let totalSize = 0;
    const keys = [];
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage[key];
        totalSize += key.length + value.length;
        keys.push(key);
      }
    }
    
    return {
      totalSize: totalSize,
      totalKeys: keys.length,
      keys: keys,
      formattedSize: formatBytes(totalSize),
    };
  } catch (error) {
    console.error('获取存储信息失败:', error);
    return {
      totalSize: 0,
      totalKeys: 0,
      keys: [],
      formattedSize: '0 B',
    };
  }
};

/**
 * 格式化字节大小
 * @param {number} bytes - 字节数
 * @returns {string} - 格式化后的大小
 */
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 导出所有数据为JSON
 * @returns {Object} - 所有存储的数据
 */
export const exportAllData = () => {
  try {
    const data = {};
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        data[key] = JSON.parse(localStorage[key]);
      }
    }
    return data;
  } catch (error) {
    console.error('导出数据失败:', error);
    return {};
  }
};

/**
 * 导入数据到本地存储
 * @param {Object} data - 要导入的数据
 * @returns {boolean} - 是否导入成功
 */
export const importAllData = (data) => {
  try {
    for (let key in data) {
      saveToStorage(key, data[key]);
    }
    return true;
  } catch (error) {
    console.error('导入数据失败:', error);
    return false;
  }
};

/**
 * 备份特定的应用数据
 * @returns {Object} - 应用数据备份
 */
export const backupAppData = () => {
  const appKeys = [
    'numberGroups',
    'drawHistory',
    'maxPeriodsWithoutWin',
    'warningPeriodsThreshold',
    'soundEnabled',
    'theme',
    'autoSave'
  ];
  
  const backup = {
    version: '1.0.0',
    timestamp: Date.now(),
    data: {}
  };
  
  appKeys.forEach(key => {
    const value = loadFromStorage(key);
    if (value !== null) {
      backup.data[key] = value;
    }
  });
  
  return backup;
};

/**
 * 恢复应用数据
 * @param {Object} backup - 备份数据
 * @returns {boolean} - 是否恢复成功
 */
export const restoreAppData = (backup) => {
  try {
    if (!backup || !backup.data) {
      throw new Error('无效的备份数据');
    }
    
    for (let key in backup.data) {
      saveToStorage(key, backup.data[key]);
    }
    
    return true;
  } catch (error) {
    console.error('恢复数据失败:', error);
    return false;
  }
}; 