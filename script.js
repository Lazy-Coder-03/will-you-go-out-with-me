var canvas = null;
var yesBtn = null;
var noBtn = null;
var cx,
  cy = 0;
var tx,
  ty = 0;
var yesBtn, noBtn, backBtn;
var myGif;
var accepted = false;

function preload() {
  myGif = loadImage("giphy.gif");
  yesGif = loadImage("Yes.gif");

}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.style("display", "block");
  cx = window.innerWidth / 2;
  cy = window.innerHeight / 2;
  mxdim = max(width, height)
  accepted = false;
  yesBtn = new CustomBtn(cx - width * 0.15, cy + 0.2 * height, min(0.1 * width, 100), min(0.1 * height, 50), "#FFB6C1", "#333", "Yes");
  noBtn = new CustomBtn(cx + width * 0.15, cy + 0.2 * height, min(0.1 * width, 100), min(0.1 * height, 50), "#FFB6C1", "#333", "No");
  backBtn = new CustomBtn(cx, cy + 0.2 * height, min(0.1 * width, 100), min(0.1 * height, 50), "#FFB6C1", "#333", "Home");
}

function draw() {
  background("#A1C6EA");
  cx = window.innerWidth / 2;
  cy = window.innerHeight / 2;
  if (!accepted) {
    image(myGif, cx - myGif.width / 2, cy - 0.4 * height);
    // text
    push();
    textAlign(CENTER, CENTER);
    textSize(0.05 * width);
    fill("#333");
    text("Will You Go Out With Me ?", cx, cy - 0.4 * height);
    pop();

    if (mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0) {
      yesBtn.moveBtn(mouseX, mouseY, 2);
    }
    if (noBtn.isMouseOver()) {
      tx = random(100, window.innerWidth - 100);

      ty = random(100, window.innerHeight - 100);
      noBtn.setPos(tx, ty);
    }
    yesBtn.clicked()
    if (yesBtn.isClicked) {
      yesBtn.bgcol = "#00FF00";  // Change the background color when clicked
      accepted = true;
    } else {
      yesBtn.bgcol = "#FFB6C1";  // Reset the background color when not clicked
    }


    noBtn.show();
    yesBtn.show();
  }
  else {
    image(yesGif, cx - yesGif.width / 2, cy - 0.4 * height);
    // text
    push();
    textAlign(CENTER, CENTER);
    textSize(0.05 * width);
    fill("#333");
    text("YEEEEEEHAAAAAAAAAAA!!!!!", cx, cy - 0.4 * height);
    pop();
    backBtn.show();
    backBtn.clicked();
    if (backBtn.isClicked) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }

  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
