// Funções utilitárias para desenho
export function drawRect(context, x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

export function drawCircle(context, x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

export function drawText(context, text, x, y, color) {
    context.fillStyle = color;
    context.font = "45px Arial";
    context.fillText(text, x, y);
}
