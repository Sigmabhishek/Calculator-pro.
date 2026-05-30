let display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyBox = document.getElementById("historyList");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

/* =========================
   STATE CONTROL (IMPORTANT)
========================= */
let inputLock = false;

/* =========================
   TONES
========================= */
const keyTones = {
    "0": 220, "1": 261, "2": 293, "3": 329, "4": 349,
    "5": 392, "6": 440, "7": 494, "8": 523, "9": 587,
    "+": 660, "-": 620, "*": 700, "/": 740, "%": 780,
    "=": 880
};

/* =========================
   SOUND FUNCTIONS
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
    osc.stop(audioCtx.currentTime + 0.05);
}

function playError(){
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.value = 180;

    gain.gain.value = 0.1;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}

/* =========================
   BUTTON EVENTS
========================= */
buttons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        handle(btn.textContent);
    });
});

/* =========================
   KEYBOARD EVENTS
========================= */
document.addEventListener("keydown",(e)=>{

    if(e.repeat) return;

    const key = e.key;

    if("0123456789+-*/.%".includes(key)){
        handle(key);
    }

    if(key === "Enter"){
        e.preventDefault();
        handle("=");
    }

    if(key === "Backspace"){
        handle("⌫");
    }

    if(key === "Escape"){
        handle("C");
    }
});

/* =========================
   MAIN ENGINE
========================= */
function handle(val){

    /* 🔒 PREVENT DOUBLE INPUT */
    if(inputLock) return;

    inputLock = true;
    setTimeout(()=> inputLock = false, 60);

    playTone(val);

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
function calculate(){

    try{
        let expr = display.textContent;

        if(!expr) return;

        let result = eval(expr);

        result = Number(result.toPrecision(10));

        display.textContent = result;

        addHistory(expr + " = " + result);

    } catch{

        playError();
        display.textContent = "Error";
    }
}

/* =========================
   HISTORY
========================= */
function addHistory(val){
    let div = document.createElement("div");
    div.textContent = val;
    historyBox.prepend(div);
}

/* =========================
   AUTO RESIZE
========================= */
function autoResize(){

    let len = display.textContent.length;

    if(len > 25){
        display.style.fontSize = "16px";
    }
    else if(len > 15){
        display.style.fontSize = "22px";
    }
    else{
        display.style.fontSize = "30px";
    }
}