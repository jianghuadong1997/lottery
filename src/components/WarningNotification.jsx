import React, { useEffect, useState, useCallback } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { theme } from '../styles/theme';
import { bounceIn, pulse, glow, slideInFromRight } from '../styles/GlobalStyle';
import { playWarningSound, playNotificationSound } from '../utils/audioUtils';

const NotificationContainer = styled.div`
  position: fixed;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  z-index: 9999;
  max-width: 400px;
  animation: ${css`${slideInFromRight}`} 0.5s ease-out;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
    left: ${theme.spacing.md};
    max-width: none;
  }
`;

const NotificationCard = styled.div`
  background: ${props => 
    props.severity === 'danger' 
      ? 'rgba(255, 107, 107, 0.95)' 
      : 'rgba(250, 112, 154, 0.95)'
  };
  backdrop-filter: blur(10px);
  border: 1px solid ${props => 
    props.severity === 'danger' 
      ? 'rgba(255, 107, 107, 0.8)' 
      : 'rgba(250, 112, 154, 0.8)'
  };
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.lg};
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    ${props => props.severity === 'danger' 
      ? '0 0 30px rgba(255, 107, 107, 0.5)' 
      : '0 0 20px rgba(250, 112, 154, 0.4)'
    };
  position: relative;
  overflow: hidden;
  
  ${props => props.severity === 'danger' && css`
    animation: ${css`${glow}`} 2s ease-in-out infinite;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => 
      props.severity === 'danger' 
        ? 'linear-gradient(90deg, #ff6b6b, #ff8e8e, #ff6b6b)' 
        : 'linear-gradient(90deg, #fa709a, #ffb6c1, #fa709a)'
    };
    animation: ${css`${pulse}`} 1.5s ease-in-out infinite;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Icon = styled.span`
  font-size: ${theme.fontSize['2xl']};
  animation: ${css`${pulse}`} 1s ease-in-out infinite;
`;

const Title = styled.h4`
  font-size: ${theme.fontSize.lg};
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: ${theme.fontSize.lg};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.small};
  transition: ${theme.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
`;

const Message = styled.p`
  color: #ffffff;
  font-size: ${theme.fontSize.base};
  margin: 0 0 ${theme.spacing.md} 0;
  line-height: 1.5;
`;

const GroupsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const GroupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  transition: ${theme.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateX(5px);
  }
`;

const GroupNumbers = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #ffffff;
`;

const PeriodCount = styled.span`
  font-weight: 700;
  color: #ffffff;
  font-size: ${theme.fontSize.sm};
  background: rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.small};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.medium};
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
  cursor: pointer;
  transition: ${theme.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const WarningNotification = ({ 
  warningGroups = [], 
  dangerGroups = [], 
  soundEnabled = true,
  onClose,
  onGroupClick 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayedSound, setHasPlayedSound] = useState(false);

  const hasWarnings = warningGroups.length > 0 || dangerGroups.length > 0;
  const severity = dangerGroups.length > 0 ? 'danger' : 'warning';
  
  useEffect(() => {
    if (hasWarnings) {
      setIsVisible(true);
      
      // 播放警告音（避免重复播放）
      if (soundEnabled && !hasPlayedSound) {
        if (dangerGroups.length > 0) {
          playWarningSound();
        } else if (warningGroups.length > 0) {
          playNotificationSound();
        }
        setHasPlayedSound(true);
      }
    } else {
      setIsVisible(false);
      setHasPlayedSound(false);
    }
  }, [hasWarnings, soundEnabled, dangerGroups.length, warningGroups.length, hasPlayedSound]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setHasPlayedSound(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleGroupClick = useCallback((group) => {
    if (onGroupClick) {
      onGroupClick(group);
    }
  }, [onGroupClick]);

  if (!isVisible || !hasWarnings) {
    return null;
  }

  const totalGroups = warningGroups.length + dangerGroups.length;
  const displayGroups = [...dangerGroups, ...warningGroups];

  return (
    <ThemeProvider theme={theme}>
      <NotificationContainer>
        <NotificationCard severity={severity}>
          <NotificationHeader>
            <TitleSection>
              <Icon>{severity === 'danger' ? '🚨' : '⚠️'}</Icon>
              <Title>
                {severity === 'danger' ? '严重警告' : '提醒通知'}
              </Title>
            </TitleSection>
            <CloseButton onClick={handleClose}>✕</CloseButton>
          </NotificationHeader>
          
          <Message>
            {severity === 'danger' 
              ? `有 ${totalGroups} 个号码组超过设定期数未中奖，需要关注！`
              : `有 ${totalGroups} 个号码组接近警告阈值，请留意。`
            }
          </Message>
          
          <GroupsList>
            {displayGroups.slice(0, 3).map((group) => (
              <GroupItem 
                key={group.id}
                onClick={() => handleGroupClick(group)}
              >
                <GroupNumbers>
                  {group.numbers.join(' ')}
                </GroupNumbers>
                <PeriodCount>
                  {group.periodsWithoutWin}期
                </PeriodCount>
              </GroupItem>
            ))}
            {displayGroups.length > 3 && (
              <GroupItem>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontStyle: 'italic' }}>
                  还有 {displayGroups.length - 3} 个号码组...
                </span>
              </GroupItem>
            )}
          </GroupsList>
          
          <ActionButtons>
            <ActionButton onClick={handleClose}>
              知道了
            </ActionButton>
          </ActionButtons>
        </NotificationCard>
      </NotificationContainer>
    </ThemeProvider>
  );
};

export default WarningNotification; 