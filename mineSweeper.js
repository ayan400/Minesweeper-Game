let mineSweeperGrid = document.getElementById("mineSweeperGrid");
//Initial Constants
const mineSweeperGridDetails = {
  'Beginner':[8,8,12],
  'Intermediate':[16,16,50],
  'Expert':[30,16,96]
};
const min = 0;
const winnerText = "You have won.";
const looserText = "You have lost.";
let selectedGridValues = mineSweeperGridDetails.Beginner;


function getSelectedLevelValue() {
  selectedGridValues = mineSweeperGridDetails[document.getElementById("mineSweeperLevels").value];
  generateMineSweeperGrid();
}

generateMineSweeperGrid();

function generateMineSweeperGrid() {
  mineSweeperGrid.innerHTML = "";
  for (let i = 0; i < selectedGridValues[0]; i++) {
   let row =  mineSweeperGrid.insertRow(i);
    for (let j = 0; j < selectedGridValues[1]; j++) {
    let  cell = row.insertCell(j);
      cell.onclick  = handleCellClick;
      let mine = document.createAttribute("mine-details");
      mine.value = "false";
      cell.setAttributeNode(mine);
    }
  }
  insertMines();
}

function getRandomInt(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function insertMines() {
  for (let i = 0; i < selectedGridValues[2]; i++) {
    let row = getRandomInt(selectedGridValues[0]);
    let col = getRandomInt(selectedGridValues[1]);
    let cell =  mineSweeperGrid.rows[row].cells[col];
    cell.setAttribute("mine-details", "true");
  }
}

function showAllMines() {
  for (let i = 0; i < selectedGridValues[0]; i++) {
    for (let j = 0; j < selectedGridValues[1]; j++) {
      let cell =  mineSweeperGrid.rows[i].cells[j];
      cell.onclick = null;
      if (cell.getAttribute("mine-details") === "true") cell.className = "mine";
    }
  }
}
function isGameComplete(){
  let isGameComplete = true;
  for (let i = 0; i < selectedGridValues[0]; i++) {
    for (let j = 0; j < selectedGridValues[1]; j++) {
      if (( mineSweeperGrid.rows[i].cells[j].getAttribute("mine-details") === "false") && ( mineSweeperGrid.rows[i].cells[j].innerHTML == "")) {
        isGameComplete = false;
        return isGameComplete;
      }
    }
  }
  return isGameComplete;
}
function checkGameCompletion() {
  if (isGameComplete()) {
    alert(winnerText);
    showAllMines();
  }
}

function handleCellClick(arg) {
  const mineCell = this.window === this?arg:this;
  console.log(mineCell.getAttribute('mine-details'));
  if (mineCell.getAttribute("mine-details") === "true") {
    showAllMines();
    alert(looserText);
  } else {
    mineCell.className = "clicked";
   let mineCount = 0;
   let cellRow = mineCell.parentNode.rowIndex;
   let cellCol = mineCell.cellIndex;
    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, selectedGridValues[0]-1); i++) {
      for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, selectedGridValues[1]-1); j++) {
        if ( mineSweeperGrid.rows[i].cells[j].getAttribute("mine-details") === "true") mineCount++;
      }
    }
    mineCell.innerHTML = mineCount;
    if (mineCount === 0) {
      for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, selectedGridValues[0]-1); i++) {
        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, selectedGridValues[1]-1); j++) {
          if ( mineSweeperGrid.rows[i].cells[j].innerHTML === "") handleCellClick( mineSweeperGrid.rows[i].cells[j]);
        }
      }
    }
    checkGameCompletion();
  }
}

