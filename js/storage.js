document.getElementById("newBtn").onclick = () => {
    display.textContent = "0";
};

document.getElementById("saveBtn").onclick = () => {
    localStorage.setItem("calc_save", display.textContent);
    alert("Saved!");
};

document.getElementById("exportBtn").onclick = () => {

    let text = "";

    document.querySelectorAll("#historyList div")
    .forEach(e => text += e.textContent + "\n");

    let blob = new Blob([text], {type:"text/plain"});
    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = "history.txt";
    a.click();
};