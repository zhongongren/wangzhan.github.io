/* ========================================
   作品集加载动画 V3.0 JavaScript
   功能：图片拼贴、Slogan轮播、进度条
   ======================================== */

(function() {
  'use strict';
  
  // 配置
  const CONFIG = {
    sloganInterval: 3000,     // Slogan切换间隔（毫秒）
    totalDuration: 2500,      // 总加载时长（毫秒）
    minDisplayTime: 2000,     // 最小显示时长（毫秒）
  };
  
  // 状态
  let currentSlogan = 0;
  let sloganTimer = null;
  let loadComplete = false;
  let minTimeElapsed = false;
  
  // Slogan轮播
  function startSloganCarousel() {
    const slogans = document.querySelectorAll('.slogan-item');
    const indicators = document.querySelectorAll('.slogan-indicator');
    
    if (slogans.length === 0) return;
    
    // 显示第一个
    slogans[0].classList.add('active');
    indicators[0].classList.add('active');
    
    // 自动轮播
    sloganTimer = setInterval(() => {
      if (loadComplete && minTimeElapsed) {
        clearInterval(sloganTimer);
        return;
      }
      
      // 移除当前active
      slogans[currentSlogan].classList.remove('active');
      slogans[currentSlogan].classList.add('prev');
      indicators[currentSlogan].classList.remove('active');
      
      // 切换到下一个
      currentSlogan = (currentSlogan + 1) % slogans.length;
      
      // 清除prev类
      setTimeout(() => {
        slogans.forEach(s => s.classList.remove('prev', 'next'));
      }, 1000);
      
      // 显示新的
      slogans[currentSlogan].classList.add('active');
      indicators[currentSlogan].classList.add('active');
    }, CONFIG.sloganInterval);
  }
  
  // 手动切换Slogan
  function setupIndicators() {
    const indicators = document.querySelectorAll('.slogan-indicator');
    const slogans = document.querySelectorAll('.slogan-item');
    
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        if (index === currentSlogan) return;
        
        // 清除自动轮播
        clearInterval(sloganTimer);
        
        // 切换Slogan
        slogans[currentSlogan].classList.remove('active');
        indicators[currentSlogan].classList.remove('active');
        
        currentSlogan = index;
        
        slogans[currentSlogan].classList.add('active');
        indicators[currentSlogan].classList.add('active');
        
        // 重新启动自动轮播
        startSloganCarousel();
      });
    });
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
    
    if (minTimeElapsed) {
      hideLoader();
    }
  }
  
  // 隐藏加载器
  function hideLoader() {
    const loader = document.querySelector('.portfolio-loader');
    if (!loader) return;
    
    // 停止Slogan轮播
    clearInterval(sloganTimer);
    
    // 添加淡出效果
    loader.classList.add('loaded');
    
    // 移除滚动锁定
    document.body.style.overflow = '';
    
    // 完全移除元素
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 1000);
  }
  
  // 随机高亮图片
  function highlightRandomItems() {
    const items = document.querySelectorAll('.gallery-item');
    const highlightCount = Math.floor(items.length * 0.3); // 30%高亮
    
    // 随机选择几个高亮
    const indices = [];
    while (indices.length < highlightCount) {
      const random = Math.floor(Math.random() * items.length);
      if (!indices.includes(random)) {
        indices.push(random);
      }
    }
    
    indices.forEach(index => {
      items[index].classList.add('highlight');
    });
  }
  
  // 初始化
  function init() {
    const loader = document.querySelector('.portfolio-loader');
    if (!loader) return;
    
    // 锁定页面滚动
    document.body.style.overflow = 'hidden';
    
    // 收集所有背景图片URL
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const imageUrls = Array.from(galleryItems).map(img => img.src);
    
    // 预加载图片
    preloadImages(imageUrls, () => {
      console.log('Gallery images loaded');
    });
    
    // 随机高亮图片
    setTimeout(() => {
      highlightRandomItems();
    }, 800);
    
    // 启动Slogan轮播
    setTimeout(() => {
      startSloganCarousel();
      setupIndicators();
    }, 1200);
    
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
    
    // 点击加载器跳过
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
