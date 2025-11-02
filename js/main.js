// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// 欢迎区域动画
document.addEventListener('DOMContentLoaded', function() {
    const welcomeContent = document.querySelector('.welcome-content');
    const welcomeImage = document.querySelector('.welcome-image');
    
    // 添加淡入动画
    setTimeout(() => {
        welcomeContent.style.opacity = '1';
        welcomeContent.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        welcomeImage.style.opacity = '1';
        welcomeImage.style.transform = 'translateY(0)';
    }, 600);
    
    // 初始样式设置
    welcomeContent.style.opacity = '0';
    welcomeContent.style.transform = 'translateY(20px)';
    welcomeContent.style.transition = 'opacity 0.8s, transform 0.8s';
    
    welcomeImage.style.opacity = '0';
    welcomeImage.style.transform = 'translateY(20px)';
    welcomeImage.style.transition = 'opacity 0.8s, transform 0.8s';
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .stat, .contact-item, .portfolio-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});

// 表单提交处理
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // 这里可以添加表单提交逻辑
    console.log('表单提交:', { name, email, message });
    
    // 显示成功消息
    alert('感谢您的留言！我们会尽快与您联系。');
    
    // 重置表单
    this.reset();
});

// 添加滚动时元素的视差效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.tech-illustration .circle');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.05 * (index + 1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// 添加服务卡片点击事件
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // 如果卡片有链接，不需要额外处理
        if (this.getAttribute('href')) {
            return;
        }
        
        // 否则可以添加默认行为
        e.preventDefault();
        const title = this.querySelector('h3').textContent;
        alert(`您点击了 ${title} 服务`);
    });
});