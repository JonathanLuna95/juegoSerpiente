
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
let intervaloSerpiente;
let direccionActual = "derecha";
let puntaje = 0;
let velocidad = 800;
let juegoTerminado = false;
let nivel = 1;
const TAMANIO_CELDA = 25;
let serpiente = [
  { x: 8, y: 7 },
  { x: 7, y: 7 }
];
let comida = {
  comidaX: 10,
  comidaY: 10
}





// Generamos la primera comida antes de dibujar el juego
generarComida();
// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
}

function dibujarTablero() {

  for (let x = 0; x <= canvas.width; x = x + TAMANIO_CELDA) {
    ctx.strokeStyle = "#050069";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y = y + TAMANIO_CELDA) {
    ctx.strokeStyle = "#050069";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY) {

  let valorX = lineaX * TAMANIO_CELDA;
  let valorY = lineaY * TAMANIO_CELDA;

  ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

}

function pintarSerpiente() {
  for (let indice = 0; indice < serpiente.length; indice++) {
    let parte = serpiente[indice];

    if (indice == 0) {
      let valorX = parte.x * TAMANIO_CELDA;
      let valorY = parte.y * TAMANIO_CELDA;

      ctx.fillStyle = "#ff0000";
      ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

    } else {
      ctx.fillStyle = "#0000a1";
      pintarParte(parte.x, parte.y);
    }
  }
}

function moverDerecha() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y
  };

  serpiente.unshift(nuevaCabeza);

  // Eliminamos la última parte para simular el movimiento
  serpiente.pop();
}

function moverIzquierda() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = {
    x: cabezaActual.x - 1,
    y: cabezaActual.y
  };
  serpiente.unshift(nuevaCabeza);
  // Eliminamos la última parte para simular el movimiento
  serpiente.pop();
}

function moverAbajo() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y + 1
  };
  serpiente.unshift(nuevaCabeza);
  // Eliminamos la última parte para simular el movimiento
  serpiente.pop();
}

function moverArriba() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y - 1
  };
  serpiente.unshift(nuevaCabeza);
  // Eliminamos la última parte para simular el movimiento
  serpiente.pop();
}

function cambiarDireccion(nuevaDireccion) {

  if (direccionActual == "derecha" && nuevaDireccion == "izquierda") {
    return;
  }
  if (direccionActual == "izquierda" && nuevaDireccion == "derecha") {
    return;
  }
  if (direccionActual == "arriba" && nuevaDireccion == "abajo") {
    return;
  }
  if (direccionActual == "abajo" && nuevaDireccion == "arriba") {
    return;
  }
  direccionActual = nuevaDireccion;
}

function iniciarJuego() {
  if (juegoTerminado == true) {
    return;
  }
  document.getElementById("musicaFondo").play();
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  document.getElementById("musicaFondo").pause();
}

function moverSerpiente() {
  let ultimaParte = serpiente[serpiente.length - 1];
  if (direccionActual == "derecha") {
    moverDerecha();
  }
  if (direccionActual == "izquierda") {
    moverIzquierda();
  }
  if (direccionActual == "abajo") {
    moverAbajo();
  }
  if (direccionActual == "arriba") {
    moverArriba();
  }

  if (validarGameOver() == true) {
    return;
  }

  if (atraparComida() == true) {
    let sonidoComer = document.getElementById("sonidoComer");
    sonidoComer.currentTime = 0;
    sonidoComer.play();
    puntaje = puntaje + 1;
    document.getElementById("puntaje").innerText = puntaje;
    serpiente.push(ultimaParte);
    generarComida();
    verificarNivel();
  }
  dibujarTodo();
}

function generarComida() {
  let totalColumnas = canvas.width / TAMANIO_CELDA;
  let totalFilas = canvas.height / TAMANIO_CELDA;
  comida.comidaX = Math.floor(Math.random() * totalColumnas);
  comida.comidaY = Math.floor(Math.random() * totalFilas);
}

function pintarComida() {
  let totalColumnas = canvas.width / TAMANIO_CELDA;
  let totalFilas = canvas.height / TAMANIO_CELDA;

  ctx.fillStyle = "#44ff00";
  pintarParte(comida.comidaX, comida.comidaY);
}

function atraparComida() {
  let cabezaActual = serpiente[0];

  if (cabezaActual.x == comida.comidaX && cabezaActual.y == comida.comidaY) {
    return true;
  } else {
    return false;
  }
}

function validarGameOver() {
  let cabezaActual = serpiente[0];

  let totalColumnas = canvas.width / TAMANIO_CELDA;
  let totalFilas = canvas.height / TAMANIO_CELDA;

  if (
    cabezaActual.x < 0 ||
    cabezaActual.x >= totalColumnas ||
    cabezaActual.y < 0 ||
    cabezaActual.y >= totalFilas
  ) {
    juegoTerminado = true;
    clearInterval(intervaloSerpiente);

    document.getElementById("estado").innerText = "GAME OVER";
    document.getElementById("mensaje").innerText = "GAME OVER La Serpiente Toco el Borde";

    let musicaFondo = document.getElementById("musicaFondo");
    musicaFondo.pause();

    let sonidoGameOver = document.getElementById("sonidoGameOver");
    sonidoGameOver.currentTime = 0;
    sonidoGameOver.play();
    return true;
  }
  return false;
}

function validarChoqueCuerpo(){
  let cabezaActual = serpiente[0];

  for (let indice = 1; indice < serpiente.length; indice++){
    let parteCuerpo = serpiente[indice];

    if (cabezaActual.x == parteCuerpo.x && cabezaActual.y == parteCuerpo.y){
      juegoTerminado = true;
      clearInterval(intervaloSerpiente);

      document.getElementById("estado").innerText = "GAME OVER";
      document.getElementById("mensaje").innerText = "💀 GAME OVER: la serpiente chocó con su cuerpo.";

      let musicaFondo = document.getElementById("musicaFondo");
      musicaFondo.pause();

      let sonidoGameOver = document.getElementById("sonidoGameOver");
      sonidoGameOver.currentTime = 0;
      sonidoGameOver.play();

      return true;
    }
  }

  return false;
}

function reiniciarJuego() {
  clearInterval(intervaloSerpiente);

  serpiente = [
    { x: 8, y: 7 },
    { x: 7, y: 7 }
  ];

  direccionActual = "derecha";
  juegoTerminado = false;

  puntaje = 0;
  nivel = 1;
  velocidad = 1000;
  document.getElementById("puntaje").innerText = puntaje;

  document.getElementById("estado").innerText = "Listo";
  document.getElementById("mensaje").innerText = "Presiona iniciar para comenzar.";

  generarComida();
  dibujarTodo();
}

function verificarNivel() {
  if (puntaje > 0 && puntaje % 3 == 0) {
    nivel = nivel + 1;

    if (velocidad > 200) {
      velocidad = velocidad - 100;
    }

    clearInterval(intervaloSerpiente);
    intervaloSerpiente = setInterval(moverSerpiente, velocidad);
    let musicaFondo = document.getElementById("musicaFondo");

    if (musicaFondo.playbackRate < 1.8) {
      musicaFondo.playbackRate = musicaFondo.playbackRate + 0.1;
    }

    document.getElementById("estado").innerText = "Nivel " + nivel;
  }
}

document.addEventListener("keydown", function(evento){

  if (evento.key == "ArrowUp"){
    evento.preventDefault();
    cambiarDireccion("arriba");
  }

  if (evento.key == "ArrowDown"){
    evento.preventDefault();
    cambiarDireccion("abajo");
  }

  if (evento.key == "ArrowLeft"){
    evento.preventDefault();
    cambiarDireccion("izquierda");
  }

  if (evento.key == "ArrowRight"){
    evento.preventDefault();
    cambiarDireccion("derecha");
  }

});