/**
 * 音频播放工具类
 */
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.isEnabled = true;
    this.volume = 0.7;
    
    // 初始化音频上下文
    this.initAudioContext();
  }
  
  /**
   * 初始化音频上下文
   */
  initAudioContext() {
    try {
      // 使用Web Audio API创建音频上下文
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioContext = new AudioContext();
      }
    } catch (error) {
      console.warn('音频上下文初始化失败:', error);
    }
  }
  
  /**
   * 播放警告提示音（严重警告）
   */
  playWarningSound() {
    if (!this.isEnabled || !this.audioContext) return;
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // 设置警告音频率和音量
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + 0.3);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
      
    } catch (error) {
      console.warn('播放警告音失败:', error);
    }
  }
  
  /**
   * 播放提示音（普通提示）
   */
  playNotificationSound() {
    if (!this.isEnabled || !this.audioContext) return;
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // 设置提示音频率和音量
      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime + 0.01);
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + 0.15);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.15);
      
    } catch (error) {
      console.warn('播放提示音失败:', error);
    }
  }
  
  /**
   * 播放成功提示音
   */
  playSuccessSound() {
    if (!this.isEnabled || !this.audioContext) return;
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // 设置成功音效：上升音调
      oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(500, this.audioContext.currentTime + 0.2);
      oscillator.type = 'triangle';
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(this.volume * 0.6, this.audioContext.currentTime + 0.01);
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + 0.25);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.25);
      
    } catch (error) {
      console.warn('播放成功音失败:', error);
    }
  }
  
  /**
   * 设置音频开关
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }
  
  /**
   * 设置音量
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
  
  /**
   * 恢复音频上下文（用户交互后）
   */
  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// 创建全局音频管理器实例
const audioManager = new AudioManager();

// 导出便捷函数
export const playWarningSound = () => audioManager.playWarningSound();
export const playNotificationSound = () => audioManager.playNotificationSound();
export const playSuccessSound = () => audioManager.playSuccessSound();
export const setAudioEnabled = (enabled) => audioManager.setEnabled(enabled);
export const setAudioVolume = (volume) => audioManager.setVolume(volume);
export const resumeAudioContext = () => audioManager.resumeAudioContext();

export default audioManager; 