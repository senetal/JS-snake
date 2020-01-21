class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.highscore = 0;

        this.view.updateView(this.model.grid,'0');

        document.addEventListener('keydown', function(event) {
            console.log(event.key);
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
                app.view.updateView(app.model.grid,app.model.score);
            }
        }

    }

    reset(){
        app.model = new Model();
        app.view = new View(app.highscore);
        app.view.updateView(app.model.grid,'0');
    }
}

const app = new Controller(new View('0'), new Model());

setInterval(app.play, 50);
