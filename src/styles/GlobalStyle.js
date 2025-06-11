import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// 动画关键帧定义
export const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3) translate3d(0, 0, 0);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
  }
`;

export const slideInFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.6), 0 0 30px rgba(102, 126, 234, 0.4);
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 全局样式
export const GlobalStyle = createGlobalStyle`
  /* 自定义滚动条 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #8fa4f3 0%, #9066b8 100%);
  }

  /* 选择文本样式 */
  ::selection {
    background: rgba(102, 126, 234, 0.3);
    color: #ffffff;
  }

  /* 移除默认的聚焦样式 */
  *:focus {
    outline: none;
  }

  /* 输入框样式重置 */
  input, textarea, select {
    border: none;
    background: transparent;
    font-family: inherit;
  }

  /* 按钮样式重置 */
  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
  }

  /* 链接样式重置 */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* 禁用文本选择的实用类 */
  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* 动画实用类 */
  .animate-bounce {
    animation: ${css`${bounceIn}`} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .animate-fade-in {
    animation: ${css`${fadeIn}`} 0.3s ease-out;
  }

  .animate-slide-in {
    animation: ${css`${slideInFromRight}`} 0.3s ease-out;
  }

  .animate-scale-in {
    animation: ${css`${scaleIn}`} 0.2s ease-out;
  }

  .animate-pulse {
    animation: ${css`${pulse}`} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-float {
    animation: ${css`${float}`} 3s ease-in-out infinite;
  }

  .animate-glow {
    animation: ${css`${glow}`} 2s ease-in-out infinite;
  }

  .animate-rotate {
    animation: ${css`${rotate}`} 1s linear infinite;
  }

  /* 玻璃态效果实用类 */
  .glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  /* 霓虹效果实用类 */
  .neon-effect {
    box-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px currentColor;
  }

  /* 卡片悬浮效果 */
  .card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    }
  }

  /* 响应式隐藏/显示 */
  @media (max-width: 768px) {
    .hidden-mobile {
      display: none !important;
    }
  }

  @media (min-width: 769px) {
    .hidden-desktop {
      display: none !important;
    }
  }

  /* 打印样式 */
  @media print {
    .no-print {
      display: none !important;
    }
  }
`; 