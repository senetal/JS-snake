class Controller {
    constructor(view,model) {
        this.view= view;
        this.model=model;

        setInterval(this.model.moveSnake(),500);
    }
}

const app = new Controller(new View(),new Model());
