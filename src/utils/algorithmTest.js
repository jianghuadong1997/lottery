import { checkWinning } from './winningDetection';

/**
 * 测试中奖检测算法
 */
export const testWinningAlgorithm = () => {
  console.log('🧪 开始测试中奖检测算法...');
  
  // 测试数据
  const testGroups = [
    { id: 'group1', numbers: [1, 3, 2, 8, 4, 9] }, // 应该中奖（包含1,2,3,4）
    { id: 'group2', numbers: [5, 6, 7, 8, 9, 0] }, // 不应该中奖（不包含1,2,3,4中的所有）
    { id: 'group3', numbers: [1, 2, 3, 4, 5, 6] }, // 应该中奖（直接包含1,2,3,4）
    { id: 'group4', numbers: [4, 3, 2, 1, 0, 7] }, // 应该中奖（包含1,2,3,4，顺序不同）
    { id: 'group5', numbers: [1, 2, 3, 5, 6, 7] }, // 不应该中奖（缺少4）
  ];
  
  const drawNumbers = [1, 2, 3, 4, 5, 6]; // 开奖号码
  
  console.log('📋 测试数据:');
  console.log('开奖号码:', drawNumbers);
  console.log('追号组:');
  testGroups.forEach(group => {
    console.log(`  ${group.id}: [${group.numbers.join(', ')}]`);
  });
  
  console.log('\n🔍 执行检测...');
  const winningGroups = checkWinning(drawNumbers, testGroups);
  
  console.log('\n✅ 检测结果:');
  console.log('中奖组数:', winningGroups.length);
  winningGroups.forEach(group => {
    console.log(`  ✨ ${group.id}: [${group.numbers.join(', ')}]`);
  });
  
  // 验证期望结果
  const expectedWinningIds = ['group1', 'group3', 'group4'];
  const actualWinningIds = winningGroups.map(g => g.id);
  
  console.log('\n🎯 验证结果:');
  console.log('期望中奖:', expectedWinningIds);
  console.log('实际中奖:', actualWinningIds);
  
  const isCorrect = expectedWinningIds.every(id => actualWinningIds.includes(id)) && 
                   actualWinningIds.every(id => expectedWinningIds.includes(id));
  
  if (isCorrect) {
    console.log('🎉 算法测试通过！');
  } else {
    console.log('❌ 算法测试失败！');
  }
  
  return {
    passed: isCorrect,
    expected: expectedWinningIds,
    actual: actualWinningIds,
    winningGroups
  };
};

/**
 * 在控制台运行测试
 */
export const runTest = () => {
  if (typeof window !== 'undefined') {
    // 浏览器环境
    window.testWinning = testWinningAlgorithm;
    console.log('💡 在控制台输入 testWinning() 来运行算法测试');
  }
}; 