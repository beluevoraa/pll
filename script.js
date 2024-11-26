// Elemento de texto
const textElement = document.getElementById("text-p");
// Texto completo a mostrar
const textContent = textElement.textContent;
// Tiempo entre caracteres (en milisegundos)
const typingSpeed = 100;

// Inicializa el texto como vacío
textElement.textContent = "";

// Función para simular la escritura
let i = 0;
function typeWriter() {
    if (i < textContent.length) {
        textElement.textContent += textContent.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    }
}

// Inicia la animación al cargar la página
window.onload = typeWriter;

// Seleccionar el contenedor de partículas
const particlesContainer = document.querySelector('.particles');

// Crear partículas dinámicamente
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Posición horizontal y tamaño aleatorios
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 3 + 2}s`; // Entre 2 y 5 segundos
    particle.style.width = particle.style.height = `${Math.random() * 5 + 2}px`; // Tamaño entre 2px y 7px

    // Añadir partícula al contenedor
    particlesContainer.appendChild(particle);

    // Eliminar partícula al final de la animación
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

// Crear partículas continuamente
setInterval(createParticle, 150); // Una nueva partícula cada 150ms

 