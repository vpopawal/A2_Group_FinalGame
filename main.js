// --------------------------------------------------
// Main app loop
// --------------------------------------------------

let currentScreen = "start";
let level1Sprite = null;
let level2Sprite = null;
let level3Sprite = null;

function preload() {
  level1Sprite = loadImage("assets/images/level1emotions.png");
  level2Sprite = loadImage("assets/images/level2emotions.png");
  level3Sprite = loadImage("assets/images/level3emotions.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");
  textAlign(CENTER, CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(30);

  if (currentScreen === "start") drawStart();
  else if (currentScreen === "instructions") drawInstructions();
  else if (currentScreen === "level1") drawLevel1();
  else if (currentScreen === "level2") drawLevel2();
  else if (currentScreen === "level3") drawLevel3();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "fail") drawFail();
}

function mousePressed() {
  if (transitionPending) return;

  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "instructions") instructionsMousePressed();
  else if (currentScreen === "level1") level1MousePressed();
  else if (currentScreen === "level2") level2MousePressed();
  else if (currentScreen === "level3") level3MousePressed();
  else if (currentScreen === "win") winMousePressed();
  else if (currentScreen === "fail") failMousePressed();
}
