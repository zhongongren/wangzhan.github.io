// ============================================
// 轮播Banner - JavaScript
// ============================================

(function() {
    'use strict';
    
    // 配置参数
    const config = {
        autoPlayInterval: 5000, // 自动播放间隔（毫秒）
        transitionDuration: 1000 // 切换动画时长（毫秒）
    };
    
    // DOM元素
    const carousel = {
        container: document.querySelector('.carousel-container'),
        slides: document.querySelectorAll('.carousel-slide'),
        indicators: document.querySelectorAll('.indicator'),
        prevBtn: document.querySelector('.carousel-control.prev'),
        nextBtn: document.querySelector('.carousel-control.next'),
        pauseBtn: document.querySelector('.carousel-pause'),
        pauseIcon: document.querySelector('.pause-icon'),
        playIcon: document.querySelector('.play-icon')
    };
    
    // 状态管理
    let state = {
        currentIndex: 0,
        isPlaying: true,
        autoPlayTimer: null,
        isTransitioning: false
    };
    
    // 初始化
    function init() {
        if (!carousel.container || carousel.slides.length === 0) {
            console.warn('轮播元素未找到');
            return;
        }
        
        // 设置初始状态
        showSlide(0);
        
        // 绑定事件
        bindEvents();
        
        // 启动自动播放
        startAutoPlay();
        
        console.log('轮播Banner初始化成功');
    }
    
    // 绑定事件
    function bindEvents() {
        // 上一张按钮
        if (carousel.prevBtn) {
            carousel.prevBtn.addEventListener('click', () => {
                prevSlide();
            });
        }
        
        // 下一张按钮
        if (carousel.nextBtn) {
            carousel.nextBtn.addEventListener('click', () => {
                nextSlide();
            });
        }
        
        // 暂停/播放按钮
        if (carousel.pauseBtn) {
            carousel.pauseBtn.addEventListener('click', () => {
                togglePlayPause();
            });
        }
        
        // 指示器点击
        carousel.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === ' ') {
                e.preventDefault();
                togglePlayPause();
            }
        });
        
        // 鼠标悬停暂停
        if (carousel.container) {
            carousel.container.addEventListener('mouseenter', () => {
                if (state.isPlaying) {
                    pauseAutoPlay();
                }
            });
            
            carousel.container.addEventListener('mouseleave', () => {
                if (state.isPlaying) {
                    startAutoPlay();
                }
            });
        }
        
        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (carousel.container) {
            carousel.container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            carousel.container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }
    
    // 显示指定幻灯片
    function showSlide(index) {
        if (state.isTransitioning) return;
        
        state.isTransitioning = true;
        state.currentIndex = index;
        
        // 移除所有active类
        carousel.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        carousel.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // 添加active类到当前幻灯片
        carousel.slides[index].classList.add('active');
        carousel.indicators[index].classList.add('active');
        
        // 重置过渡锁
        setTimeout(() => {
            state.isTransitioning = false;
        }, config.transitionDuration);
    }
    
    // 下一张
    function nextSlide() {
        const nextIndex = (state.currentIndex + 1) % carousel.slides.length;
        goToSlide(nextIndex);
    }
    
    // 上一张
    function prevSlide() {
        const prevIndex = (state.currentIndex - 1 + carousel.slides.length) % carousel.slides.length;
        goToSlide(prevIndex);
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        if (index === state.currentIndex || state.isTransitioning) return;
        
        showSlide(index);
        
        // 重置自动播放计时器
        if (state.isPlaying) {
            stopAutoPlay();
            startAutoPlay();
        }
    }
    
    // 启动自动播放
    function startAutoPlay() {
        if (state.autoPlayTimer) {
            clearInterval(state.autoPlayTimer);
        }
        
        state.autoPlayTimer = setInterval(() => {
            nextSlide();
        }, config.autoPlayInterval);
    }
    
    // 暂停自动播放
    function pauseAutoPlay() {
        if (state.autoPlayTimer) {
            clearInterval(state.autoPlayTimer);
            state.autoPlayTimer = null;
        }
    }
    
    // 停止自动播放
    function stopAutoPlay() {
        pauseAutoPlay();
    }
    
    // 切换播放/暂停
    function togglePlayPause() {
        state.isPlaying = !state.isPlaying;
        
        if (state.isPlaying) {
            startAutoPlay();
            if (carousel.pauseIcon) carousel.pauseIcon.style.display = 'block';
            if (carousel.playIcon) carousel.playIcon.style.display = 'none';
        } else {
            stopAutoPlay();
            if (carousel.pauseIcon) carousel.pauseIcon.style.display = 'none';
            if (carousel.playIcon) carousel.playIcon.style.display = 'block';
        }
    }
    
    // 页面可见性变化时暂停/恢复
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAutoPlay();
        } else if (state.isPlaying) {
            startAutoPlay();
        }
    });
    
    // 当DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
