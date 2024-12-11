const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

// Ajustar el tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Arreglo de partículas (copos de nieve)
let snowflakes = [];

// Función para crear copos de nieve
const createSnowflakes = () => {
  snowflakes = [];
  const numberOfSnowflakes = 200; // Número de copos
  for (let i = 0; i < numberOfSnowflakes; i++) {
    snowflakes.push(new Snowflake());
  }
};

// Clase para los copos de nieve
class Snowflake {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 4 + 1; // Tamaño aleatorio entre 1 y 5
    this.speedY = Math.random() * 1.5 + 0.5; // Velocidad de caída
    this.speedX = Math.random() * 0.5 - 0.25; // Movimiento lateral leve
  }

  update() {
    this.y += this.speedY; // Movimiento hacia abajo
    this.x += this.speedX; // Movimiento lateral

    // Reposicionar los copos al llegar al fondo
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }

    // Cambio de dirección cuando se sale del canvas lateralmente
    if (this.x > canvas.width || this.x < 0) {
      this.speedX *= -1;
    }
  }

  draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Color blanco con opacidad
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Dibuja el copo
    ctx.closePath();
    ctx.fill();
  }
}

// Función para animar el efecto
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

  snowflakes.forEach((snowflake) => {
    snowflake.update();
    snowflake.draw();
  });

  requestAnimationFrame(animate); // Continuar la animación
};

// Ajustar el tamaño del canvas cuando se redimensiona la ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createSnowflakes(); // Recrear los copos
});

// Inicializar
createSnowflakes();
animate();
