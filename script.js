document.addEventListener("DOMContentLoaded", function () {
    const gameBoard = document.getElementById("gameBoard");
    const message = document.getElementById("message");
    const nameInput = document.getElementById("name-input");
    const startGameBtn = document.getElementById("start-game");
    const chanceDisplay = document.getElementById("chances");
    const chanceCount = document.getElementById("chance-count");

    let playerName = "";
    let chancesLeft = 3;
    let hiddenObjectIndex;
    let gameActive = true;

    startGameBtn.addEventListener("click", function () {
        playerName = nameInput.value.trim();
        if (playerName === "") {
            alert("Please enter your name to start the game.");
            return;
        }
        startGame();
    });

    function startGame() {
        gameBoard.innerHTML = ""; // Clear previous game
        gameBoard.style.display = "grid"; // Show game board
        message.style.display = "none"; // Hide message
        nameInput.style.display = "none"; // Hide input
        startGameBtn.style.display = "none"; // Hide start button
        chanceDisplay.style.display = "block"; // Show chances
        chancesLeft = 3; // Reset chances
        chanceCount.textContent = chancesLeft; // Update chance display
        hiddenObjectIndex = Math.floor(Math.random() * 9); // Random box with object
        gameActive = true;

        for (let i = 0; i < 9; i++) {
            const box = document.createElement("div");
            box.classList.add("box");
            box.dataset.index = i;

            const hiddenObject = document.createElement("span");
            hiddenObject.classList.add("hidden-object");
            hiddenObject.innerHTML = (i === hiddenObjectIndex) ? "🎁" : "❌";

            box.appendChild(hiddenObject);

            box.addEventListener("click", function () {
                if (!gameActive || this.classList.contains("clicked")) return;

                this.classList.add("clicked");

                if (parseInt(this.dataset.index) === hiddenObjectIndex) {
                    message.innerHTML = `🎉 Congrats, ${playerName}! You found the hidden object! 🎉`;
                    message.style.color = "#2ecc71";
                    message.style.display = "block";
                    gameActive = false;
                    setTimeout(startGame, 2000); // Restart game after 2 seconds
                } else {
                    chancesLeft--;
                    chanceCount.textContent = chancesLeft;

                    if (chancesLeft === 0) {
                        revealCorrectBox();
                    }
                }
            });

            gameBoard.appendChild(box);
        }
    }

    function revealCorrectBox() {
        gameActive = false;
        message.innerHTML = `😢 Game Over, ${playerName}! The correct box was revealed.`;
        message.style.color = "#e74c3c";
        message.style.display = "block";

        // Show the correct box
        document.querySelectorAll(".box")[hiddenObjectIndex].classList.add("reveal");

        setTimeout(startGame, 2000); // Restart game after 2 seconds
    }
});