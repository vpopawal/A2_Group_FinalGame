// ---------- HOME ----------
function drawHome() {
  fill(255);
  textSize(36);
  text("Criminal Mind", width / 2, 120);

  drawButton("PLAY", 300, 250, 200, 60);
}

// ---------- LEVEL SELECT ----------
function drawLevels() {
  fill(255);
  textSize(28);
  text("Select a Level", width / 2, 80);

  drawButton("Level 1", 300, 150, 200, 50);
  drawButton("Level 2", 300, 220, 200, 50);
  drawButton("Level 3", 300, 290, 200, 50);

  drawButton("⬅ Back", 20, 20, 120, 40);
}

// ---------- INSTRUCTIONS ----------
function drawInstructions() {
  fill(255);
  textSize(24);
  text("Level " + selectedLevel, width / 2, 80);

  textSize(16);

  let txt = "";

  if (selectedLevel === 1) {
    txt =
      "Observe suspects.\nFind the liar using visual clues.\nUse hints.\nClick ACCUSE.";
  } else if (selectedLevel === 2) {
    txt = "Ask questions.\nCompare answers.\nFind contradictions.";
  } else {
    txt = "Hard mode.\nLimited hints.\nSubtle clues.";
  }

  text(txt, width / 2, 200);

  drawButton("START", 300, 350, 200, 50);
  drawButton("⬅ Back", 20, 20, 120, 40);
}

// ---------- BUTTON ----------
function drawButton(label, x, y, w, h) {
  fill(70, 130, 180);
  rect(x, y, w, h, 10);

  fill(255);
  textSize(16);
  text(label, x + w / 2, y + h / 2);
}

// ---------- CLICK HANDLER ----------
function handleMouse() {
  // HOME
  if (screen === "home") {
    if (overButton(300, 250, 200, 60)) {
      screen = "levels";
    }
  }

  // LEVELS
  else if (screen === "levels") {
    if (overButton(300, 150, 200, 50)) {
      selectedLevel = 1;
      screen = "instructions";
    }
    if (overButton(300, 220, 200, 50)) {
      selectedLevel = 2;
      screen = "instructions";
    }
    if (overButton(300, 290, 200, 50)) {
      selectedLevel = 3;
      screen = "instructions";
    }
    if (overButton(20, 20, 120, 40)) {
      screen = "home";
    }
  }

  // INSTRUCTIONS
  else if (screen === "instructions") {
    if (overButton(300, 350, 200, 50)) {
      startLevel();
      screen = "game";
    }
    if (overButton(20, 20, 120, 40)) {
      screen = "levels";
    }
  }

  // GAME
  else if (screen === "game") {
    handleLevelClick();

    if (overButton(20, 20, 120, 40)) {
      screen = "levels";
    }
  }
}

// ---------- BUTTON DETECT ----------
function overButton(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}
