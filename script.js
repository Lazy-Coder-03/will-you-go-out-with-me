var canvas = null;
var yesBtn = null;
var noBtn = null;
var cx,
  cy = 0;
var tx,
  ty = 0;
var yesBtn, noBtn, backBtn;
var myGif, yesGif, customFont;
var accepted = false;
var started=false;

function preload() {
  myGif = loadImage("giphy.gif");
  yesGif = loadImage("Yes.gif");
  customFont = loadFont('Cutesy.ttf');

}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.style("display", "block");
  cx = window.innerWidth / 2;
  cy = window.innerHeight / 2;
  mxdim = max(width, height)
  accepted = false;
  yesBtn = new CustomBtn(cx - width * 0.25, cy + 0.2 * height, min(0.1 * width, 100), min(0.1 * height, 50), "#FFB6C1", "#333", "Yes");
  noBtn = new CustomBtn(cx + width * 0.25, cy + 0.2 * height, min(0.1 * width, 100), min(0.1 * height, 50), "#FFB6C1", "#333", "No");
  backBtn = new CustomBtn(cx, cy + 0.25 * height, min(0.1 * width, 100), min(0.1 * height, 50), "#A1C6EA", "#333", "Home");
  textFont(customFont);
  //frameRate(24);
}

function draw() {
  if (!accepted) {
    background("#A1C6EA");
    image(myGif, cx - myGif.width / 2, cy - 0.4 * height);

    push();
    textAlign(CENTER, CENTER);
    textSize(0.1 * width);
    fill("#333");
    text("Will You Go Out With Me ?", cx, cy - 0.4 * height);
    pop();

    if (width < height) {
      yesBtn.moveBtnWithGravity(mouseX, mouseY, 0.5)
    } else {
      yesBtn.moveBtnWithGravity(mouseX, mouseY, 0.5); // Adjust the gravitational strength as needed
    }

    if (noBtn.isMouseOver()) {
      tx = random(100, window.innerWidth - 100);
      ty = random(100, window.innerHeight - 100);
      noBtn.setPos(tx, ty);
    }

    yesBtn.clicked();

    if (yesBtn.isClicked) {
      yesBtn.bgcol = "#00FF00"; // Change the background color when clicked
      accepted = true;
    } else {
      yesBtn.bgcol = "#FFB6C1"; // Reset the background color when not clicked
    }
    if(started){
      yesBtn.update();
    }
    noBtn.show();
    yesBtn.show();
  } else {
    background("#FFB6C1");
    image(yesGif, cx - yesGif.width / 2, cy - 0.4 * height);

    push();
    textAlign(CENTER, CENTER);
    textSize(0.1 * width);
    fill("#333");
    text("YEEEEEEHAAAAAAAAAAA!!!!!", cx, cy - 0.4 * height);
    pop();

    backBtn.show();
    backBtn.clicked();

    if (backBtn.isClicked) {
      backBtn.bgcol = "#00FF00"; // Change the background color when clicked
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  }
}

function mousePressed() {
  started=true;
  yesBtn.resetClicked();
  noBtn.resetClicked();
  backBtn.resetClicked();
}



function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
