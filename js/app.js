
// Defining Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = "610";
ctx.canvas.height = "610";
var elements = [],
    tempElements = [];
var pieceAreaArr = [];

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
    constructor(x, y, length, direction, imp) {
        this.length = length;
        // Length can only be 2 or 3
        this.x = x * 100;
        this.y = y * 100;
        this.direction = direction;
        this.active = false;
        this.pieceArea = [[]];
        this.imp = imp;
    }
    
    drawPiece() {
        var l = (((this.length * 100) - 10) / this.length);
        if (this.direction === "vert") {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x - 85, this.y + 15, 90, (this.length * l));
            this.pieceArea = [[this.x - 100, this.y], [this.x, this.y], [this.x - 100, this.y + (this.length * 100)], [this.x, this.y + (this.length * 100)]];
            ctx.stroke();
        } else if (this.direction === "horz" && this.imp == false) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x + 15, (this.y - 85), (this.length * l), 90)
            this.pieceArea = [[this.x, this.y - 100], [this.x  + (this.length * 100), this.y - 100], [this.x, this.y], [this.x + (this.length * 100), this.y]];
            ctx.stroke();
        } else if (this.direction === "horz" && this.imp == true) {
            ctx.fillStyle = "tomato";
            ctx.fillRect(this.x + 15, (this.y - 85), (this.length * l), 90);
            this.pieceArea = [[this.x, this.y - 100], [this.x  + (this.length * 100), this.y - 100], [this.x, this.y], [this.x + (this.length * 100), this.y]];
            ctx.stroke();
        }        
    }
    reset() {
        var l = (((this.length * 100) - 10) / this.length);

    }
    
}

// Instanciating the grid
var gameGrid = new Grid(6, 10);
gameGrid.gridDrawing();

// Instanciating the pieces
let ferrari;
let v1;
let v2;
let h1;
function init() {  
    elements = [];
    ferrari = new Piece(0, 3, 2, "horz", 1);
    ferrari.drawPiece();
    elements.push(ferrari);
    v2 = new Piece(4, 2, 2, "vert", 0);
    v2.drawPiece();
    elements.push(v2);
    v1 = new Piece(3, 0, 3, "vert", 0);
    v1.drawPiece();
    elements.push(v1);
    h1 = new Piece(0, 4, 3, "horz", 0)
    h1.drawPiece();
    elements.push(h1);
};
init();
// let v2 = new Piece(4, 2, 2, "vert");
// v2.drawPiece();
// elements.push(v2);
// let v1 = new Piece(3, 0, 3, "vert");
// v1.drawPiece();
// elements.push(v1)
// let ferrari = new Piece(0, 3, 2, "horz");
// ferrari.drawPiece();
// elements.push(ferrari);


// ------+== Reset Button ==+-------
var reset = document.getElementById('reset');
reset.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    init();
})

// -----+== Animation Loop ==+------
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ferrari.drawPiece();
}

// ------+== On click listeners ==+----
// If clicked in area of piece, switches the boolean
canvas.addEventListener("mousedown", (e) => {
    for (let i = 0; i < elements.length; i++) {
        if (e.pageX > elements[i].pieceArea[0][0] && e.pageX < elements[i].pieceArea[1][0] && e.pageY > elements[i].pieceArea[0][1] && e.pageY < elements[i].pieceArea[2][1]){
            elements[i].active = true;
            console.log(elements[i].active);
        }   
    }   
});
canvas.addEventListener("mouseup", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameGrid.gridDrawing();
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].direction == "horz" && elements[i].active == true) {
            elements[i].x = (Math.floor(e.pageX / 100) * 100);
            elements[i].active = false;
        } else if (elements[i].direction == "vert" && elements[i].active == true) {
            elements[i].y = (Math.floor(e.pageY / 100) * 100);
            elements[i].active = false;
        }
            elements[i].drawPiece();
            console.log(elements[i].active)
        }
});
    



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