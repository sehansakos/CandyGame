document.addEventListener("DOMContentLoaded", () => {
    candyCrushGame();
});

function candyCrushGame() {
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const width = 8;
    const squares = [];
    let score = 0;

    const candyColors = [
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/red-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/blue-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/green-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/yellow-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/orange-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/purple-candy.png)",
    ];

    // Creating Game Board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.setAttribute("draggable", true);
            square.setAttribute("id", i);
            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundImage = candyColors[randomColor];
            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();

    // Dragging the Candy
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach((square) =>
        square.addEventListener("dragstart", dragStart)
    );
    squares.forEach((square) => square.addEventListener("dragend", dragEnd));
    squares.forEach((square) => square.addEventListener("dragover", dragOver));
    squares.forEach((square) =>
        square.addEventListener("dragenter", dragEnter)
    );
    squares.forEach((square) =>
        square.addEventListener("drageleave", dragLeave)
    );
    squares.forEach((square) => square.addEventListener("drop", dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
        // this.style.backgroundImage = ''
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
        this.style.backgroundImage = "";
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundImage = colorBeingDragged;
        squares[
            squareIdBeingDragged
        ].style.backgroundImage = colorBeingReplaced;
    }

    function dragEnd() {
        //Defining, What is a valid move?
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ];
        let validMove = validMoves.includes(squareIdBeingReplaced);

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        } else if (squareIdBeingReplaced && !validMove) {
            squares[
                squareIdBeingReplaced
            ].style.backgroundImage = colorBeingReplaced;
            squares[
                squareIdBeingDragged
            ].style.backgroundImage = colorBeingDragged;
        } else
            squares[
                squareIdBeingDragged
            ].style.backgroundImage = colorBeingDragged;
    }

    //Dropping candies once some have been cleared
    function moveIntoSquareBelow() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === "") {
                squares[i + width].style.backgroundImage =
                    squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = "";
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                const isFirstRow = firstRow.includes(i);
                if (isFirstRow && squares[i].style.backgroundImage === "") {
                    let randomColor = Math.floor(
                        Math.random() * candyColors.length
                    );
                    squares[i].style.backgroundImage = candyColors[randomColor];
                }
            }
        }
    }

    ///-> Checking for Matches <-///

    //For Row of Four
    function checkRowForFour() {
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            const notValid = [
                5,
                6,
                7,
                13,
                14,
                15,
                21,
                22,
                23,
                29,
                30,
                31,
                37,
                38,
                39,
                45,
                46,
                47,
                53,
                54,
                55
            ];
            if (notValid.includes(i)) continue;

            if (
                rowOfFour.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += 4;
                scoreDisplay.innerHTML = score;
                rowOfFour.forEach((index) => {
                    squares[index].style.backgroundImage = "";
                });
            }
        }
    }
    checkRowForFour();

    //For Column of Four
    function checkColumnForFour() {
        for (i = 0; i < 39; i++) {
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (
                columnOfFour.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += 4;
                scoreDisplay.innerHTML = score;
                columnOfFour.forEach((index) => {
                    squares[index].style.backgroundImage = "";
                });
            }
        }
    }
    checkColumnForFour();

    //For Row of Three
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            const notValid = [
                6,
                7,
                14,
                15,
                22,
                23,
                30,
                31,
                38,
                39,
                46,
                47,
                54,
                55
            ];
            if (notValid.includes(i)) continue;

            if (
                rowOfThree.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += 3;
                scoreDisplay.innerHTML = score;
                rowOfThree.forEach((index) => {
                    squares[index].style.backgroundImage = "";
                });
            }
        }
    }
    checkRowForThree();

    //For Column of Three
    function checkColumnForThree() {
        for (i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (
                columnOfThree.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += 3;
                scoreDisplay.innerHTML = score;
                columnOfThree.forEach((index) => {
                    squares[index].style.backgroundImage = "";
                });
            }
        }
    }
    checkColumnForThree();


    window.setInterval(function () {
        checkRowForFour();
        checkColumnForFour();
        checkRowForThree();
        checkColumnForThree();
        moveIntoSquareBelow();
    }, 100);
}

function removeCandies(indices) {
    indices.forEach(index => {
        squares[index].classList.add('candy-fade-out');
        setTimeout(() => {
            squares[index].style.backgroundImage = "";
            squares[index].classList.remove('candy-fade-out');
        }, 300);
    });
}

function addNewCandies(indices) {
    indices.forEach(index => {
        if (squares[index].style.backgroundImage === "") {
            let randomColor = Math.floor(Math.random() * candyColors.length);
            squares[index].style.backgroundImage = candyColors[randomColor];
            squares[index].classList.add('candy-fade-in');
            setTimeout(() => {
                squares[index].classList.remove('candy-fade-in');
            }, 300);
        }
    });
}
function checkForMatches() {
    let matchFound = true;
    while (matchFound) {
        matchFound = false;
        checkRowForFour();
        checkColumnForFour();
        checkRowForThree();
        checkColumnForThree();
        if (squares.some(square => square.style.backgroundImage === "")) {
            moveIntoSquareBelow();
            matchFound = true;
        }
    }
}
let comboCount = 0;

function updateCombo() {
    comboCount++;
    score += comboCount;
    scoreDisplay.innerHTML = score;
}

function resetCombo() {
    comboCount = 0;
}

function checkForMatches() {
    let matchFound = true;
    while (matchFound) {
        matchFound = false;
        let matches = [];
        checkRowForFour();
        checkColumnForFour();
        checkRowForThree();
        checkColumnForThree();
        if (matches.length > 0) {
            updateCombo();
            matchFound = true;
        } else {
            resetCombo();
        }
        if (squares.some(square => square.style.backgroundImage === "")) {
            moveIntoSquareBelow();
            matchFound = true;
        }
    }
}
function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    if (isValidMove(squareIdBeingDragged, squareIdBeingReplaced)) {
        this.style.backgroundImage = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
        setTimeout(() => {
            checkForMatches();
        }, 300);
    } else {
        this.style.backgroundImage = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
}

function isValidMove(draggedId, replacedId) {
    const validMoves = [
        draggedId - 1,
        draggedId + 1,
        draggedId - width,
        draggedId + width
    ];
    return validMoves.includes(replacedId);
}
let level = 1;
let multiplier = 1;

function increaseLevel() {
    if (score >= level * 1000) {
        level++;
        multiplier += 0.5;
        updateMultiplierDisplay();
    }
}

function updateMultiplierDisplay() {
    // Update UI to show current multiplier
    document.getElementById('multiplier').innerHTML = multiplier.toFixed(1);
}

function updateScore(points) {
    score += points * multiplier;
    scoreDisplay.innerHTML = score;
    increaseLevel();
}
