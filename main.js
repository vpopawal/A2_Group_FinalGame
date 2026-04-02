// --------------------------------------------------
// Main app loop
// --------------------------------------------------

const GAME_W = 1280;
const GAME_H = 720;

let gameCanvas;

let currentScreen = "start";
let level1Sprite = null;
let level2Sprite = null;
let level3Sprite = null;
let level1bg;
let suspectImgs1 = [];
let suspectFaces1 = [];
let suspectImgs2 = [];
let suspectFaces2 = [];
let suspectImgs3 = [];
let suspectFaces3 = [];

let level2BG;
let level3BG;
let level1BG;

let bgMusic;
let musicStarted = false;

function preload() {
  level1BG = loadImage("assets/images/backgroundimagefixed.png");
  suspectImgs1[0] = loadImage("assets/images/mia.png");
  suspectImgs1[1] = loadImage("assets/images/derek.png");
  suspectImgs1[2] = loadImage("assets/images/luis.png");

  suspectFaces1[0] = loadImage("assets/images/miacalm.png");
  suspectFaces1[1] = loadImage("assets/images/dereknervous.png");
  suspectFaces1[2] = loadImage("assets/images/luisangry.png");

  level2BG = loadImage("assets/images/backgroundimagefixed.png");

  suspectImgs2[0] = loadImage("assets/images/taylor.png");
  suspectImgs2[1] = loadImage("assets/images/jordon.png");
  suspectImgs2[2] = loadImage("assets/images/avery.png");
  suspectImgs2[3] = loadImage("assets/images/morgan.png");

  suspectFaces2[0] = loadImage("assets/images/taylorcalm.png");
  suspectFaces2[1] = loadImage("assets/images/jordonnervous.png");
  suspectFaces2[2] = loadImage("assets/images/averyupset.png");
  suspectFaces2[3] = loadImage("assets/images/morgantired.png");

  level3BG = loadImage("assets/images/backgroundimagefixed.png");

  suspectImgs3[0] = loadImage("assets/images/noah.png");
  suspectImgs3[1] = loadImage("assets/images/riley.png");
  suspectImgs3[2] = loadImage("assets/images/casey.png");
  suspectImgs3[3] = loadImage("assets/images/jamie.png");
  suspectImgs3[4] = loadImage("assets/images/emma.png");

  suspectFaces3[0] = loadImage("assets/images/noahemotion.png");
  suspectFaces3[1] = loadImage("assets/images/rileyemotion.png");
  suspectFaces3[2] = loadImage("assets/images/caseyemotion.png");
  suspectFaces3[3] = loadImage("assets/images/jamieemotion.png");
  suspectFaces3[4] = loadImage("assets/images/emmaemotion.png");

  bgMusic = loadSound("assets/sound/track.wav");
}

function startBackgroundMusic() {
  if (!musicStarted && bgMusic) {
    userStartAudio();

    if (!bgMusic.isPlaying()) {
      bgMusic.setVolume(0.65);
      bgMusic.loop();
    }

    musicStarted = true;
  }
}

function centerCanvas() {
  const x = (windowWidth - GAME_W) / 2;
  const y = (windowHeight - GAME_H) / 2;
  gameCanvas.position(x, y);
}

function setup() {
  gameCanvas = createCanvas(GAME_W, GAME_H);
  pixelDensity(1);
  textFont("Trebuchet MS");
  textAlign(CENTER, CENTER);
  centerCanvas();
}

function windowResized() {
  centerCanvas();
}

function draw() {
  background(18);

  if (currentScreen === "start") drawStart();
  else if (currentScreen === "instructions") drawInstructions();
  else if (currentScreen === "level1") drawLevel1();
  else if (currentScreen === "level2") drawLevel2();
  else if (currentScreen === "level3") drawLevel3();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "fail") drawFail();
}

function mousePressed() {
  if (!musicStarted) {
    startBackgroundMusic();
  }

  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "instructions") instructionsMousePressed();
  else if (currentScreen === "level1") level1MousePressed();
  else if (currentScreen === "level2") level2MousePressed();
  else if (currentScreen === "level3") level3MousePressed();
  else if (currentScreen === "win") winMousePressed();
  else if (currentScreen === "fail") failMousePressed();
}
