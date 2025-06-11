import React, { useState, useMemo } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { theme } from '../styles/theme';
import { bounceIn, pulse, glow } from '../styles/GlobalStyle';
import { formatNumbers } from '../utils/winningDetection';

const CardContainer = styled.div`
  position: relative;
  background: ${theme.effects.glass};
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing.lg};
  transition: ${theme.animations.transition};
  cursor: pointer;
  overflow: hidden;
  
  ${props => props.status === 'warning' && css`
    border-color: ${theme.colors.warning.main};
    background: rgba(250, 112, 154, 0.1);
    animation: ${css`${pulse}`} 2s ease-in-out infinite;
  `}
  
  ${props => props.status === 'danger' && css`
    border-color: ${theme.colors.danger.main};
    background: rgba(255, 107, 107, 0.2);
    animation: ${css`${glow}`} 1s ease-in-out infinite;
    box-shadow: 
      0 0 20px rgba(255, 107, 107, 0.5),
      0 0 40px rgba(255, 107, 107, 0.3),
      inset 0 0 20px rgba(255, 107, 107, 0.1);
    transform: scale(1.02);
    
    &::after {
      content: '⚠️';
      position: absolute;
      top: ${theme.spacing.xs};
      right: ${theme.spacing.xs};
      font-size: ${theme.fontSize.lg};
      animation: ${css`${pulse}`} 0.8s ease-in-out infinite;
    }
  `}
  
  ${props => props.status === 'success' && css`
    border-color: ${theme.colors.success.main};
    background: rgba(79, 172, 254, 0.1);
  `}
  
  ${props => props.isSelected && css`
    border-color: ${theme.colors.primary.main};
    background: rgba(102, 126, 234, 0.15);
    transform: scale(1.02);
    box-shadow: ${theme.shadows.colorful};
  `}
  
  &:hover {
    transform: translateY(-4px) ${props => props.isSelected ? 'scale(1.02)' : 'scale(1.01)'};
    box-shadow: ${theme.shadows.large};
    border-color: ${theme.colors.primary.light};
  }
  
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
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  animation: ${css`${bounceIn}`} 0.6s ease-out;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: ${theme.borderRadius.round};
  position: relative;
  
  ${props => props.status === 'normal' && css`
    background: ${theme.colors.success.gradient};
  `}
  
  ${props => props.status === 'warning' && css`
    background: ${theme.colors.warning.gradient};
    animation: ${css`${pulse}`} 1.5s ease-in-out infinite;
  `}
  
  ${props => props.status === 'danger' && css`
    background: ${theme.colors.danger.gradient};
    animation: ${css`${glow}`} 1s ease-in-out infinite;
    box-shadow: 0 0 10px ${theme.colors.danger.main};
  `}
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: ${theme.borderRadius.round};
    background: ${props => 
      props.status === 'normal' ? theme.colors.success.gradient :
      props.status === 'warning' ? theme.colors.warning.gradient :
      theme.colors.danger.gradient
    };
    opacity: 0.3;
    z-index: -1;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.animations.transition};
  cursor: pointer;
  font-size: ${theme.fontSize.sm};
  
  &.delete {
    background: ${theme.colors.danger.gradient};
    color: #ffffff;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
    }
  }
  
  &.edit {
    background: ${theme.colors.secondary.gradient};
    color: #ffffff;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(240, 147, 251, 0.4);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const NumbersDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${theme.spacing.sm};
  margin: ${theme.spacing.md} 0;
`;

const NumberBall = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${theme.fontSize.base};
  color: #ffffff;
  position: relative;
  
  background: ${props => {
    const num = parseInt(props.number);
    if (num >= 0 && num <= 2) return theme.colors.primary.gradient;
    if (num >= 3 && num <= 5) return theme.colors.success.gradient;
    if (num >= 6 && num <= 8) return theme.colors.warning.gradient;
    return theme.colors.secondary.gradient;
  }};
  
  box-shadow: ${theme.shadows.medium};
  transition: ${theme.animations.transition};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: ${theme.shadows.large};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: ${theme.borderRadius.round};
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 32px;
    height: 32px;
    font-size: ${theme.fontSize.sm};
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const InfoText = styled.span`
  font-size: ${theme.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
  
  &.highlight {
    color: ${props => 
      props.status === 'warning' ? theme.colors.warning.main :
      props.status === 'danger' ? theme.colors.danger.main :
      theme.colors.success.main
    };
    font-weight: 600;
  }
`;

const CheckboxContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
`;

const Checkbox = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  
  &:checked + label {
    background: ${theme.colors.primary.gradient};
    border-color: ${theme.colors.primary.main};
    
    &::after {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const CheckboxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.small};
  background: transparent;
  cursor: pointer;
  transition: ${theme.animations.transition};
  
  &::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    color: #ffffff;
    font-size: ${theme.fontSize.xs};
    font-weight: 700;
    opacity: 0;
    transition: ${theme.animations.transition};
  }
  
  &:hover {
    border-color: ${theme.colors.primary.main};
  }
`;

const NumberCard = ({ 
  group, 
  onDelete, 
  onEdit, 
  onToggleSelection, 
  isSelected = false,
  warningThreshold = 7,
  maxPeriods = 10 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 确定卡片状态
  const cardStatus = useMemo(() => {
    const periods = group.periodsWithoutWin || 0;
    if (periods >= maxPeriods) return 'danger';
    if (periods >= warningThreshold) return 'warning';
    return 'normal';
  }, [group.periodsWithoutWin, warningThreshold, maxPeriods]);
  
  // 格式化创建时间
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // 获取状态文本
  const getStatusText = () => {
    const periods = group.periodsWithoutWin || 0;
    if (periods === 0) return '等待检测';
    if (cardStatus === 'danger') return `超期 ${periods} 期！`;
    if (cardStatus === 'warning') return `${periods} 期未中`;
    return `${periods} 期未中`;
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CardContainer
        status={cardStatus}
        isSelected={isSelected}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onToggleSelection && onToggleSelection(group.id)}
      >
        <CardHeader>
          <CardTitle>
            <StatusIndicator status={cardStatus} />
            号码组 #{group.id.slice(-6)}
          </CardTitle>
          
          <ActionButtons>
            {onEdit && (
              <ActionButton
                className="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(group);
                }}
                title="编辑"
              >
                ✏️
              </ActionButton>
            )}
            
            {onDelete && (
              <ActionButton
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(group.id);
                }}
                title="删除"
              >
                🗑️
              </ActionButton>
            )}
          </ActionButtons>
        </CardHeader>
        
        <NumbersDisplay>
          {group.numbers.map((number, index) => (
            <NumberBall key={index} number={number}>
              {number}
            </NumberBall>
          ))}
        </NumbersDisplay>
        
        <CardFooter>
          <div>
            <InfoText>创建: {formatDate(group.createdAt)}</InfoText>
            <br />
            <InfoText 
              className={cardStatus !== 'normal' ? 'highlight' : ''} 
              status={cardStatus}
            >
              {getStatusText()}
            </InfoText>
          </div>
          
          {onToggleSelection && (
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleSelection(group.id);
                }}
                id={`checkbox-${group.id}`}
              />
              <CheckboxLabel htmlFor={`checkbox-${group.id}`} />
            </CheckboxContainer>
          )}
        </CardFooter>
      </CardContainer>
    </ThemeProvider>
  );
};

export default NumberCard;