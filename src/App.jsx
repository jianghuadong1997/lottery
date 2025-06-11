import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { runTest } from './utils/algorithmTest';

// Redux actions
import { addGroup, removeGroup, removeSelectedGroups, toggleGroupSelection, clearSelection, incrementPeriodsWithoutWin, loadGroups } from './store/slices/poolSlice';
import { checkWinningNumbers } from './store/slices/drawSlice';
import { loadSettings, updateSettings, lockPool } from './store/slices/settingsSlice';
import { checkWinning } from './utils/winningDetection';

// Components
import NumberInput from './components/NumberInput';
import PoolList from './components/PoolList';
import DrawInput from './components/DrawInput';
import SettingsPanel from './components/SettingsPanel';
import WarningNotification from './components/WarningNotification';
import UIControlPanel from './components/UIControlPanel';
import PasswordProtection from './components/PasswordProtection';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(107, 114, 128, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(75, 85, 99, 0.06) 0%, transparent 50%);
    z-index: -1;
    animation: backgroundFloat 20s ease-in-out infinite;
  }
  
  @keyframes backgroundFloat {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  position: relative;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  position: relative;
`;

const MainTitle = styled.h1`
  font-size: ${theme.fontSize['4xl']};
  font-weight: 800;
  background: linear-gradient(
    135deg,
    #9ca3af 0%,
    #6b7280 50%,
    #a78bfa 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${theme.spacing.md} 0;
  animation: gradientShift 4s ease-in-out infinite;
  
  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSize['3xl']};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSize['2xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSize.lg};
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 400;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSize.base};
  }
`;

const MainContent = styled.main`
  display: flex;
  gap: ${theme.spacing.xl};
  min-height: calc(100vh - 200px);
  
  @media (max-width: ${theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
  }
`;

const LeftPanel = styled.aside`
  flex: 0 0 450px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    flex: none;
    order: 2;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex: none;
  }
`;

const RightPanel = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
  min-width: 0; /* 防止flex子项溢出 */
  
  @media (max-width: ${theme.breakpoints.lg}) {
    order: 1;
  }
`;

const Section = styled.section`
  position: relative;
`;

const FloatingElements = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  
  &::before {
    content: '✨';
    position: absolute;
    top: 10%;
    left: 10%;
    font-size: 2rem;
    animation: float 6s ease-in-out infinite;
  }
  
  &::after {
    content: '🎯';
    position: absolute;
    top: 20%;
    right: 15%;
    font-size: 1.5rem;
    animation: float 8s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px) rotate(10deg);
      opacity: 1;
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  
  // Redux state
  const { groups, selectedGroups } = useSelector(state => state.pool);
  const { isChecking, lastCheckResult, drawHistory } = useSelector(state => state.draw);
  const { maxPeriodsWithoutWin, warningPeriodsThreshold, soundEnabled, showPeriodsSettings, showPoolSection, isPoolUnlocked } = useSelector(state => state.settings);
  
  // Warning notification state
  const [showWarningNotification, setShowWarningNotification] = useState(false);
  
  // Load data on app start
  useEffect(() => {
    dispatch(loadGroups());
    dispatch(loadSettings());
    // 在开发环境下启用算法测试
    if (process.env.NODE_ENV === 'development') {
      runTest();
    }
  }, [dispatch]);
  
  // Handle adding new number group
  const handleAddNumbers = (numbers) => {
    dispatch(addGroup({ numbers }));
  };
  
  // Handle deleting a single group
  const handleDeleteGroup = (groupId) => {
    dispatch(removeGroup(groupId));
  };
  
  // Handle deleting selected groups
  const handleDeleteSelected = () => {
    dispatch(removeSelectedGroups());
  };
  
  // Handle group selection
  const handleToggleSelection = (groupId) => {
    dispatch(toggleGroupSelection(groupId));
  };
  
  // Handle clear selection
  const handleClearSelection = () => {
    dispatch(clearSelection());
  };
  
  // Handle select all
  const handleSelectAll = (groupIds) => {
    // Clear current selection first, then select the provided IDs
    dispatch(clearSelection());
    groupIds.forEach(id => dispatch(toggleGroupSelection(id)));
  };
  
  // Handle drawing check
  const handleCheckDrawing = (drawNumbers) => {
    // 先计算中奖组，然后传递给Redux
    const winningGroups = checkWinning(drawNumbers, groups);
    const winningGroupIds = winningGroups.map(group => group.id);
    
    dispatch(checkWinningNumbers(drawNumbers, groups));
    
    // Update periods without win for all groups
    setTimeout(() => {
      dispatch(incrementPeriodsWithoutWin(winningGroupIds));
    }, 1500);
  };
  
  // Handle editing a group (placeholder for now)
  const handleEditGroup = (group) => {
    console.log('Edit group:', group);
    // TODO: Implement group editing functionality
  };
  
  // Handle settings update
  const handleUpdateSettings = (settings) => {
    dispatch(updateSettings(settings));
  };

  // Handle lock pool
  const handleLockPool = () => {
    dispatch(lockPool());
  };
  
  // Calculate warning and danger groups
  const { warningGroups, dangerGroups } = useMemo(() => {
    const warning = groups.filter(group => 
      group.periodsWithoutWin >= warningPeriodsThreshold && 
      group.periodsWithoutWin < maxPeriodsWithoutWin
    );
    const danger = groups.filter(group => 
      group.periodsWithoutWin >= maxPeriodsWithoutWin
    );
    return { warningGroups: warning, dangerGroups: danger };
  }, [groups, warningPeriodsThreshold, maxPeriodsWithoutWin]);
  
  // Show warning notification when there are warning/danger groups
  useEffect(() => {
    if (warningGroups.length > 0 || dangerGroups.length > 0) {
      setShowWarningNotification(true);
    }
  }, [warningGroups.length, dangerGroups.length]);
  
  // Handle warning notification close
  const handleCloseWarningNotification = () => {
    setShowWarningNotification(false);
  };
  
  // Handle group click from warning notification
  const handleWarningGroupClick = (group) => {
    // 可以实现跳转到对应号码组的逻辑
    console.log('点击警告号码组:', group);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <FloatingElements />
        
        <Container>
          <Header>
            <MainTitle>🎲 彩票追号管理系统</MainTitle>
            <Subtitle>智能追号 · 中奖检测 · 数据分析</Subtitle>
          </Header>
          
          <MainContent>
            <LeftPanel>
              {!isPoolUnlocked ? (
                <PasswordProtection />
              ) : (
                <PoolList
                  groups={groups}
                  selectedGroups={selectedGroups}
                  onToggleSelection={handleToggleSelection}
                  onClearSelection={handleClearSelection}
                  onSelectAll={handleSelectAll}
                  onDeleteSelected={handleDeleteSelected}
                  onDeleteGroup={handleDeleteGroup}
                  onEditGroup={handleEditGroup}
                  onLockPool={handleLockPool}
                  warningThreshold={warningPeriodsThreshold}
                  maxPeriods={maxPeriodsWithoutWin}
                />
              )}
            </LeftPanel>
            
            <RightPanel>
              {showPeriodsSettings && (
                <Section>
                  <SettingsPanel
                    maxPeriodsWithoutWin={maxPeriodsWithoutWin}
                    warningPeriodsThreshold={warningPeriodsThreshold}
                    onUpdateSettings={handleUpdateSettings}
                  />
                </Section>
              )}
              
              {showPoolSection && (
                <Section>
                  <NumberInput 
                    onAddNumbers={handleAddNumbers}
                    existingGroups={groups}
                  />
                </Section>
              )}
              
              <Section>
                <DrawInput
                  onCheckDrawing={handleCheckDrawing}
                  isChecking={isChecking}
                  lastCheckResult={lastCheckResult}
                  drawHistory={drawHistory}
                />
              </Section>
            </RightPanel>
          </MainContent>
        </Container>
        
        {/* UI控制面板 */}
        <UIControlPanel />
        
        {/* 警告通知 */}
        {showWarningNotification && (
          <WarningNotification
            warningGroups={warningGroups}
            dangerGroups={dangerGroups}
            soundEnabled={soundEnabled}
            onClose={handleCloseWarningNotification}
            onGroupClick={handleWarningGroupClick}
          />
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 