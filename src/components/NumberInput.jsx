import React, { useState, useCallback, useEffect } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { theme } from '../styles/theme';
import { bounceIn, glow } from '../styles/GlobalStyle';
import { validateNumberGroup, generateRandomNumbers, isDuplicateGroup } from '../utils/winningDetection';

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
`;

const Title = styled.h2`
  font-size: ${theme.fontSize['2xl']};
  font-weight: 700;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  animation: ${css`${glow}`} 3s ease-in-out infinite;
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
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: ${theme.borderRadius.medium};
  background: ${theme.effects.glass};
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: ${theme.fontSize.xl};
  font-weight: 700;
  text-align: center;
  transition: ${theme.animations.transition};
  position: relative;
  
  &:focus {
    border-color: ${theme.colors.primary.main};
    box-shadow: 
      0 0 0 3px rgba(102, 126, 234, 0.3),
      ${theme.shadows.glow};
    transform: scale(1.05);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
    transform: translateY(-2px);
  }
  
  &.error {
    border-color: ${theme.colors.danger.main};
    background: rgba(255, 107, 107, 0.1);
    animation: shake 0.5s ease-in-out;
  }
  
  &.success {
    border-color: ${theme.colors.success.main};
    background: rgba(79, 172, 254, 0.1);
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 50px;
    height: 50px;
    font-size: ${theme.fontSize.lg};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.pill};
  font-weight: 600;
  font-size: ${theme.fontSize.base};
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
    box-shadow: ${theme.shadows.large};
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
  
  &.secondary {
    background: ${theme.colors.secondary.gradient};
    
    &:hover {
      box-shadow: 0 8px 25px rgba(240, 147, 251, 0.4);
    }
  }
  
  &.success {
    background: ${theme.colors.success.gradient};
    
    &:hover {
      box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
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

const SuccessMessage = styled.div`
  color: ${theme.colors.success.main};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  padding: ${theme.spacing.sm};
  background: rgba(79, 172, 254, 0.1);
  border-radius: ${theme.borderRadius.small};
  border: 1px solid rgba(79, 172, 254, 0.3);
  animation: ${css`${bounceIn}`} 0.3s ease-out;
`;

const NumberInput = ({ onAddNumbers, existingGroups = [] }) => {
  const [numbers, setNumbers] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState([false, false, false, false, false, false]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' | 'success'

  const handleNumberChange = useCallback((index, value) => {
    // 只允许数字0-9
    if (value === '' || (value.length === 1 && /^[0-9]$/.test(value))) {
      const newNumbers = [...numbers];
      newNumbers[index] = value;
      setNumbers(newNumbers);
      
      // 清除当前输入框的错误状态
      const newErrors = [...errors];
      newErrors[index] = false;
      setErrors(newErrors);
      
      // 清除消息
      if (message) {
        setMessage('');
        setMessageType('');
      }
      
      // 自动跳转到下一个输入框
      if (value !== '' && index < 5) {
        const nextInput = document.querySelector(`input[name="number-${index + 1}"]`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  }, [numbers, errors, message]);

  const handleKeyDown = useCallback((index, e) => {
    // 退格键时跳转到上一个输入框
    if (e.key === 'Backspace' && numbers[index] === '' && index > 0) {
      const prevInput = document.querySelector(`input[name="number-${index - 1}"]`);
      if (prevInput) {
        prevInput.focus();
      }
    }
    
    // 回车键提交
    if (e.key === 'Enter') {
      handleAddNumbers();
    }
  }, [numbers]);

  const validateInput = useCallback(() => {
    const numberArray = numbers.map(n => n === '' ? -1 : parseInt(n));
    const hasEmpty = numberArray.some(n => n === -1);
    const hasInvalid = numberArray.some(n => n < 0 || n > 9);
    
    if (hasEmpty) {
      setMessage('请填写完整的6位数字');
      setMessageType('error');
      // 标记空的输入框为错误状态
      const newErrors = numbers.map(n => n === '');
      setErrors(newErrors);
      return false;
    }
    
    if (hasInvalid) {
      setMessage('每位数字必须在0-9之间');
      setMessageType('error');
      return false;
    }
    
    const validNumbers = numberArray.filter(n => n >= 0);
    if (!validateNumberGroup(validNumbers)) {
      setMessage('号码格式不正确');
      setMessageType('error');
      return false;
    }
    
    if (isDuplicateGroup(validNumbers, existingGroups)) {
      setMessage('该号码组已存在，请输入不同的号码');
      setMessageType('error');
      return false;
    }
    
    return true;
  }, [numbers, existingGroups]);

  const handleAddNumbers = useCallback(() => {
    if (!validateInput()) {
      return;
    }
    
    const numberArray = numbers.map(n => parseInt(n));
    onAddNumbers(numberArray);
    
    // 重置输入
    setNumbers(['', '', '', '', '', '']);
    setErrors([false, false, false, false, false, false]);
    setMessage('号码添加成功！');
    setMessageType('success');
    
    // 聚焦到第一个输入框
    setTimeout(() => {
      const firstInput = document.querySelector('input[name="number-0"]');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
    
    // 3秒后清除成功消息
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  }, [numbers, onAddNumbers, validateInput]);

  const handleRandomGenerate = useCallback(() => {
    const randomNumbers = generateRandomNumbers();
    setNumbers(randomNumbers.map(n => n.toString()));
    setErrors([false, false, false, false, false, false]);
    setMessage('');
    setMessageType('');
  }, []);

  const handleClear = useCallback(() => {
    setNumbers(['', '', '', '', '', '']);
    setErrors([false, false, false, false, false, false]);
    setMessage('');
    setMessageType('');
    
    // 聚焦到第一个输入框
    const firstInput = document.querySelector('input[name="number-0"]');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const isComplete = numbers.every(n => n !== '');

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>添加追号号码</Title>
        
        <NumberGrid>
          {numbers.map((number, index) => (
            <NumberInputBox
              key={index}
              name={`number-${index}`}
              type="text"
              value={number}
              onChange={(e) => handleNumberChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={errors[index] ? 'error' : (number !== '' ? 'success' : '')}
              placeholder="0"
              maxLength={1}
            />
          ))}
        </NumberGrid>
        
        <ButtonGroup>
          <ActionButton
            className="primary"
            onClick={handleAddNumbers}
            disabled={!isComplete}
          >
            ✨ 添加号码
          </ActionButton>
          
          <ActionButton
            className="secondary"
            onClick={handleRandomGenerate}
          >
            🎲 随机生成
          </ActionButton>
          
          <ActionButton
            className="success"
            onClick={handleClear}
          >
            🗑️ 清空
          </ActionButton>
        </ButtonGroup>
        
        {message && messageType === 'error' && (
          <ErrorMessage>{message}</ErrorMessage>
        )}
        
        {message && messageType === 'success' && (
          <SuccessMessage>{message}</SuccessMessage>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default NumberInput;