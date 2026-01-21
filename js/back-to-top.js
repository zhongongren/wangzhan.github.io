/**
 * 回到顶部功能
 * 自动初始化，无需手动调用
 */

(function() {
    'use strict';
    
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        initBackToTop();
    });
    
    function initBackToTop() {
        // 创建回到顶部按钮（如果页面中不存在）
        let backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) {
            backToTopBtn = createBackToTopButton();
            document.body.appendChild(backToTopBtn);
        }
        
        // 监听滚动事件
        let scrollThreshold = 300; // 滚动超过300px显示按钮
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    toggleButtonVisibility(backToTopBtn, scrollThreshold);
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // 点击回到顶部
        backToTopBtn.addEventListener('click', function() {
            scrollToTop();
        });
    }
    
    // 创建回到顶部按钮HTML
    function createBackToTopButton() {
        const btn = document.createElement('div');
        btn.id = 'backToTop';
        btn.className = 'back-to-top';
        btn.setAttribute('title', '回到顶部');
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-label', '回到页面顶部');
        
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12L5.41 13.41L11 7.83V20H13V7.83L18.59 13.41L20 12L12 4Z"/>
            </svg>
        `;
        
        return btn;
    }
    
    // 切换按钮显示状态
    function toggleButtonVisibility(btn, threshold) {
        if (window.pageYOffset > threshold) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }
    
    // 平滑滚动到顶部
    function scrollToTop() {
        // 优先使用原生平滑滚动
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // 降级方案：兼容老浏览器
            smoothScrollTo(0, 600);
        }
    }
    
    // 兼容性平滑滚动实现
    function smoothScrollTo(targetY, duration) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();
        
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 缓动函数（easeInOutCubic）
            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startY + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    // 键盘快捷键支持（可选）
    document.addEventListener('keydown', function(e) {
        // Home键回到顶部
        if (e.key === 'Home' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
            const activeElement = document.activeElement;
            // 只在非输入框时触发
            if (activeElement.tagName !== 'INPUT' && 
                activeElement.tagName !== 'TEXTAREA' && 
                !activeElement.isContentEditable) {
                e.preventDefault();
                scrollToTop();
            }
        }
    });
    
})();
