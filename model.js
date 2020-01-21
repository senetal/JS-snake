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
        this.grid[this.snake[0][0]][this.snake[0][1]] = 2; //2= snake's head
        //init first fruit
        this.placeFruit();
        //init direction
        this.direction = null;
        //init score
        this.score=0;
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

        //get head
        var head=this.snake[0];
        var headx=head[0];
        var heady=head[1];
        //set current head as body
        this.grid[headx][heady]=3;

        //get tail
        var tail=this.snake[this.snake.length-1];
        var tailx=tail[0];
        var taily=tail[1];

        //move head
        switch(this.direction){
            case 'r':
                headx++;
                break;
            case 'l':
                headx--;
                break;
            case 'u':
                heady--;
                break;
            case 'd':
                heady++;
                break;
        }

        //add new head
        this.snake.unshift([headx,heady]);

        //error means that snake hit a wall
        try{
            if(this.grid[headx][heady]!=3){

                if(this.grid[headx][heady]==1){//if cell is a fruit
                    placeFruit();
                    this.score++;
                }else{//if cell is empty
                    this.grid[tailx][taily]=0;
                    this.snake.pop();
                }
                //move the head on the grid
                this.grid[headx][heady]=2;

            }else{ //if the cell is snake's body
                return this.killSnake();
            }
        }catch(e){
            return this.killSnake();
        }
        return false;//means that the snake is still alive
    }

    //kill the snake
    killSnake(){
        this.direction=null; //stop snake movement
        return true; //means that the snake is dead
    }

}
