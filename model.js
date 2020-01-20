class Model {
    constructor() {
        //grid size
        this.size = 20;

        //grid definition
        this.grid = [];
        for (var i = 0; i < this.size; i++) {
            this.grid.push([]);
            for (var j = 0; j < this.size; j++) {
                this.grid[i].push(0); //0 = empty cell
            }
        }
        //snake placement
        this.snake = [
            [
                Math.floor(Math.random() * this.size),
                Math.floor(Math.random() * this.size)
            ]
        ];
        this.grid[this.snake[0].x][this.snake[0].y] = 2; //2= snake's head
        //init first fruit
        this.placeFruit();
    }

    //reset grid
    reset() {
        constructor();
    }

    //place a fruit at random location
    placeFruit() {
        var x;
        var y;
        do {
            x = Math.floor(Math.random() * this.size);
            y = Math.floor(Math.random() * this.size);
        } while (this.grid[x][y] != 0);
        //1= fruit
        this.grid[x][y] = 1;
    }

    //move snake
    moveSnake() {

    }

}
