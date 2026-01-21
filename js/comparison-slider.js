/* ========================================
   Before/After 滑动对比组件 - JavaScript
   ======================================== */

class ComparisonSlider {
  constructor(element) {
    this.slider = element;
    this.container = this.slider.querySelector('.comparison-container');
    this.after = this.slider.querySelector('.comparison-after');
    this.handle = this.slider.querySelector('.comparison-handle');
    
    this.isDragging = false;
    this.currentPosition = 50; // 初始位置 50%
    
    this.init();
  }
  
  init() {
    // 鼠标/触摸事件
    this.slider.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.onDrag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));
    
    // 触摸事件
    this.slider.addEventListener('touchstart', this.startDrag.bind(this));
    document.addEventListener('touchmove', this.onDrag.bind(this));
    document.addEventListener('touchend', this.endDrag.bind(this));
    
    // 点击直接跳转
    this.slider.addEventListener('click', this.onDirectClick.bind(this));
    
    // 键盘控制
    this.slider.setAttribute('tabindex', '0');
    this.slider.addEventListener('keydown', this.onKeydown.bind(this));
    
    // 初始化动画
    setTimeout(() => {
      this.slider.classList.add('animate-in');
    }, 100);
  }
  
  startDrag(e) {
    // 防止拖动标签
    if (e.target.classList.contains('comparison-label')) {
      return;
    }
    
    this.isDragging = true;
    this.slider.classList.add('dragging');
    e.preventDefault();
  }
  
  onDrag(e) {
    if (!this.isDragging) return;
    
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    this.updatePosition(x);
  }
  
  endDrag() {
    this.isDragging = false;
    this.slider.classList.remove('dragging');
  }
  
  onDirectClick(e) {
    // 如果不是拖动,而是直接点击
    if (this.isDragging) return;
    
    const x = e.pageX;
    this.updatePosition(x, true);
  }
  
  updatePosition(clientX, animated = false) {
    const rect = this.slider.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    this.currentPosition = percentage;
    
    // 更新裁剪路径
    if (animated) {
      this.after.style.transition = 'clip-path 0.3s ease';
    } else {
      this.after.style.transition = 'none';
    }
    
    this.after.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    
    // 更新手柄位置
    this.handle.style.left = `${percentage}%`;
    
    // 清除过渡效果
    if (animated) {
      setTimeout(() => {
        this.after.style.transition = 'clip-path 0.05s ease';
      }, 300);
    }
  }
  
  onKeydown(e) {
    let newPosition = this.currentPosition;
    
    switch(e.key) {
      case 'ArrowLeft':
        newPosition = Math.max(0, this.currentPosition - 5);
        break;
      case 'ArrowRight':
        newPosition = Math.min(100, this.currentPosition + 5);
        break;
      case 'Home':
        newPosition = 0;
        break;
      case 'End':
        newPosition = 100;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    this.currentPosition = newPosition;
    
    // 计算实际像素位置
    const rect = this.slider.getBoundingClientRect();
    const x = (newPosition / 100) * rect.width + rect.left;
    
    this.updatePosition(x, true);
  }
}

// 自动初始化所有对比滑块
function initComparisonSliders() {
  const sliders = document.querySelectorAll('.comparison-slider');
  sliders.forEach(slider => {
    new ComparisonSlider(slider);
  });
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComparisonSliders);
} else {
  initComparisonSliders();
}

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComparisonSlider;
}
