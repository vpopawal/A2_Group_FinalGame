let screen = "home";
let selectedLevel = null;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(30);

  if (screen === "home") drawHome();
  if (screen === "levels") drawLevels();
  if (screen === "instructions") drawInstructions();
  if (screen === "game") runLevel();
}

function mousePressed() {
  handleMouse();
}
