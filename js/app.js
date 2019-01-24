    // Defining Canvas
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = "600";
    ctx.canvas.height = "600";
    // Setting full-scope variables
    var elements = [];
    // var scoreTally = document.getElementById('count');
    // let score = 0;
    //     scoreTally.innerText = score;
    // var mMoves = document.getElementById('min-moves');
    // let minMoves = 12;

    // Grid Class
    class Grid {
        constructor(gridDim, pd) {
            this.gridDim = gridDim;
            this.pd = pd;
        }
        gridDrawing() {
            ctx.beginPath();
            ctx.fillStyle = "#333";     
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            for (let i = 1; i < (this.gridDim); i++){      // grid dimensions only need one variable as the board is square
                ctx.moveTo(this.pd, this.pd + (100 * i));
                ctx.lineTo(this.pd + (100 * this.gridDim), this.pd + (100 * i));   
            }
            for (let i = 1; i < (this.gridDim); i++) {
                ctx.moveTo(this.pd + (100 * i), this.pd);
                ctx.lineTo(this.pd + (100 * i), this.pd + (100 * this.gridDim));
            }
            ctx.strokeStyle = "#990";
            ctx.setLineDash([25, 10]);
            ctx.lineWidth = "5";
            ctx.shadowColor = "#555";
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.beginPath();
            for (let i = 0; i < (this.gridDim + 1); i = i + this.gridDim){      // grid dimensions only need one variable as the board is square
                ctx.moveTo(this.pd, this.pd + (100 * i));
                ctx.lineTo(this.pd + (100 * this.gridDim), this.pd + (100 * i));   
            }
            for (let i = 0; i < (this.gridDim + 1); i = i + this.gridDim) {
                ctx.moveTo(this.pd + (100 * i), this.pd);
                ctx.lineTo(this.pd + (100 * i), this.pd + (100 * this.gridDim));
            }
            ctx.strokeStyle = "#FFF";
            ctx.setLineDash([1,0])
            ctx.lineWidth = "10";
            ctx.shadowColor = "#555";
            ctx.shadowBlur = 10;
            ctx.stroke();
        }
        endGoal() {
            ctx.fillStyle = "rgba(0, 170, 0, 0.3)"
            ctx.fillRect(400, 200, 200, 100)
            ctx.stroke(); 
        }
    }
    // Defining images for the pieces

        // Piece Class
        class Piece {
            constructor(x, y, length, direction, w, h) {
                this.length = length;
                this.w = w;
                this.h = h;
                // Length can only be 2 or 3
                this.x = (x - 1) * 100;
                this.y = (y - 1) * 100;
                this.prevX = this.x;
                this.prevY = this.y;
                this.direction = direction;
                this.active = false;
                this.name;
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
                var l = (((this.length * 100) - 16) / this.length);
                ctx.beginPath();
                ctx.globalCompositeOperation = "source-over";
                // Drawing the pieces
                if (this.direction === "vert") {
                    ctx.beginPath();
                    if (this.length == 2) {
                        var jagV = document.getElementById("jagV");
                        ctx.drawImage(jagV, this.x + 5, this.y + 5, 90, 190);
                    } else if (this.length == 3) {
                        var lorryV = document.getElementById("lorryV");
                        ctx.drawImage(lorryV, this.x + 5, this.y + 5, 90, 290);
                    }
                    ctx.stroke();
                } else if (this.direction === "horz" && this.name !== "ferrari") {
                    ctx.beginPath();
                    if (this.length == 2) {
                        var jagH = document.getElementById("jagH");
                        ctx.drawImage(jagH, this.x + 5, this.y + 5, 190, 90);
                    } else if (this.length !== 2) {
                        var lorryH = document.getElementById("lorryH");
                        ctx.drawImage(lorryH, this.x + 5, this.y + 5, 290, 90);
                    }
                    ctx.stroke();
                } else if (this.direction === "horz" && this.name == "ferrari") {
                    ctx.beginPath();
                    var ferrariImg = document.getElementById("ferrari");
                    ctx.drawImage(ferrariImg, this.x, this.y, 200, 100);
                    ctx.stroke();
                }
                    
            }
            
        }
    // Instanciating the pieces
    let ferrari;
    let v1;
    let v2;
    let v3;
    let v4;
    let v5;
    let v6;
    let v7;
    let h1;
    let h2;
    let h3;
    let h4;
    let h5;
    let h6;

    var mapState = [
        map1 = function() {
            ferrari = new Piece(1, 3, 2, "horz", 2, 1);
            v1 = new Piece(4, 1, 3, "vert", 1, 3);
            v2 = new Piece(5, 4, 2, "vert", 1, 2);
            v3 = new Piece(2, 5, 2, "vert", 1, 2);
            v4 = new Piece(6, 1, 3, "vert", 1, 3);
            v5 = null;
            v6 = null;
            v7 = null;
            h1 = new Piece(3, 5, 2, "horz", 2, 1);
            h2 = null;
            h3 = null;
            h4 = null;
            h5 = null;
            h6 = null;
            minMoves = 12;
            ferrari.name = "ferrari";
        },
        map2 = function() {
            ferrari = new Piece(1, 3, 2, "horz", 2, 1);
            v1 = new Piece(1, 1, 2, "vert", 1, 2);
            v2 = new Piece(3, 2, 2, "vert", 1, 2);
            v3 = new Piece(4, 2, 3, "vert", 1, 3);
            v4 = new Piece(5, 3, 3, "vert", 1, 3);
            v5 = null;
            v6 = null;
            v7 = null;
            h1 = new Piece(2, 1, 2, "horz", 2, 1);
            h2 = new Piece(4, 1, 2, "horz", 2, 1);
            h3 = new Piece(2, 4, 2, "horz", 2, 1);
            h4 = new Piece(2, 5, 2, "horz", 2, 1);
            h5 = new Piece(1, 6, 3, "horz", 3, 1)
            minMoves = 26;
            ferrari.name = "ferrari";
        },
        map3 = function() {

        },
        map4 = function() {

        },
        map5 = function() {
            ferrari = new Piece(4, 3, 2, "horz", 2, 1);
            v1 = new Piece(1, 1, 3, "vert", 1, 3);
            v2 = new Piece(2, 2, 2, "vert", 1, 2);
            v3 = new Piece(3, 2, 2, "vert", 1, 2);
            v4 = new Piece(5, 1, 2, "vert", 1, 2);
            v5 = new Piece(6, 2, 3, "vert", 1, 3);
            v6 = new Piece(4, 4, 2, "vert", 1, 2);
            v7 = new Piece(3, 5, 2, "vert", 1, 2);
            h1 = new Piece(2, 1, 2, "horz", 2, 1);
            h2 = new Piece(1, 4, 3, "horz", 3, 1);
            h3 = new Piece(1, 6, 2, "horz", 2, 1);
            h4 = new Piece(5, 5, 2, "horz", 2, 1);
            h5 = new Piece(5, 5, 2, "horz", 2, 1);
            minMoves = 51;
            ferrari.name = "ferrari";
        }
    ]
    let mapSelected = 0;
    let one = document.getElementById('1');
    one.addEventListener('click', function() {
        mapSelected = 0;
        init();
    })
    let two = document.getElementById('2');
    two.addEventListener('click', function() {
        mapSelected = 1;
        init();
    })
    let three = document.getElementById('3');
    three.addEventListener('click', function() {
        mapSelected = 2;
        init();
    })
    let four = document.getElementById('4');
    four.addEventListener('click', function() {
        mapSelected = 3
        init();
    })
    let five = document.getElementById('5');
    five.addEventListener('click', function() {
        mapSelected = 4;
        init();
    })

    // Instanciating the grid
    var gameGrid = new Grid(6, 0);
    function init() {
        mapState[mapSelected]();
        elements = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        gameGrid.gridDrawing();
        gameGrid.endGoal();
        // Winning piece
        ferrari.drawPiece();
        ferrari.indexCreate();
        elements.push(ferrari);
        // Verticle pieces
        v1.drawPiece();
        v1.indexCreate()
        elements.push(v1);
        if (v2 !== null) {
            v2.drawPiece();
            v2.indexCreate();
            elements.push(v2);
        }
        if (v3 !== null) {
            v3.drawPiece();
            v3.indexCreate();
            elements.push(v3);
        }
        if (v4 !== null) {
            v4.drawPiece();
            v4.indexCreate();
            elements.push(v4);
        }
        if (v5 !== null) {
            v5.drawPiece();
            v5.indexCreate();
            elements.push(v5);
        }
        if (v6 !== null) {
            v6.drawPiece();
            v6.indexCreate();
            elements.push(v6);
        }
        if (v7 !== null) {
            v7.drawPiece();
            v7.indexCreate();
            elements.push(v7);
        }
        // Horizontal pieces
        h1.drawPiece();
        h1.indexCreate();
        elements.push(h1);
        if (h2 !== null) {
            h2.drawPiece();
            h2.indexCreate();
            elements.push(h2);
        }
        if (h3 !== null) {
            h3.drawPiece();
            h3.indexCreate();
            elements.push(h3);
        }
        if (h4 !== null) {
            h4.drawPiece();
            h4.indexCreate();
            elements.push(h4);
        }
    };
    // ------+== Reset Button ==+-------
    var reset = document.getElementById('reset');
    reset.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
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
            if ((e.pageX - (window.innerWidth * 0.3)) > elements[i].x && (e.pageX - (window.innerWidth * 0.3)) < (elements[i].x + (elements[i].w * 100)) && (e.pageY - 150) > elements[i].y && (e.pageY - 150) < (elements[i].y + (100 * elements[i].h))) {
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
                elements[i].x = ((Math.floor((e.pageX - 600) / 100)) * 100);
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
                elements[i].y = ((Math.floor((e.pageY - 150) / 100)) * 100);
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
