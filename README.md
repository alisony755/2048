# 2048
HTML, CSS, and JS project simulating the game 2048

# Description of JS functions
document.addEventListener('DOMContentLoaded', ...):
Initializes the game by calling createBoard() and sets up the control() function to listen for keydown events (i.e., arrow key presses) and respond by triggering the appropriate move function.

createBoard():
Initializes the 4 x 4 game board. All tiles start with a value of 0 and are added to the grid container. It then generates two random tiles (2 or 4) to start the game.

generate():
Generates a new random tile (2 or 4) in an empty spot by selecting a random index in the squares array. If the randomly selected square already has a value (not 0), it retries until it finds an empty tile. After setting the new tile’s value, it updates the tile's class using the updateClasses().

updateClasses(tile):
Updates the CSS class of a tile based on its value. It checks if the tile's value is not 0. If it's a non-zero number. Then, the corresponding class (2, 4, 8, 16, etc.) is added to apply the correct background color for that value.

moveRight():
Handles the logic for moving all tiles to the right when the player presses the right arrow key. For each row in the grid:
  - It puts the values of the tiles in that row into an array.
  - It reverses the row (to process it from the right), applies slideAndCombine(), and then reverses it back to its original order.
  - After updating the row values, it then updates the tile classes.

moveLeft():
Handles the logic for moving all tiles to the left when the player presses the left arrow key.  Similar logic to moveRight() but without reversing the tiles.

moveUp():
Handles the upward movement of tiles when the player presses the up arrow key. 

moveDown():
Handles moving tiles downward when the player presses the down arrow key. 

slideAndCombine(arr):
Handles sliding and combining the tiles in the game. The function accepts an array of tile values (for either a row or column) and removes all (empty tiles) from the array (sliding) and/or
checks adjacent non-zero tiles and combines them if they have the same value, setting the value of the second tile to 0. 

control(e):
Handles key presses and calls the appropirate function.
