/* ========================================
   作品集加载动画 JavaScript
   功能：背景轮播、进度条、页面加载完成处理
   ======================================== */

(function() {
  'use strict';
  
  // 配置
  const CONFIG = {
    slideInterval: 1200,      // 背景切换间隔（毫秒）
    totalDuration: 3000,      // 总加载时长（毫秒）
    minDisplayTime: 2000,     // 最小显示时长（毫秒）
  };
  
  // 状态
  let currentSlide = 0;
  let loadComplete = false;
  let minTimeElapsed = false;
  
  // 背景轮播
  function startBackgroundCarousel() {
    const slides = document.querySelectorAll('.loader-bg-slide');
    if (slides.length === 0) return;
    
    // 显示第一张
    slides[0].classList.add('active');
    
    // 自动轮播
    const carouselInterval = setInterval(() => {
      if (loadComplete && minTimeElapsed) {
        clearInterval(carouselInterval);
        return;
      }
      
      // 移除当前active
      slides[currentSlide].classList.remove('active');
      
      // 切换到下一张
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, CONFIG.slideInterval);
  }
  
  // 进度条动画
  function animateProgress() {
    const progressText = document.querySelector('.loader-progress-text');
    if (!progressText) return;
    
    let progress = 0;
    const step = 100 / (CONFIG.totalDuration / 50);
    
    const progressInterval = setInterval(() => {
      progress += step;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
      }
      progressText.textContent = Math.floor(progress) + '%';
    }, 50);
  }
  
  // 预加载图片
  function preloadImages(images, callback) {
    let loadedCount = 0;
    const totalImages = images.length;
    
    if (totalImages === 0) {
      callback();
      return;
    }
    
    images.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          callback();
        }
      };
      img.src = src;
    });
  }
  
  // 页面加载完成处理
  function onLoadComplete() {
    loadComplete = true;
    
    // 如果最小时间也已到达，则隐藏加载动画
    if (minTimeElapsed) {
      hideLoader();
    }
  }
  
  // 隐藏加载器
  function hideLoader() {
    const loader = document.querySelector('.portfolio-loader');
    if (!loader) return;
    
    // 添加淡出效果
    loader.classList.add('loaded');
    
    // 移除滚动锁定
    document.body.style.overflow = '';
    
    // 完全移除元素
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 800);
  }
  
  // 初始化
  function init() {
    const loader = document.querySelector('.portfolio-loader');
    if (!loader) return;
    
    // 锁定页面滚动
    document.body.style.overflow = 'hidden';
    
    // 收集所有背景图片URL
    const bgSlides = document.querySelectorAll('.loader-bg-slide img');
    const imageUrls = Array.from(bgSlides).map(img => img.src);
    
    // 预加载图片
    preloadImages(imageUrls, () => {
      // 图片加载完成，开始背景轮播
      startBackgroundCarousel();
    });
    
    // 立即开始背景轮播（不等待图片加载）
    startBackgroundCarousel();
    
    // 启动进度条动画
    animateProgress();
    
    // 最小显示时长计时器
    setTimeout(() => {
      minTimeElapsed = true;
      if (loadComplete) {
        hideLoader();
      }
    }, CONFIG.minDisplayTime);
    
    // 监听页面加载完成
    if (document.readyState === 'complete') {
      onLoadComplete();
    } else {
      window.addEventListener('load', onLoadComplete);
    }
    
    // 备用方案：最长显示时长
    setTimeout(() => {
      if (!loadComplete) {
        loadComplete = true;
      }
      if (!minTimeElapsed) {
        minTimeElapsed = true;
      }
      hideLoader();
    }, CONFIG.totalDuration + 1000);
    
    // 点击加载器跳过（可选）
    loader.addEventListener('click', () => {
      if (loadComplete || minTimeElapsed) {
        loadComplete = true;
        minTimeElapsed = true;
        hideLoader();
      }
    });
  }
  
  // DOM加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
