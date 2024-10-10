let names = [];
let wheel = document.getElementById('wheel');
let results = document.getElementById('results');
let arrow = document.querySelector('.arrow');
let namesList = document.getElementById('names-list');

document.getElementById('add-name').addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('name').value.trim();
    if (name !== '' && names.length < 10) { // Limitar a un máximo de 10 nombres
        names.push(name);
        let nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = name;
        wheel.appendChild(nameElement);
        document.getElementById('name').value = '';

        // Ajustar la variable CSS para el tamaño de los nombres
        wheel.style.setProperty('--name-count', names.length);
    } else if (names.length >= 10) {
        alert('Se ha alcanzado el límite máximo de 10 nombres.');
    }
});

document.getElementById('spin').addEventListener('click', () => {
    if (names.length > 0) {
        // Generar un índice aleatorio para el ganador
        let winnerIndex = Math.floor(Math.random() * names.length);
        let winner = names[winnerIndex];

        // Calcular el ángulo de giro total (4 vueltas más un ángulo adicional para el ganador)
        let totalTurns = 4; // Número de vueltas
        let baseAngle = 360 * totalTurns; // Grados totales de vueltas
        let angle = baseAngle + (360 / names.length * winnerIndex); // Añadir ángulo del ganador

        // Gira la ruleta con animación
        wheel.style.transition = 'transform 3s ease-out'; // Transición de 3 segundos
        wheel.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`; // Gira la ruleta en su lugar

        // Espera para mostrar el ganador
        setTimeout(() => {
            results.innerHTML = `El ganador es: <span>${winner}</span>`;
            results.style.opacity = 1;

            // Calcula el ángulo de la ruleta
            wheel.style.transition = 'none'; // Sin transición para el siguiente giro
            wheel.style.transform = `translate(-50%, -50%) rotate(${angle % 360}deg)`; // Ajusta la posición de la ruleta

            // Elimina el nombre del ganador de la lista y la ruleta
            names.splice(winnerIndex, 1);
            const nameElements = document.querySelectorAll('.name');
            nameElements[winnerIndex].remove(); // Eliminar nombre visualmente

            // Agrega el nombre a la lista de nombres salidos
            let listItem = document.createElement('li');
            listItem.textContent = winner;
            namesList.appendChild(listItem);
        }, 3100); // Tiempo para esperar antes de mostrar el ganador
    } else {
        alert('Por favor, agregue al menos un nombre antes de girar.');
    }
});
