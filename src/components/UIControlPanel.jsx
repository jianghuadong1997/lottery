import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { togglePeriodsSettings, togglePoolSection } from '../store/slices/settingsSlice';
import { theme } from '../styles/theme';

const ControlPanelContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    top: 15px;
    right: 15px;
  }
`;

const SettingsButton = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: ${theme.colors.background.glass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
  
  ${props => props.isOpen && css`
    background: rgba(255, 255, 255, 0.15);
    transform: rotate(45deg);
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    animation: ${props => props.isOpen ? css`rotate 2s linear infinite` : 'none'};
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  width: 280px;
  background: ${theme.colors.background.glass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: ${props => props.isOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 20px;
    width: 16px;
    height: 16px;
    background: ${theme.colors.background.glass};
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 250px;
    top: 60px;
    right: -10px;
    
    &::before {
      right: 25px;
    }
  }
`;

const PanelTitle = styled.h3`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ControlItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-of-type {
    padding-top: 0;
  }
`;

const ControlLabel = styled.label`
  font-size: ${theme.fontSize.base};
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  cursor: pointer;
  flex: 1;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${props => props.checked ? 
    'linear-gradient(135deg, #667eea, #764ba2)' : 
    'rgba(255, 255, 255, 0.2)'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    width: 18px;
    height: 18px;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  z-index: 999;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

function UIControlPanel() {
  const dispatch = useDispatch();
  const { showPeriodsSettings, showPoolSection } = useSelector(state => state.settings);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const handlePeriodsSettingsToggle = () => {
    dispatch(togglePeriodsSettings());
  };

  const handlePoolSectionToggle = () => {
    dispatch(togglePoolSection());
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={handleOverlayClick} />
      <ControlPanelContainer>
        <SettingsButton 
          onClick={handleToggle} 
          isOpen={isOpen}
          title="界面设置"
        >
          ⚙️
        </SettingsButton>
        
        <ControlPanel isOpen={isOpen}>
          <PanelTitle>界面显示设置</PanelTitle>
          
          <ControlItem>
            <ControlLabel onClick={handlePeriodsSettingsToggle}>
              期数设置面板
            </ControlLabel>
            <ToggleSwitch 
              checked={showPeriodsSettings}
              onClick={handlePeriodsSettingsToggle}
            />
          </ControlItem>
          
          <ControlItem>
            <ControlLabel onClick={handlePoolSectionToggle}>
              追号号码板块
            </ControlLabel>
            <ToggleSwitch 
              checked={showPoolSection}
              onClick={handlePoolSectionToggle}
            />
          </ControlItem>
        </ControlPanel>
      </ControlPanelContainer>
    </>
  );
}

export default UIControlPanel; 