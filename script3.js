const valor = document.getElementById("monster");
const monster = ["Blanca"];
const form = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const confettiContainer = document.getElementById("confetti-container");
const explosionContainer = document.getElementById("explosion-container");
const container = document.querySelector(".container");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    choice();
});

function choice() {
    const entrada = valor.value.trim();
    const formateada = entrada.charAt(0).toUpperCase() + entrada.slice(1).toLowerCase();

    resultado.classList.remove("acierto", "fallo");
    confettiContainer.innerHTML = '';
    explosionContainer.innerHTML = '';

    if (monster.includes(formateada)) {
        resultado.textContent = "🎉 ¡Sí la adivinaste! Qué gran amiga eres.";
        resultado.classList.add("acierto");
        createConfetti();
        createFireworks();
    } else {
        resultado.textContent = "💔 ¡No la adivinaste! Qué pésima amiga eres.";
        resultado.classList.add("fallo");
        container.classList.add("container-shake");
        createExplosion();
        setTimeout(() => {
            container.classList.remove("container-shake");
        }, 500);
    }

    resultado.style.display = "block";
}

function createConfetti() {
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 2;
        
        confetti.style.animation = `confetti-fall ${animationDuration}s ${animationDelay}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
        
        // Add animation dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confetti-fall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(500px) rotate(${Math.random() * 360}deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function createExplosion() {
    const colors = ['#ff0000', '#ff4500', '#ff6347', '#ff8c00'];
    const explosionCenterX = 50;
    const explosionCenterY = 50;
    
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.classList.add('explosion-piece');
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = explosionCenterX + '%';
        piece.style.top = explosionCenterY + '%';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30 + 20;
        const duration = Math.random() * 0.5 + 0.5;
        
        piece.style.animation = `explode ${duration}s ease-out forwards`;
        
        explosionContainer.appendChild(piece);
        
        // Add animation dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes explode {
                0% { transform: translate(0, 0); opacity: 1; }
                100% { transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function createFireworks() {
    const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 80 + 10;
            
            for (let j = 0; j < 12; j++) {
                const particle = document.createElement('div');
                particle.classList.add('firework');
                particle.style.left = x + '%';
                particle.style.top = y + '%';
                particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (j / 12) * Math.PI * 2;
                const distance = Math.random() * 50 + 50;
                
                particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
                
                confettiContainer.appendChild(particle);
                
                // Remove after animation
                setTimeout(() => {
                    particle.remove();
                }, 1000);
            }
        }, i * 300);
    }
}
