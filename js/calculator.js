let display = document.getElementById("display");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

/* =========================
   DIFFERENT TONES PER NUMBER
========================= */
const keyTones = {
    "0": 220,
    "1": 261,
    "2": 293,
    "3": 329,
    "4": 349,
    "5": 392,
    "6": 440,
    "7": 494,
    "8": 523,
    "9": 587,

    "+": 660,
    "-": 620,
    "*": 700,
    "/": 740,
    "%": 780,
    "=": 880
};

/* =========================
   PLAY TONE FUNCTION
========================= */
function playTone(key){

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";

    osc.frequency.value = keyTones[key] || 500;

    gain.gain.value = 0.05;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
}

/* =========================
   ERROR SOUND
========================= */
function playErrorSound(){

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.value = 180;

    gain.gain.value = 0.12;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
}
/* =========================
   BUTTON CLICK HANDLER
========================= */

const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        handle(btn.textContent);
    });
});

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (e) => {

    const key = e.key;

    // 🚨 BLOCK HOLD REPEAT
    if (e.repeat) return;

    if ("0123456789+-*/.%".includes(key)) {
        handle(key);
        highlightKey(key);
    }

    if (key === "Enter") {
        e.preventDefault(); // IMPORTANT
        handle("=");
        highlightKey("=");
    }

    if (key === "Backspace") {
        handle("⌫");
    }

    if (key === "Escape") {
        handle("C");
    }
});
/* =========================
   MAIN ENGINE
========================= */

function handle(val){

    playTone(val); // 🔊 DIFFERENT SOUND FOR EACH KEY

    if(display.textContent === "0" || display.textContent === "Error"){
        display.textContent = "";
    }

    if(val === "C"){
        display.textContent = "0";
        return;
    }

    if(val === "⌫"){
        display.textContent = display.textContent.slice(0,-1) || "0";
        return;
    }

    if(val === "="){
        calculate();
        return;
    }

    display.textContent += val;
    autoResize();
}

/* =========================
   CALCULATION
========================= */

function calculate() {

    if (display.dataset.locked === "true") return;

    display.dataset.locked = "true";

    try {
        let result = eval(display.textContent);

        display.textContent = Number(result.toPrecision(10));

        addHistory(display.textContent);

    } catch {

        playErrorSound();
        display.textContent = "Error";
    }

    setTimeout(() => {
        display.dataset.locked = "false";
    }, 150);
}
/* =========================
   HISTORY
========================= */

function addHistory(val) {
    let div = document.createElement("div");
    div.textContent = val;
    document.getElementById("historyList").prepend(div);
}

/* =========================
   AUTO RESIZE DISPLAY
========================= */

function autoResize() {

    let len = display.textContent.length;

    if (len > 25) {
        display.style.fontSize = "16px";
    }
    else if (len > 15) {
        display.style.fontSize = "22px";
    }
    else {
        display.style.fontSize = "30px";
    }
}

/* =========================
   KEY HIGHLIGHT ANIMATION
========================= */

function highlightKey(key) {

    document.querySelectorAll(".buttons button").forEach(btn => {

        if (btn.textContent === key) {

            btn.classList.add("pressed");

            setTimeout(() => {
                btn.classList.remove("pressed");
            }, 120);
        }
    });
}