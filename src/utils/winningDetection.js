/**
 * 检测号码组是否包含开奖号码的前4位（不考虑顺序）
 * @param {number[]} winningNumbers - 开奖号码（6位）
 * @param {Object[]} groups - 追号池中的所有号码组
 * @returns {Object[]} - 返回中奖的号码组数组
 */
export const checkWinning = (winningNumbers, groups) => {
  if (!winningNumbers || winningNumbers.length < 4) {
    return [];
  }
  
  if (!groups || groups.length === 0) {
    return [];
  }
  
  // 取开奖号码的前4位作为检测基准
  const targetNumbers = winningNumbers.slice(0, 4);
  const targetSet = new Set(targetNumbers);
  
  // 检测每个号码组
  const winningGroups = groups.filter(group => {
    if (!group.numbers || group.numbers.length !== 6) {
      return false;
    }
    
    const groupSet = new Set(group.numbers);
    
    // 检查是否包含所有目标数字（集合包含关系）
    return targetNumbers.every(num => groupSet.has(num));
  });
  
  return winningGroups;
};

/**
 * 验证单个号码组是否有效
 * @param {number[]} numbers - 号码数组
 * @returns {boolean} - 是否有效
 */
export const validateNumberGroup = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length !== 6) {
    return false;
  }
  
  return numbers.every(num => 
    Number.isInteger(num) && num >= 0 && num <= 9
  );
};

/**
 * 生成随机号码组
 * @returns {number[]} - 6位随机号码
 */
export const generateRandomNumbers = () => {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10));
};

/**
 * 检查号码组是否已存在（避免重复添加）
 * @param {number[]} newNumbers - 新号码组
 * @param {Object[]} existingGroups - 现有号码组
 * @returns {boolean} - 是否已存在
 */
export const isDuplicateGroup = (newNumbers, existingGroups) => {
  if (!validateNumberGroup(newNumbers) || !existingGroups) {
    return false;
  }
  
  const newNumbersStr = newNumbers.join(',');
  
  return existingGroups.some(group => 
    group.numbers && group.numbers.join(',') === newNumbersStr
  );
};

/**
 * 格式化号码显示
 * @param {number[]} numbers - 号码数组
 * @returns {string} - 格式化后的字符串
 */
export const formatNumbers = (numbers) => {
  if (!Array.isArray(numbers)) {
    return '';
  }
  
  return numbers.join(' ');
};

/**
 * 计算中奖统计信息
 * @param {Object[]} groups - 号码组
 * @param {Object[]} drawHistory - 开奖历史
 * @returns {Object} - 统计信息
 */
export const calculateWinningStats = (groups, drawHistory) => {
  const totalGroups = groups.length;
  let totalWins = 0;
  let totalChecks = drawHistory.length;
  
  // 统计总中奖次数
  drawHistory.forEach(draw => {
    if (draw.winningGroups && draw.winningGroups.length > 0) {
      totalWins += draw.winningGroups.length;
    }
  });
  
  // 计算中奖率
  const winRate = totalChecks > 0 ? (totalWins / (totalGroups * totalChecks)) * 100 : 0;
  
  // 计算平均连续未中奖期数
  const avgPeriodsWithoutWin = totalGroups > 0 
    ? groups.reduce((sum, group) => sum + (group.periodsWithoutWin || 0), 0) / totalGroups 
    : 0;
  
  return {
    totalGroups,
    totalWins,
    totalChecks,
    winRate: Math.round(winRate * 100) / 100,
    avgPeriodsWithoutWin: Math.round(avgPeriodsWithoutWin * 100) / 100,
  };
}; 