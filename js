document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const width = 4;
    let squares = [];
    let score = 0;

    // Create the board with 16 tiles
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let square = document.createElement('div');
            square.classList.add('tile');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        // Generate two random tiles to start
        generate();
        generate();
    }

    // Generate a new random tile (2 or 4)
    function generate() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * squares.length);
        } while (squares[randomIndex].innerHTML != 0);
        squares[randomIndex].innerHTML = Math.random() < 0.9 ? 2 : 4;
        updateClasses(squares[randomIndex]);
    }

    // Update the tile classes based on the value
    function updateClasses(tile) {
        tile.className = 'tile'; // Reset the class
        let value = parseInt(tile.innerHTML);
        if (value !== 0) {
            tile.classList.add(`tile-${value}`);
        }
    }

    // Slide and combine the tiles to the right
    function moveRight() {
        for (let i = 0; i < width * width; i += width) {
            let row = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + 1].innerHTML),
                parseInt(squares[i + 2].innerHTML),
                parseInt(squares[i + 3].innerHTML)
            ];
            let newRow = slideAndCombine(row.reverse()).reverse(); // Reverse to move right
            for (let j = 0; j < width; j++) {
                squares[i + j].innerHTML = newRow[j];
                updateClasses(squares[i + j]);
            }
        }
    }

    // Slide and combine the tiles to the left
    function moveLeft() {
        for (let i = 0; i < width * width; i += width) {
            let row = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + 1].innerHTML),
                parseInt(squares[i + 2].innerHTML),
                parseInt(squares[i + 3].innerHTML)
            ];
            let newRow = slideAndCombine(row);  // No reversing, process row as is
            for (let j = 0; j < width; j++) {
                squares[i + j].innerHTML = newRow[j];
                updateClasses(squares[i + j]);
            }
        }
    }

    // Slide and combine the tiles upwards
    function moveUp() {
        for (let i = 0; i < width; i++) {
            let column = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + width].innerHTML),
                parseInt(squares[i + width * 2].innerHTML),
                parseInt(squares[i + width * 3].innerHTML)
            ];
            let newColumn = slideAndCombine(column);
            for (let j = 0; j < width; j++) {
                squares[i + width * j].innerHTML = newColumn[j];
                updateClasses(squares[i + width * j]);
            }
        }
    }

    // Slide and combine the tiles downwards
    function moveDown() {
        for (let i = 0; i < width; i++) {
            let column = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + width].innerHTML),
                parseInt(squares[i + width * 2].innerHTML),
                parseInt(squares[i + width * 3].innerHTML)
            ];
            let newColumn = slideAndCombine(column.reverse()).reverse(); // Reverse the logic
            for (let j = 0; j < width; j++) {
                squares[i + width * j].innerHTML = newColumn[j];
                updateClasses(squares[i + width * j]);
            }
        }
    }

    // Function to slide and combine tiles
    function slideAndCombine(arr) {
        let filtered = arr.filter(num => num); // Remove zeroes
        while (filtered.length < width) filtered.push(0); // Add zeroes back

        for (let i = 0; i < width - 1; i++) {
            if (filtered[i] === filtered[i + 1] && filtered[i] !== 0) {
                filtered[i] *= 2;
                filtered[i + 1] = 0;
                score += filtered[i]; // Update score if needed
            }
        }

        // Remove zeroes again and fill the rest with zeroes
        let combined = filtered.filter(num => num);
        while (combined.length < width) combined.push(0);

        return combined;
    }

    // Handle key presses to move tiles
    function control(e) {
        switch (e.key) {
            case 'ArrowRight':
                moveRight();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowUp':
                moveUp();
                break;
        }
        generate(); // Generate a new tile after each move
    }

    document.addEventListener('keydown', control);

    createBoard(); // Initialize the game board
});
