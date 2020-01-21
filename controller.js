class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.dif = 2;
        this.highscore = 0;
        this.view.updateView(this.model.grid,'0','d');

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
                app.reset();
                break;
            }
        });
    }

    play() {
        if(app.model.direction){
            if(app.model.isdead){
                console.log("Vous avez perdu. Votre score : "+app.model.score);
                if(app.model.score>app.highscore){
                    app.highscore=app.model.score;
                }
            }else{
                app.model.moveSnake();
                app.view.updateView(app.model.grid,app.model.score,app.model.direction);
            }
        }

    }

    reset(){
        app.model = new Model();
        app.view = new View(app.highscore);
        app.view.updateView(app.model.grid,'0','d');
        clearInterval(interval);
        interval = setInterval(app.play, 50*app.dif);
    }

    diff(d){
        console.log(d)
        app.dif = d;
        app.reset();
    }
}

const app = new Controller(new View('0'), new Model());

var interval = setInterval(app.play, 50*app.dif);
