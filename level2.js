// --------------------------------------------------
// Level 2 - Interview case
// --------------------------------------------------

let suspects2 = [
  {
    name: "Taylor",
    isCulprit: false,
    spriteIndex: 0,
    expression: "Looks alert but composed.",
    magnifiedClue:
      "A clean bracelet clasp and no velvet fibers on the sleeves.",
    answer: "I was at the florist at 8:10. I still have the printed receipt.",
    boardNote: "Receipt timestamp matches 8:10 PM.",
  },
  {
    name: "Jordan",
    isCulprit: true,
    spriteIndex: 1,
    expression: "Keeps glancing away and tightening their jaw.",
    magnifiedClue:
      "A tiny strand of black velvet is caught near the cuff seam.",
    answer: "I stayed outside the gallery the whole time.",
    boardNote:
      "Parking camera shows Jordan re-entering the gallery at 8:12 PM.",
  },
  {
    name: "Avery",
    isCulprit: false,
    spriteIndex: 2,
    expression: "Looks irritated, not frightened.",
    magnifiedClue:
      "Only catering glitter from the gift table, nothing from the necklace case.",
    answer: "I was packing the gift table when security shouted.",
    boardNote: "A staff member confirms Avery was beside the exit display.",
  },
  {
    name: "Morgan",
    isCulprit: false,
    spriteIndex: 3,
    expression: "Tired eyes, steady voice.",
    magnifiedClue:
      "Phone screen smudge and lipstick trace, but no display-case residue.",
    answer: "I stepped outside for a phone call before the lights flickered.",
    boardNote: "Phone log shows a three-minute call beginning at 8:07 PM.",
  },
];

let level2Stage = "intro";
let level2Mode = "lineup";
let selected2 = null;

let message2 = "";
let askMessage2 = "";
let magnifyMessage2 = "";

let convictMode2 = false;
let showBoard2 = false;
let questioned2 = [false, false, false, false];

function getLevel2Buttons() {
  const lineupRow = getButtonRow(2, height * 0.92, 170, 50, 28);
  const inspectRow = getButtonRow(2, height * 0.86, 170, 50, 28);

  return {
    begin: { x: width / 2, y: height * 0.82, w: 220, h: 52 },

    board: lineupRow[0],
    convict: lineupRow[1],

    back: { x: width * 0.12, y: height * 0.12, w: 110, h: 44 },
    magnify: inspectRow[0],
    ask: inspectRow[1],
  };
}

function isMouseOverLevel2Suspect(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

function drawLevel2Portrait(x, y, index, drawW, drawH) {
  const hovered = isMouseOverLevel2Suspect(x, y, drawW, drawH);
  const scale = hovered ? 1.04 : 1;

  drawPortraitFrame(
    x,
    y,
    drawW * scale,
    drawH * 0.97 * scale,
    hovered,
    convictMode2,
  );

  push();
  imageMode(CENTER);
  if (suspectImgs2[index]) {
    image(suspectImgs2[index], x, y, drawW * scale, drawH * scale);
  } else {
    fill(190);
    noStroke();
    rectMode(CENTER);
    rect(x, y, drawW, drawH, 14);
  }
  pop();
}

function drawLevel2() {
  drawScreenBackdrop(level2BG, [7, 12, 24], [22, 31, 50], 175);

  if (level2Stage === "intro") drawLevel2Intro();
  else if (level2Mode === "lineup") drawLevel2Lineup();
  else drawLevel2Inspect();

  if (showBoard2) drawLevel2Board();

  drawFooterMessage(message2, convictMode2 ? "warning" : "info");
}

function drawLevel2Intro() {
  const buttons = getLevel2Buttons();

  drawCenteredPanel(
    "Level 2: Jewelry Theft",
    "Level 2 keeps the tools from Level 1.\n\n" +
      "You can still inspect and magnify suspects.\n" +
      "Now you can also question them and compare what you learn on the evidence board.\n\n" +
      "Use all of those tools before you convict.",
    "Begin",
    buttons.begin,
  );
}

function drawLevel2Lineup() {
  const buttons = getLevel2Buttons();
  const positions = getLineupPositions(suspects2.length);
  const recordedCount = questioned2.filter(Boolean).length;
  const imgW = min(width * 0.14, 175);
  const imgH = min(height * 0.46, 410);

  drawCaseHeader(
    "Level 2: Jewelry Theft",
    convictMode2
      ? "Convict mode is active. Select the thief."
      : "Inspect, magnify, question, then compare the board.",
  );

  drawLineupFloor();
  drawInfoPill(
    `Statements recorded: ${recordedCount}/${suspects2.length}`,
    width / 2,
    height * 0.2,
    260,
    UI_COLORS.warning,
  );

  for (let i = 0; i < suspects2.length; i++) {
    drawLevel2Portrait(positions[i].x, positions[i].y, i, imgW, imgH);

    suspects2[i].hitbox = {
      x: positions[i].x,
      y: positions[i].y,
      w: imgW,
      h: imgH,
    };

    drawSuspectNameTag(
      positions[i].x,
      positions[i].y + imgH * 0.58,
      suspects2[i].name,
      questioned2[i],
    );
  }

  drawButton(buttons.board, "Board", [96, 124, 181]);
  drawButton(
    buttons.convict,
    convictMode2 ? "Cancel Convict" : "Convict",
    convictMode2 ? UI_COLORS.danger : UI_COLORS.accentStrong,
  );
}

function drawLevel2Inspect() {
  const buttons = getLevel2Buttons();
  const suspect = suspects2[selected2];

  drawInspectLayout(
    "Inspecting " + suspect.name,
    "Use visual clues, magnify, and questioning together.",
    (x, y, w, h) => {
      if (suspectFaces2[selected2]) {
        image(suspectFaces2[selected2], x, y, w, h);
      } else {
        noStroke();
        fill(190);
        rectMode(CENTER);
        rect(x, y, w, h, 14);
      }
    },
    [
      {
        label: "Visual read",
        value: suspect.expression,
      },
      {
        label: "Magnify",
        value: magnifyMessage2 || "Use Magnify to check for trace evidence.",
        h: 80,
      },
      {
        label: questioned2[selected2]
          ? "Recorded statement"
          : "Question suspect",
        value:
          askMessage2 ||
          "Ask this suspect a question to add their statement to the board.",
        h: 95,
      },
    ],
    UI_COLORS.accent,
  );

  drawButton(buttons.back, "Back", [83, 103, 139]);
  drawButton(buttons.magnify, "Magnify", UI_COLORS.warning);
  drawButton(
    buttons.ask,
    questioned2[selected2] ? "Asked" : "Ask",
    UI_COLORS.accentStrong,
  );
}

function drawLevel2Board() {
  drawModalOverlay(138);

  const panelW = min(width * 0.8, 820);
  const panelH = min(height * 0.74, 500);
  drawGlassPanel(width / 2, height / 2, panelW, panelH, UI_COLORS.accent, 26);
  drawBadge(
    "EVIDENCE BOARD",
    width / 2,
    height / 2 - panelH * 0.37,
    155,
    UI_COLORS.accent,
  );

  push();
  textAlign(LEFT, TOP);
  fill(255);
  textSize(min(width, height) * 0.022);
  textLeading(28);

  const startX = width / 2 - panelW * 0.38;
  const startY = height / 2 - panelH * 0.24;

  for (let i = 0; i < suspects2.length; i++) {
    fill(255);
    textSize(18);
    text(`${suspects2[i].name}`, startX, startY + i * 78);

    fill(UI_COLORS.mutedInk[0], UI_COLORS.mutedInk[1], UI_COLORS.mutedInk[2]);
    textSize(17);
    const line = questioned2[i]
      ? suspects2[i].boardNote
      : "No statement recorded yet.";
    text(line, startX + 120, startY + i * 78, panelW * 0.55, 60);
  }

  fill(UI_COLORS.mutedInk[0], UI_COLORS.mutedInk[1], UI_COLORS.mutedInk[2]);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Click anywhere to close.", width / 2, height / 2 + panelH * 0.38);
  pop();
}

function level2MousePressed() {
  if (transitionPending) return;

  if (showBoard2) {
    showBoard2 = false;
    return;
  }

  const buttons = getLevel2Buttons();

  if (level2Stage === "intro") {
    if (isOverButton(buttons.begin)) {
      level2Stage = "play";
    }
    return;
  }

  if (level2Mode === "lineup") {
    if (isOverButton(buttons.board)) {
      showBoard2 = true;
      return;
    }

    if (isOverButton(buttons.convict)) {
      convictMode2 = !convictMode2;
      message2 = convictMode2 ? "Select the thief." : "";
      return;
    }

    for (let i = 0; i < suspects2.length; i++) {
      let hb = suspects2[i].hitbox;

      let hovered =
        mouseX > hb.x - hb.w / 2 &&
        mouseX < hb.x + hb.w / 2 &&
        mouseY > hb.y - hb.h / 2 &&
        mouseY < hb.y + hb.h / 2;

      if (hovered) {
        if (convictMode2) {
          finishCase(
            suspects2[i].isCulprit,
            "Correct! Jordan's story and the velvet fiber give it away.",
            "Wrong suspect! The necklace is never recovered.",
            "level3",
            (msg) => {
              message2 = msg;
            },
          );
        } else {
          selected2 = i;
          level2Mode = "inspect";
          askMessage2 = questioned2[i] ? suspects2[i].answer : "";
          magnifyMessage2 = "";
          message2 = "";
        }

        return;
      }
    }
  } else {
    if (isOverButton(buttons.back)) {
      level2Mode = "lineup";
      return;
    }

    if (isOverButton(buttons.magnify)) {
      magnifyMessage2 = suspects2[selected2].magnifiedClue;
      return;
    }

    if (isOverButton(buttons.ask)) {
      questioned2[selected2] = true;
      askMessage2 = suspects2[selected2].answer;
      message2 = "Statement recorded to the board.";
    }
  }
}

function resetLevel2() {
  level2Stage = "intro";
  level2Mode = "lineup";
  selected2 = null;
  message2 = "";
  askMessage2 = "";
  magnifyMessage2 = "";
  convictMode2 = false;
  showBoard2 = false;
  questioned2 = [false, false, false, false];
}
