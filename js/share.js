document.getElementById("shareBtn").onclick = async () => {

    if(!display.textContent) return;

    if(navigator.share){
        await navigator.share({
            text: display.textContent
        });
    } else {
        navigator.clipboard.writeText(display.textContent);
        alert("Copied!");
    }
};