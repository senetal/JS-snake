class Controller {
    constructor(view,model) {
        this.view= view;
        this.model=model;

        this.view.updateGrid(this.model.grid);

        document.body.addEventListener('keypress',function(event){
            console.log(event);
        });
    }

    play(){
        this.model.moveSnake();
    }
}

const app = new Controller(new View(),new Model());
setInterval(app.play,500);
