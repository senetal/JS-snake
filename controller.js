class Controller {
    constructor(view, model) {

        this.view = view;
        this.model = model;


        this.model.bindInitGrid(this.initGrid);
        this.model.bindPlaceFruit(this.placeFruit);
        this.model.bindPlay(this.play);
        this.model.bindReset(this.reset);
        this.model.bindMoveSnake(this.moveSnake);
        this.model.bindKillSnake(this.killSnake);
        this.model.bindSetDiff(this.setDiff);

        this.model.execInitGrid();

        this.initListeners();

        window.onload=()=>{
            this.model.execReset();
        };
    }

    initListeners(){
        document.addEventListener('keydown', function(event) {
            switch (event.key) {
                case 'z':
                case 'ArrowUp':
                app.model.direction = 'u';
                break;
                case 's':
                case 'ArrowDown':
                app.model.direction = 'd';
                break;
                case 'q':
                case 'ArrowLeft':
                app.model.direction = 'l';
                break;
                case 'd':
                case 'ArrowRight':
                app.model.direction = 'r';
                break;
                case ' ':
                app.model.execReset();
                break;
            }
        });

        var buttons = document.getElementsByClassName('diff');
        for(var i=0;i<buttons.length;i++){
            buttons[i].onclick = function(){
                app.model.execSetDiff(parseInt(this.value));
            }
        }

        document.getElementById('reset').onclick=function(){
            app.model.execReset();
        }

        var canvas = document.getElementsByClassName("skin");
        for(var i=0;i<canvas.length;i++){
            canvas[i].onclick = function(){
                app.view.setSkin(parseInt(this.id.substring(4)));
                app.model.execReset();
            }
        }
    }

    //init grid
    initGrid(){
        this.grid = [];
        for (var i = 0; i < this.size+2; i++) {
            this.grid.push([]);
            for (var j = 0; j < this.size+2; j++) {
                if(i==0 || i==this.size+1 || j==0 || j==this.size+1)
                this.grid[i].push(4); //4 = walls
                else
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
    }

    //place a fruit at random location
    placeFruit(){
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
    moveSnake(){
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
        if(headx>this.size-1 || headx <0 || heady>this.size-1 || heady <0){
            return this.execKillSnake();
        }else{
            if(this.grid[headx][heady]<3 || (this.grid[headx][heady]==3 && headx==tailx && heady==taily)){

                if(this.grid[headx][heady]==1){//if cell is a fruit
                    this.execPlaceFruit();
                    this.score+=4-this.dif;
                }else{
                    this.snake.pop();
                    this.grid[tailx][taily]=0;
                }
                //move the head on the grid
                this.grid[headx][heady]=2;

            }else{ //if the cell is snake's body
                return this.execKillSnake();
            }
        }

        return false;//means that the snake is still alive
    }

    //kill the snake
    killSnake = () => {
        clearInterval(interval);
        this.model.direction=null;
        this.view.showDefeat(this.model.score);
        this.model.score=0;
        return true; //means that the snake is dead
    }

    play = () =>{

        if(this.model.direction){
            this.view.showDefeat(-1);
                this.model.execMoveSnake();
                this.view.updateView(this.model.grid,this.model.score,this.model.direction);

            if(this.model.score>this.model.highscore){
                this.model.highscore=this.model.score;
            }
        }
    };

    reset = () =>{
        this.model.direction=null;
        this.model.score=0;
        this.view.showDefeat(-1);
        this.model.execInitGrid();
        this.view = new View(this.model.highscore,this.view.skin);
        this.view.updateView(this.model.grid,this.model.score,'d');
        clearInterval(interval);
        interval = setInterval(this.model.execPlay, 50*this.model.dif);
    };

    setDiff(d){
        this.dif = d;
        this.execReset();
    }
}
var interval;
const app = new Controller(new View('0',0), new Model());
