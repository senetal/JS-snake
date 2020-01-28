class Model {
    constructor() {

        //difficulty
        this.dif = 2;
        //highscore
        this.highscore = 0;
        //grid size
        this.size = 20;
        //init direction
        this.direction = null;

        //init score
        this.score=0;
    }

    bindInitGrid(callback){ this.initGrid = callback; }
    bindPlaceFruit(callback){ this.placeFruit = callback; }
    bindPlay(callback){ this.play = callback; }
    bindReset(callback){ this.reset = callback; }
    bindMoveSnake(callback){ this.moveSnake = callback; }
    bindKillSnake(callback){ this.killSnake = callback; }
    bindSetDiff(callback){ this.setDiff = callback; }

    execInitGrid(){ this.initGrid(); }
    execPlaceFruit(){ this.placeFruit(); }
    execPlay = ()=>{ this.play(); }
    execReset(){ this.reset(); }
    execMoveSnake(){ this.moveSnake(); }
    execKillSnake(){ this.killSnake(); }
    execSetDiff(dif){ this.setDiff(dif); }

}
