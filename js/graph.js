function drawGraph(func){

    let canvas = document.getElementById("graph");
    if(!canvas) return;

    let ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();

    for(let x=0;x<canvas.width;x++){

        let mathX = (x - canvas.width/2)/20;

        let y = eval(func.replace("x", mathX));

        let screenY = canvas.height/2 - y*20;

        ctx.lineTo(x, screenY);
    }

    ctx.strokeStyle = "lime";
    ctx.stroke();
}