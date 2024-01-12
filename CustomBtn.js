class CustomBtn {
    constructor(x, y, w, h, bgcol = "black", col = "white", txt = "") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.bgcol = bgcol;
        this.col = col;
        this.txt = txt;
        this.moving = false;
        this.isClicked = false;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    clicked() {
        if (this.isMouseOver()&&mouseIsPressed) {
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
        translate(this.x, this.y);
        rectMode(CENTER);
        //actual button
        fill(this.bgcol);
        noStroke();
        // stroke("black");
        rect(0, 0, this.w, this.h, 10);
        textAlign(CENTER, CENTER);
        fill(this.col);
        textSize(this.h / 2);
        text(this.txt, 0, 0);
        pop();
    }


    moveBtn(targetX, targetY, speed) {
        let dx = targetX - this.x;
        let dy = targetY - this.y;
        let distance = dist(this.x, this.y, targetX, targetY);
        let angle = atan2(dy, dx);
        let vx = cos(angle) * speed;
        let vy = sin(angle) * speed;

        // Adjust speed based on the distance
        let adjustedSpeed = min(speed, distance);

        this.x += vx;
        this.y += vy;

        if (distance <= adjustedSpeed) {
            this.x = targetX;
            this.y = targetY;
            this.moving = false;
        } else {
            this.moving = true;
        }
    }

    isMoving() {
        return this.moving;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    isMouseOver() {
        return (
            mouseX > this.x - this.w / 2 &&
            mouseX < this.x + this.w / 2 &&
            mouseY > this.y - this.h / 2 &&
            mouseY < this.y + this.h / 2
        );
    }

    castShadow() {
        // Calculate the distance and angle between the button and the mouse cursor
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = dist(this.x, this.y, mouseX, mouseY);
        let angle = atan2(dy, dx);

        // Calculate the shadow position based on the opposite direction of the angle
        let shadowDistance = 10; // Set your desired shadow distance

        push();
        rectMode(CENTER);

        // Draw multiple semi-transparent rectangles to simulate blur
        for (let i = 0; i < 5; i++) {
            let blurAmount = i * 2; // Adjust the blur amount as needed
            let blurX = this.x - cos(angle) * (shadowDistance + blurAmount);
            let blurY = this.y - sin(angle) * (shadowDistance + blurAmount);

            fill(85, 85, 85, 100 / (i + 1)); // Adjust the alpha for each rectangle
            noStroke();
            rect(blurX, blurY, this.w, this.h, 10);
        }
        pop();
    }

    
    //   setTargetPos(tx, ty) {
    //     this.targetX = tx;
    //     this.targetY = ty;
    //   }

    //   moveBtn(speed) {
    //     if (this.moving) {
    //       let dx = this.targetX - this.x;
    //       let dy = this.targetY - this.y;
    //       let distance = dist(this.x, this.y, this.targetX, this.targetY);
    //       let angle = atan2(dy, dx);
    //       let vx = cos(angle) * speed;
    //       let vy = sin(angle) * speed;

    //       // Adjust speed based on the distance
    //       let adjustedSpeed = min(speed, distance);

    //       this.x += vx;
    //       this.y += vy;

    //       if (distance <= adjustedSpeed) {
    //         this.x = this.targetX;
    //         this.y = this.targetY;
    //         this.moving = false;
    //       }
    //     }
    //   }
}
