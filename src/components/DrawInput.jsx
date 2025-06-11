import React, { useState, useCallback, useEffect } from 'react';
import styled, { ThemeProvider, keyframes, css } from 'styled-components';
import { theme } from '../styles/theme';
import { bounceIn, glow, pulse, rotate } from '../styles/GlobalStyle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  background: ${theme.effects.glass};
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${theme.shadows.colorful};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent,
      rgba(102, 126, 234, 0.1),
      transparent
    );
    animation: ${css`${rotate}`} 20s linear infinite;
    z-index: -1;
  }
`;

const Title = styled.h2`
  font-size: ${theme.fontSize['2xl']};
  font-weight: 700;
  background: ${theme.colors.secondary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
`;

const TitleIcon = styled.span`
  font-size: ${theme.fontSize['3xl']};
  background: ${theme.colors.secondary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${css`${pulse}`} 2s ease-in-out infinite;
`;

const NumberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.lg} 0;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.sm};
  }
`;

const NumberInputBox = styled.input`
  width: 70px;
  height: 70px;
  border: 3px solid transparent;
  border-radius: ${theme.borderRadius.medium};
  background: ${theme.effects.glass};
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: ${theme.fontSize['2xl']};
  font-weight: 700;
  text-align: center;
  transition: ${theme.animations.transition};
  position: relative;
  
  background-image: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
                    ${theme.colors.secondary.gradient};
  background-origin: border-box;
  background-clip: content-box, border-box;
  
  &:focus {
    border-color: transparent;
    box-shadow: 
      0 0 0 3px rgba(240, 147, 251, 0.3),
      ${theme.shadows.glow};
    transform: scale(1.1);
    animation: ${css`${glow}`} 2s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: ${theme.shadows.large};
  }
  
  &.error {
    border-color: ${theme.colors.danger.main};
    background: rgba(255, 107, 107, 0.2);
    animation: shake 0.5s ease-in-out;
  }
  
  &.success {
    border-color: ${theme.colors.success.main};
    background: rgba(79, 172, 254, 0.2);
    animation: ${css`${bounceIn}`} 0.3s ease-out;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 60px;
    height: 60px;
    font-size: ${theme.fontSize.xl};
  }
`;

const CheckButton = styled.button`
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.large};
  font-weight: 700;
  font-size: ${theme.fontSize.lg};
  color: #ffffff;
  background: ${theme.colors.secondary.gradient};
  position: relative;
  overflow: hidden;
  transition: ${theme.animations.transition};
  cursor: pointer;
  border: 2px solid transparent;
  
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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.8s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 40px rgba(240, 147, 251, 0.5);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
      border-color: transparent;
    }
  }
  
  &.checking {
    animation: ${css`${pulse}`} 1s ease-in-out infinite;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      border: 2px solid #ffffff;
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: ${css`${rotate}`} 1s linear infinite;
    }
  }
`;

const ResultContainer = styled.div`
  margin-top: ${theme.spacing.lg};
  animation: ${css`${bounceIn}`} 0.6s ease-out;
`;

const ResultCard = styled.div`
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.large};
  background: ${props => 
    props.type === 'success' 
      ? 'rgba(79, 172, 254, 0.15)' 
      : props.type === 'no-win'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 107, 107, 0.15)'
  };
  border: 1px solid ${props => 
    props.type === 'success' 
      ? theme.colors.success.main
      : props.type === 'no-win'
      ? 'rgba(255, 255, 255, 0.2)'
      : theme.colors.danger.main
  };
  box-shadow: ${props => 
    props.type === 'success' 
      ? '0 0 30px rgba(79, 172, 254, 0.3)'
      : props.type === 'no-win'
      ? theme.shadows.medium
      : '0 0 30px rgba(255, 107, 107, 0.3)'
  };
  
  ${props => props.type === 'success' && css`
    animation: ${css`${glow}`} 2s ease-in-out infinite;
  `}
`;

const ResultTitle = styled.h3`
  font-size: ${theme.fontSize.xl};
  font-weight: 700;
  margin: 0 0 ${theme.spacing.md} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  color: ${props => 
    props.type === 'success' 
      ? theme.colors.success.main
      : props.type === 'no-win'
      ? '#ffffff'
      : theme.colors.danger.main
  };
`;

const ResultIcon = styled.span`
  font-size: ${theme.fontSize['2xl']};
  animation: ${props => props.animate ? css`${bounceIn} 0.6s ease-out` : 'none'};
`;

const WinningGroupsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const WinningGroupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: ${theme.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }
`;

const GroupNumbers = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const NumberBall = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${theme.fontSize.sm};
  color: #ffffff;
  background: ${theme.colors.success.gradient};
  box-shadow: ${theme.shadows.small};
`;

const GroupId = styled.span`
  font-size: ${theme.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
`;

const StatsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${theme.fontSize.xl};
  font-weight: 700;
  color: ${props => props.color || '#ffffff'};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.danger.main};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  padding: ${theme.spacing.sm};
  background: rgba(255, 107, 107, 0.1);
  border-radius: ${theme.borderRadius.small};
  border: 1px solid rgba(255, 107, 107, 0.3);
  animation: ${css`${bounceIn}`} 0.3s ease-out;
`;

const DrawInput = ({ 
  onCheckDrawing, 
  isChecking = false, 
  lastCheckResult = null,
  drawHistory = []
}) => {
  const [numbers, setNumbers] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState([false, false, false, false, false, false]);
  const [message, setMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleNumberChange = useCallback((index, value) => {
    if (value === '' || (value.length === 1 && /^[0-9]$/.test(value))) {
      const newNumbers = [...numbers];
      newNumbers[index] = value;
      setNumbers(newNumbers);
      
      const newErrors = [...errors];
      newErrors[index] = false;
      setErrors(newErrors);
      
      if (message) {
        setMessage('');
      }
      
      if (value !== '' && index < 5) {
        const nextInput = document.querySelector(`input[name="draw-${index + 1}"]`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  }, [numbers, errors, message]);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace' && numbers[index] === '' && index > 0) {
      const prevInput = document.querySelector(`input[name="draw-${index - 1}"]`);
      if (prevInput) {
        prevInput.focus();
      }
    }
    
    if (e.key === 'Enter') {
      handleCheck();
    }
  }, [numbers]);

  const validateInput = useCallback(() => {
    const numberArray = numbers.map(n => n === '' ? -1 : parseInt(n));
    const hasEmpty = numberArray.some(n => n === -1);
    
    if (hasEmpty) {
      setMessage('请填写完整的6位开奖号码');
      const newErrors = numbers.map(n => n === '');
      setErrors(newErrors);
      return false;
    }
    
    return true;
  }, [numbers]);

  const handleCheck = useCallback(() => {
    if (!validateInput() || isChecking) {
      return;
    }
    
    const numberArray = numbers.map(n => parseInt(n));
    setShowResult(false);
    onCheckDrawing(numberArray);
  }, [numbers, validateInput, isChecking, onCheckDrawing]);

  const handleClear = useCallback(() => {
    setNumbers(['', '', '', '', '', '']);
    setErrors([false, false, false, false, false, false]);
    setMessage('');
    setShowResult(false);
    
    const firstInput = document.querySelector('input[name="draw-0"]');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  // 当检测结果更新时显示结果
  useEffect(() => {
    if (lastCheckResult && lastCheckResult.checkedAt) {
      setShowResult(true);
    }
  }, [lastCheckResult]);

  const isComplete = numbers.every(n => n !== '');
  const hasWinningGroups = lastCheckResult && lastCheckResult.winningGroups.length > 0;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>
          <TitleIcon>🎯</TitleIcon>
          开奖号码检测
        </Title>
        
        <NumberGrid>
          {numbers.map((number, index) => (
            <NumberInputBox
              key={index}
              name={`draw-${index}`}
              type="text"
              value={number}
              onChange={(e) => handleNumberChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={errors[index] ? 'error' : (number !== '' ? 'success' : '')}
              placeholder="0"
              maxLength={1}
              disabled={isChecking}
            />
          ))}
        </NumberGrid>
        
        <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center' }}>
          <CheckButton
            onClick={handleCheck}
            disabled={!isComplete || isChecking}
            className={isChecking ? 'checking' : ''}
          >
            {isChecking ? '检测中...' : '🔍 开始检测'}
          </CheckButton>
          
          <CheckButton
            onClick={handleClear}
            disabled={isChecking}
            style={{ background: theme.colors.neutral.gray600 }}
          >
            🗑️ 清空
          </CheckButton>
        </div>
        
        {message && (
          <ErrorMessage>{message}</ErrorMessage>
        )}
        
        {showResult && lastCheckResult && (
          <ResultContainer>
            <ResultCard type={hasWinningGroups ? 'success' : 'no-win'}>
              <ResultTitle type={hasWinningGroups ? 'success' : 'no-win'}>
                <ResultIcon animate={hasWinningGroups}>
                  {hasWinningGroups ? '🎉' : '😔'}
                </ResultIcon>
                {hasWinningGroups 
                  ? `恭喜！发现 ${lastCheckResult.winningGroups.length} 个中奖号码组！`
                  : '很遗憾，本期没有中奖号码组'
                }
              </ResultTitle>
              
              {hasWinningGroups && (
                <WinningGroupsList>
                  {lastCheckResult.winningGroups.map((group, index) => {
                    return (
                      <WinningGroupItem key={group.id}>
                        <GroupNumbers>
                          {group.numbers.map((num, idx) => (
                            <NumberBall key={idx}>{num}</NumberBall>
                          ))}
                        </GroupNumbers>
                        <GroupId>组 #{group.id.slice(-6)}</GroupId>
                      </WinningGroupItem>
                    );
                  })}
                </WinningGroupsList>
              )}
              
              <StatsSummary>
                <StatItem>
                  <StatValue color={theme.colors.primary.main}>
                    {lastCheckResult.drawNumbers.join(' ')}
                  </StatValue>
                  <StatLabel>本期开奖号码</StatLabel>
                </StatItem>
                
                <StatItem>
                  <StatValue color={theme.colors.success.main}>
                    {lastCheckResult.winningGroups.length}
                  </StatValue>
                  <StatLabel>中奖组数</StatLabel>
                </StatItem>
                
                <StatItem>
                  <StatValue color={theme.colors.secondary.main}>
                    {drawHistory.length + 1}
                  </StatValue>
                  <StatLabel>检测期数</StatLabel>
                </StatItem>
              </StatsSummary>
            </ResultCard>
          </ResultContainer>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default DrawInput;