// ===========================
// CONFIGURACIÓN GENERAL
// ===========================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeHeroScroll();
    initializeHoverEffects();
    initializePerformance();
});

// ===========================
// NAVEGACIÓN MÓVIL
// ===========================

function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// ===========================
// SCROLL SUAVE
// ===========================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===========================
// ANIMACIONES EN SCROLL
// ===========================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos con clases de animación
    document.querySelectorAll('.product-card, .advantage-card, .testimonial-card, .process-step').forEach(el => {
        observer.observe(el);
    });
}

// ===========================
// SCROLL DEL HERO
// ===========================

function initializeHeroScroll() {
    const heroScroll = document.querySelector('.hero-scroll');
    
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// ===========================
// EFECTOS HOVER
// ===========================

function initializeHoverEffects() {
    // Efecto en imágenes del hero
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Efecto en cards de ventajas
    document.querySelectorAll('.advantage-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, transparent 100%)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
}

// ===========================
// OPTIMIZACIÓN DE PERFORMANCE
// ===========================

function initializePerformance() {
    // Lazy loading de imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
    
    // Preload de fuentes
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap';
    link.type = 'font/woff2';
    document.head.appendChild(link);
}

// ===========================
// FUNCIONES DE UTILIDAD
// ===========================

// Scroll spy para la navegación
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mostrar/Ocultar navbar de forma suave
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 80) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===========================
// CONTADOR ANIMADO
// ===========================

function animateCounters() {
    const counters = document.querySelectorAll('.highlight-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const increment = target / 30;
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = element.textContent;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Ejecutar animación de contadores cuando esté lista
document.addEventListener('DOMContentLoaded', animateCounters);

// ===========================
// EFECTOS INTERACTIVOS
// ===========================

// Efecto de cambio de color en scroll
const updateAccentColor = () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Cambiar intensidad del color de acento basado en scroll
    const root = document.documentElement;
    if (scrollPercent > 50) {
        root.style.setProperty('--shadow-lg', '0 20px 40px rgba(212, 165, 116, 0.15)');
    } else {
        root.style.setProperty('--shadow-lg', '0 20px 40px rgba(0, 0, 0, 0.2)');
    }
};

window.addEventListener('scroll', updateAccentColor, { passive: true });

// ===========================
// MANEJO DE FORMULARIOS
// ===========================

// Validación simple de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===========================
// NOTIFICACIONES Y ALERTAS
// ===========================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#25d366' : '#ff6b6b'};
        color: white;
        border-radius: 4px;
        z-index: 10000;
        animation: slideUp 0.3s ease-out;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================
// EVENTOS DE SEGUIMIENTO
// ===========================

// Google Analytics tracking (descomentar si tienes GA configurado)
/*
function trackEvent(category, action, label) {
    if (gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}
*/

// Rastrear clics en CTA
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        // trackEvent('CTA', 'Click', this.textContent.trim());
    });
});

// ===========================
// FUNCIONALIDAD ADICIONAL
// ===========================

// Detectar dispositivo móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Permitir tapeo más fácil en móviles
if (isMobileDevice()) {
    document.querySelectorAll('a, button').forEach(element => {
        const originalPadding = window.getComputedStyle(element).padding;
        element.style.padding = 'calc(' + originalPadding + ' + 8px)';
    });
}

// ===========================
// INICIALIZACIÓN FINAL
// ===========================

// Ocultar splash screen o loader si existe
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Trigger para lazy loading una vez todo cargue
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    }
});

// ===========================
// MEJORAS DE ACCESIBILIDAD
// ===========================

// Mejorar navegación por teclado
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #d4a574';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Soporte para "prefers-reduced-motion"
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===========================
// MANEJO DE ERRORES
// ===========================

window.addEventListener('error', function(event) {
    console.error('Error detectado:', event.error);
    // Aquí podrías enviar el error a un servicio de logging
});

// ===========================
// SERVICIOS AUXILIARES
// ===========================

// Copiar al portapapeles
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('Copiado al portapapeles', 'success');
        }).catch(function(err) {
            showNotification('Error al copiar', 'error');
        });
    } else {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Copiado al portapapeles', 'success');
        } catch (err) {
            showNotification('Error al copiar', 'error');
        }
        document.body.removeChild(textArea);
    }
}

// Compartir en redes sociales
function shareOnSocial(platform, url, title) {
    const shareUrl = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrl[platform]) {
        window.open(shareUrl[platform], '_blank', 'width=600,height=400');
    }
}

console.log('2Roca Landing Page - Script cargado correctamente ✓');
