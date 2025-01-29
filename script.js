let names = [];
let remainingNames = [];
let currentRotation = 0;
let canvas = document.getElementById("spinnerCanvas");
let ctx = canvas.getContext("2d");

function startGame() {
    const input = document.getElementById("nameInput").value.trim();
    if (input === "") {
        alert("Masukkan daftar nama terlebih dahulu!");
        return;
    }
    names = input.split(",").map(name => name.trim());
    remainingNames = [...names];
    drawSpinner();
    document.getElementById("chosenName").innerText = "Tekan 'Putar' untuk memilih nama!";
}

function drawSpinner() {
    let totalNames = remainingNames.length;
    let angleStep = (2 * Math.PI) / totalNames;
    let colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33aa", "#ffcc33", "#33ccff"];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < totalNames; i++) {
        let startAngle = i * angleStep;
        let endAngle = (i + 1) * angleStep;
        
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.translate(150, 150);
        ctx.rotate(startAngle + angleStep / 2);
        ctx.fillText(remainingNames[i], 80, 5);
        ctx.rotate(-(startAngle + angleStep / 2));
        ctx.translate(-150, -150);
    }
}

function spin() {
    if (remainingNames.length === 0) {
        alert("Semua nama telah dipilih!");
        return;
    }

    let randomIndex = Math.floor(Math.random() * remainingNames.length);
    let chosenName = remainingNames[randomIndex];

    let randomSpin = 360 * 5 + (randomIndex * (360 / remainingNames.length));
    currentRotation += randomSpin;

    canvas.style.transition = "transform 3s ease-out";
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        document.getElementById("chosenName").innerText = `Terpilih: ${chosenName}`;
        remainingNames.splice(randomIndex, 1);
        drawSpinner();
    }, 3000);
}

function reset() {
    remainingNames = [...names];
    drawSpinner();
    document.getElementById("chosenName").innerText = "Tekan 'Putar' untuk memilih nama!";
}
