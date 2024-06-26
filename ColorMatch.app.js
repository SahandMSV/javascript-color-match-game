// Generate Dynamic Grids

const grid_5x5 = document.querySelector(".container_5x5");
for (let i = 0; i < 5 * 5; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", "allDivs allDivs_5x5");
    grid_5x5.appendChild(newBox);
}

const grid_6x6 = document.querySelector(".container_6x6");
for (let i = 0; i < 6 * 6; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", "allDivs allDivs_6x6");
    grid_6x6.appendChild(newBox);
}

const grid_7x7 = document.querySelector(".container_7x7");
for (let i = 0; i < 7 * 7; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", "allDivs allDivs_7x7");
    grid_7x7.appendChild(newBox);
}

// Generate random numbers for divs
// Add the values to divColor and divNumber arrays

const divNumbers_5x5 = [];
const divNumbers_6x6 = [];
const divNumbers_7x7 = [];

const divColors_5x5 = [];
const divColors_6x6 = [];
const divColors_7x7 = [];

const allBoxes = document.querySelectorAll(".allDivs");
const allBoxes_5x5 = document.querySelectorAll(".allDivs_5x5");
const allBoxes_6x6 = document.querySelectorAll(".allDivs_6x6");
const allBoxes_7x7 = document.querySelectorAll(".allDivs_7x7");

let isGridBtnActive_5x5 = true;
let isGridBtnActive_6x6 = false;
let isGridBtnActive_7x7 = false;

function updateNumberArrays() {
    const boxArrays = [allBoxes_5x5, allBoxes_6x6, allBoxes_7x7];
    const numberArrays = [divNumbers_5x5, divNumbers_6x6, divNumbers_7x7];
    
    boxArrays.forEach((boxArray, i) => {
        boxArray.forEach((div, index) => {
            numberArrays[i][index] = div.innerHTML;
        });
    });
}

function updateColorArrays() {
    const boxArrays = [allBoxes_5x5, allBoxes_6x6, allBoxes_7x7];
    const colorArrays = [divColors_5x5, divColors_6x6, divColors_7x7];
    
    boxArrays.forEach((boxArray, i) => {
        boxArray.forEach((div, index) => {
            div.style.backgroundColor = primaryColors[colorArrays[i][index] - 1];
        });
    });
}

function AddToColorArray(color, index) {
    let selectedDivColor;
    let selectedGrid;
    
    if (isGridBtnActive_5x5) {
        selectedDivColor = divColors_5x5;
        selectedGrid = grid_5x5;
    }
    
    else if (isGridBtnActive_6x6) {
        selectedDivColor = divColors_6x6;
        selectedGrid = grid_6x6;
    }
    
    else if (isGridBtnActive_7x7) {
        selectedDivColor = divColors_7x7;
        selectedGrid = grid_7x7;
    }
    
    if (selectedDivColor.length < index) {
        selectedDivColor.length = index;
    }
    
    switch (color) {
        case primaryColors[0]:
            selectedDivColor[index] = "1";
            break;
        case primaryColors[1]:
            selectedDivColor[index] = "2";
            break;
        case primaryColors[2]:
            selectedDivColor[index] = "3";
            break;
        case primaryColors[3]:
            selectedDivColor[index] = "4";
            break;
        case primaryColors[4]:
            selectedDivColor[index] = "5";
            break;
    }
    
    checkForWin(selectedGrid, selectedDivColor);
}

for (let i = 0; i < 3; i++) {
    const grids = [allBoxes_5x5, allBoxes_6x6, allBoxes_7x7,];
    grids[i].forEach((box, index) => {
        box.textContent = Math.floor(Math.random() * 5) + 1;
        updateNumberArrays();
        box.addEventListener("click", e => {
            if (currentColor === undefined) {
                alert("Select a color first!");
            } else {
                e.target.style.background = currentColor;
                AddToColorArray(currentColor, index);
            }
        });
    });
}

// Color Palette

const primaryColors = [
    "rgb(232, 72, 85)", // Red
    "rgb(112, 146, 85)", // Green
    "rgb(126, 189, 195)", // Blue
    "rgb(255, 188, 66)", // Yellow
    "rgb(187, 168, 231)", // Purple
];

const colorPalette = document.querySelector(".colorPalette");
for (let i = 0; i < 5; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", `colorBtns colorBtn${i + 1}`);
    newBox.innerHTML = i + 1;
    newBox.style.backgroundColor = primaryColors[i];
    colorPalette.appendChild(newBox);
}

// ColorBtn Objects

const colorBtns = [];
let currentColor;

function resetAllColorBtns() {
    colorBtns.forEach(btn => {
        btn.isClicked = false;
        btn.tick.classList.remove("transformed");
    });
}

for (let i = 1; i <= 5; i++) {
    const newColorBtn = {
        button: document.querySelector(`.colorBtn${i}`),
        tick: document.querySelector(`.tickIcon${i}`),
        color: primaryColors[i - 1],
        isClicked: false,
    };
    colorBtns.push(newColorBtn);
}

// Keyboard Shortcuts

document.addEventListener("keydown", e => {
    
    if (e.key >= "1" && e.key <= "5") {
        const index = parseInt(e.key) - 1;
        resetAllColorBtns();
        if (colorBtns[index]) {
            colorBtns[index].isClicked = true;
            colorBtns[index].tick.classList.toggle("transformed");
            currentColor = colorBtns[index].color;
        }
    }
});

document.querySelectorAll(".colorBtns").forEach((colorBtn, index) => {
    colorBtn.addEventListener("click", () => {
        resetAllColorBtns();
        colorBtns[index].isClicked = true;
        currentColor = colorBtns[index].color;
        colorBtns[index].tick.classList.toggle("transformed");
    });
});

// Grid Setting

const gridBtns = document.querySelectorAll(".gridBtns");
const gridBtn_5x5 = document.querySelector(".gridBtn_5x5");
const gridBtn_6x6 = document.querySelector(".gridBtn_6x6");
const gridBtn_7x7 = document.querySelector(".gridBtn_7x7");

const shuffleBtns = document.querySelectorAll(".shuffleIcon");
const shuffleBtn1 = document.querySelector(".shuffleIcon1");
const shuffleBtn2 = document.querySelector(".shuffleIcon2");
const shuffleBtn3 = document.querySelector(".shuffleIcon3");

let translateXVal = "-45px";
shuffleBtn1.style.transform = `translateX(${translateXVal})`; // Selected by default

function resetAllGridsStyle() {
    clearInterval(timeoutId);
    allBoxes.forEach(box => {
        box.style.backgroundColor = "rgb(200, 200, 195)";
    });
    
    divColors_5x5.length = 0;
    divColors_6x6.length = 0;
    divColors_7x7.length = 0;
}

function toggleGridSelection(gridBtn) {
    isGridBtnActive_5x5 = (gridBtn === gridBtn_5x5);
    isGridBtnActive_6x6 = (gridBtn === gridBtn_6x6);
    isGridBtnActive_7x7 = (gridBtn === gridBtn_7x7);
    
    gridBtns.forEach(btn => {
        btn.style.backgroundColor = "rgb(210, 210, 205)";
    });
    
    gridBtn.style.backgroundColor = "rgb(185, 185, 185)";
}

function showSelectedGrid(gridBtn) {
    const grids = [grid_5x5, grid_6x6, grid_7x7];
    const transformValues = ['465px', '560px', '655px'];
    
    grids.forEach((grid, index) => {
        if (gridBtn !== gridBtns[index]) {
            grid.style.zIndex = -2;
            grid.style.opacity = 0;
            grid.style.pointerEvents = "none";
        } else {
            grid.style.zIndex = 2;
            grid.style.opacity = 1;
            grid.style.pointerEvents = "auto";
            document.documentElement.style.setProperty(
                '--grid-transform-value', transformValues[index]
            );
        }
    });
}

function toggleShuffleButton() {
    shuffleBtns.forEach(btn => {
        btn.style.transform = "translateX(0)";
    });
    
    if (isGridBtnActive_5x5) {
        shuffleBtn1.style.transform = `translateX(${translateXVal})`;
    }
    else if (isGridBtnActive_6x6) {
        shuffleBtn2.style.transform = `translateX(${translateXVal})`;
    }
    else if (isGridBtnActive_7x7) {
        shuffleBtn3.style.transform = `translateX(${translateXVal})`;
    }
}

gridBtn_5x5.style.backgroundColor = "rgb(185, 185, 185)";
gridBtns.forEach(gridBtn => {
    gridBtn.addEventListener("click", () => {
        resetAllGridsStyle();
        showSelectedGrid(gridBtn);
        toggleGridSelection(gridBtn);
        toggleShuffleButton(gridBtn);
        
        document.body.style.backgroundColor = "rgb(218, 220, 215)";
        document.getElementById("winningTag").style.bottom = "-80px";
        won = false;
        
        allBoxes.forEach(box => {
            box.style.backgroundColor = "rgb(200, 200, 195)";
        });
    });
});

const boxArrays = [allBoxes_5x5, allBoxes_6x6, allBoxes_7x7];
shuffleBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        resetAllGridsStyle();
        document.body.style.backgroundColor = "rgb(218, 220, 215)";
        document.getElementById("winningTag").style.bottom = "-80px";
        won = false;
        
        allBoxes.forEach(box => {
            box.style.backgroundColor = "rgb(200, 200, 195)";
        });
        
        boxArrays[index].forEach(box => {
            box.textContent = Math.floor(Math.random() * 5) + 1;
        });
        updateNumberArrays();
    });
});

// Winning Sequence

let won = false;
function checkForWin(selectedGrid) {
    if (won) {
        const isGridActive_5x5 =
            isGridBtnActive_5x5 &&
            divNumbers_5x5.toString() !== divColors_5x5.toString();
        const isGridActive_6x6 =
            isGridBtnActive_6x6 &&
            divNumbers_6x6.toString() !== divColors_6x6.toString();
        const isGridActive_7x7 =
            isGridBtnActive_7x7 &&
            divNumbers_7x7.toString() !== divColors_7x7.toString();
        
        if (isGridActive_5x5 || isGridActive_6x6 || isGridActive_7x7) {
            clearInterval(timeoutId);
            won = false;
            updateColorArrays();
            document.body.style.backgroundColor = "rgb(245, 184, 184)";
            document.getElementById("winningTag").style.bottom = "-80px";
        }
    } else {
        if (
            (divColors_5x5.length === 25 &&
            !divColors_5x5.includes(undefined)) ||
            (divColors_6x6.length === 36 &&
            !divColors_6x6.includes(undefined)) ||
            (divColors_7x7.length === 49 &&
            !divColors_7x7.includes(undefined))
            ) {
            if (
                divNumbers_5x5.toString() !== divColors_5x5.toString() &&
                divNumbers_6x6.toString() !== divColors_6x6.toString() &&
                divNumbers_7x7.toString() !== divColors_7x7.toString()
            ) {
                won = false;
                document.body.style.backgroundColor = "rgb(245, 184, 184)";
                document.getElementById("winningTag").style.bottom = "-80px";
            } else if (
                divNumbers_5x5.toString() === divColors_5x5.toString() ||
                divNumbers_6x6.toString() === divColors_6x6.toString() ||
                divNumbers_7x7.toString() === divColors_7x7.toString()
            ) {
                won = true;
                winningSequence(selectedGrid);
                document.body.style.backgroundColor = "rgb(202, 240, 177)";
                document.getElementById("winningTag").style.bottom = "40px";
            }
        }
    }
}

const randomColors = [
    "rgb(255, 165, 0)",
    "rgb(255, 255, 102)",
    "rgb(255, 128, 171)",
    "rgb(255, 192, 203)",
    "rgb(102, 178, 255)",
    "rgb(102, 255, 102)",
    "rgb(255, 153, 204)",
    "rgb(255, 255, 153)",
    "rgb(204, 153, 255)",
    "rgb(255, 204, 102)",
    "rgb(255, 204, 153)",
    "rgb(255, 255, 153)",
    "rgb(102, 255, 178)",
    "rgb(102, 178, 255)",
    "rgb(102, 178, 255)",
    "rgb(255, 128, 171)",
];

let timeoutId;

function winningSequence(selectedGrid) {
    timeoutId = setInterval(() => {
        selectedGrid.querySelectorAll("div").forEach(div => {
            const color = randomColors[Math.floor(Math.random() * randomColors.length)];
            div.style.backgroundColor = color;
        });
    }, 300); // Delay in milliseconds
}

function restartBtnAction() {
    resetAllGridsStyle();
    document.body.style.backgroundColor = "rgb(218, 220, 215)";
    document.getElementById("winningTag").style.bottom = "-80px";
    won = false;
    
    allBoxes.forEach(box => {
        box.style.backgroundColor = "rgb(200, 200, 195)";
    });
}

const restartBtn = document.querySelector("#restartBtn_container");
restartBtn.addEventListener('click', restartBtnAction);