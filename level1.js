// --------------------------------------------------
// Level 1 - Visual clue case
// Uses one image sheet with 3 suspect portraits
// Left = calm, middle = nervous, right = angry
// --------------------------------------------------

let suspects1 = [
  {
    name: "Mia",
    isCulprit: false,
    emotion: "calm",
    spriteIndex: 0,
    expression: "Steady posture and relaxed face.",
    magnifiedClue:
      "No dye marks, no torn threads, and no cash fibers on the sleeves.",
  },
  {
    name: "Derek",
    isCulprit: true,
    emotion: "nervous",
    spriteIndex: 1,
    expression: "Tense face and uneasy body language.",
    magnifiedClue:
      "A faint red bank dye stain is caught in the cuff stitching.",
  },
  {
    name: "Luis",
    isCulprit: false,
    emotion: "angry",
    spriteIndex: 2,
    expression: "Looks irritated, but not fearful.",
    magnifiedClue:
      "Only outdoor dust on the shoes. Nothing connects him to the bank floor.",
  },
];

let level1Stage = "intro";
let level1Mode = "lineup";
let selected1 = null;
let message1 = "";
let magnifyMessage1 = "";
let convictMode1 = false;

function getLevel1Buttons() {
  return {
    begin: { x: width / 2, y: height * 0.74, w: 220, h: 52 },
    convict: { x: width / 2, y: height * 0.84, w: 220, h: 50 },
    back: { x: width * 0.14, y: height * 0.12, w: 120, h: 46 },
    magnify: { x: width / 2, y: height * 0.82, w: 220, h: 50 },
  };
}

function formatEmotionLabel(emotion) {
  return emotion.charAt(0).toUpperCase() + emotion.slice(1);
}

// Check if mouse is over a suspect portrait
function isMouseOverLevel1Suspect(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

// Draw one suspect portrait by cropping 1/3 of the image sheet
function drawLevel1Portrait(x, y, suspect, drawW, drawH) {
  const hovered = isMouseOverLevel1Suspect(x, y, drawW, drawH);

  push();
  imageMode(CENTER);
  rectMode(CENTER);

  // border
  noFill();
  strokeWeight(4);

  if (convictMode1) {
    stroke(255, 110, 110);
  } else if (hovered) {
    stroke(120, 210, 255);
  } else {
    stroke(255);
  }

  rect(x, y, drawW + 12, drawH + 12, 14);

  // draw cropped part of the image sheet
  if (level1Sprite && level1Sprite.width > 0) {
    const srcW = level1Sprite.width / 3;
    const srcH = level1Sprite.height;
    const sx = suspect.spriteIndex * srcW;
    const sy = 0;

    image(level1Sprite, x, y, drawW, drawH, sx, sy, srcW, srcH);
  } else {
    // fallback
    fill(160);
    noStroke();
    rect(x, y, drawW, drawH, 12);
  }

  // name
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(max(14, drawW * 0.12));
  text(suspect.name, x, y + drawH * 0.62);

  pop();
}

function drawLevel1() {
  background(70, 78, 96);

  if (level1Stage === "intro") {
    drawLevel1Intro();
  } else if (level1Mode === "lineup") {
    drawLevel1Lineup();
  } else {
    drawLevel1Inspect();
  }

  drawFooterMessage(message1);
}

function drawLevel1Intro() {
  const buttons = getLevel1Buttons();

  drawCenteredPanel(
    "Level 1: Bank Robbery",
    "This case is all about observation.\n\n" +
      "The three suspects show different emotions.\n" +
      "Inspect them closely.\n" +
      "Use Magnify to catch tiny visual details.\n\n" +
      "Convict the robber when the clue gives them away.",
    "Begin",
    buttons.begin,
  );
}

function drawLevel1Lineup() {
  const buttons = getLevel1Buttons();
  const positions = getLineupPositions(suspects1.length);

  drawCaseHeader(
    "Level 1: Bank Robbery",
    convictMode1
      ? "Convict mode: click the robber."
      : "Inspect the suspect portraits and study their expressions.",
  );

  for (let i = 0; i < suspects1.length; i++) {
    drawLevel1Portrait(positions[i].x, positions[i].y, suspects1[i], 200, 500);
  }

  drawButton(buttons.convict, convictMode1 ? "Cancel" : "Convict");
}

function drawLevel1Inspect() {
  const buttons = getLevel1Buttons();
  const suspect = suspects1[selected1];

  drawCaseHeader(
    "Inspecting " + suspect.name,
    "Use the portrait and the magnified clue together.",
  );

  push();
  imageMode(CENTER);
  rectMode(CENTER);

  // large frame
  noFill();
  stroke(255);
  strokeWeight(4);
  rect(width / 2, height * 0.34, 250, 280, 16);

  // large cropped image
  if (level1Sprite && level1Sprite.width > 0) {
    const srcW = level1Sprite.width / 3;
    const srcH = level1Sprite.height;
    const sx = suspect.spriteIndex * srcW;
    const sy = 0;

    image(level1Sprite, width / 2, height * 0.34, 230, 260, sx, sy, srcW, srcH);
  } else {
    fill(210);
    noStroke();
    rect(width / 2, height * 0.34, 230, 260, 12);
  }

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);

  textSize(min(width, height) * 0.024);
  text(
    "Observed emotion: " + formatEmotionLabel(suspect.emotion),
    width / 2,
    height * 0.6,
  );

  textSize(min(width, height) * 0.022);
  text(
    suspect.expression,
    width / 2 - width * 0.25,
    height * 0.66,
    width * 0.5,
    50,
  );

  if (magnifyMessage1) {
    text(
      "Magnify: " + magnifyMessage1,
      width / 2 - width * 0.3,
      height * 0.74,
      width * 0.6,
      90,
    );
  }

  pop();

  drawButton(buttons.back, "Back");
  drawButton(buttons.magnify, "Magnify");
}

function level1MousePressed() {
  if (transitionPending) return;

  const buttons = getLevel1Buttons();

  if (level1Stage === "intro") {
    if (isOverButton(buttons.begin)) {
      level1Stage = "play";
    }
    return;
  }

  if (level1Mode === "lineup") {
    if (isOverButton(buttons.convict)) {
      convictMode1 = !convictMode1;
      message1 = convictMode1 ? "Select the robber." : "";
      return;
    }

    const positions = getLineupPositions(suspects1.length);

    for (let i = 0; i < suspects1.length; i++) {
      if (isMouseOverLevel1Suspect(positions[i].x, positions[i].y, 150, 210)) {
        if (convictMode1) {
          finishCase(
            suspects1[i].isCulprit,
            "Correct! The nervous suspect had the bank dye clue.",
            "Wrong suspect! The real robber slips away.",
            "level2",
            (msg) => {
              message1 = msg;
            },
          );
        } else {
          selected1 = i;
          level1Mode = "inspect";
          magnifyMessage1 = "";
          message1 = "";
        }
        return;
      }
    }
  } else {
    if (isOverButton(buttons.back)) {
      level1Mode = "lineup";
      magnifyMessage1 = "";
      return;
    }

    if (isOverButton(buttons.magnify)) {
      magnifyMessage1 = suspects1[selected1].magnifiedClue;
    }
  }
}

function resetLevel1() {
  level1Stage = "intro";
  level1Mode = "lineup";
  selected1 = null;
  message1 = "";
  magnifyMessage1 = "";
  convictMode1 = false;
}
