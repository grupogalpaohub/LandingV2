// Landing Page - Diagnóstico 360 - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script carregado com sucesso!');
    
    // 1. Animações de entrada com Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // Parar de observar este elemento após animação
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll('.step, .benefit, .case, .faq-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 2. Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Validação e envio do formulário
    const form = document.getElementById('diagnosticForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#e0e0e0';
                }
            });
            
            if (isValid) {
                // Simular envio do formulário
                const submitBtn = form.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                // Simular delay de envio
                setTimeout(() => {
                    alert('Formulário enviado com sucesso! Entraremos em contato em breve para agendar seu Diagnóstico 360.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }

    // 4. Efeito hover nos botões
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-header');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 5. Header que se esconde ao rolar
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        header.style.transition = 'transform 0.3s ease-in-out';
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - esconder header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - mostrar header
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // 6. Contador animado para métricas
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Animar contadores quando visíveis
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.proof-number, .metric-number');
                counters.forEach(counter => {
                    const text = counter.textContent;
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    if (number && !counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter, number);
                    }
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const socialProof = document.querySelector('.social-proof');
    const successCases = document.querySelector('.success-cases');
    
    if (socialProof) counterObserver.observe(socialProof);
    if (successCases) counterObserver.observe(successCases);

    // 7. Efeito de loading da página
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    console.log('Todas as funcionalidades foram inicializadas!');
});

// Adicionar estilos CSS via JavaScript para evitar conflitos
const style = document.createElement('style');
style.textContent = `
    /* Loading da página */
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    /* Animações de entrada */
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Garantir que elementos específicos tenham animação */
    .step, .benefit, .case, .faq-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .step.fade-in-visible, 
    .benefit.fade-in-visible, 
    .case.fade-in-visible, 
    .faq-item.fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Transições suaves para botões */
    .cta-primary, .cta-secondary, .cta-header {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);