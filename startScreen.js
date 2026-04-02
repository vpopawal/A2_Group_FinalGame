// --------------------------------------------------
// Start screen
// --------------------------------------------------

function getStartButtons() {
  return {
    start: { x: width / 2, y: height * 0.64, w: 300, h: 68, textSize: 22 },
    instructions: { x: width / 2, y: height * 0.76, w: 300, h: 62, textSize: 20 },
  };
}

function drawStart() {
  drawScreenBackdrop(level1BG, [7, 12, 24], [20, 30, 48], 190);

  const buttons = getStartButtons();
  const panelW = min(width * 0.72, 760);
  const panelH = min(height * 0.58, 460);

  drawGlassPanel(width / 2, height * 0.5, panelW, panelH, UI_COLORS.line, 30);

  push();
  textAlign(CENTER, CENTER);

  fill(255, 230);
  textSize(min(width, height) * 0.022);
  text("DETECTIVE FILES", width / 2, height * 0.28);

  fill(255);
  textSize(min(width, height) * 0.075);
  text("Detective Lineup", width / 2, height * 0.39);

  fill(UI_COLORS.mutedInk[0], UI_COLORS.mutedInk[1], UI_COLORS.mutedInk[2]);
  textSize(min(width, height) * 0.026);
  text(
    "Inspect clues, compare stories, and solve all three cases.",
    width / 2,
    height * 0.49,
  );
  pop();

  drawButton(buttons.start, "Start Game", UI_COLORS.accentStrong);
  drawButton(buttons.instructions, "Instructions", [82, 109, 166]);
}

function startMousePressed() {
  const buttons = getStartButtons();

  if (isOverButton(buttons.start)) {
    resetAllLevels();
    currentScreen = "level1";
    return;
  }

  if (isOverButton(buttons.instructions)) {
    currentScreen = "instructions";
  }
}
