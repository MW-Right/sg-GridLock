
// Defining Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = "630";
ctx.canvas.height = "630";

// Setting full-scope variables
var elements = []
var score = document.getElementById('moves');
    score.innerText = "0";

// Grid Class
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
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 10;
        ctx.stroke();
    }
    endGoal() {
        ctx.fillStyle = "rgba(0, 255, 0, 0.7)"
        ctx.fillRect(400, 200, 200, 100)
        ctx.stroke(); 
    }
}

// Piece Class
class Piece {
    constructor(x, y, length, direction, imp, w, h) {
        this.length = length;
        this.w = w;
        this.h = h;
        this.pd = 0;
        // Length can only be 2 or 3
        this.x = (x - 1) * 100;
        this.y = (y - 1) * 100;
        this.prevX = this.x;
        this.prevY = this.y;
        this.direction = direction;
        this.active = false;
        this.pieceArea = [[]];
        this.imp = imp;
        this.index = {};
        this.area = {
            tl: {
                x: this.x,
                y: this.y
            },
            tr: {
                x: this.x + (100 * this.w),
                y: this.y
            },
            bl: {
                x: this.x,
                y: this.y + (100 * this.h)
            },
            br: {
                x: this.x + (100 * this.w),
                y: this.y + (100 * this.h) 
            } 
        };

    }
    indexCreate() {
    // CREATING INDEX FOR DRAWN PIECE
        for (let i = 0; i < this.length; i++) {
            if (this.direction == "horz") {
                this.index[i] = {horz:((this.x + 100) / 100) + i, vert: ((this.y + 100) / 100)}
            } else {
                this.index[i] = {horz:((this.x + 100) / 100), vert: ((this.y + 100) / 100) + i}
            }
        }
    }
    checkIndex() {
        for (let j = 0; j < this.length; j++) {
            for (let i = 0; i < elements.length; i++) {
                for (let k = 0; k < elements[i].length; k++) {
                    // console.log(k)
                    if (this === elements[i]) {
                        continue;
                    } else if (this.index[j].vert == elements[i].index[k].vert && this.index[j].horz == elements[i].index[k].horz){
                        this.x = this.prevX;
                        this.y = this.prevY;
                        this.collision = true;
                    }
                }
            }
        }
    } 
    drawPiece() {
        var l = (((this.length * 100) - 10) / this.length);
        this.com = [];
        ctx.beginPath();
        ctx.globalCompositeOperation = "source-over"
        // Drawing the pieces
        if (this.direction === "vert") {
            ctx.fillStyle = "rgba(0, 0, 255, 1)";
            ctx.fillRect(this.x + 5, this.y + 5, 90, (this.length * l));
            this.pieceArea = [[this.x, this.y], [this.x + 100, this.y], [this.x, this.y + (this.length * 100)], [this.x + 100, this.y + (this.length * 100)]];
            ctx.shadowColor = "#888";
            ctx.shadowBlur = 10;
            ctx.stroke();
        } else if (this.direction === "horz" && this.imp == false) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x + 5, (this.y + 5), (this.length * l), 90)
            this.pieceArea = [[this.x, this.y], [this.x  + (this.length * 100), this.y], [this.x, this.y + 100], [this.x + (this.length * 100), this.y + 100]];
            ctx.shadowColor = "#888";
            ctx.shadowBlur = 10;
            ctx.stroke();
        } else if (this.direction === "horz" && this.imp == true) {
            ctx.fillStyle = "tomato";
            ctx.fillRect(this.x + 5, (this.y + 5), (this.length * l), 90);
            this.pieceArea = [[this.x, this.y], [this.x  + (this.length * 100), this.y], [this.x, this.y + 100], [this.x + (this.length * 100), this.y + 100]];
            ctx.shadowColor = "#888";
            ctx.shadowBlur = 10;
            ctx.stroke();
        }
            
    }
    
}

// Instanciating the grid
var gameGrid = new Grid(6, 0);
gameGrid.gridDrawing();
gameGrid.endGoal();

// Instanciating the pieces
let ferrari;
let v1;
let v2;
let v3;
let v4;
let h1;
function init() {  
    elements = [];
    // Winning piece
    ferrari = new Piece(1, 3, 2, "horz", 1, 2, 1);
    ferrari.drawPiece();
    ferrari.indexCreate();
    elements.push(ferrari);
    // Verticle pieces
    v1 = new Piece(4, 1, 3, "vert", 0, 1, 3);
    v1.drawPiece();
    v1.indexCreate()
    elements.push(v1);
    v2 = new Piece(5, 4, 2, "vert", 0, 1, 2);
    v2.drawPiece();
    v2.indexCreate();
    elements.push(v2);
    v3 = new Piece(2, 5, 2, "vert", 0, 1, 2);
    v3.drawPiece();
    v3.indexCreate();
    elements.push(v3);
    v4 = new Piece(6, 1, 3, "vert", 0, 1, 3);
    v4.drawPiece();
    v4.indexCreate();
    elements.push(v4);
    // Horizontal pieces
    h1 = new Piece(3, 5, 2, "horz", 0, 2, 1)
    h1.drawPiece();
    h1.indexCreate();
    elements.push(h1);
};
init();


// ------+== Reset Button ==+-------
var reset = document.getElementById('reset');
reset.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gameGrid.gridDrawing();
    gameGrid.endGoal();
    init();
    score.innerText = "0";
})

// Win Condition
function checkWin() {
    setTimeout(function() {
        if (ferrari.area.tl.x == 400 && ferrari.area.tl.y == 200) {
            alert("2 Ez 4 u");
        }
    }, 200)
}

// ------+== On click listeners ==+----
// If clicked in area of piece, switches the boolean
canvas.addEventListener("mousedown", (e) => {
    for (let i = 0; i < elements.length; i++) {
        if (e.pageX > elements[i].pieceArea[0][0] && e.pageX < elements[i].pieceArea[1][0] && e.pageY > elements[i].pieceArea[0][1] && e.pageY < elements[i].pieceArea[2][1]){
            elements[i].active = true;
        }   
    }   
});
canvas.addEventListener("mouseup", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameGrid.gridDrawing();
    gameGrid.endGoal(); 
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].direction == "horz" && elements[i].active == true) {
            elements[i].prevX = elements[i].x
            elements[i].prevY = elements[i].y
            elements[i].x = (Math.floor(e.pageX / 100) * 100);
            // if (elements[i].collision == false) {
                if (elements[i].x < 0) {
                    elements[i].x = 0
                }
                if ((elements[i].x + (elements[i].w * 100)) > 600) {
                    elements[i].x = 600 - (elements[i].w * 100)
                }
            elements[i].area.tl.x = elements[i].x;
            elements[i].area.tl.y = elements[i].y;
            elements[i].active = false;
        } else if (elements[i].direction == "vert" && elements[i].active == true) {
            elements[i].prevX = elements[i].x
            elements[i].prevY = elements[i].y
            elements[i].y = (Math.floor(e.pageY / 100) * 100);
            if (elements[i].y < 0) {
                elements[i].y = 0
            }
            if ((elements[i].y + (elements[i].h * 100)) > 600) {
                elements[i].y = 600 - (elements[i].h * 100)
            } 
            elements[i].active = false;
        }
        elements[i].indexCreate();
        elements[i].checkIndex();
        elements[i].drawPiece();
    }
    checkWin();
    score.innerText++;
});

// ---+== Border Limits ==+---
if (this.collision == false) {
    if (this.x < 0) {
        this.x = 0
    }
    if ((this.x + (this.w * 100)) > 600) {
        this.x = 600 - (this.w * 100)
    }
    if (this.y < 0) {
        this.y = 0
    }
    if ((this.y + (this.h * 100)) > 600) {
        this.y = 600 - (this.h * 100)
    }
}



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
