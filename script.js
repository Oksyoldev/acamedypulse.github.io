document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
});

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 150; 

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            
            // Меняем базовый цвет в зависимости от темы
            if (document.body.classList.contains('light-mode')) {
                this.color = `rgba(255, 138, 0, ${Math.random() * 0.7})`;
            } else {
                this.color = `rgba(0, 255, 135, ${Math.random() * 0.7})`;
            }
            
            this.opacity = Math.random() * 0.7 + 0.3;
            this.baseOpacity = this.opacity;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

            this.opacity = this.baseOpacity * (0.5 + Math.sin(Date.now() * 0.001) * 0.5);
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            // Меняем цвет частиц в зависимости от темы
            if (document.body.classList.contains('light-mode')) {
                // Оранжевые частицы для светлой темы
                ctx.fillStyle = `rgba(255, 138, 0, ${this.opacity})`;
            } else {
                // Зеленые частицы для темной темы
                ctx.fillStyle = `rgba(0, 255, 135, ${this.opacity})`;
            }
            
            ctx.fill();
        }
    }

    function init() {
        particles.length = 0; 
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    const modal = document.getElementById('courseModal');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const closeBtn = document.querySelector('.close-btn');

    learnMoreBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    init();
    animate();


});


// Плавная прокрутка для меню
document.querySelectorAll('.menu-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Гамбургер меню для мобильных
const menuHamburger = document.getElementById('menuHamburger');
const menuMobile = document.getElementById('menuMobile');

if (menuHamburger && menuMobile) {
    menuHamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        menuMobile.classList.toggle('active');
    });
    
    // Закрываем меню при клике на ссылку
    document.querySelectorAll('.menu-links-mobile a').forEach(link => {
        link.addEventListener('click', function() {
            menuHamburger.classList.remove('active');
            menuMobile.classList.remove('active');
        });
    });
    
    // Закрываем меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.fixed-menu')) {
            menuHamburger.classList.remove('active');
            menuMobile.classList.remove('active');
        }
    });
}

// Усиленная блокировка консоли разработчика
(function() {
    'use strict';
    
    // Разрешенные локальные хосты
    function isLocalHost() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        // Все локальные протоколы и адреса
        if (protocol === 'file:') return true;
        if (hostname === '') return true;
        if (hostname === 'localhost') return true;
        if (hostname === '127.0.0.1') return true;
        if (hostname.startsWith('192.168.')) return true;
        if (hostname.startsWith('10.0.')) return true;
        if (hostname.startsWith('172.')) return true;
        if (hostname.endsWith('.local')) return true;
        
        return false;
    }
    
    const isLocal = isLocalHost();
    
    if (!isLocal) {
        console.log('🔒 Активирована защита Pulse Academy');
        
        // === БЛОКИРОВКА КЛАВИШ ===
        document.addEventListener('keydown', function(e) {
            // F12
            if (e.key === 'F12') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Ctrl+Shift+I
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Ctrl+Shift+J
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Ctrl+Shift+C
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Ctrl+U
            if (e.ctrlKey && e.key === 'U') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Ctrl+S
            if (e.ctrlKey && e.key === 'S') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Mac: Cmd+Opt+I, Cmd+Opt+J, Cmd+Opt+C
            if (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
        
        // === БЛОКИРОВКА ПРАВОГО КЛИКА ===
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        
        // === ОБНАРУЖЕНИЕ ОТКРЫТОЙ КОНСОЛИ ===
        function detectDevTools() {
            const start = Date.now();
            debugger;
            const end = Date.now();
            
            if (end - start > 100) {
                // DevTools открыты
                document.body.innerHTML = `
                    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #0a0a0a; color: white; font-family: Arial, sans-serif;">
                        <div style="text-align: center; padding: 20px;">
                            <h1 style="color: #ff4444; margin-bottom: 20px;">🚫 Инструменты разработчика отключены</h1>
                            <p>В целях безопасности использование DevTools запрещено.</p>
                            <p style="color: #888; margin-top: 20px; font-size: 14px;">Pulse Academy Security System</p>
                        </div>
                    </div>
                `;
                // Бесконечный цикл для блокировки
                setInterval(() => { debugger; }, 100);
            }
        }
        
        // Запускаем обнаружение
        setInterval(detectDevTools, 1000);
        
        // === БЛОКИРОВКА КОНСОЛИ ===
        const originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info,
            debug: console.debug
        };
        
        // Переопределяем console методы
        console.log = function() {};
        console.warn = function() {};
        console.error = function() {};
        console.info = function() {};
        console.debug = function() {};
        console.clear = function() {};
        
        // Блокируем доступ к console
        Object.defineProperty(window, 'console', {
            get: function() {
                return {
                    log: function() {},
                    warn: function() {},
                    error: function() {},
                    info: function() {},
                    debug: function() {},
                    clear: function() {}
                };
            },
            set: function() {}
        });
        
    } else {
        console.log('🔓 Локальный режим - все инструменты доступны');
    }
    
})();