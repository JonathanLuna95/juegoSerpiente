
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;


    

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
      pintarParte(5,5);
      pintarParte(10,2);
      pintarParte(5,canvas.height/TAMANIO_CELDA-1);
      pintarParte(canvas.width/TAMANIO_CELDA-1,(canvas.height/TAMANIO_CELDA)/2);
      pintarParte(0, canvas.height/TAMANIO_CELDA-8);
      pintarParte(canvas.width/TAMANIO_CELDA-1,canvas.height/TAMANIO_CELDA-1);
    }

    function dibujarTablero(){

      for (let x=0 ; x<=canvas.width ; x=x+TAMANIO_CELDA){
      ctx.strokeStyle = "#050069";
      ctx.beginPath();
      ctx.moveTo(x,0);
      ctx.lineTo(x,canvas.height);
      ctx.stroke();
      }

      for (let y=0 ; y<=canvas.height ; y=y+TAMANIO_CELDA){
      ctx.strokeStyle = "#050069";
      ctx.beginPath();
      ctx.moveTo(0,y);
      ctx.lineTo(canvas.width,y);
      ctx.stroke();
      }
    }

    function pintarParte(lineaX,lineaY){

      let valorX = lineaX * TAMANIO_CELDA;
      let valorY = lineaY * TAMANIO_CELDA;

      ctx.fillStyle = "#ff0000";
      ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

      ctx.strokeStyle = "#000000";
      ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

    }