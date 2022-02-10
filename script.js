const cells = document.querySelectorAll(".cell");
const container = document.querySelector(".container");
const messagePopup = document.querySelector(".winner-message");
const messageWinner = document.querySelector("[data-winner-message]");
const btn = document.querySelector("button");
const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let state = "";

function startGame() {
  cells.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClicked, { once: true });
    cell.addEventListener("click", handleClicked, { once: true });
  });
}

const handleClicked = (e) => {
  cell = e.target;
  state = container.classList.contains("x") ? "x" : "circle";
  cell.classList.add(state);

  if (isWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
  }
};

startGame();

function swapTurn() {
  if (state === "x") {
    container.classList.remove("x");
    container.classList.add("circle");
  } else {
    container.classList.add("x");
    container.classList.remove("circle");
  }
}

function isWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index - 1].classList.contains(state);
    });
  });
}

function endGame(isOk) {
  let mes = "";
  if (isOk) {
    mes = `Draw`;
  } else {
    mes = `${state.toUpperCase()}'s the WINNER`;
  }
  messageWinner.innerText = mes;
  messagePopup.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}

btn.addEventListener("click", () => {
  messagePopup.classList.remove("show");
  startGame();
});
