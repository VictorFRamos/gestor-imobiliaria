// Carrossel da Home
let currentSlide = 0;

function moveCarousel(direction) {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    
    currentSlide += direction;
    
    if (currentSlide >= totalItems) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalItems - 1;
    }
    
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Atualiza a classe active
    items.forEach(item => item.classList.remove('active'));
    items[currentSlide].classList.add('active');
}

// Inicializa o carrossel
document.addEventListener('DOMContentLoaded', function() {
    // Configura o primeiro slide como ativo
    document.querySelector('.carousel-item').classList.add('active');
    
    // Alterna os slides automaticamente a cada 5 segundos
    setInterval(() => moveCarousel(1), 5000);
    
    // Formulário de contato na home (se houver)
    const homeContactForm = document.getElementById('home-contact-form');
    if (homeContactForm) {
        homeContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
});