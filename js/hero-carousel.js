/* ============================================
   Hero 完整内容轮播控制器
   支持独立内容切换、键盘、触摸、自动播放
   ============================================ */

class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero-carousel-slide');
        this.indicators = document.querySelectorAll('.hero-indicator');
        this.prevBtn = document.querySelector('.hero-carousel-control.prev');
        this.nextBtn = document.querySelector('.hero-carousel-control.next');
        this.pauseBtn = document.querySelector('.hero-carousel-pause');
        this.pauseIcon = this.pauseBtn?.querySelector('.pause-icon');
        this.playIcon = this.pauseBtn?.querySelector('.play-icon');
        
        this.autoplayInterval = null;
        this.autoplayDelay = 4000; // 4秒切换，更流畅的节奏
        this.isPlaying = true;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // 设置初始状态
        this.showSlide(0);
        
        // 绑定事件
        this.bindEvents();
        
        // 启动自动播放
        this.startAutoplay();
        
        console.log('🎬 Hero Carousel 已初始化，共', this.slides.length, '个 Slide');
    }
    
    bindEvents() {
        // 左右箭头
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // 指示器
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // 暂停/播放按钮
        this.pauseBtn?.addEventListener('click', () => this.toggleAutoplay());
        
        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoplay();
            }
        });
        
        // 触摸滑动
        const wrapper = document.querySelector('.hero-carousel-wrapper');
        if (wrapper) {
            wrapper.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            wrapper.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
        }
        
        // 鼠标悬停时暂停
        wrapper?.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.stopAutoplay();
                this.wasPlayingBeforeHover = true;
            }
        });
        
        wrapper?.addEventListener('mouseleave', () => {
            if (this.wasPlayingBeforeHover) {
                this.startAutoplay();
                this.wasPlayingBeforeHover = false;
            }
        });
    }
    
    showSlide(index) {
        // 移除所有 active 状态
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 添加新的 active 状态
        this.slides[index].classList.add('active');
        this.indicators[index]?.classList.add('active');
        
        this.currentSlide = index;
        
        console.log('📍 切换到 Slide', index + 1);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (index === this.currentSlide) return;
        
        this.showSlide(index);
        
        // 重置自动播放计时器
        if (this.isPlaying) {
            this.stopAutoplay();
            this.startAutoplay();
        }
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide(); // 向左滑动
            } else {
                this.prevSlide(); // 向右滑动
            }
        }
    }
    
    startAutoplay() {
        this.stopAutoplay(); // 先清除现有定时器
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
        this.isPlaying = true;
        this.updatePlayPauseIcon();
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
        this.isPlaying = false;
        this.updatePlayPauseIcon();
    }
    
    toggleAutoplay() {
        if (this.isPlaying) {
            this.stopAutoplay();
            console.log('⏸ 自动播放已暂停');
        } else {
            this.startAutoplay();
            console.log('▶️ 自动播放已恢复');
        }
    }
    
    updatePlayPauseIcon() {
        if (!this.pauseIcon || !this.playIcon) return;
        
        if (this.isPlaying) {
            this.pauseIcon.style.display = 'block';
            this.playIcon.style.display = 'none';
        } else {
            this.pauseIcon.style.display = 'none';
            this.playIcon.style.display = 'block';
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroCarousel;
}
