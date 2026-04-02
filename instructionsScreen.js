// --------------------------------------------------
// Main instructions screen
// --------------------------------------------------

function getInstructionsBackButton() {
  return { x: width / 2, y: height * 0.8, w: 230, h: 54 };
}

function drawInstructions() {
  drawScreenBackdrop(level1BG, [10, 14, 27], [21, 30, 48], 195);

  const backButton = getInstructionsBackButton();

  drawCenteredPanel(
    "How to Play",
    "Each level begins with its own briefing.\n\n" +
      "Level 1: inspect visual clues and use Magnify.\n" +
      "Level 2: question suspects and compare statements on the board.\n" +
      "Level 3: combine notebook notes with one forensic check.\n\n" +
      "Use Convict only when the evidence points to one suspect.",
    "Back",
    backButton,
  );
}

function instructionsMousePressed() {
  const backButton = getInstructionsBackButton();

  if (isOverButton(backButton)) {
    currentScreen = "start";
  }
}
