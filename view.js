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

        this.images=this.initImages();


        var p = document.getElementById('highscore');
        p.innerHTML = "HighScore : "+hs;
    }

    initImages(){
        var images=[];
        for(var i=0;i<5;i++){
            images.push(new Image());
        }
        images[0].src="images/boardgame.png";
        images[1].src="images/food.png";
        images[2]=new Map();
            images[2].set('u',new Image());
            images[2].set('d',new Image());
            images[2].set('r',new Image());
            images[2].set('l',new Image());
            images[2].get('u').src = "images/headsnake_u.png";
            images[2].get('d').src = "images/headsnake_d.png";
            images[2].get('r').src = "images/headsnake_r.png";
            images[2].get('l').src = "images/headsnake_l.png";
        images[3].src="images/bodysnake.png";
        images[4].src="images/wall.png";
        return images;
    }

    updateView(grid,score,angle){
        for(var i=0;i<grid.length;i++){
            for(var j=0;j<grid.length;j++){
                // switch(grid[i][j]){
                //     case 1:
                //     this.context.fillStyle="#ff0000";
                //     break;
                //     case 2:
                //     this.context.fillStyle="#ffff00";
                //     break;
                //     case 3:
                //     this.context.fillStyle="#00ff00";
                //     break;
                //     default:
                //     this.context.fillStyle="#ffffff";
                // }
                this.context.drawImage(this.images[0],i*25+3,j*25+3,25,25);
                switch(grid[i][j]){
                    case 2:
                    this.context.drawImage(this.images[2].get(angle),i*25+3,j*25+3,25,25);
                    break;
                    case 1:
                    case 3:
                    this.context.drawImage(this.images[grid[i][j]],i*25+3,j*25+3,25,25);
                    break;
                }
                    // this.context.moveTo(i*25+3,j*25+3);
                    // this.context.fillRect(i*25+3,j*25+3,25,25);
            }
        }

        var p = document.getElementById('score');
        p.innerHTML = "Score : "+score;
    }

}
