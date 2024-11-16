 // Variáveis de configuração
 let ballSpeed, aiDifficulty;

 // Função para iniciar o jogo com base na dificuldade
 function startGame(difficulty) {
     const menu = document.getElementById("menu");
     const canvas = document.getElementById("pong");

     // Ajusta a dificuldade
     switch (difficulty) {
         case "easy":
             ballSpeed = 3;
             aiDifficulty = 0.5; // IA com menor precisão
             break;
         case "medium":
             ballSpeed = 5;
             aiDifficulty = 0.2; // IA intermediária
             break;
         case "hard":
             ballSpeed = 7;
             aiDifficulty = 0; // IA quase perfeita
             break;
     }

     // Esconde o menu e exibe o canvas
     menu.style.display = "none";
     canvas.style.display = "block";

     // Inicia o jogo
     gameInit();
 }
 function gameInit() {
     resetBall();
     ball.speed = ballSpeed; // Configura a velocidade inicial
     setInterval(game, 1000 / 60); // Inicia o loop do jogo
 }

     const canvas = document.getElementById("pong");
     const context = canvas.getContext("2d");

     // Função para desenhar retângulos
     function drawRect(x, y, w, h, color) {
         context.fillStyle = color;
         context.fillRect(x, y, w, h);
     }

     // Função para desenhar uma bola
     function drawCircle(x, y, r, color) {
         context.fillStyle = color;
         context.beginPath();
         context.arc(x, y, r, 0, Math.PI * 2, false);
         context.closePath();
         context.fill();
     }

     // Função para desenhar o texto
     function drawText(text, x, y, color) {
         context.fillStyle = color;
         context.font = "45px Arial";
         context.fillText(text, x, y);
     }

     // Objetos do jogo
     const user = {
         x: 0,
         y: canvas.height / 2 - 50,
         width: 10,
         height: 100,
         color: "white",
         score: 0,
     };

     const ai = {
         x: canvas.width - 10,
         y: canvas.height / 2 - 50,
         width: 10,
         height: 100,
         color: "white",
         score: 0,
     };

     const ball = {
         x: canvas.width / 2,
         y: canvas.height / 2,
         radius: 10,
         speed: 5,
         velocityX: 5,
         velocityY: 5,
         color: "white",
     };

     



     // Colisão com o paddle
     function collision(ball, paddle) {
         return (
             ball.x < paddle.x + paddle.width &&
             ball.x + ball.radius > paddle.x &&
             ball.y < paddle.y + paddle.height &&
             ball.y + ball.radius > paddle.y
         );
     }

     // Resetar bola
     function resetBall() {
         ball.x = canvas.width / 2;
         ball.y = canvas.height / 2;
         ball.speed = 5;
         ball.velocityX = -ball.velocityX;
     }

     // Atualizar posição da bola
     function update() {
         ball.x += ball.velocityX;
         ball.y += ball.velocityY;

         if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
             ball.velocityY = -ball.velocityY;
         }

         const player = ball.x < canvas.width / 2 ? user : ai;

         if (collision(ball, player)) {
             // Calcula o ponto de colisão relativo ao paddle
             let collidePoint = ball.y - (player.y + player.height / 2);

             // Normaliza o valor entre -1 e 1
             collidePoint = collidePoint / (player.height / 2);

             // Define o ângulo de reflexão em radianos (45 graus máximo)
             let angleRad = (Math.PI / 4) * collidePoint;

             // Direção da bola: para a direita ou esquerda
             let direction = ball.x < canvas.width / 2 ? 1 : -1;

             // Aumenta a velocidade e ajusta os vetores X e Y
             ball.velocityX = direction * ball.speed * Math.cos(angleRad);
             ball.velocityY = ball.speed * Math.sin(angleRad);

             // Incrementa a velocidade da bola após o contato
             ball.speed += 0.5;
         }

         if (ball.x + ball.radius < 0) {
             ai.score++;
             resetBall();
         } else if (ball.x - ball.radius > canvas.width) {
             user.score++;
             resetBall();
         }

         moveAI();
     }

     // Desenhar na tela
     function render() {
         drawRect(0, 0, canvas.width, canvas.height, "black");
         drawText(user.score, canvas.width / 4, canvas.height / 5, "white");
         drawText(ai.score, (3 * canvas.width) / 4, canvas.height / 5, "white");
         drawRect(user.x, user.y, user.width, user.height, user.color);
         drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
         drawCircle(ball.x, ball.y, ball.radius, ball.color);
     }


     

     // Movimento do jogador
     canvas.addEventListener("mousemove", (event) => {
         let rect = canvas.getBoundingClientRect();
         user.y = event.clientY - rect.top - user.height / 2;
     });

     // Loop do jogo
     function game() {
         update();
         render();
     }
