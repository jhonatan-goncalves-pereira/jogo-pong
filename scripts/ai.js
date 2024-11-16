// Controle da IA
     // Controle da IA com redução na precisão
     function moveAI() {
        const aiMiddle = ai.y + ai.height / 2;
        const ballMiddle = ball.y;

        // Adicionando atraso baseado na dificuldade
        if (Math.random() > aiDifficulty) {
            ai.y += (ballMiddle - aiMiddle) * 0.1; // Movimento suave
        }
    }
