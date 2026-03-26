let suspects = [];
let selected = null;
let showHint = false;
let gameState = "observe";
let message = "";

function startLevel() {
  // Only Level 1 for now
  if (selectedLevel === 1) {
    suspects = [
      { x: 150, y: 200, isLiar: false },
      { x: 400, y: 200, isLiar: true },
      { x: 650, y: 200, isLiar: false },
    ];
  }
}

function runLevel() {
  if (selectedLevel === 1) {
    drawLevel1();
  }
}

function drawLevel1() {
  fill(255);
  text("Level 1", width / 2, 40);

  drawSuspects();

  drawButton("ACCUSE", 300, 400, 200, 40);
  drawButton("HINT 🔍", 50, 400, 120, 40);
  drawButton("⬅ Back", 20, 20, 120, 40);

  if (gameState === "feedback") {
    fill(255);
    text(message, width / 2, 460);
  }
}

function drawSuspects() {
  for (let i = 0; i < suspects.length; i++) {
    let s = suspects[i];

    fill(200);
    rect(s.x - 40, s.y - 50, 80, 100, 10);

    fill(255);
    ellipse(s.x, s.y - 60, 50);

    if (showHint && s.isLiar) {
      fill(255, 0, 0);
      ellipse(s.x, s.y, 15);
    }
  }
}

function handleLevelClick() {
  if (selectedLevel !== 1) return;

  // Select suspect
  for (let i = 0; i < suspects.length; i++) {
    let s = suspects[i];
    if (dist(mouseX, mouseY, s.x, s.y) < 50) {
      selected = i;
    }
  }

  // Accuse
  if (overButton(300, 400, 200, 40)) {
    if (selected !== null) {
      if (suspects[selected].isLiar) {
        message = "✅ Correct!";
      } else {
        message = "❌ Wrong!";
      }
      gameState = "feedback";
    }
  }

  // Hint
  if (overButton(50, 400, 120, 40)) {
    showHint = true;
  }
}
