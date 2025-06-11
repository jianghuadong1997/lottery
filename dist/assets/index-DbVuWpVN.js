import{r as e,a as r,g as n}from"./vendor-Dah7rJhZ.js";import{c as o,a as t,r as i,u as a,b as s,R as d,P as l}from"./redux-BUXgL5k6.js";import{m as c,l as g,f as p,d as u,o as f}from"./styled-DxrbkRYe.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();var m,b,h={exports:{}},x={};var $,w=(b||(b=1,h.exports=function(){if(m)return x;m=1;var r=e(),n=Symbol.for("react.element"),o=Symbol.for("react.fragment"),t=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function s(e,r,o){var s,d={},l=null,c=null;for(s in void 0!==o&&(l=""+o),void 0!==r.key&&(l=""+r.key),void 0!==r.ref&&(c=r.ref),r)t.call(r,s)&&!a.hasOwnProperty(s)&&(d[s]=r[s]);if(e&&e.defaultProps)for(s in r=e.defaultProps)void 0===d[s]&&(d[s]=r[s]);return{$$typeof:n,type:e,key:l,ref:c,props:d,_owner:i.current}}return x.Fragment=o,x.jsx=s,x.jsxs=s,x}()),h.exports),y={};const k=n(function(){if($)return y;$=1;var e=r();return y.createRoot=e.createRoot,y.hydrateRoot=e.hydrateRoot,y}());let v;const j=new Uint8Array(16);function S(){if(!v&&(v="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!v))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return v(j)}const z=[];for(let Pn=0;Pn<256;++Pn)z.push((Pn+256).toString(16).slice(1));const C={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function P(e,r,n){if(C.randomUUID&&!e)return C.randomUUID();const o=(e=e||{}).random||(e.rng||S)();return o[6]=15&o[6]|64,o[8]=63&o[8]|128,function(e,r=0){return z[e[r+0]]+z[e[r+1]]+z[e[r+2]]+z[e[r+3]]+"-"+z[e[r+4]]+z[e[r+5]]+"-"+z[e[r+6]]+z[e[r+7]]+"-"+z[e[r+8]]+z[e[r+9]]+"-"+z[e[r+10]]+z[e[r+11]]+z[e[r+12]]+z[e[r+13]]+z[e[r+14]]+z[e[r+15]]}(o)}const T=(e,r)=>{try{const n=JSON.stringify(r);return localStorage.setItem(e,n),!0}catch(n){return console.error("保存到本地存储失败:",n),!1}},W=(e,r=null)=>{try{const n=localStorage.getItem(e);return null===n?r:JSON.parse(n)}catch(n){return console.error("从本地存储加载失败:",n),r}},R=o({name:"pool",initialState:{groups:W("numberGroups",[]),selectedGroups:[]},reducers:{addGroup:(e,r)=>{const n={id:P(),numbers:r.payload.numbers,createdAt:Date.now(),periodsWithoutWin:0,lastWinPeriod:null};e.groups.push(n),T("numberGroups",e.groups)},removeGroup:(e,r)=>{e.groups=e.groups.filter((e=>e.id!==r.payload)),e.selectedGroups=e.selectedGroups.filter((e=>e!==r.payload)),T("numberGroups",e.groups)},removeSelectedGroups:e=>{e.groups=e.groups.filter((r=>!e.selectedGroups.includes(r.id))),e.selectedGroups=[],T("numberGroups",e.groups)},updateGroup:(e,r)=>{const{id:n,numbers:o}=r.payload,t=e.groups.find((e=>e.id===n));t&&(t.numbers=o,T("numberGroups",e.groups))},incrementPeriodsWithoutWin:(e,r)=>{const n=r.payload||[];e.groups.forEach((e=>{n.includes(e.id)?(e.periodsWithoutWin=0,e.lastWinPeriod=Date.now()):e.periodsWithoutWin+=1})),T("numberGroups",e.groups)},toggleGroupSelection:(e,r)=>{const n=r.payload;e.selectedGroups.includes(n)?e.selectedGroups=e.selectedGroups.filter((e=>e!==n)):e.selectedGroups.push(n)},clearSelection:e=>{e.selectedGroups=[]},loadGroups:e=>{e.groups=W("numberGroups",[])}}}),{addGroup:G,removeGroup:E,removeSelectedGroups:A,incrementPeriodsWithoutWin:D,toggleGroupSelection:N,clearSelection:Y,loadGroups:O}=R.actions,I=R.reducer,U=(e,r)=>{if(!e||e.length<4)return[];if(!r||0===r.length)return[];const n=e.slice(0,4);new Set(n);return r.filter((e=>{if(!e.numbers||6!==e.numbers.length)return!1;const r=new Set(e.numbers);return n.every((e=>r.has(e)))}))},V=e=>!(!Array.isArray(e)||6!==e.length)&&e.every((e=>Number.isInteger(e)&&e>=0&&e<=9)),_=o({name:"draw",initialState:{currentDraw:[],drawHistory:W("drawHistory",[]),lastCheckResult:{winningGroups:[],checkedAt:null,drawNumbers:[]},isChecking:!1},reducers:{setCurrentDraw:(e,r)=>{e.currentDraw=r.payload},clearCurrentDraw:e=>{e.currentDraw=[]},addDrawResult:(e,r)=>{const n={period:e.drawHistory.length+1,winningNumbers:r.payload.numbers,timestamp:Date.now(),winningGroups:r.payload.winningGroups||[]};e.drawHistory.push(n),T("drawHistory",e.drawHistory)},setCheckResult:(e,r)=>{e.lastCheckResult={winningGroups:r.payload.winningGroups,checkedAt:Date.now(),drawNumbers:r.payload.drawNumbers}},setChecking:(e,r)=>{e.isChecking=r.payload},clearDrawHistory:e=>{e.drawHistory=[],T("drawHistory",[])},loadDrawHistory:e=>{e.drawHistory=W("drawHistory",[])}}}),{addDrawResult:q,setCheckResult:H,setChecking:L}=_.actions,M=_.reducer,X=o({name:"settings",initialState:{maxPeriodsWithoutWin:W("maxPeriodsWithoutWin",10),warningPeriodsThreshold:W("warningPeriodsThreshold",7),soundEnabled:W("soundEnabled",!0),theme:W("theme","light"),autoSave:W("autoSave",!0),showPeriodsSettings:W("showPeriodsSettings",!0),showPoolSection:W("showPoolSection",!0),isPoolUnlocked:!1},reducers:{setMaxPeriodsWithoutWin:(e,r)=>{e.maxPeriodsWithoutWin=r.payload,T("maxPeriodsWithoutWin",r.payload)},setWarningPeriodsThreshold:(e,r)=>{e.warningPeriodsThreshold=r.payload,T("warningPeriodsThreshold",r.payload)},setSoundEnabled:(e,r)=>{e.soundEnabled=r.payload,T("soundEnabled",r.payload)},setTheme:(e,r)=>{e.theme=r.payload,T("theme",r.payload)},setAutoSave:(e,r)=>{e.autoSave=r.payload,T("autoSave",r.payload)},togglePeriodsSettings:e=>{e.showPeriodsSettings=!e.showPeriodsSettings,T("showPeriodsSettings",e.showPeriodsSettings)},togglePoolSection:e=>{e.showPoolSection=!e.showPoolSection,T("showPoolSection",e.showPoolSection)},unlockPool:e=>{e.isPoolUnlocked=!0},lockPool:e=>{e.isPoolUnlocked=!1},resetSettings:e=>{e.maxPeriodsWithoutWin=10,e.warningPeriodsThreshold=7,e.soundEnabled=!0,e.theme="light",e.autoSave=!0,e.showPeriodsSettings=!0,e.showPoolSection=!0,e.isPoolUnlocked=!1,T("maxPeriodsWithoutWin",10),T("warningPeriodsThreshold",7),T("soundEnabled",!0),T("theme","light"),T("autoSave",!0),T("showPeriodsSettings",!0),T("showPoolSection",!0)},loadSettings:e=>{e.maxPeriodsWithoutWin=W("maxPeriodsWithoutWin",10),e.warningPeriodsThreshold=W("warningPeriodsThreshold",7),e.soundEnabled=W("soundEnabled",!0),e.theme=W("theme","light"),e.autoSave=W("autoSave",!0),e.showPeriodsSettings=W("showPeriodsSettings",!0),e.showPoolSection=W("showPoolSection",!0),e.isPoolUnlocked=!1},updateSettings:(e,r)=>{const{maxPeriodsWithoutWin:n,warningPeriodsThreshold:o,soundEnabled:t}=r.payload;void 0!==n&&(e.maxPeriodsWithoutWin=n,T("maxPeriodsWithoutWin",n)),void 0!==o&&(e.warningPeriodsThreshold=o,T("warningPeriodsThreshold",o)),void 0!==t&&(e.soundEnabled=t,T("soundEnabled",t))}}}),{togglePeriodsSettings:F,togglePoolSection:B,unlockPool:K,lockPool:J,loadSettings:Q,updateSettings:Z}=X.actions,ee=t({reducer:{pool:I,draw:M,settings:X.reducer}}),re={colors:{primary:{gradient:"linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",main:"#6b7280",light:"#9ca3af",dark:"#374151"},secondary:{gradient:"linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",main:"#8b5cf6",light:"#a78bfa",dark:"#7c3aed"},success:{gradient:"linear-gradient(135deg, #10b981 0%, #059669 100%)",main:"#10b981",light:"#34d399",dark:"#047857"},warning:{gradient:"linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",main:"#f59e0b",light:"#fbbf24",dark:"#b45309"},danger:{gradient:"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",main:"#ef4444",light:"#f87171",dark:"#b91c1c"},neutral:{white:"#ffffff",light:"#f9fafb",gray100:"#f3f4f6",gray200:"#e5e7eb",gray300:"#d1d5db",gray400:"#9ca3af",gray500:"#6b7280",gray600:"#4b5563",gray700:"#374151",gray800:"#1f2937",gray900:"#111827",black:"#000000"},background:{primary:"linear-gradient(135deg, #1f2937 0%, #111827 100%)",secondary:"linear-gradient(135deg, #374151 0%, #1f2937 100%)",card:"rgba(255, 255, 255, 0.05)",glass:"rgba(255, 255, 255, 0.03)"}},shadows:{small:"0 2px 4px rgba(0, 0, 0, 0.15)",medium:"0 4px 12px rgba(0, 0, 0, 0.2)",large:"0 8px 24px rgba(0, 0, 0, 0.25)",glow:"0 0 20px rgba(107, 114, 128, 0.2)",colorful:"0 8px 32px rgba(107, 114, 128, 0.15)"},borderRadius:{small:"6px",medium:"12px",large:"16px",round:"50%",pill:"999px"},fontSize:{xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem"},spacing:{xs:"0.25rem",sm:"0.5rem",md:"1rem",lg:"1.5rem",xl:"2rem","2xl":"3rem","3xl":"4rem"},animations:{transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",bounce:"bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",pulse:"pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",slideIn:"slideInFromRight 0.3s ease-out",fadeIn:"fadeIn 0.3s ease-out",scale:"scaleIn 0.2s ease-out"},breakpoints:{sm:"640px",md:"768px",lg:"1024px",xl:"1280px"},effects:{backdrop:"backdrop-filter: blur(10px)",glass:"\n      background: rgba(255, 255, 255, 0.05);\n      backdrop-filter: blur(10px);\n      border: 1px solid rgba(255, 255, 255, 0.1);\n    ",neon:"\n      box-shadow: \n        0 0 5px currentColor,\n        0 0 10px currentColor,\n        0 0 15px currentColor,\n        0 0 20px currentColor;\n    "}},ne=c`
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
`,oe=c`
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,te=c`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`,ie=c`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`,ae=c`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`,se=c`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`,de=c`
  0%, 100% {
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.6), 0 0 30px rgba(102, 126, 234, 0.4);
  }
`;c`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;const le=c`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ce=p`
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
    animation: ${g`${ne}`} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .animate-fade-in {
    animation: ${g`${te}`} 0.3s ease-out;
  }

  .animate-slide-in {
    animation: ${g`${oe}`} 0.3s ease-out;
  }

  .animate-scale-in {
    animation: ${g`${ie}`} 0.2s ease-out;
  }

  .animate-pulse {
    animation: ${g`${ae}`} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-float {
    animation: ${g`${se}`} 3s ease-in-out infinite;
  }

  .animate-glow {
    animation: ${g`${de}`} 2s ease-in-out infinite;
  }

  .animate-rotate {
    animation: ${g`${le}`} 1s linear infinite;
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
`,ge=u.div`
  display: flex;
  flex-direction: column;
  gap: ${re.spacing.lg};
  padding: ${re.spacing.xl};
  background: ${re.effects.glass};
  backdrop-filter: blur(20px);
  border-radius: ${re.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${re.shadows.colorful};
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
`,pe=u.h2`
  font-size: ${re.fontSize["2xl"]};
  font-weight: 700;
  background: ${re.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  animation: ${g`${de}`} 3s ease-in-out infinite;
`,ue=u.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${re.spacing.md};
  margin: ${re.spacing.lg} 0;
  
  @media (max-width: ${re.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${re.spacing.sm};
  }
`,fe=u.input`
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: ${re.borderRadius.medium};
  background: ${re.effects.glass};
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: ${re.fontSize.xl};
  font-weight: 700;
  text-align: center;
  transition: ${re.animations.transition};
  position: relative;
  
  &:focus {
    border-color: ${re.colors.primary.main};
    box-shadow: 
      0 0 0 3px rgba(102, 126, 234, 0.3),
      ${re.shadows.glow};
    transform: scale(1.05);
  }
  
  &:hover {
    border-color: ${re.colors.primary.light};
    transform: translateY(-2px);
  }
  
  &.error {
    border-color: ${re.colors.danger.main};
    background: rgba(255, 107, 107, 0.1);
    animation: shake 0.5s ease-in-out;
  }
  
  &.success {
    border-color: ${re.colors.success.main};
    background: rgba(79, 172, 254, 0.1);
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @media (max-width: ${re.breakpoints.sm}) {
    width: 50px;
    height: 50px;
    font-size: ${re.fontSize.lg};
  }
`,me=u.div`
  display: flex;
  gap: ${re.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`,be=u.button`
  padding: ${re.spacing.md} ${re.spacing.xl};
  border-radius: ${re.borderRadius.pill};
  font-weight: 600;
  font-size: ${re.fontSize.base};
  color: #ffffff;
  position: relative;
  overflow: hidden;
  transition: ${re.animations.transition};
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
    box-shadow: ${re.shadows.large};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.primary {
    background: ${re.colors.primary.gradient};
    
    &:hover {
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.secondary {
    background: ${re.colors.secondary.gradient};
    
    &:hover {
      box-shadow: 0 8px 25px rgba(240, 147, 251, 0.4);
    }
  }
  
  &.success {
    background: ${re.colors.success.gradient};
    
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
`,he=u.div`
  color: ${re.colors.danger.main};
  font-size: ${re.fontSize.sm};
  text-align: center;
  padding: ${re.spacing.sm};
  background: rgba(255, 107, 107, 0.1);
  border-radius: ${re.borderRadius.small};
  border: 1px solid rgba(255, 107, 107, 0.3);
  animation: ${g`${ne}`} 0.3s ease-out;
`,xe=u.div`
  color: ${re.colors.success.main};
  font-size: ${re.fontSize.sm};
  text-align: center;
  padding: ${re.spacing.sm};
  background: rgba(79, 172, 254, 0.1);
  border-radius: ${re.borderRadius.small};
  border: 1px solid rgba(79, 172, 254, 0.3);
  animation: ${g`${ne}`} 0.3s ease-out;
`,$e=({onAddNumbers:e,existingGroups:r=[]})=>{const[n,o]=i.useState(["","","","","",""]),[t,a]=i.useState([!1,!1,!1,!1,!1,!1]),[s,d]=i.useState(""),[l,c]=i.useState(""),g=i.useCallback(((e,r)=>{if(""===r||1===r.length&&/^[0-9]$/.test(r)){const i=[...n];i[e]=r,o(i);const l=[...t];if(l[e]=!1,a(l),s&&(d(""),c("")),""!==r&&e<5){const r=document.querySelector(`input[name="number-${e+1}"]`);r&&r.focus()}}}),[n,t,s]),p=i.useCallback(((e,r)=>{if("Backspace"===r.key&&""===n[e]&&e>0){const r=document.querySelector(`input[name="number-${e-1}"]`);r&&r.focus()}"Enter"===r.key&&m()}),[n]),u=i.useCallback((()=>{const e=n.map((e=>""===e?-1:parseInt(e))),o=e.some((e=>-1===e)),t=e.some((e=>e<0||e>9));if(o){d("请填写完整的6位数字"),c("error");const e=n.map((e=>""===e));return a(e),!1}if(t)return d("每位数字必须在0-9之间"),c("error"),!1;const i=e.filter((e=>e>=0));return V(i)?!((e,r)=>{if(!V(e)||!r)return!1;const n=e.join(",");return r.some((e=>e.numbers&&e.numbers.join(",")===n))})(i,r)||(d("该号码组已存在，请输入不同的号码"),c("error"),!1):(d("号码格式不正确"),c("error"),!1)}),[n,r]),m=i.useCallback((()=>{if(!u())return;const r=n.map((e=>parseInt(e)));e(r),o(["","","","","",""]),a([!1,!1,!1,!1,!1,!1]),d("号码添加成功！"),c("success"),setTimeout((()=>{const e=document.querySelector('input[name="number-0"]');e&&e.focus()}),100),setTimeout((()=>{d(""),c("")}),3e3)}),[n,e,u]),b=i.useCallback((()=>{const e=Array.from({length:6},(()=>Math.floor(10*Math.random())));o(e.map((e=>e.toString()))),a([!1,!1,!1,!1,!1,!1]),d(""),c("")}),[]),h=i.useCallback((()=>{o(["","","","","",""]),a([!1,!1,!1,!1,!1,!1]),d(""),c("");const e=document.querySelector('input[name="number-0"]');e&&e.focus()}),[]),x=n.every((e=>""!==e));return w.jsx(f,{theme:re,children:w.jsxs(ge,{children:[w.jsx(pe,{children:"添加追号号码"}),w.jsx(ue,{children:n.map(((e,r)=>w.jsx(fe,{name:`number-${r}`,type:"text",value:e,onChange:e=>g(r,e.target.value),onKeyDown:e=>p(r,e),className:t[r]?"error":""!==e?"success":"",placeholder:"0",maxLength:1},r)))}),w.jsxs(me,{children:[w.jsx(be,{className:"primary",onClick:m,disabled:!x,children:"✨ 添加号码"}),w.jsx(be,{className:"secondary",onClick:b,children:"🎲 随机生成"}),w.jsx(be,{className:"success",onClick:h,children:"🗑️ 清空"})]}),s&&"error"===l&&w.jsx(he,{children:s}),s&&"success"===l&&w.jsx(xe,{children:s})]})})},we=u.div`
  position: relative;
  background: ${re.effects.glass};
  backdrop-filter: blur(20px);
  border-radius: ${re.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${re.spacing.lg};
  transition: ${re.animations.transition};
  cursor: pointer;
  overflow: hidden;
  
  ${e=>"warning"===e.status&&g`
    border-color: ${re.colors.warning.main};
    background: rgba(250, 112, 154, 0.1);
    animation: ${g`${ae}`} 2s ease-in-out infinite;
  `}
  
  ${e=>"danger"===e.status&&g`
    border-color: ${re.colors.danger.main};
    background: rgba(255, 107, 107, 0.2);
    animation: ${g`${de}`} 1s ease-in-out infinite;
    box-shadow: 
      0 0 20px rgba(255, 107, 107, 0.5),
      0 0 40px rgba(255, 107, 107, 0.3),
      inset 0 0 20px rgba(255, 107, 107, 0.1);
    transform: scale(1.02);
    
    &::after {
      content: '⚠️';
      position: absolute;
      top: ${re.spacing.xs};
      right: ${re.spacing.xs};
      font-size: ${re.fontSize.lg};
      animation: ${g`${ae}`} 0.8s ease-in-out infinite;
    }
  `}
  
  ${e=>"success"===e.status&&g`
    border-color: ${re.colors.success.main};
    background: rgba(79, 172, 254, 0.1);
  `}
  
  ${e=>e.isSelected&&g`
    border-color: ${re.colors.primary.main};
    background: rgba(102, 126, 234, 0.15);
    transform: scale(1.02);
    box-shadow: ${re.shadows.colorful};
  `}
  
  &:hover {
    transform: translateY(-4px) ${e=>e.isSelected?"scale(1.02)":"scale(1.01)"};
    box-shadow: ${re.shadows.large};
    border-color: ${re.colors.primary.light};
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
  
  animation: ${g`${ne}`} 0.6s ease-out;
`,ye=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${re.spacing.md};
`,ke=u.h3`
  font-size: ${re.fontSize.lg};
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${re.spacing.sm};
`,ve=u.div`
  width: 12px;
  height: 12px;
  border-radius: ${re.borderRadius.round};
  position: relative;
  
  ${e=>"normal"===e.status&&g`
    background: ${re.colors.success.gradient};
  `}
  
  ${e=>"warning"===e.status&&g`
    background: ${re.colors.warning.gradient};
    animation: ${g`${ae}`} 1.5s ease-in-out infinite;
  `}
  
  ${e=>"danger"===e.status&&g`
    background: ${re.colors.danger.gradient};
    animation: ${g`${de}`} 1s ease-in-out infinite;
    box-shadow: 0 0 10px ${re.colors.danger.main};
  `}
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: ${re.borderRadius.round};
    background: ${e=>"normal"===e.status?re.colors.success.gradient:"warning"===e.status?re.colors.warning.gradient:re.colors.danger.gradient};
    opacity: 0.3;
    z-index: -1;
  }
`,je=u.div`
  display: flex;
  gap: ${re.spacing.sm};
`,Se=u.button`
  width: 32px;
  height: 32px;
  border-radius: ${re.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${re.animations.transition};
  cursor: pointer;
  font-size: ${re.fontSize.sm};
  
  &.delete {
    background: ${re.colors.danger.gradient};
    color: #ffffff;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
    }
  }
  
  &.edit {
    background: ${re.colors.secondary.gradient};
    color: #ffffff;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(240, 147, 251, 0.4);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
`,ze=u.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${re.spacing.sm};
  margin: ${re.spacing.md} 0;
`,Ce=u.div`
  width: 40px;
  height: 40px;
  border-radius: ${re.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${re.fontSize.base};
  color: #ffffff;
  position: relative;
  
  background: ${e=>{const r=parseInt(e.number);return r>=0&&r<=2?re.colors.primary.gradient:r>=3&&r<=5?re.colors.success.gradient:r>=6&&r<=8?re.colors.warning.gradient:re.colors.secondary.gradient}};
  
  box-shadow: ${re.shadows.medium};
  transition: ${re.animations.transition};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: ${re.shadows.large};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: ${re.borderRadius.round};
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
  }
  
  @media (max-width: ${re.breakpoints.sm}) {
    width: 32px;
    height: 32px;
    font-size: ${re.fontSize.sm};
  }
`,Pe=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${re.spacing.md};
  padding-top: ${re.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`,Te=u.span`
  font-size: ${re.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
  
  &.highlight {
    color: ${e=>"warning"===e.status?re.colors.warning.main:"danger"===e.status?re.colors.danger.main:re.colors.success.main};
    font-weight: 600;
  }
`,We=u.div`
  position: relative;
  width: 20px;
  height: 20px;
`,Re=u.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  
  &:checked + label {
    background: ${re.colors.primary.gradient};
    border-color: ${re.colors.primary.main};
    
    &::after {
      opacity: 1;
      transform: scale(1);
    }
  }
`,Ge=u.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${re.borderRadius.small};
  background: transparent;
  cursor: pointer;
  transition: ${re.animations.transition};
  
  &::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    color: #ffffff;
    font-size: ${re.fontSize.xs};
    font-weight: 700;
    opacity: 0;
    transition: ${re.animations.transition};
  }
  
  &:hover {
    border-color: ${re.colors.primary.main};
  }
`,Ee=({group:e,onDelete:r,onEdit:n,onToggleSelection:o,isSelected:t=!1,warningThreshold:a=7,maxPeriods:s=10})=>{const[d,l]=i.useState(!1),c=i.useMemo((()=>{const r=e.periodsWithoutWin||0;return r>=s?"danger":r>=a?"warning":"normal"}),[e.periodsWithoutWin,a,s]);return w.jsx(f,{theme:re,children:w.jsxs(we,{status:c,isSelected:t,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onClick:()=>o&&o(e.id),children:[w.jsxs(ye,{children:[w.jsxs(ke,{children:[w.jsx(ve,{status:c}),"号码组 #",e.id.slice(-6)]}),w.jsxs(je,{children:[n&&w.jsx(Se,{className:"edit",onClick:r=>{r.stopPropagation(),n(e)},title:"编辑",children:"✏️"}),r&&w.jsx(Se,{className:"delete",onClick:n=>{n.stopPropagation(),r(e.id)},title:"删除",children:"🗑️"})]})]}),w.jsx(ze,{children:e.numbers.map(((e,r)=>w.jsx(Ce,{number:e,children:e},r)))}),w.jsxs(Pe,{children:[w.jsxs("div",{children:[w.jsxs(Te,{children:["创建: ",(g=e.createdAt,new Date(g).toLocaleDateString("zh-CN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))]}),w.jsx("br",{}),w.jsx(Te,{className:"normal"!==c?"highlight":"",status:c,children:(()=>{const r=e.periodsWithoutWin||0;return 0===r?"等待检测":"danger"===c?`超期 ${r} 期！`:`${r} 期未中`})()})]}),o&&w.jsxs(We,{children:[w.jsx(Re,{type:"checkbox",checked:t,onChange:r=>{r.stopPropagation(),o(e.id)},id:`checkbox-${e.id}`}),w.jsx(Ge,{htmlFor:`checkbox-${e.id}`})]})]})]})});var g},Ae=u.div`
  display: flex;
  flex-direction: column;
  gap: ${re.spacing.lg};
  animation: ${g`${te}`} 0.5s ease-out;
`,De=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${re.spacing.md};
  padding: ${re.spacing.lg};
  background: ${re.effects.glass};
  backdrop-filter: blur(20px);
  border-radius: ${re.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${re.shadows.medium};
`,Ne=u.div`
  display: flex;
  align-items: center;
  gap: ${re.spacing.md};
`,Ye=u.h2`
  font-size: ${re.fontSize["2xl"]};
  font-weight: 700;
  background: ${re.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${re.spacing.sm};
`,Oe=u.span`
  font-size: ${re.fontSize["3xl"]};
  background: ${re.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`,Ie=u.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${re.borderRadius.round};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${re.fontSize.lg};
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: ${re.animations.transition};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: ${re.colors.danger.main};
    color: ${re.colors.danger.main};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`,Ue=u.div`
  display: flex;
  gap: ${re.spacing.lg};
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${re.breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
  }
`,Ve=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${re.spacing.xs};
  padding: ${re.spacing.sm} ${re.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${re.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: ${re.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`,_e=u.span`
  font-size: ${re.fontSize.xl};
  font-weight: 700;
  color: ${e=>e.color||"#ffffff"};
`,qe=u.span`
  font-size: ${re.fontSize.xs};
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
`,He=u.div`
  display: flex;
  gap: ${re.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`,Le=u.button`
  padding: ${re.spacing.sm} ${re.spacing.md};
  border-radius: ${re.borderRadius.pill};
  font-weight: 600;
  font-size: ${re.fontSize.sm};
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: ${e=>e.active?re.colors.primary.gradient:"transparent"};
  transition: ${re.animations.transition};
  cursor: pointer;
  
  &:hover {
    background: ${e=>e.active?re.colors.primary.gradient:"rgba(255, 255, 255, 0.1)"};
    border-color: ${re.colors.primary.main};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`,Me=u.button`
  padding: ${re.spacing.sm} ${re.spacing.lg};
  border-radius: ${re.borderRadius.pill};
  font-weight: 600;
  font-size: ${re.fontSize.sm};
  color: #ffffff;
  position: relative;
  overflow: hidden;
  transition: ${re.animations.transition};
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
    box-shadow: ${re.shadows.medium};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.primary {
    background: ${re.colors.primary.gradient};
    
    &:hover {
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.danger {
    background: ${re.colors.danger.gradient};
    
    &:hover {
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    }
  }
  
  &.secondary {
    background: ${re.colors.secondary.gradient};
    
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
`,Xe=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${re.spacing["3xl"]};
  text-align: center;
  background: ${re.effects.glass};
  backdrop-filter: blur(20px);
  border-radius: ${re.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${re.shadows.medium};
`,Fe=u.div`
  font-size: 4rem;
  margin-bottom: ${re.spacing.lg};
  opacity: 0.5;
`,Be=u.h3`
  font-size: ${re.fontSize.xl};
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 ${re.spacing.sm} 0;
`,Ke=u.p`
  font-size: ${re.fontSize.base};
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  max-width: 400px;
`,Je=u.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${re.spacing.lg};
  animation: ${g`${oe}`} 0.5s ease-out;
  
  @media (max-width: ${re.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${re.spacing.md};
  }
`,Qe=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${re.spacing.md} ${re.spacing.lg};
  background: rgba(102, 126, 234, 0.1);
  border-radius: ${re.borderRadius.medium};
  border: 1px solid rgba(102, 126, 234, 0.3);
  margin-bottom: ${re.spacing.lg};
  animation: ${g`${te}`} 0.3s ease-out;
`,Ze=u.span`
  color: ${re.colors.primary.light};
  font-weight: 600;
`,er=u.div`
  display: flex;
  gap: ${re.spacing.sm};
`,rr=({groups:e=[],selectedGroups:r=[],onToggleSelection:n,onClearSelection:o,onSelectAll:t,onDeleteSelected:a,onDeleteGroup:s,onEditGroup:d,onLockPool:l,warningThreshold:c=7,maxPeriods:g=10})=>{const[p,u]=i.useState("all"),m=i.useMemo((()=>"all"===p?e:e.filter((e=>{const r=e.periodsWithoutWin||0;switch(p){case"normal":return r<c;case"warning":return r>=c&&r<g;case"danger":return r>=g;default:return!0}}))),[e,p,c,g]),b=i.useMemo((()=>({total:e.length,normal:e.filter((e=>(e.periodsWithoutWin||0)<c)).length,warning:e.filter((e=>{const r=e.periodsWithoutWin||0;return r>=c&&r<g})).length,danger:e.filter((e=>(e.periodsWithoutWin||0)>=g)).length,selected:r.length})),[e,r,c,g]),h=i.useCallback((()=>{b.selected===m.length?o():t(m.map((e=>e.id)))}),[b.selected,m,o,t]),x=e=>{switch(e){case"all":return`全部 (${b.total})`;case"normal":return`正常 (${b.normal})`;case"warning":return`预警 (${b.warning})`;case"danger":return`超期 (${b.danger})`;default:return e}};return 0===e.length?w.jsx(f,{theme:re,children:w.jsxs(Ae,{children:[w.jsx(De,{children:w.jsxs(Ne,{children:[w.jsxs(Ye,{children:[w.jsx(Oe,{children:"🎯"}),"追号池"]}),w.jsx(Ie,{onClick:l,title:"锁定号码组",children:"🔒"})]})}),w.jsxs(Xe,{children:[w.jsx(Fe,{children:"🎲"}),w.jsx(Be,{children:"追号池为空"}),w.jsx(Ke,{children:'还没有添加任何号码组。点击上方的"添加号码"按钮开始您的追号之旅！'})]})]})}):w.jsx(f,{theme:re,children:w.jsxs(Ae,{children:[w.jsxs(De,{children:[w.jsxs(Ne,{children:[w.jsxs(Ye,{children:[w.jsx(Oe,{children:"🎯"}),"追号池"]}),w.jsx(Ie,{onClick:l,title:"锁定号码组",children:"🔒"})]}),w.jsxs(Ue,{children:[w.jsxs(Ve,{children:[w.jsx(_e,{color:re.colors.neutral.white,children:b.total}),w.jsx(qe,{children:"总数"})]}),w.jsxs(Ve,{children:[w.jsx(_e,{color:re.colors.success.main,children:b.normal}),w.jsx(qe,{children:"正常"})]}),w.jsxs(Ve,{children:[w.jsx(_e,{color:re.colors.warning.main,children:b.warning}),w.jsx(qe,{children:"预警"})]}),w.jsxs(Ve,{children:[w.jsx(_e,{color:re.colors.danger.main,children:b.danger}),w.jsx(qe,{children:"超期"})]})]})]}),w.jsxs(He,{children:[w.jsx("div",{style:{display:"flex",gap:re.spacing.sm,flexWrap:"wrap"},children:["all","normal","warning","danger"].map((e=>w.jsx(Le,{active:p===e,onClick:()=>u(e),children:x(e)},e)))}),w.jsxs("div",{style:{display:"flex",gap:re.spacing.sm,flexWrap:"wrap"},children:[w.jsx(Me,{className:"primary",onClick:h,children:b.selected===m.length?"取消全选":"全选"}),b.selected>0&&w.jsxs(Me,{className:"danger",onClick:()=>a(r),children:["删除选中 (",b.selected,")"]})]})]}),b.selected>0&&w.jsxs(Qe,{children:[w.jsxs(Ze,{children:["已选择 ",b.selected," 个号码组"]}),w.jsx(er,{children:w.jsx(Me,{className:"secondary",onClick:o,children:"清除选择"})})]}),w.jsx(Je,{children:m.map(((e,o)=>w.jsx(Ee,{group:e,isSelected:r.includes(e.id),onToggleSelection:n,onDelete:s,onEdit:d,warningThreshold:c,maxPeriods:g,style:{animationDelay:50*o+"ms"}},e.id)))})]})})},nr=u.div`
  display: flex;
  flex-direction: column;
  gap: ${re.spacing.lg};
  padding: ${re.spacing.xl};
  background: ${re.effects.glass};
  backdrop-filter: blur(20px);
  border-radius: ${re.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${re.shadows.colorful};
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
    animation: ${g`${le}`} 20s linear infinite;
    z-index: -1;
  }
`,or=u.h2`
  font-size: ${re.fontSize["2xl"]};
  font-weight: 700;
  background: ${re.colors.secondary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${re.spacing.sm};
`,tr=u.span`
  font-size: ${re.fontSize["3xl"]};
  background: ${re.colors.secondary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${g`${ae}`} 2s ease-in-out infinite;
`,ir=u.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${re.spacing.md};
  margin: ${re.spacing.lg} 0;
  
  @media (max-width: ${re.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${re.spacing.sm};
  }
`,ar=u.input`
  width: 70px;
  height: 70px;
  border: 3px solid transparent;
  border-radius: ${re.borderRadius.medium};
  background: ${re.effects.glass};
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: ${re.fontSize["2xl"]};
  font-weight: 700;
  text-align: center;
  transition: ${re.animations.transition};
  position: relative;
  
  background-image: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
                    ${re.colors.secondary.gradient};
  background-origin: border-box;
  background-clip: content-box, border-box;
  
  &:focus {
    border-color: transparent;
    box-shadow: 
      0 0 0 3px rgba(240, 147, 251, 0.3),
      ${re.shadows.glow};
    transform: scale(1.1);
    animation: ${g`${de}`} 2s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: ${re.shadows.large};
  }
  
  &.error {
    border-color: ${re.colors.danger.main};
    background: rgba(255, 107, 107, 0.2);
    animation: shake 0.5s ease-in-out;
  }
  
  &.success {
    border-color: ${re.colors.success.main};
    background: rgba(79, 172, 254, 0.2);
    animation: ${g`${ne}`} 0.3s ease-out;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
  
  @media (max-width: ${re.breakpoints.sm}) {
    width: 60px;
    height: 60px;
    font-size: ${re.fontSize.xl};
  }
`,sr=u.button`
  padding: ${re.spacing.lg} ${re.spacing["2xl"]};
  border-radius: ${re.borderRadius.large};
  font-weight: 700;
  font-size: ${re.fontSize.lg};
  color: #ffffff;
  background: ${re.colors.secondary.gradient};
  position: relative;
  overflow: hidden;
  transition: ${re.animations.transition};
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
    animation: ${g`${ae}`} 1s ease-in-out infinite;
    
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
      animation: ${g`${le}`} 1s linear infinite;
    }
  }
`,dr=u.div`
  margin-top: ${re.spacing.lg};
  animation: ${g`${ne}`} 0.6s ease-out;
`,lr=u.div`
  padding: ${re.spacing.lg};
  border-radius: ${re.borderRadius.large};
  background: ${e=>"success"===e.type?"rgba(79, 172, 254, 0.15)":"no-win"===e.type?"rgba(255, 255, 255, 0.05)":"rgba(255, 107, 107, 0.15)"};
  border: 1px solid ${e=>"success"===e.type?re.colors.success.main:"no-win"===e.type?"rgba(255, 255, 255, 0.2)":re.colors.danger.main};
  box-shadow: ${e=>"success"===e.type?"0 0 30px rgba(79, 172, 254, 0.3)":"no-win"===e.type?re.shadows.medium:"0 0 30px rgba(255, 107, 107, 0.3)"};
  
  ${e=>"success"===e.type&&g`
    animation: ${g`${de}`} 2s ease-in-out infinite;
  `}
`,cr=u.h3`
  font-size: ${re.fontSize.xl};
  font-weight: 700;
  margin: 0 0 ${re.spacing.md} 0;
  display: flex;
  align-items: center;
  gap: ${re.spacing.sm};
  
  color: ${e=>"success"===e.type?re.colors.success.main:"no-win"===e.type?"#ffffff":re.colors.danger.main};
`,gr=u.span`
  font-size: ${re.fontSize["2xl"]};
  animation: ${e=>e.animate?g`${ne} 0.6s ease-out`:"none"};
`,pr=u.div`
  display: flex;
  flex-direction: column;
  gap: ${re.spacing.md};
`,ur=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${re.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${re.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: ${re.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }
`,fr=u.div`
  display: flex;
  gap: ${re.spacing.sm};
`,mr=u.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${re.fontSize.sm};
  color: #ffffff;
  background: ${re.colors.success.gradient};
  box-shadow: ${re.shadows.small};
`,br=u.span`
  font-size: ${re.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
`,hr=u.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${re.spacing.md};
  margin-top: ${re.spacing.lg};
  padding-top: ${re.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`,xr=u.div`
  text-align: center;
`,$r=u.div`
  font-size: ${re.fontSize.xl};
  font-weight: 700;
  color: ${e=>e.color||"#ffffff"};
  margin-bottom: ${re.spacing.xs};
`,wr=u.div`
  font-size: ${re.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
`,yr=u.div`
  color: ${re.colors.danger.main};
  font-size: ${re.fontSize.sm};
  text-align: center;
  padding: ${re.spacing.sm};
  background: rgba(255, 107, 107, 0.1);
  border-radius: ${re.borderRadius.small};
  border: 1px solid rgba(255, 107, 107, 0.3);
  animation: ${g`${ne}`} 0.3s ease-out;
`,kr=({onCheckDrawing:e,isChecking:r=!1,lastCheckResult:n=null,drawHistory:o=[]})=>{const[t,a]=i.useState(["","","","","",""]),[s,d]=i.useState([!1,!1,!1,!1,!1,!1]),[l,c]=i.useState(""),[g,p]=i.useState(!1),u=i.useCallback(((e,r)=>{if(""===r||1===r.length&&/^[0-9]$/.test(r)){const n=[...t];n[e]=r,a(n);const o=[...s];if(o[e]=!1,d(o),l&&c(""),""!==r&&e<5){const r=document.querySelector(`input[name="draw-${e+1}"]`);r&&r.focus()}}}),[t,s,l]),m=i.useCallback(((e,r)=>{if("Backspace"===r.key&&""===t[e]&&e>0){const r=document.querySelector(`input[name="draw-${e-1}"]`);r&&r.focus()}"Enter"===r.key&&h()}),[t]),b=i.useCallback((()=>{if(t.map((e=>""===e?-1:parseInt(e))).some((e=>-1===e))){c("请填写完整的6位开奖号码");const e=t.map((e=>""===e));return d(e),!1}return!0}),[t]),h=i.useCallback((()=>{if(!b()||r)return;const n=t.map((e=>parseInt(e)));p(!1),e(n)}),[t,b,r,e]),x=i.useCallback((()=>{a(["","","","","",""]),d([!1,!1,!1,!1,!1,!1]),c(""),p(!1);const e=document.querySelector('input[name="draw-0"]');e&&e.focus()}),[]);i.useEffect((()=>{n&&n.checkedAt&&p(!0)}),[n]);const $=t.every((e=>""!==e)),y=n&&n.winningGroups.length>0;return w.jsx(f,{theme:re,children:w.jsxs(nr,{children:[w.jsxs(or,{children:[w.jsx(tr,{children:"🎯"}),"开奖号码检测"]}),w.jsx(ir,{children:t.map(((e,n)=>w.jsx(ar,{name:`draw-${n}`,type:"text",value:e,onChange:e=>u(n,e.target.value),onKeyDown:e=>m(n,e),className:s[n]?"error":""!==e?"success":"",placeholder:"0",maxLength:1,disabled:r},n)))}),w.jsxs("div",{style:{display:"flex",gap:re.spacing.md,justifyContent:"center"},children:[w.jsx(sr,{onClick:h,disabled:!$||r,className:r?"checking":"",children:r?"检测中...":"🔍 开始检测"}),w.jsx(sr,{onClick:x,disabled:r,style:{background:re.colors.neutral.gray600},children:"🗑️ 清空"})]}),l&&w.jsx(yr,{children:l}),g&&n&&w.jsx(dr,{children:w.jsxs(lr,{type:y?"success":"no-win",children:[w.jsxs(cr,{type:y?"success":"no-win",children:[w.jsx(gr,{animate:y,children:y?"🎉":"😔"}),y?`恭喜！发现 ${n.winningGroups.length} 个中奖号码组！`:"很遗憾，本期没有中奖号码组"]}),y&&w.jsx(pr,{children:n.winningGroups.map(((e,r)=>w.jsxs(ur,{children:[w.jsx(fr,{children:e.numbers.map(((e,r)=>w.jsx(mr,{children:e},r)))}),w.jsxs(br,{children:["组 #",e.id.slice(-6)]})]},e.id)))}),w.jsxs(hr,{children:[w.jsxs(xr,{children:[w.jsx($r,{color:re.colors.primary.main,children:n.drawNumbers.join(" ")}),w.jsx(wr,{children:"本期开奖号码"})]}),w.jsxs(xr,{children:[w.jsx($r,{color:re.colors.success.main,children:n.winningGroups.length}),w.jsx(wr,{children:"中奖组数"})]}),w.jsxs(xr,{children:[w.jsx($r,{color:re.colors.secondary.main,children:o.length+1}),w.jsx(wr,{children:"检测期数"})]})]})]})})]})})},vr=u.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${re.borderRadius.large};
  padding: ${re.spacing.lg};
  margin-bottom: ${re.spacing.lg};
  position: relative;
  overflow: hidden;
  animation: ${g`${ne}`} 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${re.colors.secondary.gradient};
    border-radius: ${re.borderRadius.large} ${re.borderRadius.large} 0 0;
  }
`,jr=u.h3`
  font-size: ${re.fontSize.xl};
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 ${re.spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${re.spacing.sm};
`,Sr=u.span`
  font-size: ${re.fontSize["2xl"]};
`,zr=u.div`
  margin-bottom: ${re.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`,Cr=u.label`
  display: block;
  font-size: ${re.fontSize.sm};
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${re.spacing.sm};
`,Pr=u.div`
  display: flex;
  align-items: center;
  gap: ${re.spacing.md};
`,Tr=u.input`
  width: 80px;
  padding: ${re.spacing.sm} ${re.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${re.borderRadius.medium};
  color: #ffffff;
  font-size: ${re.fontSize.base};
  text-align: center;
  transition: ${re.animations.transition};
  
  &:focus {
    outline: none;
    border-color: ${re.colors.primary.main};
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
`,Wr=u.span`
  font-size: ${re.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`,Rr=u.p`
  font-size: ${re.fontSize.xs};
  color: rgba(255, 255, 255, 0.6);
  margin: ${re.spacing.xs} 0 0 0;
  line-height: 1.4;
`,Gr=u.button`
  width: 100%;
  padding: ${re.spacing.md};
  background: ${re.colors.success.gradient};
  border: none;
  border-radius: ${re.borderRadius.medium};
  color: #ffffff;
  font-size: ${re.fontSize.sm};
  font-weight: 600;
  cursor: pointer;
  transition: ${re.animations.transition};
  margin-top: ${re.spacing.md};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.saving {
    animation: ${g`${de}`} 1s ease-in-out infinite;
  }
`,Er=({maxPeriodsWithoutWin:e=10,warningPeriodsThreshold:r=5,onUpdateSettings:n})=>{const[o,t]=i.useState(e),[a,s]=i.useState(r),[d,l]=i.useState(!1),c=i.useCallback((e=>{const r=parseInt(e.target.value);r>=1&&r<=999&&t(r)}),[]),g=i.useCallback((e=>{const r=parseInt(e.target.value);r>=1&&r<=o&&s(r)}),[o]),p=i.useCallback((async()=>{l(!0),setTimeout((()=>{n({maxPeriodsWithoutWin:o,warningPeriodsThreshold:a}),l(!1)}),500)}),[o,a,n]);return w.jsx(f,{theme:re,children:w.jsxs(vr,{children:[w.jsxs(jr,{children:[w.jsx(Sr,{children:"⚙️"}),"期数设置"]}),w.jsxs(zr,{children:[w.jsx(Cr,{htmlFor:"warning-threshold",children:"警告阈值"}),w.jsxs(Pr,{children:[w.jsx(Tr,{id:"warning-threshold",type:"number",min:"1",max:o,value:a,onChange:g}),w.jsx(Wr,{children:"期"})]}),w.jsx(Rr,{children:"当号码组连续未中奖期数达到此值时，开始显示警告提示"})]}),w.jsxs(zr,{children:[w.jsx(Cr,{htmlFor:"max-periods",children:"最大期数"}),w.jsxs(Pr,{children:[w.jsx(Tr,{id:"max-periods",type:"number",min:"1",max:"999",value:o,onChange:c}),w.jsx(Wr,{children:"期"})]}),w.jsx(Rr,{children:"当号码组连续未中奖期数达到此值时，显示严重警告和提示音"})]}),w.jsx(Gr,{onClick:p,disabled:d,className:d?"saving":"",children:d?"保存中...":"💾 保存设置"})]})})};const Ar=new class{constructor(){this.audioContext=null,this.isEnabled=!0,this.volume=.7,this.initAudioContext()}initAudioContext(){try{const e=window.AudioContext||window.webkitAudioContext;e&&(this.audioContext=new e)}catch(e){console.warn("音频上下文初始化失败:",e)}}playWarningSound(){if(this.isEnabled&&this.audioContext)try{const e=this.audioContext.createOscillator(),r=this.audioContext.createGain();e.connect(r),r.connect(this.audioContext.destination),e.frequency.setValueAtTime(800,this.audioContext.currentTime),e.frequency.setValueAtTime(400,this.audioContext.currentTime+.1),e.frequency.setValueAtTime(800,this.audioContext.currentTime+.2),r.gain.setValueAtTime(0,this.audioContext.currentTime),r.gain.setValueAtTime(this.volume,this.audioContext.currentTime+.01),r.gain.setValueAtTime(0,this.audioContext.currentTime+.3),e.start(this.audioContext.currentTime),e.stop(this.audioContext.currentTime+.3)}catch(e){console.warn("播放警告音失败:",e)}}playNotificationSound(){if(this.isEnabled&&this.audioContext)try{const e=this.audioContext.createOscillator(),r=this.audioContext.createGain();e.connect(r),r.connect(this.audioContext.destination),e.frequency.setValueAtTime(600,this.audioContext.currentTime),e.type="sine",r.gain.setValueAtTime(0,this.audioContext.currentTime),r.gain.setValueAtTime(.5*this.volume,this.audioContext.currentTime+.01),r.gain.setValueAtTime(0,this.audioContext.currentTime+.15),e.start(this.audioContext.currentTime),e.stop(this.audioContext.currentTime+.15)}catch(e){console.warn("播放提示音失败:",e)}}playSuccessSound(){if(this.isEnabled&&this.audioContext)try{const e=this.audioContext.createOscillator(),r=this.audioContext.createGain();e.connect(r),r.connect(this.audioContext.destination),e.frequency.setValueAtTime(300,this.audioContext.currentTime),e.frequency.setValueAtTime(400,this.audioContext.currentTime+.1),e.frequency.setValueAtTime(500,this.audioContext.currentTime+.2),e.type="triangle",r.gain.setValueAtTime(0,this.audioContext.currentTime),r.gain.setValueAtTime(.6*this.volume,this.audioContext.currentTime+.01),r.gain.setValueAtTime(0,this.audioContext.currentTime+.25),e.start(this.audioContext.currentTime),e.stop(this.audioContext.currentTime+.25)}catch(e){console.warn("播放成功音失败:",e)}}setEnabled(e){this.isEnabled=e}setVolume(e){this.volume=Math.max(0,Math.min(1,e))}resumeAudioContext(){this.audioContext&&"suspended"===this.audioContext.state&&this.audioContext.resume()}},Dr=u.div`
  position: fixed;
  top: ${re.spacing.lg};
  right: ${re.spacing.lg};
  z-index: 9999;
  max-width: 400px;
  animation: ${g`${oe}`} 0.5s ease-out;
  
  @media (max-width: ${re.breakpoints.sm}) {
    top: ${re.spacing.md};
    right: ${re.spacing.md};
    left: ${re.spacing.md};
    max-width: none;
  }
`,Nr=u.div`
  background: ${e=>"danger"===e.severity?"rgba(255, 107, 107, 0.95)":"rgba(250, 112, 154, 0.95)"};
  backdrop-filter: blur(10px);
  border: 1px solid ${e=>"danger"===e.severity?"rgba(255, 107, 107, 0.8)":"rgba(250, 112, 154, 0.8)"};
  border-radius: ${re.borderRadius.large};
  padding: ${re.spacing.lg};
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    ${e=>"danger"===e.severity?"0 0 30px rgba(255, 107, 107, 0.5)":"0 0 20px rgba(250, 112, 154, 0.4)"};
  position: relative;
  overflow: hidden;
  
  ${e=>"danger"===e.severity&&g`
    animation: ${g`${de}`} 2s ease-in-out infinite;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${e=>"danger"===e.severity?"linear-gradient(90deg, #ff6b6b, #ff8e8e, #ff6b6b)":"linear-gradient(90deg, #fa709a, #ffb6c1, #fa709a)"};
    animation: ${g`${ae}`} 1.5s ease-in-out infinite;
  }
`,Yr=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${re.spacing.md};
`,Or=u.div`
  display: flex;
  align-items: center;
  gap: ${re.spacing.sm};
`,Ir=u.span`
  font-size: ${re.fontSize["2xl"]};
  animation: ${g`${ae}`} 1s ease-in-out infinite;
`,Ur=u.h4`
  font-size: ${re.fontSize.lg};
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`,Vr=u.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: ${re.fontSize.lg};
  cursor: pointer;
  padding: ${re.spacing.xs};
  border-radius: ${re.borderRadius.small};
  transition: ${re.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
`,_r=u.p`
  color: #ffffff;
  font-size: ${re.fontSize.base};
  margin: 0 0 ${re.spacing.md} 0;
  line-height: 1.5;
`,qr=u.div`
  display: flex;
  flex-direction: column;
  gap: ${re.spacing.sm};
  margin-bottom: ${re.spacing.md};
`,Hr=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  padding: ${re.spacing.sm} ${re.spacing.md};
  border-radius: ${re.borderRadius.medium};
  transition: ${re.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateX(5px);
  }
`,Lr=u.span`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #ffffff;
`,Mr=u.span`
  font-weight: 700;
  color: #ffffff;
  font-size: ${re.fontSize.sm};
  background: rgba(255, 255, 255, 0.2);
  padding: ${re.spacing.xs} ${re.spacing.sm};
  border-radius: ${re.borderRadius.small};
`,Xr=u.div`
  display: flex;
  gap: ${re.spacing.sm};
  justify-content: flex-end;
`,Fr=u.button`
  padding: ${re.spacing.sm} ${re.spacing.md};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${re.borderRadius.medium};
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: ${re.fontSize.sm};
  font-weight: 600;
  cursor: pointer;
  transition: ${re.animations.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`,Br=({warningGroups:e=[],dangerGroups:r=[],soundEnabled:n=!0,onClose:o,onGroupClick:t})=>{const[a,s]=i.useState(!1),[d,l]=i.useState(!1),c=e.length>0||r.length>0,g=r.length>0?"danger":"warning";i.useEffect((()=>{c?(s(!0),n&&!d&&(r.length>0?Ar.playWarningSound():e.length>0&&Ar.playNotificationSound(),l(!0))):(s(!1),l(!1))}),[c,n,r.length,e.length,d]);const p=i.useCallback((()=>{s(!1),l(!1),o&&o()}),[o]),u=i.useCallback((e=>{t&&t(e)}),[t]);if(!a||!c)return null;const m=e.length+r.length,b=[...r,...e];return w.jsx(f,{theme:re,children:w.jsx(Dr,{children:w.jsxs(Nr,{severity:g,children:[w.jsxs(Yr,{children:[w.jsxs(Or,{children:[w.jsx(Ir,{children:"danger"===g?"🚨":"⚠️"}),w.jsx(Ur,{children:"danger"===g?"严重警告":"提醒通知"})]}),w.jsx(Vr,{onClick:p,children:"✕"})]}),w.jsx(_r,{children:"danger"===g?`有 ${m} 个号码组超过设定期数未中奖，需要关注！`:`有 ${m} 个号码组接近警告阈值，请留意。`}),w.jsxs(qr,{children:[b.slice(0,3).map((e=>w.jsxs(Hr,{onClick:()=>u(e),children:[w.jsx(Lr,{children:e.numbers.join(" ")}),w.jsxs(Mr,{children:[e.periodsWithoutWin,"期"]})]},e.id))),b.length>3&&w.jsx(Hr,{children:w.jsxs("span",{style:{color:"rgba(255, 255, 255, 0.8)",fontStyle:"italic"},children:["还有 ",b.length-3," 个号码组..."]})})]}),w.jsx(Xr,{children:w.jsx(Fr,{onClick:p,children:"知道了"})})]})})})},Kr=u.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  
  @media (max-width: ${re.breakpoints.sm}) {
    top: 15px;
    right: 15px;
  }
`,Jr=u.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: ${re.colors.background.glass};
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
  
  ${e=>e.isOpen&&g`
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
    animation: ${e=>e.isOpen?g`rotate 2s linear infinite`:"none"};
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
  
  @media (max-width: ${re.breakpoints.sm}) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`,Qr=u.div`
  position: absolute;
  top: 70px;
  right: 0;
  width: 280px;
  background: ${re.colors.background.glass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: ${re.spacing.lg};
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: ${e=>e.isOpen?"translateY(0) scale(1)":"translateY(-10px) scale(0.95)"};
  opacity: ${e=>e.isOpen?"1":"0"};
  visibility: ${e=>e.isOpen?"visible":"hidden"};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 20px;
    width: 16px;
    height: 16px;
    background: ${re.colors.background.glass};
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
  
  @media (max-width: ${re.breakpoints.sm}) {
    width: 250px;
    top: 60px;
    right: -10px;
    
    &::before {
      right: 25px;
    }
  }
`,Zr=u.h3`
  margin: 0 0 ${re.spacing.md} 0;
  font-size: ${re.fontSize.lg};
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`,en=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${re.spacing.md} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-of-type {
    padding-top: 0;
  }
`,rn=u.label`
  font-size: ${re.fontSize.base};
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  cursor: pointer;
  flex: 1;
`,nn=u.div`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${e=>e.checked?"linear-gradient(135deg, #667eea, #764ba2)":"rgba(255, 255, 255, 0.2)"};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${e=>e.checked?"26px":"2px"};
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
`,on=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  z-index: 999;
  opacity: ${e=>e.isOpen?"1":"0"};
  visibility: ${e=>e.isOpen?"visible":"hidden"};
  transition: all 0.3s ease;
`;function tn(){const e=a(),{showPeriodsSettings:r,showPoolSection:n}=s((e=>e.settings)),[o,t]=i.useState(!1),d=()=>{e(F())},l=()=>{e(B())};return w.jsxs(w.Fragment,{children:[w.jsx(on,{isOpen:o,onClick:()=>{t(!1)}}),w.jsxs(Kr,{children:[w.jsx(Jr,{onClick:()=>{t(!o)},isOpen:o,title:"界面设置",children:"⚙️"}),w.jsxs(Qr,{isOpen:o,children:[w.jsx(Zr,{children:"界面显示设置"}),w.jsxs(en,{children:[w.jsx(rn,{onClick:d,children:"期数设置面板"}),w.jsx(nn,{checked:r,onClick:d})]}),w.jsxs(en,{children:[w.jsx(rn,{onClick:l,children:"追号号码板块"}),w.jsx(nn,{checked:n,onClick:l})]})]})]})]})}const an=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${re.spacing.xl};
  background: ${re.colors.background.glass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${re.borderRadius.large};
  box-shadow: ${re.shadows.large};
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
`,sn=u.div`
  font-size: 4rem;
  margin-bottom: ${re.spacing.lg};
  background: ${re.colors.primary.gradient};
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
`,dn=u.h2`
  font-size: ${re.fontSize["2xl"]};
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 ${re.spacing.sm} 0;
  text-align: center;
`,ln=u.p`
  font-size: ${re.fontSize.base};
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 ${re.spacing.xl} 0;
  text-align: center;
  line-height: 1.5;
`,cn=u.form`
  display: flex;
  flex-direction: column;
  gap: ${re.spacing.lg};
  width: 100%;
  max-width: 300px;
`,gn=u.div`
  position: relative;
`,pn=u.input`
  width: 100%;
  padding: ${re.spacing.md} ${re.spacing.lg};
  padding-right: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${re.borderRadius.medium};
  color: #ffffff;
  font-size: ${re.fontSize.base};
  transition: ${re.animations.transition};
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: ${re.colors.primary.main};
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(107, 114, 128, 0.2);
  }
  
  ${e=>e.error&&g`
    border-color: ${re.colors.danger.main};
    background: rgba(239, 68, 68, 0.1);
    
    &:focus {
      border-color: ${re.colors.danger.main};
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
    }
  `}
`,un=u.button`
  position: absolute;
  right: ${re.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: ${re.fontSize.lg};
  transition: ${re.animations.transition};
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`,fn=u.button`
  padding: ${re.spacing.md} ${re.spacing.lg};
  background: ${re.colors.primary.gradient};
  border: none;
  border-radius: ${re.borderRadius.medium};
  color: #ffffff;
  font-size: ${re.fontSize.base};
  font-weight: 600;
  cursor: pointer;
  transition: ${re.animations.transition};
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
`,mn=u.div`
  color: ${re.colors.danger.main};
  font-size: ${re.fontSize.sm};
  text-align: center;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: ${re.borderRadius.small};
  padding: ${re.spacing.sm} ${re.spacing.md};
  animation: shake 0.5s ease-in-out;
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;function bn(){const e=a(),[r,n]=i.useState(""),[o,t]=i.useState(!1),[s,d]=i.useState("");return w.jsxs(an,{children:[w.jsx(sn,{children:"🔒"}),w.jsx(dn,{children:"号码组已锁定"}),w.jsxs(ln,{children:["为了保护您的追号数据安全，",w.jsx("br",{}),"请输入密码以查看号码组信息"]}),w.jsxs(cn,{onSubmit:o=>{o.preventDefault(),"admin"===r?(e(K()),d("")):(d("密码错误，请重试"),n(""),setTimeout((()=>d("")),3e3))},children:[w.jsxs(gn,{children:[w.jsx(pn,{type:o?"text":"password",placeholder:"请输入访问密码",value:r,onChange:e=>n(e.target.value),error:!!s,autoFocus:!0}),w.jsx(un,{type:"button",onClick:()=>{t(!o)},children:o?"🙈":"👁️"})]}),s&&w.jsx(mn,{children:s}),w.jsx(fn,{type:"submit",disabled:!r.trim(),children:"解锁号码组"})]})]})}const hn=u.div`
  min-height: 100vh;
  background: ${re.colors.background.primary};
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
`,xn=u.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${re.spacing.xl};
  position: relative;
  z-index: 1;
  
  @media (max-width: ${re.breakpoints.md}) {
    padding: ${re.spacing.lg};
  }
  
  @media (max-width: ${re.breakpoints.sm}) {
    padding: ${re.spacing.md};
  }
`,$n=u.header`
  text-align: center;
  margin-bottom: ${re.spacing["3xl"]};
  position: relative;
`,wn=u.h1`
  font-size: ${re.fontSize["4xl"]};
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
  margin: 0 0 ${re.spacing.md} 0;
  animation: gradientShift 4s ease-in-out infinite;
  
  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  @media (max-width: ${re.breakpoints.md}) {
    font-size: ${re.fontSize["3xl"]};
  }
  
  @media (max-width: ${re.breakpoints.sm}) {
    font-size: ${re.fontSize["2xl"]};
  }
`,yn=u.p`
  font-size: ${re.fontSize.lg};
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 400;
  
  @media (max-width: ${re.breakpoints.sm}) {
    font-size: ${re.fontSize.base};
  }
`,kn=u.main`
  display: flex;
  gap: ${re.spacing.xl};
  min-height: calc(100vh - 200px);
  
  @media (max-width: ${re.breakpoints.lg}) {
    flex-direction: column;
    gap: ${re.spacing.lg};
  }
`,vn=u.aside`
  flex: 0 0 450px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${re.breakpoints.lg}) {
    flex: none;
    order: 2;
  }
  
  @media (max-width: ${re.breakpoints.sm}) {
    flex: none;
  }
`,jn=u.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${re.spacing["2xl"]};
  min-width: 0; /* 防止flex子项溢出 */
  
  @media (max-width: ${re.breakpoints.lg}) {
    order: 1;
  }
`,Sn=u.section`
  position: relative;
`,zn=u.div`
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
`;function Cn(){const e=a(),{groups:r,selectedGroups:n}=s((e=>e.pool)),{isChecking:o,lastCheckResult:t,drawHistory:d}=s((e=>e.draw)),{maxPeriodsWithoutWin:l,warningPeriodsThreshold:c,soundEnabled:g,showPeriodsSettings:p,showPoolSection:u,isPoolUnlocked:m}=s((e=>e.settings)),[b,h]=i.useState(!1);i.useEffect((()=>{e(O()),e(Q())}),[e]);const{warningGroups:x,dangerGroups:$}=i.useMemo((()=>({warningGroups:r.filter((e=>e.periodsWithoutWin>=c&&e.periodsWithoutWin<l)),dangerGroups:r.filter((e=>e.periodsWithoutWin>=l))})),[r,c,l]);i.useEffect((()=>{(x.length>0||$.length>0)&&h(!0)}),[x.length,$.length]);return w.jsxs(f,{theme:re,children:[w.jsx(ce,{}),w.jsxs(hn,{children:[w.jsx(zn,{}),w.jsxs(xn,{children:[w.jsxs($n,{children:[w.jsx(wn,{children:"🎲 彩票追号管理系统"}),w.jsx(yn,{children:"智能追号 · 中奖检测 · 数据分析"})]}),w.jsxs(kn,{children:[w.jsx(vn,{children:m?w.jsx(rr,{groups:r,selectedGroups:n,onToggleSelection:r=>{e(N(r))},onClearSelection:()=>{e(Y())},onSelectAll:r=>{e(Y()),r.forEach((r=>e(N(r))))},onDeleteSelected:()=>{e(A())},onDeleteGroup:r=>{e(E(r))},onEditGroup:e=>{console.log("Edit group:",e)},onLockPool:()=>{e(J())},warningThreshold:c,maxPeriods:l}):w.jsx(bn,{})}),w.jsxs(jn,{children:[p&&w.jsx(Sn,{children:w.jsx(Er,{maxPeriodsWithoutWin:l,warningPeriodsThreshold:c,onUpdateSettings:r=>{e(Z(r))}})}),u&&w.jsx(Sn,{children:w.jsx($e,{onAddNumbers:r=>{e(G({numbers:r}))},existingGroups:r})}),w.jsx(Sn,{children:w.jsx(kr,{onCheckDrawing:n=>{const o=U(n,r).map((e=>e.id));e(((e,r)=>n=>{n(L(!0)),setTimeout((()=>{const o=U(e,r);n(H({winningGroups:o,drawNumbers:e})),n(q({numbers:e,winningGroups:o.map((e=>e.id))})),n(L(!1))}),1e3)})(n,r)),setTimeout((()=>{e(D(o))}),1500)},isChecking:o,lastCheckResult:t,drawHistory:d})})]})]})]}),w.jsx(tn,{}),b&&w.jsx(Br,{warningGroups:x,dangerGroups:$,soundEnabled:g,onClose:()=>{h(!1)},onGroupClick:e=>{console.log("点击警告号码组:",e)}})]})]})}k.createRoot(document.getElementById("root")).render(w.jsx(d.StrictMode,{children:w.jsx(l,{store:ee,children:w.jsx(Cn,{})})}));
