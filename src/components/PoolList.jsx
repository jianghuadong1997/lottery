import React, { useState, useMemo, useCallback } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { theme } from '../styles/theme';
import { fadeIn, slideInFromRight } from '../styles/GlobalStyle';
import NumberCard from './NumberCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  animation: ${css`${fadeIn}`} 0.5s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${theme.effects.glass};
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${theme.shadows.medium};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const Title = styled.h2`
  font-size: ${theme.fontSize['2xl']};
  font-weight: 700;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const TitleIcon = styled.span`
  font-size: ${theme.fontSize['3xl']};
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LockButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.round};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.lg};
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: ${theme.animations.transition};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: ${theme.colors.danger.main};
    color: ${theme.colors.danger.main};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: ${theme.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const StatValue = styled.span`
  font-size: ${theme.fontSize.xl};
  font-weight: 700;
  color: ${props => props.color || '#ffffff'};
`;

const StatLabel = styled.span`
  font-size: ${theme.fontSize.xs};
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.pill};
  font-weight: 600;
  font-size: ${theme.fontSize.sm};
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: ${props => props.active ? theme.colors.primary.gradient : 'transparent'};
  transition: ${theme.animations.transition};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? theme.colors.primary.gradient : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${theme.colors.primary.main};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ActionButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.pill};
  font-weight: 600;
  font-size: ${theme.fontSize.sm};
  color: #ffffff;
  position: relative;
  overflow: hidden;
  transition: ${theme.animations.transition};
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.primary {
    background: ${theme.colors.primary.gradient};
    
    &:hover {
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.danger {
    background: ${theme.colors.danger.gradient};
    
    &:hover {
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    }
  }
  
  &.secondary {
    background: ${theme.colors.secondary.gradient};
    
    &:hover {
      box-shadow: 0 8px 25px rgba(240, 147, 251, 0.4);
    }
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['3xl']};
  text-align: center;
  background: ${theme.effects.glass};
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${theme.shadows.medium};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: ${theme.fontSize.xl};
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const EmptyDescription = styled.p`
  font-size: ${theme.fontSize.base};
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  max-width: 400px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
  animation: ${css`${slideInFromRight}`} 0.5s ease-out;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const SelectionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: rgba(102, 126, 234, 0.1);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid rgba(102, 126, 234, 0.3);
  margin-bottom: ${theme.spacing.lg};
  animation: ${css`${fadeIn}`} 0.3s ease-out;
`;

const SelectionText = styled.span`
  color: ${theme.colors.primary.light};
  font-weight: 600;
`;

const SelectionActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const PoolList = ({ 
  groups = [], 
  selectedGroups = [],
  onToggleSelection,
  onClearSelection,
  onSelectAll,
  onDeleteSelected,
  onDeleteGroup,
  onEditGroup,
  onLockPool,
  warningThreshold = 7,
  maxPeriods = 10 
}) => {
  const [filter, setFilter] = useState('all'); // all, normal, warning, danger
  
  // 过滤后的组
  const filteredGroups = useMemo(() => {
    if (filter === 'all') return groups;
    
    return groups.filter(group => {
      const periods = group.periodsWithoutWin || 0;
      
      switch (filter) {
        case 'normal':
          return periods < warningThreshold;
        case 'warning':
          return periods >= warningThreshold && periods < maxPeriods;
        case 'danger':
          return periods >= maxPeriods;
        default:
          return true;
      }
    });
  }, [groups, filter, warningThreshold, maxPeriods]);
  
  // 统计信息
  const stats = useMemo(() => {
    const total = groups.length;
    const normalCount = groups.filter(g => (g.periodsWithoutWin || 0) < warningThreshold).length;
    const warningCount = groups.filter(g => {
      const periods = g.periodsWithoutWin || 0;
      return periods >= warningThreshold && periods < maxPeriods;
    }).length;
    const dangerCount = groups.filter(g => (g.periodsWithoutWin || 0) >= maxPeriods).length;
    const selectedCount = selectedGroups.length;
    
    return {
      total,
      normal: normalCount,
      warning: warningCount,
      danger: dangerCount,
      selected: selectedCount
    };
  }, [groups, selectedGroups, warningThreshold, maxPeriods]);
  
  // 处理全选
  const handleSelectAll = useCallback(() => {
    if (stats.selected === filteredGroups.length) {
      onClearSelection();
    } else {
      onSelectAll(filteredGroups.map(g => g.id));
    }
  }, [stats.selected, filteredGroups, onClearSelection, onSelectAll]);
  
  // 获取过滤按钮文本
  const getFilterText = (filterType) => {
    switch (filterType) {
      case 'all': return `全部 (${stats.total})`;
      case 'normal': return `正常 (${stats.normal})`;
      case 'warning': return `预警 (${stats.warning})`;
      case 'danger': return `超期 (${stats.danger})`;
      default: return filterType;
    }
  };
  
  if (groups.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header>
            <TitleContainer>
              <Title>
                <TitleIcon>🎯</TitleIcon>
                追号池
              </Title>
              <LockButton onClick={onLockPool} title="锁定号码组">
                🔒
              </LockButton>
            </TitleContainer>
          </Header>
          
          <EmptyState>
            <EmptyIcon>🎲</EmptyIcon>
            <EmptyTitle>追号池为空</EmptyTitle>
            <EmptyDescription>
              还没有添加任何号码组。点击上方的"添加号码"按钮开始您的追号之旅！
            </EmptyDescription>
          </EmptyState>
        </Container>
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <TitleContainer>
            <Title>
              <TitleIcon>🎯</TitleIcon>
              追号池
            </Title>
            <LockButton onClick={onLockPool} title="锁定号码组">
              🔒
            </LockButton>
          </TitleContainer>
          
          <StatsContainer>
            <StatItem>
              <StatValue color={theme.colors.neutral.white}>{stats.total}</StatValue>
              <StatLabel>总数</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue color={theme.colors.success.main}>{stats.normal}</StatValue>
              <StatLabel>正常</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue color={theme.colors.warning.main}>{stats.warning}</StatValue>
              <StatLabel>预警</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue color={theme.colors.danger.main}>{stats.danger}</StatValue>
              <StatLabel>超期</StatLabel>
            </StatItem>
          </StatsContainer>
        </Header>
        
        <Controls>
          <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
            {['all', 'normal', 'warning', 'danger'].map(filterType => (
              <FilterButton
                key={filterType}
                active={filter === filterType}
                onClick={() => setFilter(filterType)}
              >
                {getFilterText(filterType)}
              </FilterButton>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
            <ActionButton
              className="primary"
              onClick={handleSelectAll}
            >
              {stats.selected === filteredGroups.length ? '取消全选' : '全选'}
            </ActionButton>
            
            {stats.selected > 0 && (
              <ActionButton
                className="danger"
                onClick={() => onDeleteSelected(selectedGroups)}
              >
                删除选中 ({stats.selected})
              </ActionButton>
            )}
          </div>
        </Controls>
        
        {stats.selected > 0 && (
          <SelectionInfo>
            <SelectionText>
              已选择 {stats.selected} 个号码组
            </SelectionText>
            <SelectionActions>
              <ActionButton
                className="secondary"
                onClick={onClearSelection}
              >
                清除选择
              </ActionButton>
            </SelectionActions>
          </SelectionInfo>
        )}
        
        <GridContainer>
          {filteredGroups.map((group, index) => (
            <NumberCard
              key={group.id}
              group={group}
              isSelected={selectedGroups.includes(group.id)}
              onToggleSelection={onToggleSelection}
              onDelete={onDeleteGroup}
              onEdit={onEditGroup}
              warningThreshold={warningThreshold}
              maxPeriods={maxPeriods}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            />
          ))}
        </GridContainer>
      </Container>
    </ThemeProvider>
  );
};

export default PoolList;