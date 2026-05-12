
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;

    const serpiente = [
      {x:8,y:7},
      {x:7,y:7},
      {x:6,y:7},
      {x:5,y:7},
      {x:5,y:8},
      {x:5,y:9},
      {x:6,y:9},
      {x:7,y:9},
      {x:8,y:9},
      {x:8,y:10},
      {x:8,y:11}
    ];


    

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

      ctx.fillStyle = "#0000a1";
      ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

    }

    function pintarSerpiente(){
      for (let indice=0 ; indice<serpiente.length; indice++){
        let parte = serpiente[indice];

        if (indice == 0){
          let valorX = parte.x * TAMANIO_CELDA;
          let valorY = parte.y * TAMANIO_CELDA;

          ctx.fillStyle = "#ff0000";
          ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

          ctx.strokeStyle = "#ffffff";
          ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);

        } else {
          pintarParte(parte.x,parte.y);
        }
      }
    }