
// Defining Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = "610";
ctx.canvas.height = "610";
var elements = []

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
    constructor(x, y, length, direction, imp, w, h) {
        this.length = length;
        this.w = w;
        this.h = h;
        this.pd = 0;
        // Length can only be 2 or 3
        this.x = (x - 1) * 100;
        this.y = (y - 1) * 100;
        this.direction = direction;
        this.active = false;
        this.pieceArea = [[]];
        this.imp = imp;
        this.com = []; 
        this.area = {
            tl: {
                x: this.x + this.pd,
                y: this.y + this.pd
            },
            tr: {
                x: this.x + (100 * this.w) + this.pd,
                y: this.y + this.pd
            },
            bl: {
                x: this.x + this.pd,
                y: this.y + (100 * this.h) +this.pd
            },
            br: {
                x: this.x + (100 * this.w) + this.pd,
                y: this.y + (100 * this.h) + this.pd
            }
        }
        this.midpoints = {
            mt: {
                x: this.area.tl.x + 100,
                y: this.area.tl.y
            },
            mr: {
                x: this.area.tr.x,
                y: this.area.tr.y + 100
            },
            mb: {
                x: this.area.bl.x + 100,
                y: this.area.bl.y
            },
            ml: {
                x: this.area.tl.x,
                y: this.area.tl.y + 100
            }
        }

    }
    drawPiece() {
        var l = (((this.length * 100) - 10) / this.length);
        this.com = [];
        if (this.direction === "vert") {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x + 5, this.y + 5, 90, (this.length * l));
            this.pieceArea = [[this.x, this.y], [this.x + 100, this.y], [this.x, this.y + (this.length * 100)], [this.x + 100, this.y + (this.length * 100)]];
            ctx.stroke();
        } else if (this.direction === "horz" && this.imp == false) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x + 5, (this.y + 5), (this.length * l), 90)
            this.pieceArea = [[this.x, this.y], [this.x  + (this.length * 100), this.y], [this.x, this.y + 100], [this.x + (this.length * 100), this.y + 100]];
            ctx.stroke();
            
        } else if (this.direction === "horz" && this.imp == true) {
            ctx.fillStyle = "tomato";
            ctx.fillRect(this.x + 5, (this.y + 5), (this.length * l), 90);
            this.pieceArea = [[this.x, this.y], [this.x  + (this.length * 100), this.y], [this.x, this.y + 100], [this.x + (this.length * 100), this.y + 100]];
            ctx.stroke();
            // for (let i = 0; i < this.length; i++) {
            //     this.com.push([this.x + 50 + (i * 100), this.y - 50]);                
            // }
        }        
    }
    
}

// Piece.prototype.block2 = {
//     h: this.x + 50,
//     v: this.y + 50
// }
// Instanciating the grid
var gameGrid = new Grid(6, 0);
gameGrid.gridDrawing();

// Instanciating the pieces
let ferrari;
let v1;
let v2;
let h1;
function init() {  
    elements = [];
    ferrari = new Piece(1, 3, 2, "horz", 1, 2, 1);
    ferrari.drawPiece();
    // ferrari.COM();
    elements.push(ferrari);
    v2 = new Piece(4, 4, 2, "vert", 0, 1, 2);
    v2.drawPiece();
    // v2.COM();
    elements.push(v2);
    v1 = new Piece(3, 4, 3, "vert", 0, 1, 3);
    v1.drawPiece();
    // v1.COM();
    elements.push(v1);
    h1 = new Piece(3, 3, 3, "horz", 0, 3, 1)
    h1.drawPiece();
    // h1.COM();
    elements.push(h1);
};
init();

// -----+== Collision ==+----
// function collision() {
//     for (let i = 0; i < elements.length; i++) {
//         takenSpace.push(elements[i].com);
//     };
//     for (let j = 0; j < takenSpace.length; j++) {
        
//     }
// }
// collision();
// console.log(takenSpace)



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
        }   
    }   
});
canvas.addEventListener("mouseup", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameGrid.gridDrawing();
    console.clear();
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].direction == "horz" && elements[i].active == true) {
            elements[i].x = (Math.floor(e.pageX / 100) * 100);
            elements[i].active = false;
        } else if (elements[i].direction == "vert" && elements[i].active == true) {
            elements[i].y = (Math.floor(e.pageY / 100) * 100);
            elements[i].active = false;
        }
        elements[i].drawPiece();   
        console.log(elements[i].area)
    }
});
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

const player = {}

player.block1 = {
    x: 50,
    y: 150
}

player.block2 = {
    x: 150,
    y: 150
}