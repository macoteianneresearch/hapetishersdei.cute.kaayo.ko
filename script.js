/* final polished script:
   - fills the background with many hollow texts
   - opens gift (lid animation)
   - reveals wide handwritten card with typing effect
   - launches confetti animation
   NOTE: Save your images in the same folder as:
     background.png  (your classroom photo)
     bouquet.png     (the bouquet PNG you provided)
*/

const FLOAT_COUNT = 200;            // lots of small texts to fill background
const floatingContainer = document.getElementById('floatingText');
const GIFT = document.getElementById('giftBtn');
const CARD = document.getElementById('card');
const CARD_WRAPPER = document.getElementById('cardWrapper');
const NOTE = document.getElementById('noteText');
const BOUQUET = document.getElementById('bouquet');
const CANVAS = document.getElementById('confettiCanvas');
const ctx = CANVAS.getContext('2d');

// ---- 1) Create many hollow background texts ----
function populateFloating() {
  const txt = "Happy Teacher's Day! haha cute";
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  for (let i = 0; i < FLOAT_COUNT; i++) {
    const s = document.createElement('span');
    s.textContent = txt;
    // random positions across viewport
    const left = Math.random() * (vw * 1.2) - (vw * 0.1);
    const top = Math.random() * (vh * 1.05) - (vh * 0.02);
    s.style.left = `${left}px`;
    s.style.top = `${top}px`;
    s.style.transform = `rotate(${(Math.random() - 0.5) * 18}deg) scale(${0.85 + Math.random() * 0.6})`;
    s.style.opacity = 0.8 - Math.random() * 0.4;
    s.style.animationDuration = `${25 + Math.random()*30}s`;
    floatingContainer.appendChild(s);
  }
}

// ---- 2) Typing note text (handwritten) ----
const message = `Dear Teacher,

Thank you for your guidance, your patience, and your kindness. You’ve shaped our minds and touched our hearts in more ways than we can say.

On this special day we celebrate you and the love you pour into teaching.

With love and gratitude,
Your Students 💙`;

let typingTimer = null;
function typeNote(targetEl, text, speed = 65) {
  let i = 0;
  targetEl.textContent = "";
  function step() {
    if (i < text.length) {
      targetEl.textContent += text.charAt(i);
      i++;
      typingTimer = setTimeout(step, speed);
    }
  }
  step();
}

// ---- 3) Gift opening animation + reveal card ----
GIFT.addEventListener('click', () => {
  // animate lid by toggling class on button (lid handled in CSS .gift.open)
  GIFT.classList.add('open');

  // reveal card and bouquet (card-wrapper contains bouquet positioned behind)
  setTimeout(() => {
    CARD.classList.add('show');
    // ensure wrapper visible (for accessibility)
    CARD_WRAPPER.setAttribute('aria-hidden', 'false');
    // start typing and confetti
    typeNote(NOTE, message, 65); // 65ms per char = nice pace
    startConfettiBurst();
  }, 520);
});

// ---- 4) Confetti implementation (simple particle system) ----
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;
let confetti = [];

function rand(min, max){ return Math.random()*(max-min)+min; }

function spawnConfetti(amount = 180) {
  confetti = [];
  const colors = ['#2b78d2','#1abc9c','#ff6b6b','#ffd166','#c084fc','#ffb3c1','#ff9f1c'];
  for (let i = 0; i < amount; i++) {
    confetti.push({
      x: rand(0, CANVAS.width),
      y: rand(-CANVAS.height, 0),
      vx: rand(-2, 2),
      vy: rand(2, 6),
      size: rand(6, 14),
      rot: rand(0, Math.PI*2),
      color: colors[Math.floor(Math.random()*colors.length)],
      life: rand(80, 220)
    });
  }
}

function updateConfetti() {
  ctx.clearRect(0,0, CANVAS.width, CANVAS.height);
  confetti.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05; // gravity
    p.rot += 0.07;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
    ctx.restore();
    p.life--;
  });
  confetti = confetti.filter(c => c.life > 0);
  if (confetti.length > 0) requestAnimationFrame(updateConfetti);
}

function startConfettiBurst() {
  spawnConfetti(220);
  updateConfetti();
}

// ---- 5) handle resize so canvas and floating texts stay correct ----
function handleResize(){
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
}
window.addEventListener('resize', handleResize);

// init
populateFloating();
handleResize();
