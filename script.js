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

            if (document.body.classList.contains('light-mode')) {
                ctx.fillStyle = `rgba(255, 138, 0, ${this.opacity})`;
            } else {
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
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
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

    document.querySelectorAll('.menu-links-mobile a').forEach(link => {
        link.addEventListener('click', function() {
            menuHamburger.classList.remove('active');
            menuMobile.classList.remove('active');
        });
    });

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

    function isLocalHost() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
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

        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && e.key === 'U') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && e.key === 'S') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);

        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);

        function detectDevTools() {
            const start = Date.now();
            debugger;
            const end = Date.now();
            if (end - start > 100) {
                document.body.innerHTML = `
                    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #0a0a0a; color: white; font-family: Arial, sans-serif;">
                        <div style="text-align: center; padding: 20px;">
                            <h1 style="color: #ff4444; margin-bottom: 20px;">🚫 Инструменты разработчика отключены</h1>
                            <p>В целях безопасности использование DevTools запрещено.</p>
                            <p style="color: #888; margin-top: 20px; font-size: 14px;">Pulse Academy Security System</p>
                        </div>
                    </div>
                `;
                setInterval(() => { debugger; }, 100);
            }
        }

        setInterval(detectDevTools, 1000);

        console.log = function() {};
        console.warn = function() {};
        console.error = function() {};
        console.info = function() {};
        console.debug = function() {};
        console.clear = function() {};

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

    // Прелоадер
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        const percElement = document.querySelector('.perc');
        const statusElement = document.querySelector('.status');

        if (preloader) {
            let progress = 0;
            const statusMessages = ['LOADING MODULES...', 'INITIALIZING...', 'CONNECTING TO BLOCKCHAIN...', 'PULSE ACTIVE...', 'READY...'];
            let msgIndex = 0;

            const interval = setInterval(() => {
                if (progress < 100) {
                    progress += Math.floor(Math.random() * 15) + 5;
                    if (progress > 100) progress = 100;
                    if (percElement) percElement.textContent = progress + '%';

                    if (progress > 30 && msgIndex === 0) {
                        msgIndex = 1;
                        if (statusElement) statusElement.textContent = statusMessages[1];
                    }
                    if (progress > 60 && msgIndex === 1) {
                        msgIndex = 2;
                        if (statusElement) statusElement.textContent = statusMessages[2];
                    }
                    if (progress > 85 && msgIndex === 2) {
                        msgIndex = 3;
                        if (statusElement) statusElement.textContent = statusMessages[3];
                    }
                } else {
                    clearInterval(interval);
                    if (statusElement) statusElement.textContent = statusMessages[4];
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 800);
                    }, 400);
                }
            }, 60);
        }
    });

    // ========== ОТСЛЕЖИВАНИЕ КЛИКОВ ==========
    document.addEventListener('DOMContentLoaded', function() {
        const freeCourseBtn = document.querySelector('.free-course .cta-button');
        if (freeCourseBtn) {
            freeCourseBtn.addEventListener('click', function() {
                if (typeof ym !== 'undefined') ym(108437518, 'reachGoal', 'click_free_course');
            });
        }

        const proCourseBtn = document.getElementById('learnMoreBtn');
        if (proCourseBtn) {
            proCourseBtn.addEventListener('click', function() {
                if (typeof ym !== 'undefined') ym(108437518, 'reachGoal', 'click_pro_course');
            });
        }

        const modalBtn = document.querySelector('.modal .cta-button');
        if (modalBtn) {
            modalBtn.addEventListener('click', function() {
                if (typeof ym !== 'undefined') ym(108437518, 'reachGoal', 'click_modal_access');
            });
        }

        const botBtns = document.querySelectorAll('.bot-btn, .social-links a[href*="t.me"]');
        botBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (typeof ym !== 'undefined') ym(108437518, 'reachGoal', 'click_bot');
            });
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        function sendGAEvent(eventName) {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, { 'event_category': 'button_click', 'event_label': eventName });
            }
        }

        const freeCourseBtn = document.querySelector('.free-course .cta-button');
        if (freeCourseBtn) freeCourseBtn.addEventListener('click', () => sendGAEvent('click_free_course'));

        const proCourseBtn = document.getElementById('learnMoreBtn');
        if (proCourseBtn) proCourseBtn.addEventListener('click', () => sendGAEvent('click_pro_course'));

        const modalBtn = document.querySelector('.modal .cta-button');
        if (modalBtn) modalBtn.addEventListener('click', () => sendGAEvent('click_modal_access'));

        const botBtns = document.querySelectorAll('.bot-btn, .social-links a[href*="t.me"]');
        botBtns.forEach(btn => btn.addEventListener('click', () => sendGAEvent('click_bot')));
    });

    // ========== ЗАГРУЗКА ОЦЕНОК ==========
    async function loadCourseRating() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Oksyoldev/pulse-ratings/main/rating_stats.json');
            if (!response.ok) return;
            const data = await response.json();

            if (data.free && data.free.count > 0) {
                updateRatingDisplay('free', data.free.average, data.free.count);
            } else {
                updateRatingDisplay('free', 0, 0);
            }

            if (data.pro && data.pro.count > 0) {
                updateRatingDisplay('pro', data.pro.average, data.pro.count);
            } else {
                updateRatingDisplay('pro', 0, 0);
            }
        } catch(e) {
            console.log('⚠️ Ошибка загрузки оценок:', e);
        }
    }

    function updateRatingDisplay(courseType, rating, count) {
        const container = document.getElementById(`${courseType}-course-rating`);
        if (!container) return;

        const valueSpan = container.querySelector('.rating-value');
        const starsDiv = container.querySelector('.rating-stars');
        const countSpan = container.querySelector('.count-number');

        if (valueSpan) valueSpan.textContent = rating.toFixed(1);
        if (countSpan) countSpan.textContent = count;

        if (starsDiv) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) starsHtml += '★';
                else if (i === fullStars + 1 && hasHalfStar) starsHtml += '½';
                else starsHtml += '☆';
            }
            starsDiv.innerHTML = starsHtml;
        }
    }

    function initRatingTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.rating-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const courseType = tab.getAttribute('data-course');
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                contents.forEach(content => content.classList.remove('active'));
                const activeContent = document.getElementById(`${courseType}-course-rating`);
                if (activeContent) activeContent.classList.add('active');
            });
        });
    }

    // ========== ЗАГРУЗКА ОТЗЫВОВ С РАЗДЕЛЕНИЕМ ==========
    let currentReviewType = 'free';

    async function loadRealReviews() {
        const container = document.getElementById('reviews-container');
        if (!container) return;

        try {
            const response = await fetch('https://raw.githubusercontent.com/Oksyoldev/pulse-ratings/main/reviews.json');
            if (!response.ok) {
                container.innerHTML = '<div class="loading-reviews">📭 Пока нет отзывов. Будь первым!</div>';
                return;
            }

            const data = await response.json();
            const reviewsData = data[currentReviewType];

            if (!reviewsData || reviewsData.reviews.length === 0) {
                container.innerHTML = '<div class="loading-reviews">📭 Пока нет отзывов об этом курсе. Будь первым!</div>';
                return;
            }

            container.innerHTML = '';

            reviewsData.reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';

                let dateStr = 'недавно';
                if (review.date) {
                    const date = new Date(review.date);
                    dateStr = date.toLocaleDateString('ru-RU');
                }

                let starsHtml = '';
                if (review.rating && review.rating > 0) {
                    starsHtml = '<div class="review-rating">' + '⭐'.repeat(review.rating) + '</div>';
                }

                let avatarHtml = '';
                if (review.photo_url) {
                    const photoUrl = `https://raw.githubusercontent.com/Oksyoldev/pulse-ratings/main/${review.photo_url}`;
                    avatarHtml = `<img src="${photoUrl}" class="review-photo" alt="${review.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'review-initials\'>${getInitials(review.name)}</div>'">`;
                } else {
                    avatarHtml = `<div class="review-initials">${getInitials(review.name)}</div>`;
                }

                reviewCard.innerHTML = `
                    <div class="review-avatar">${avatarHtml}</div>
                    <div class="review-content">
                        <div class="review-name">${escapeHtml(review.name)}</div>
                        ${starsHtml}
                        <div class="review-text">"${escapeHtml(review.review)}"</div>
                        <div class="review-date">📅 ${dateStr}</div>
                    </div>
                `;
                container.appendChild(reviewCard);
            });

        } catch(e) {
            console.log('⚠️ Ошибка загрузки отзывов:', e);
            container.innerHTML = '<div class="loading-reviews">⚠️ Не удалось загрузить отзывы. Попробуйте позже.</div>';
        }
    }

    function initReviewTabs() {
        const tabs = document.querySelectorAll('.reviews-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const reviewType = tab.getAttribute('data-review-tab');
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentReviewType = reviewType;
                loadRealReviews();
            });
        });
    }

    function getInitials(name) {
        if (!name || name.length === 0) return '👤';
        if (name.length === 1) return name.toUpperCase();
        return name.substring(0, 2).toUpperCase();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Запуск
    document.addEventListener('DOMContentLoaded', function() {
        loadCourseRating();
        initRatingTabs();
        loadRealReviews();
        initReviewTabs();

        setInterval(loadCourseRating, 5 * 60 * 1000);
        setInterval(loadRealReviews, 10 * 60 * 1000);
    });
})();