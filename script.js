document.addEventListener('DOMContentLoaded', () => {
    // 初始化用例交互
    initUseCases();
    
    // 其他现有的初始化代码...
});

function initUseCases() {
    const useCaseItems = document.querySelectorAll('.use-case-item');
    const previewTexts = document.querySelectorAll('.preview-text');
    
    useCaseItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = item.getAttribute('data-index');
            
            // 更新活动状态 - 左侧列表
            useCaseItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // 只更新文字内容
            previewTexts.forEach(i => i.classList.remove('active'));
            document.querySelector(`.preview-text[data-index="${index}"]`).classList.add('active');
            
            // 移除图片切换相关代码
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    let isScrolled = false;
    let scrollTimer;
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        
        // 清除之前的定时器
        clearTimeout(scrollTimer);
        
        // 当滚动超过导航栏高度时添加固定样式
        if (scrollTop > navbarHeight && !isScrolled) {
            // 添加类之前先移除动画类
            navbar.classList.remove('navbar-animate');
            
            // 使用 requestAnimationFrame 确保平滑过渡
            requestAnimationFrame(() => {
                navbar.classList.add('navbar-scrolled');
                document.body.style.paddingTop = navbarHeight + 'px';
                
                // 添加一个小延迟后再添加动画类
                setTimeout(() => {
                    navbar.classList.add('navbar-animate');
                }, 10);
                
                isScrolled = true;
            });
        } 
        // 当滚回顶部时移除固定样式
        else if (scrollTop <= navbarHeight && isScrolled) {
            // 设置一个小延迟，使过渡更自然
            scrollTimer = setTimeout(() => {
                navbar.classList.remove('navbar-scrolled', 'navbar-animate');
                document.body.style.paddingTop = '0';
                isScrolled = false;
            }, 150);
        }
    });
    
    // 初始检查滚动位置
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar-scrolled');
        document.body.style.paddingTop = navbarHeight + 'px';
        isScrolled = true;
    }
});

// 创建增强的同心圆背景元素
document.addEventListener('DOMContentLoaded', function() {
    // 检查圆形元素容器是否存在
    const heroCircles = document.querySelector('.hero-circles');
    if (!heroCircles) {
        console.error('Hero circles container not found');
        return;
    }
    
    // 清除现有圆形
    heroCircles.innerHTML = '';
    
    // 创建8个同心圆，使用非线性半径分布
    const circleCount = 8;
    
    // 非线性半径分布 - 内圈更密集，外圈更稀疏
    const radiusSizes = [80, 160, 260, 380, 520, 680, 860, 1050];
    
    // 更新不透明度值 - 再深一点点
    const opacities = [0.25, 0.22, 0.19, 0.16, 0.13, 0.1, 0.07, 0.05];
    
    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        circle.className = `circle circle-${i+1}`;
        
        // 使用预定义的非线性半径
        const size = radiusSizes[i];
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        
        // 设置边框 - 从深到浅
        circle.style.borderColor = `rgba(93, 77, 179, ${opacities[i]})`;
        circle.style.borderWidth = '2px';
        circle.style.borderStyle = 'solid';
        
        // 确保所有圆形都有更快的脉动效果
        circle.style.animation = `pulse-concentric ${8 + i * 1.2}s infinite ${i % 2 === 0 ? 'alternate' : 'alternate-reverse'} ease-in-out`;
        circle.style.animationDelay = `${i * 0.4}s`;
        
        heroCircles.appendChild(circle);
    }
    
    // 动态调整圆形大小以适应容器
    function updateCircleVisibility() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const heroRect = hero.getBoundingClientRect();
        const minDimension = Math.min(heroRect.width, heroRect.height);
        
        // 如果容器太小，调整圆形大小
        if (minDimension < 1200) {
            const circles = heroCircles.querySelectorAll('.circle');
            const scaleFactor = minDimension / 1200;
            
            circles.forEach((circle, index) => {
                const size = Math.min(minDimension * 0.9, radiusSizes[index] * scaleFactor);
                circle.style.width = `${size}px`;
                circle.style.height = `${size}px`;
            });
        }
    }
    
    // 初始调整和窗口大小变化时调整
    updateCircleVisibility();
    window.addEventListener('resize', updateCircleVisibility);
});

// 更新光晕效果创建函数
function createGlowSpots() {
    // 创建光晕容器
    const glowContainer = document.createElement('div');
    glowContainer.className = 'glow-container';
    document.body.appendChild(glowContainer);
    
    const numberOfSpots = 6;
    
    for (let i = 0; i < numberOfSpots; i++) {
        const spot = document.createElement('div');
        spot.className = 'glow-spot';
        
        // 更大的光晕尺寸 (600-1200px)
        const size = Math.random() * 600 + 600;
        spot.style.width = `${size}px`;
        spot.style.height = `${size}px`;
        
        updateSpotPosition(spot);
        glowContainer.appendChild(spot);
        animateSpot(spot);
    }
}

function updateSpotPosition(spot) {
    // 扩大位置范围，确保光晕可以移动到视口之外
    const x = Math.random() * 150 - 25; // -25% 到 125%
    const y = Math.random() * 150 - 25; // -25% 到 125%
    spot.style.left = `${x}%`;
    spot.style.top = `${y}%`;
    spot.style.transform = `translate(-50%, -50%)`;
}

function animateSpot(spot) {
    const duration = 15000 + Math.random() * 10000; // 15-25秒
    
    const animate = () => {
        updateSpotPosition(spot);
        spot.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        setTimeout(() => {
            animate();
        }, duration);
    };
    
    animate();
}

// 初始化光晕效果
document.addEventListener('DOMContentLoaded', () => {
    createGlowSpots();
});

// 添加滚动渐入效果
document.addEventListener('DOMContentLoaded', function() {
    // 选择所有需要动画的元素
    const animatedElements = document.querySelectorAll('.project-card, .mission-content, .section-header, .use-cases-wrapper, .revolution-content');
    
    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 当元素进入视口时
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // 元素显示后不再观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // 当20%的元素可见时触发
        rootMargin: '0px 0px -100px 0px' // 提前触发一点
    });
    
    // 开始观察所有元素
    animatedElements.forEach(element => {
        element.classList.add('will-animate');
        observer.observe(element);
    });
});

// 视差滚动效果
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const circles = document.querySelectorAll('.circle');
        
        circles.forEach((circle, index) => {
            // 不同的圆以不同的速度移动
            const speed = 0.05 + (index * 0.01);
            const yPos = scrollPosition * speed;
            circle.style.transform = `translate(-50%, calc(-50% - ${yPos}px))`;
        });
        
        // Hero 图片视差效果
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });
});

// 图片加载动画
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 设置初始状态
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // 图片加载完成后淡入
        img.onload = function() {
            img.style.opacity = '1';
        };
        
        // 如果图片已经缓存，直接显示
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}); 