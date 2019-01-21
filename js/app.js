
// Defining Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var elements = [];

class Grid {
    constructor(gridDim, pd) {
        this.gridDim = gridDim;
        this.pd = pd;
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
    constructor(x, y, length, direction) {
        this.length = length;
        // Length can only be 2 or 3
        this.x = x * 100;
        this.y = y * 100;
        this.direction = direction;
        this.active = true
    }
    
    drawPiece() {
        ctx.fillStyle = "tomato"
        var l = (((this.length * 100) - 10) / this.length);
        if (this.direction === "vert") {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x - 85, this.y + 15, 90, (this.length * l));
            ctx.stroke();
        } else if (this.direction === "horz") {
            ctx.fillRect(this.x + 15, (this.y - 85), (this.length * l), 90)
            ctx.stroke();
        } else {
            alert("Error in piece definition")
        }        
    }
    
}
// Instanciating the pieces
var h1 = new Piece(3, 0, 3, "vert");
h1.drawPiece();
elements.push(h1)
var ferrari = new Piece(3, 3, 2, "horz");
ferrari.drawPiece();
elements.push(ferrari);
addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < elements.length; i++) {
        elements[i].drawPiece();        
    }
    console.log(e)
    var ferrari = new Piece(Math.floor(e.pageX / 100), 3, 2, "horz")
    console.log(ferrari.x, ferrari.y)
    ferrari.drawPiece();
})


var gameGrid = new Grid(6, 10);
gameGrid.gridDrawing();



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