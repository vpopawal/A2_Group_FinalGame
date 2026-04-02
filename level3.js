// --------------------------------------------------
// Level 3 - Final case
// --------------------------------------------------

let suspects3 = [
  {
    name: "Noah",
    isCulprit: false,
    spriteIndex: 0,
    appearance: "Uniform is tidy. Sleeves are rolled evenly.",
    magnifiedClue: "Bus lint on the cuff, but no gray toner dust.",
    interview: "My shift ended at 9:00, and I caught the bus straight home.",
    boardNote: "Transit stamp places Noah at the bus stop by 9:07 PM.",
    notebook: "Bus pass stamped 9:07 PM. Timeline checks out.",
  },
  {
    name: "Riley",
    isCulprit: false,
    spriteIndex: 1,
    appearance: "Jacket hem is dusty and wrinkled from the loading bay.",
    magnifiedClue:
      "Mud and gravel from outside, nothing from the records room carpet.",
    interview: "I heard the scream from the loading bay and ran over.",
    boardNote: "Security guard confirms Riley was near the loading dock.",
    notebook: "Boot print pattern matches the loading bay only.",
  },
  {
    name: "Casey",
    isCulprit: true,
    spriteIndex: 2,
    appearance: "Dark suit. Right cuff looks recently brushed clean.",
    magnifiedClue: "A faint gray powder is trapped inside the right cuff seam.",
    interview: "I never went near the records room tonight.",
    boardNote: "Casey changed the timeline twice during questioning.",
    notebook: "Changed the story twice about where they were after 8:30.",
  },
  {
    name: "Jamie",
    isCulprit: false,
    spriteIndex: 3,
    appearance:
      "Front desk uniform still has a clipped visitor badge attached.",
    magnifiedClue: "Badge clip scratch and pen ink, but no toner residue.",
    interview: "I stayed at the front desk until police arrived.",
    boardNote: "Badge log shows Jamie remained at reception.",
    notebook: "Reception camera confirms Jamie stayed at the desk.",
  },
  {
    name: "Emma",
    isCulprit: false,
    spriteIndex: 4,
    appearance: "Looks shaken and disheveled after the incident.",
    magnifiedClue:
      "Dust and minor scrapes, but nothing matching toner from the records room.",
    interview: "I heard arguing, then I ducked when everything went quiet.",
    boardNote: "Emma's timeline matches the witness on the second floor.",
    notebook: "No sign Emma ever entered the records room.",
  },
];

let level3Stage = "intro";
let level3Mode = "lineup";
let selected3 = null;

let message3 = "";
let askMessage3 = "";
let magnifyMessage3 = "";

let convictMode3 = false;

let showNotebook3 = false;
let showForensics3 = false;
let showBoard3 = false;

let forensicsLeft3 = 1;
let forensicMessage3 = "";
let questioned3 = [false, false, false, false, false];

function getLevel3Buttons() {
  const lineupRow = getButtonRow(3, height * 0.9, 150, 50, 22);
  const inspectRow = getButtonRow(3, height * 0.86, 150, 50, 22);

  return {
    begin: { x: width / 2, y: height * 0.82, w: 220, h: 52 },

    board: lineupRow[0],
    forensics: lineupRow[1],
    convict: lineupRow[2],

    back: { x: width * 0.12, y: height * 0.12, w: 110, h: 44 },
    magnify: inspectRow[0],
    ask: inspectRow[1],
    notebook: inspectRow[2],
  };
}

function isMouseOverLevel3Suspect(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

function drawLevel3Portrait(x, y, index, drawW, drawH) {
  const hovered = isMouseOverLevel3Suspect(x, y, drawW, drawH);
  const scale = hovered ? 1.04 : 1;

  drawPortraitFrame(
    x,
    y,
    drawW * scale,
    drawH * 0.97 * scale,
    hovered,
    convictMode3,
  );

  push();
  imageMode(CENTER);
  if (suspectImgs3[index]) {
    image(suspectImgs3[index], x, y, drawW * scale, drawH * scale);
  } else {
    fill(190);
    noStroke();
    rectMode(CENTER);
    rect(x, y, drawW, drawH, 14);
  }
  pop();
}

function drawLevel3() {
  drawScreenBackdrop(level3BG, [7, 12, 24], [23, 32, 52], 175);

  if (level3Stage === "intro") drawLevel3Intro();
  else if (level3Mode === "lineup") drawLevel3Lineup();
  else drawLevel3Inspect();

  if (showNotebook3) drawNotebook3();
  if (showForensics3) drawForensicsPanel3();
  if (showBoard3) drawBoard3();

  drawFooterMessage(message3, convictMode3 ? "warning" : "info");
}

function drawLevel3Intro() {
  const buttons = getLevel3Buttons();

  drawCenteredPanel(
    "Level 3: Murder Case",
    "Level 3 keeps everything from the earlier levels.\n\n" +
      "You can inspect, magnify, question, and review the evidence board.\n" +
      "Now you also get notebook notes and one forensic check.\n\n" +
      "Use every tool together before you convict.",
    "Begin",
    buttons.begin,
  );
}

function drawLevel3Inspect() {
  const buttons = getLevel3Buttons();
  const suspect = suspects3[selected3];

  drawInspectLayout(
    "Inspecting " + suspect.name,
    "Magnify, interview, notebook, and forensics all work together here.",
    (x, y, w, h) => {
      if (suspectFaces3[selected3]) {
        image(suspectFaces3[selected3], x, y, w, h);
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
        value: suspect.appearance,
      },
      {
        label: "Magnify",
        value: magnifyMessage3 || "Use Magnify to inspect for trace residue.",
        h: 78,
      },
      {
        label: questioned3[selected3]
          ? "Recorded interview"
          : "Interview suspect",
        value:
          askMessage3 ||
          "Interview this suspect to add their timeline to the evidence board.",
        h: 96,
      },
    ],
    UI_COLORS.success,
  );

  drawButton(buttons.back, "Back", [83, 103, 139]);
  drawButton(buttons.magnify, "Magnify", UI_COLORS.warning);
  drawButton(
    buttons.ask,
    questioned3[selected3] ? "Asked" : "Interview",
    UI_COLORS.accentStrong,
  );
  drawButton(buttons.notebook, "Notebook", UI_COLORS.success);
}

function drawLevel3Lineup() {
  const buttons = getLevel3Buttons();
  const positions = getLineupPositions(suspects3.length);
  const imgW = min(width * 0.12, 160);
  const imgH = min(height * 0.44, 390);

  drawCaseHeader(
    "Level 3: Murder Case",
    convictMode3
      ? "Convict mode is active. Select the killer."
      : "Use every tool: inspect, board, notebook, and one forensic check.",
  );

  drawLineupFloor();
  drawInfoPill(
    `Forensics left: ${forensicsLeft3}`,
    width / 2,
    height * 0.2,
    220,
    UI_COLORS.success,
  );

  for (let i = 0; i < suspects3.length; i++) {
    drawLevel3Portrait(positions[i].x, positions[i].y, i, imgW, imgH);

    suspects3[i].hitbox = {
      x: positions[i].x,
      y: positions[i].y,
      w: imgW,
      h: imgH,
    };

    drawSuspectNameTag(
      positions[i].x,
      positions[i].y + imgH * 0.58,
      suspects3[i].name,
      questioned3[i],
    );
  }

  drawButton(buttons.board, "Board", [96, 124, 181]);
  drawButton(buttons.forensics, "Forensics", UI_COLORS.success);
  drawButton(
    buttons.convict,
    convictMode3 ? "Cancel Convict" : "Convict",
    convictMode3 ? UI_COLORS.danger : UI_COLORS.accentStrong,
  );
}

function drawNotebook3() {
  drawModalOverlay(138);

  const panelW = min(width * 0.72, 700);
  const panelH = min(height * 0.52, 380);
  drawGlassPanel(width / 2, height / 2, panelW, panelH, UI_COLORS.warning, 26);
  drawBadge(
    "NOTEBOOK",
    width / 2,
    height / 2 - panelH * 0.33,
    120,
    UI_COLORS.warning,
  );

  push();
  textAlign(LEFT, TOP);
  fill(255);
  textSize(min(width, height) * 0.024);
  text("Field note", width / 2 - panelW * 0.36, height / 2 - panelH * 0.15);

  fill(UI_COLORS.mutedInk[0], UI_COLORS.mutedInk[1], UI_COLORS.mutedInk[2]);
  textSize(min(width, height) * 0.022);
  textLeading(30);
  text(
    suspects3[selected3].notebook,
    width / 2 - panelW * 0.36,
    height / 2 - panelH * 0.03,
    panelW * 0.72,
    panelH * 0.34,
  );

  textAlign(CENTER, CENTER);
  textSize(16);
  text("Click anywhere to close.", width / 2, height / 2 + panelH * 0.34);
  pop();
}

function drawForensicsPanel3() {
  drawModalOverlay(138);

  const panelW = min(width * 0.74, 720);
  const panelH = min(height * 0.46, 320);
  drawGlassPanel(width / 2, height / 2, panelW, panelH, UI_COLORS.success, 26);
  drawBadge(
    "FORENSICS",
    width / 2,
    height / 2 - panelH * 0.3,
    130,
    UI_COLORS.success,
  );

  push();
  textAlign(LEFT, TOP);
  fill(255);
  textSize(min(width, height) * 0.024);
  text("Lab result", width / 2 - panelW * 0.36, height / 2 - panelH * 0.1);

  fill(UI_COLORS.mutedInk[0], UI_COLORS.mutedInk[1], UI_COLORS.mutedInk[2]);
  textSize(min(width, height) * 0.022);
  textLeading(30);
  text(
    forensicMessage3,
    width / 2 - panelW * 0.36,
    height / 2,
    panelW * 0.72,
    panelH * 0.22,
  );

  textAlign(CENTER, CENTER);
  textSize(16);
  text("Click anywhere to close.", width / 2, height / 2 + panelH * 0.3);
  pop();
}

function drawBoard3() {
  drawModalOverlay(138);

  const panelW = min(width * 0.82, 860);
  const panelH = min(height * 0.78, 560);
  drawGlassPanel(width / 2, height / 2, panelW, panelH, UI_COLORS.accent, 26);
  drawBadge(
    "EVIDENCE BOARD",
    width / 2,
    height / 2 - panelH * 0.39,
    155,
    UI_COLORS.accent,
  );

  push();
  textAlign(LEFT, TOP);
  const startX = width / 2 - panelW * 0.38;
  const startY = height / 2 - panelH * 0.26;

  for (let i = 0; i < suspects3.length; i++) {
    fill(255);
    textSize(18);
    text(`${suspects3[i].name}`, startX, startY + i * 78);

    fill(UI_COLORS.mutedInk[0], UI_COLORS.mutedInk[1], UI_COLORS.mutedInk[2]);
    textSize(17);
    const line = questioned3[i]
      ? suspects3[i].boardNote
      : "Interview not recorded yet.";
    text(line, startX + 120, startY + i * 78, panelW * 0.58, 58);
  }

  fill(UI_COLORS.mutedInk[0], UI_COLORS.mutedInk[1], UI_COLORS.mutedInk[2]);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Click anywhere to close.", width / 2, height / 2 + panelH * 0.4);
  pop();
}

function level3MousePressed() {
  if (transitionPending) return;

  if (showNotebook3) {
    showNotebook3 = false;
    return;
  }

  if (showForensics3) {
    showForensics3 = false;
    return;
  }

  if (showBoard3) {
    showBoard3 = false;
    return;
  }

  const buttons = getLevel3Buttons();

  if (level3Stage === "intro") {
    if (isOverButton(buttons.begin)) {
      level3Stage = "play";
    }
    return;
  }

  if (level3Mode === "lineup") {
    if (isOverButton(buttons.board)) {
      showBoard3 = true;
      return;
    }

    if (isOverButton(buttons.forensics)) {
      if (forensicsLeft3 <= 0) {
        message3 = "No forensic checks left.";
      } else {
        forensicsLeft3--;
        forensicMessage3 =
          "Lab report: gray toner dust was found on the killer's right cuff.";
        showForensics3 = true;
        message3 = "Forensic clue added.";
      }
      return;
    }

    if (isOverButton(buttons.convict)) {
      convictMode3 = !convictMode3;
      message3 = convictMode3 ? "Select the killer." : "";
      return;
    }

    for (let i = 0; i < suspects3.length; i++) {
      const hb = suspects3[i].hitbox;
      if (isMouseOverLevel3Suspect(hb.x, hb.y, hb.w, hb.h)) {
        if (convictMode3) {
          finishCase(
            suspects3[i].isCulprit,
            "Correct! Casey is the killer.",
            "Wrong suspect! The case goes cold.",
            "win",
            (msg) => {
              message3 = msg;
            },
          );
        } else {
          selected3 = i;
          level3Mode = "inspect";
          askMessage3 = questioned3[i] ? suspects3[i].interview : "";
          magnifyMessage3 = "";
          message3 = "";
        }
        return;
      }
    }
  } else {
    if (isOverButton(buttons.back)) {
      level3Mode = "lineup";
      return;
    }

    if (isOverButton(buttons.magnify)) {
      magnifyMessage3 = suspects3[selected3].magnifiedClue;
      return;
    }

    if (isOverButton(buttons.ask)) {
      questioned3[selected3] = true;
      askMessage3 = suspects3[selected3].interview;
      message3 = "Interview recorded to the board.";
      return;
    }

    if (isOverButton(buttons.notebook)) {
      showNotebook3 = true;
      return;
    }
  }
}

function resetLevel3() {
  level3Stage = "intro";
  level3Mode = "lineup";
  selected3 = null;
  message3 = "";
  askMessage3 = "";
  magnifyMessage3 = "";
  convictMode3 = false;
  showNotebook3 = false;
  showForensics3 = false;
  showBoard3 = false;
  forensicsLeft3 = 1;
  forensicMessage3 = "";
  questioned3 = [false, false, false, false, false];
}
