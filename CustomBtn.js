class CustomBtn {
    constructor(x, y, w, h, bgcol = "black", col = "white", txt = "") {
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.bgcol = bgcol;
        this.col = col;
        this.txt = txt;
        this.moving = false;
        this.isClicked = false;
    }

    setPos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    clicked() {
        if (this.isMouseOver() && mouseIsPressed) {
            this.isClicked = true;
        } else {
            this.isClicked = false;
        }
    }

    resetClicked() {
        this.isClicked = false;
    }

    show() {
        if (!this.isMouseOver()) {
            this.castShadow();
        }
        push();
        translate(this.pos.x, this.pos.y);
        rectMode(CENTER);
        //actual button
        fill(this.bgcol);
        noStroke();
        rect(0, 0, this.w, this.h, 10);
        textAlign(CENTER, CENTER);
        fill(this.col);
        textSize(this.h / 2);
        text(this.txt, 0, 0);
        pop();
    }

    moveBtnWithGravity(targetX, targetY, gravityStrength) {
        let gravity = createVector(targetX - this.pos.x, targetY - this.pos.y);
        let distance = gravity.mag();
        gravity.normalize();
        gravity.mult(gravityStrength);

        this.applyForce(gravity);

        if (distance <= gravityStrength) {
            this.moving = false;
        } else {
            this.moving = true;
        }
    }

    isMoving() {
        return this.moving;
    }

    isMouseOver() {
        return (
            mouseX > this.pos.x - this.w / 2 &&
            mouseX < this.pos.x + this.w / 2 &&
            mouseY > this.pos.y - this.h / 2 &&
            mouseY < this.pos.y + this.h / 2
        );
    }

    castShadow() {
        let dx = mouseX - this.pos.x;
        let dy = mouseY - this.pos.y;
        let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        let angle = atan2(dy, dx);

        let shadowDistance = 10;

        push();
        rectMode(CENTER);

        for (let i = 0; i < 5; i++) {
            let blurAmount = i * 2;
            let blurX = this.pos.x - cos(angle) * (shadowDistance + blurAmount);
            let blurY = this.pos.y - sin(angle) * (shadowDistance + blurAmount);

            fill(85, 85, 85, 100 / (i + 1));
            noStroke();
            rect(blurX, blurY, this.w, this.h, 10);
        }
        pop();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(10);
        this.pos.add(this.vel);
        this.vel.mult(0.98); // Reset velocity
        if(this.vel.mag() <= 0.2) {

            this.vel.mult(0);
            this.acc.mult(0);
        }
        this.acc.mult(0); // Reset acceleration
    }
}
