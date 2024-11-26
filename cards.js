// Selecciona el contenedor de las tarjetas y las propias tarjetas
const cards = document.querySelectorAll('.card');
let currentIndex = 0;

// Cambia automáticamente entre las tarjetas
function changeCard() {
    // Remueve la clase 'active' de todas las tarjetas
    cards.forEach(card => card.classList.remove('active'));

    // Añade la clase 'active' a la tarjeta actual
    cards[currentIndex].classList.add('active');

    // Incrementa el índice o lo reinicia al final
    currentIndex = (currentIndex + 1) % cards.length;
}

// Llama a la función cada 3 segundos
setInterval(changeCard, 6000);

// Inicializa la primera tarjeta como activa
changeCard();

// Agrega la funcionalidad de "Leer más"
cards.forEach(card => {
    const button = document.createElement('button');
    button.classList.add('read-more');
    button.textContent = 'Leer más';

    const cardText = card.querySelector('p');
    card.appendChild(button);

    button.addEventListener('click', () => {
        card.classList.toggle('expanded');
        button.textContent = card.classList.contains('expanded') ? 'Leer menos' : 'Leer más';
    });
});
