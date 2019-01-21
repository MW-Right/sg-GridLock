document.addEventListener("DOMContentLoaded", function() {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    console.log(ctx)

    class Grid {
        constructor(gridDim, pd) {
            this.gridDim = gridDim;
            this.pd = pd; 
            this.gridWidth = function() {

            }
        }
        gridDrawing() {
            for (let i = 0; i < (this.gridDim + 1); i++){      // grid dimensions only need one variable as the board is square
                ctx.moveTo(this.pd, this.pd + (100 * i));
                ctx.lineTo(this.pd + (100 * this.gridDim), this.pd + (100 * i));   
            }
            for (let i = 0; i < (this.gridDim + 1); i++) {
                ctx.moveTo(this.pd + (100 * i), this.pd);
                ctx.lineTo(this.pd + (100 * i), this.pd + (100 * this.gridDim));
            }
            ctx.strokeStyle = "#000";
            ctx.stroke();
        }
    }

    class Piece {
        constructor(position, length, stride) {
            this.length = length;
            // Length can only be 2 or 3
            this.startPos = [];
            this.currentPos = [];
        }
        position() {
            this.currentPos = 
        }

    }
    // var ferrari = new Piece(2);
    // ferrari.style.background = '#FF0000';
    var gameGrid = new Grid(6, 10);
    gameGrid.gridDrawing();

}); //DOM Content closer

// --------+== PseudoCode ==+-----------

// ------ GRID -------
//Design grid - 6x6 grid
// Set starting positions of different levels
    // 3 levels for first sprint

// ----- PIECES -------
// Initiate pieces
// Dimensions of pieces - 2x1, 3x1
// Fixed direction of pieces
// Movement of pieces
    // Limited to up-to-next movement

// ----- WIN ------
// If the ferrari reaches a fixed coordinate
// Add maximum move count

// ------ BUTTON ------
// Reset Button
// Undo
// Level Selector