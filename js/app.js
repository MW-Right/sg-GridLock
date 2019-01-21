
// Defining Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = "610";
ctx.canvas.height = "610";
var elements = [],
    tempElements = [];

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
        this.active = false;
        this.pieceArea = [[]];
    }
    
    drawPiece() {
        ctx.fillStyle = "tomato"
        var l = (((this.length * 100) - 10) / this.length);
        if (this.direction === "vert") {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x - 85, this.y + 15, 90, (this.length * l));
            this.pieceArea = [[this.x - 100, this.y], [this.x, this.y], [this.x - 100, this.y + (this.length * 100)], [this.x, this.y + (this.length * 100)]]
            ctx.stroke();
        } else if (this.direction === "horz") {
            ctx.fillRect(this.x + 15, (this.y - 85), (this.length * l), 90)
            this.pieceArea = [[this.x, this.y - 100], [this.x  + (this.length * 100), this.y - 100], [this.x, this.y], [this.x + (this.length * 100), this.y]]
            console.log(this.pieceArea)
            ctx.stroke();
        } else {
            alert("Error in piece definition")
        }        
    }
    
}

// Instanciating the grid
var gameGrid = new Grid(6, 10);
gameGrid.gridDrawing();

// Instanciating the pieces
var v1 = new Piece(4, 2, 2, "vert");
v1.drawPiece();
elements.push(v1);
var h1 = new Piece(3, 0, 3, "vert");
h1.drawPiece();
elements.push(h1)
var ferrari = new Piece(0, 3, 2, "horz");
ferrari.drawPiece();
elements.push(ferrari);

// ------+== Reset Button ==+-------
var reset = document.getElementById('reset');
reset.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < elements.length; i++) {
        elements[i].drawPiece();        
    }
})

// ------+== On click listeners ==+----
// If clicked in area of piece, switches the boolean
canvas.addEventListener("mousedown", (e) => {
    if (e.pageX > ferrari.pieceArea[0][0] && e.pageX < ferrari.pieceArea[1][0] && e.pageY > ferrari.pieceArea[0][1] && e.pageY < ferrari.pieceArea[2][1]){
        ferrari.active = true; //((ferrari.active - 1) * (ferrari.active - 1))/ (ferrari.active + 1);
        // console.log(ferrari.active);
    }
});
canvas.addEventListener("mouseup", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].active == false) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            elements[i].drawPiece();        
        } else {
            ferrari.x = (Math.floor(e.pageX / 100) * 100);
            elements[i].drawPiece();
        }
        gameGrid.gridDrawing();
    }
})
    
    // console.log(e)
    // var newferrari = new Piece(Math.floor(e.pageX / 100), 3, 2, "horz")
    // newferrari.drawPiece();
    // tempElements.push(newferrari)
console.log(elements)





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