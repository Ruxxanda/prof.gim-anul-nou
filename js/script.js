document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;

    function creeazaFulgi() {
        const fulg = document.createElement('div');
        fulg.classList.add('fulg');
        fulg.style.left = Math.random() * window.innerWidth + 'px';
        fulg.style.top = '-10px';
        fulg.style.opacity = Math.random();
        fulg.style.fontSize = Math.random() * 10 + 10 + 'px';

        body.appendChild(fulg);

        let topPosition = -10;
        const viteza = Math.random() * 2 + 1; // viteza de cădere

        const animatie = setInterval(() => {
            topPosition += viteza;
            fulg.style.top = topPosition + 'px';

            if (topPosition > window.innerHeight) {
                clearInterval(animatie);
                fulg.remove();
            }
        }, 16); // 60 cadre pe secundă
    }

    // Creează fulgi pentru 10 secunde
    setTimeout(() => {
        setInterval(creeazaFulgi, 100); // Creează fulgi la fiecare 100ms
    }, 100); // Oprește după 10 secunde
});






document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('countdown');
    const targetDate = new Date('December 31, 2024 23:59:59').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = "<span style='color: #32cd32;'>La mulți ani!</span>";
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <span style="color: #b20000;">${days}</span> zile 
            <span style="color: #32cd32;">${hours}</span> ore 
            <span style="color: #ff4500;">${minutes}</span> minute 
            <span style="color: #ff0000;">${seconds}</span> secunde
        `;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});












// trimiterea formularului in google spread
const scriptURL = 'https://script.google.com/macros/s/AKfycbzImy0Fdl4t8cDkq4t5f74BPg65-lVr4P8_WvMrAajp84gbAgQeiKQQL0azNyso4sNmig/exec';

const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
    e.preventDefault();

    // Obține datele coșului
    const cartItems = localStorage.getItem('cartItems');

    // Verifică dacă există date în coș
    if (cartItems) {
        // Parsează datele coșului și obține denumirile produselor
        const parsedCartItems = JSON.parse(cartItems);
        const productNames = parsedCartItems.map(item => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(item.html, 'text/html');
            var nameElement = doc.querySelector('h3');
            return nameElement ? nameElement.textContent : '';
        }).join(', ');

        // Setează denumirile produselor în câmpul ascuns
        document.getElementById('continut-cosului').value = productNames;
    }

    // Trimite formularul
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Formularul a fost trimis cu succes!"))
        .then(() => {
            // Șterge datele coșului după trimitere, dacă dorești
            localStorage.removeItem('cartItems');
            localStorage.removeItem('itemsOrder');
            window.location.reload();
        })
        .catch(error => console.error('Eroare!', error.message));
});
