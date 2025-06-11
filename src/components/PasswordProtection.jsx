import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { unlockPool } from '../store/slices/settingsSlice';
import { theme } from '../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background.glass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.large};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      rgba(255, 255, 255, 0.05) 100%
    );
    pointer-events: none;
  }
`;

const LockIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
`;

const Title = styled.h2`
  font-size: ${theme.fontSize['2xl']};
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 ${theme.spacing.sm} 0;
  text-align: center;
`;

const Description = styled.p`
  font-size: ${theme.fontSize.base};
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 ${theme.spacing.xl} 0;
  text-align: center;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  width: 100%;
  max-width: 300px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  padding-right: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.medium};
  color: #ffffff;
  font-size: ${theme.fontSize.base};
  transition: ${theme.animations.transition};
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(107, 114, 128, 0.2);
  }
  
  ${props => props.error && css`
    border-color: ${theme.colors.danger.main};
    background: rgba(239, 68, 68, 0.1);
    
    &:focus {
      border-color: ${theme.colors.danger.main};
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
    }
  `}
`;

const ToggleButton = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: ${theme.fontSize.lg};
  transition: ${theme.animations.transition};
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const SubmitButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.primary.gradient};
  border: none;
  border-radius: ${theme.borderRadius.medium};
  color: #ffffff;
  font-size: ${theme.fontSize.base};
  font-weight: 600;
  cursor: pointer;
  transition: ${theme.animations.transition};
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
    box-shadow: 0 8px 25px rgba(107, 114, 128, 0.3);
  }
  
  &:active {
    transform: translateY(0);
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
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: ${theme.borderRadius.small};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  animation: shake 0.5s ease-in-out;
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

function PasswordProtection() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === 'admin') {
      dispatch(unlockPool());
      setError('');
    } else {
      setError('密码错误，请重试');
      setPassword('');
      // 清除错误信息
      setTimeout(() => setError(''), 3000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <LockIcon>🔒</LockIcon>
      <Title>号码组已锁定</Title>
      <Description>
        为了保护您的追号数据安全，<br />
        请输入密码以查看号码组信息
      </Description>
      
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="请输入访问密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            autoFocus
          />
          <ToggleButton type="button" onClick={togglePasswordVisibility}>
            {showPassword ? '🙈' : '👁️'}
          </ToggleButton>
        </InputGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <SubmitButton type="submit" disabled={!password.trim()}>
          解锁号码组
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default PasswordProtection; 