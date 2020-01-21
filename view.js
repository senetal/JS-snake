class View {
    constructor(hs) {
        this.canvas = document.getElementById('grid');
        this.context = this.canvas.getContext('2d');
        this.context.lineWidth=3;
        this.context.rect(0,0,506,506);
        this.context.moveTo(3,3);
        this.context.fillStyle="#ffffff";
        this.context.fillRect(3,3,500,500);
        this.context.stroke();

        var p = document.getElementById('highscore');
        p.innerHTML = "High score : "+hs;
    }

    updateView(grid,score){
        for(var i=0;i<grid.length;i++){
            for(var j=0;j<grid.length;j++){
                switch(grid[i][j]){
                    case 1:
                    this.context.fillStyle="#ff0000";
                    break;
                    case 2:
                    this.context.fillStyle="#ffff00";
                    break;
                    case 3:
                    this.context.fillStyle="#00ff00";
                    break;
                    default:
                    this.context.fillStyle="#ffffff";
                }
                    this.context.moveTo(i*25+3,j*25+3);
                    this.context.fillRect(i*25+3,j*25+3,25,25);
            }
        }

        var p = document.getElementById('score');
        p.innerHTML = "Score : "+score;
    }

}
