class View {
    constructor(hs, skin) {
        this.skin = skin;
        this.initSkins();
        this.loaded = 0;
        this.images = this.initImages(this.skin);

        this.canvas = document.getElementById('grid');
        this.context = this.canvas.getContext('2d');

        var p = document.getElementById('highscore');
        p.innerHTML = "Top 5 :<br>";
        for (var i = 0; i < 5; i++)
            p.innerHTML += (i + 1) + ". " + hs[i] + "<br>";
    }

    initSkins() {
        this.initSkin(0);
        this.initSkin(1);
    }

    initSkin(skin) {
        var canvas = document.getElementsByClassName("skin")[skin];
        var context = canvas.getContext('2d');
        context.rect(0, 0, 56, 56);
        context.stroke();
        var images = [];
        for (var i = 0; i < 5; i++) {
            images.push(new Image());
        }
        images[0].src = "images/skin" + skin + "/boardgame.png";
        images[1].src = "images/skin" + skin + "/food.png";
        images[2].src = "images/skin" + skin + "/headsnake_d.png";
        images[3].src = "images/skin" + skin + "/bodysnake.png";
        images[4].src = "images/skin" + skin + "/wall.png";
        context.drawImage(images[0], 3, 3, 25, 25);
        context.drawImage(images[0], 28, 3, 25, 25);
        context.drawImage(images[0], 28, 28, 25, 25);
        context.drawImage(images[0], 3, 28, 25, 25);
        context.drawImage(images[3], 3, 3, 25, 25);
        context.drawImage(images[2], 3, 28, 25, 25);
        context.drawImage(images[1], 28, 3, 25, 25);
        context.stroke();
    }

    setSkin(skin) {
        this.skin = skin;
        this.images = this.initImages(this.skin);
    }

    initImages(skin) {
        var images = [];
        var count = 0;
        for (var i = 0; i < 5; i++) {
            images.push(new Image());
        }
        images[0].src = "images/skin" + skin + "/boardgame.png";
        images[0].onload = function() {
            count++;
        };
        images[1].src = "images/skin" + skin + "/food.png";
        images[1].onload = function() {
            count++;
        };
        images[2] = new Map();
        images[2].set('u', new Image());
        images[2].set('d', new Image());
        images[2].set('r', new Image());
        images[2].set('l', new Image());
        images[2].get('u').src = "images/skin" + skin + "/headsnake_u.png";
        images[2].get('u').onload = function() {
            count++
        };
        images[2].get('d').src = "images/skin" + skin + "/headsnake_d.png";
        images[2].get('d').onload = function() {
            count++
        };
        images[2].get('r').src = "images/skin" + skin + "/headsnake_r.png";
        images[2].get('r').onload = function() {
            count++
        };
        images[2].get('l').src = "images/skin" + skin + "/headsnake_l.png";
        images[2].get('l').onload = function() {
            count++
        };
        images[3].src = "images/skin" + skin + "/bodysnake.png";
        images[3].onload = function() {
            count++
        };
        images[4].src = "images/skin" + skin + "/wall.png";
        images[4].onload = function() {
            count++
        };
        return images;
    }

    updateView(grid, score, angle) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid.length; j++) {
                this.context.drawImage(this.images[0], i * 25 + 3, j * 25 + 3, 25, 25);
                switch (grid[i][j]) {
                    case 2:
                        this.context.drawImage(this.images[2].get(angle), i * 25 + 3, j * 25 + 3, 25, 25);
                        break;
                    case 1:
                    case 3:
                    case 4:
                        this.context.drawImage(this.images[grid[i][j]], i * 25 + 3, j * 25 + 3, 25, 25);
                        break;
                }
            }
        }

        var p = document.getElementById('score');
        p.innerHTML = "Score : " + score;
    }

    showDefeat(score) {
        var defeat = document.getElementById('defeat');
        if (score == -1) {
            defeat.innerHTML = "";
        } else {
            defeat.innerHTML = "Vous avez perdu... Score : " + score;
        }
    }

}
