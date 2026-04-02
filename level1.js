// --------------------------------------------------
// Level 1 - Visual clue case
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
    begin: { x: width / 2, y: height * 0.82, w: 220, h: 52 },
    convict: { x: width / 2, y: height * 0.2, w: 200, h: 40 },
    back: { x: width * 0.14, y: height * 0.12, w: 120, h: 46 },
    magnify: { x: width / 2, y: height * 0.82, w: 220, h: 50 },
  };
}

function formatEmotionLabel(emotion) {
  return emotion.charAt(0).toUpperCase() + emotion.slice(1);
}

function isMouseOverLevel1Suspect(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

function drawLevel1Portrait(x, y, index, drawW, drawH) {
  const hovered = isMouseOverLevel1Suspect(x, y, drawW, drawH);
  const scale = hovered ? 1.04 : 1;

  drawPortraitFrame(
    x,
    y,
    drawW * scale,
    drawH * 0.97 * scale,
    hovered,
    convictMode1,
  );

  push();
  imageMode(CENTER);
  if (suspectImgs1[index]) {
    image(suspectImgs1[index], x, y, drawW * scale, drawH * scale);
  } else {
    noStroke();
    fill(190);
    rectMode(CENTER);
    rect(x, y, drawW, drawH, 14);
  }
  pop();
}

function drawLevel1() {
  drawScreenBackdrop(level1BG, [7, 12, 24], [19, 30, 47], 175);

  if (level1Stage === "intro") {
    drawLevel1Intro();
  } else if (level1Mode === "lineup") {
    drawLevel1Lineup();
  } else {
    drawLevel1Inspect();
  }

  drawFooterMessage(message1, convictMode1 ? "warning" : "info");
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
  const imgW = min(width * 0.8, 180);
  const imgH = min(height * 0.55, 420);

  drawCaseHeader(
    "Level 1: Bank Robbery",
    convictMode1
      ? "Convict mode is active. Select the robber."
      : "Study body language first, then inspect a suspect.",
  );

  drawLineupFloor();
  drawInfoPill(
    "Visual clue case",
    width / 2,
    height * 0.2,
    190,
    UI_COLORS.warning,
  );

  for (let i = 0; i < suspects1.length; i++) {
    drawLevel1Portrait(positions[i].x, positions[i].y, i, imgW, imgH);

    suspects1[i].hitbox = {
      x: positions[i].x,
      y: positions[i].y,
      w: imgW,
      h: imgH,
    };

    drawSuspectNameTag(
      positions[i].x,
      positions[i].y + imgH * 0.58,
      suspects1[i].name,
      false,
    );
  }

  drawButton(
    buttons.convict,
    convictMode1 ? "Cancel Convict" : "Convict",
    convictMode1 ? UI_COLORS.danger : UI_COLORS.accentStrong,
  );
}

function drawLevel1Inspect() {
  const buttons = getLevel1Buttons();
  const suspect = suspects1[selected1];

  drawInspectLayout(
    "Inspecting " + suspect.name,
    "Use the face and magnified clue together.",
    (x, y, w, h) => {
      if (suspectFaces1[selected1]) {
        image(suspectFaces1[selected1], x, y, w, h);
      } else {
        noStroke();
        fill(190);
        rectMode(CENTER);
        rect(x, y, w, h, 14);
      }
    },
    [
      {
        label: "Observed emotion",
        value: formatEmotionLabel(suspect.emotion),
      },
      {
        label: "Visual read",
        value: suspect.expression,
      },
      {
        label: "Magnify",
        value:
          magnifyMessage1 || "Use Magnify to inspect the suspect more closely.",
        h: 90,
      },
    ],
    UI_COLORS.warning,
  );

  drawButton(buttons.back, "Back", [83, 103, 139]);
  drawButton(buttons.magnify, "Magnify", UI_COLORS.warning);
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

    for (let i = 0; i < suspects1.length; i++) {
      let hb = suspects1[i].hitbox;

      let hovered =
        mouseX > hb.x - hb.w / 2 &&
        mouseX < hb.x + hb.w / 2 &&
        mouseY > hb.y - hb.h / 2 &&
        mouseY < hb.y + hb.h / 2;

      if (hovered) {
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
