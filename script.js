const CIRCUMFERENCE = 2 * Math.PI * 88;

let cfg = { work: 25, short: 5, long: 15 };

let state = {
  mode: 'work',
  running: false,
  secondsLeft: 1500,
  totalSeconds: 1500,
  intervalId: null,
};

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

function updateUI() {
  document.getElementById('ring-time').textContent =
    formatTime(state.secondsLeft);

  const progress = state.secondsLeft / state.totalSeconds;
  const offset = CIRCUMFERENCE * (1 - progress);

  const ring = document.getElementById('ring-progress');
  ring.style.strokeDashoffset = offset;
}

function tick() {
  if (state.secondsLeft <= 0) {
    clearInterval(state.intervalId);
    state.running = false;
    return;
  }
  state.secondsLeft--;
  updateUI();
}

function toggleTimer() {
  if (state.running) {
    clearInterval(state.intervalId);
    state.running = false;
  } else {
    state.running = true;
    state.intervalId = setInterval(tick, 1000);
  }
}

function resetTimer() {
  clearInterval(state.intervalId);
  state.running = false;
  state.secondsLeft = cfg[state.mode] * 60;
  state.totalSeconds = state.secondsLeft;
  updateUI();
}

function skipSession() {
  switchMode('short');
}

function switchMode(mode) {
  state.mode = mode;
  clearInterval(state.intervalId);
  state.running = false;
  state.secondsLeft = cfg[mode] * 60;
  state.totalSeconds = state.secondsLeft;
  updateUI();
}

updateUI();