import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { theme } from '../styles/theme';
import { bounceIn, glow } from '../styles/GlobalStyle';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  overflow: hidden;
  animation: ${css`${bounceIn}`} 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${theme.colors.secondary.gradient};
    border-radius: ${theme.borderRadius.large} ${theme.borderRadius.large} 0 0;
  }
`;

const Title = styled.h3`
  font-size: ${theme.fontSize.xl};
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 ${theme.spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const TitleIcon = styled.span`
  font-size: ${theme.fontSize['2xl']};
`;

const SettingGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${theme.spacing.sm};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const NumberInput = styled.input`
  width: 80px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.medium};
  color: #ffffff;
  font-size: ${theme.fontSize.base};
  text-align: center;
  transition: ${theme.animations.transition};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  /* 隐藏默认的数字输入控件 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

const Unit = styled.span`
  font-size: ${theme.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

const Description = styled.p`
  font-size: ${theme.fontSize.xs};
  color: rgba(255, 255, 255, 0.6);
  margin: ${theme.spacing.xs} 0 0 0;
  line-height: 1.4;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.success.gradient};
  border: none;
  border-radius: ${theme.borderRadius.medium};
  color: #ffffff;
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
  cursor: pointer;
  transition: ${theme.animations.transition};
  margin-top: ${theme.spacing.md};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.saving {
    animation: ${css`${glow}`} 1s ease-in-out infinite;
  }
`;

const SettingsPanel = ({ 
  maxPeriodsWithoutWin = 10, 
  warningPeriodsThreshold = 5,
  onUpdateSettings 
}) => {
  const [maxPeriods, setMaxPeriods] = useState(maxPeriodsWithoutWin);
  const [warningThreshold, setWarningThreshold] = useState(warningPeriodsThreshold);
  const [isSaving, setIsSaving] = useState(false);

  const handleMaxPeriodsChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 999) {
      setMaxPeriods(value);
    }
  }, []);

  const handleWarningThresholdChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= maxPeriods) {
      setWarningThreshold(value);
    }
  }, [maxPeriods]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    // 模拟保存过程
    setTimeout(() => {
      onUpdateSettings({
        maxPeriodsWithoutWin: maxPeriods,
        warningPeriodsThreshold: warningThreshold,
      });
      setIsSaving(false);
    }, 500);
  }, [maxPeriods, warningThreshold, onUpdateSettings]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>
          <TitleIcon>⚙️</TitleIcon>
          期数设置
        </Title>
        
        <SettingGroup>
          <Label htmlFor="warning-threshold">警告阈值</Label>
          <InputWrapper>
            <NumberInput
              id="warning-threshold"
              type="number"
              min="1"
              max={maxPeriods}
              value={warningThreshold}
              onChange={handleWarningThresholdChange}
            />
            <Unit>期</Unit>
          </InputWrapper>
          <Description>
            当号码组连续未中奖期数达到此值时，开始显示警告提示
          </Description>
        </SettingGroup>
        
        <SettingGroup>
          <Label htmlFor="max-periods">最大期数</Label>
          <InputWrapper>
            <NumberInput
              id="max-periods"
              type="number"
              min="1"
              max="999"
              value={maxPeriods}
              onChange={handleMaxPeriodsChange}
            />
            <Unit>期</Unit>
          </InputWrapper>
          <Description>
            当号码组连续未中奖期数达到此值时，显示严重警告和提示音
          </Description>
        </SettingGroup>
        
        <SaveButton
          onClick={handleSave}
          disabled={isSaving}
          className={isSaving ? 'saving' : ''}
        >
          {isSaving ? '保存中...' : '💾 保存设置'}
        </SaveButton>
      </Container>
    </ThemeProvider>
  );
};

export default SettingsPanel; 