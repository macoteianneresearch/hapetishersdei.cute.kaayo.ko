const giftBox = document.getElementById('gift-box');
const letter = document.getElementById('letter');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiPieces = [];

function createConfetti() {
  for (let i = 0; i < 200; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r/2, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/2);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiPieces.forEach(p => {
    p.tiltAngle += p.tiltAngleIncremental;
    p.y += (Math.cos(p.d) + 3 + p.r/2) / 2;
    p.x += Math.sin(p.d);
    p.tilt = Math.sin(p.tiltAngle) * 15;
    if (p.y > confettiCanvas.height) {
      p.x = Math.random() * confettiCanvas.width;
      p.y = -20;
    }
  });
}

function animateConfetti() {
  drawConfetti();
  requestAnimationFrame(animateConfetti);
}

giftBox.addEventListener('click', () => {
  letter.style.display = 'block';
  confettiPieces = [];
  createConfetti();
  animateConfetti();
});
