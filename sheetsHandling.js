let activeSheetColor = "#ced6e0";
let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");
addSheetBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolder = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetFolder.length);

  sheet.innerHTML = `<div class="sheet-content">Sheet ${
    allSheetFolder.length + 1
  } </div>`;

  sheetsFolderCont.appendChild(sheet);
  sheet.scrollIntoView();

  // DB
  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet);
  handleSheetRemoval(sheet);
  sheet.click();
});

function handleSheetRemoval(sheet) {
  sheet.addEventListener("contextmenu", (e) => {
    // To represent right click
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    if (allSheetFolder.length === 1) {
      alert("You need to have atleat one sheet!!");
      return;
    }
    let response = confirm(
      "Your sheet will be removed permanently, Are you sure?"
    );
    if (response === false) return;
    let sheetIdx = Number(sheet.getAttribute("id"));
    // DB
    collectedSheetDB.splice(sheetIdx, 1);
    collectedGraphComponent.splice(sheetIdx, 1);
    // UI
    handleSheetUIRemoval(sheet);
    // By default assign DB to sheet 1 (active)
    sheetDB = collectedSheetDB[0];
    graphComponentMatrix = collectedGraphComponent[0];
    handleSheetProperties();
  });
}

function handleSheetUIRemoval(sheet) {
  // UI
  sheet.remove();
  let allSheetFolder = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolder.length; i++) {
    allSheetFolder[i].setAttribute("id", i);
    let sheetContent = allSheetFolder[i].querySelector(".sheet-content");
    sheetContent.innerText = `Sheet ${i + 1}`;
    allSheetFolder[i].style.backgroundColor = "transparent";
  }
  allSheetFolder[0].style.backgroundColor = activeSheetColor;
}

function handleSheetDB(sheetIdx) {
  sheetDB = collectedSheetDB[sheetIdx];
  graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handleSheetProperties() {
  for (let i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
      cell.click();
    }
  }
  // By default click on first cell via DOM
  let firstCell = document.querySelector(".cell");
  firstCell.click();
}

function handleSheetUI(sheet) {
  let allSheetFolder = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolder.length; i++) {
    allSheetFolder[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = activeSheetColor;
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetIdx = Number(sheet.getAttribute("id"));
    handleSheetDB(sheetIdx);
    handleSheetProperties();
    handleSheetUI(sheet);
  });
}

function createSheetDB() {
  let sheetDB = [];

  for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
      let cellProp = {
        bold: false,
        italic: false,
        underline: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: "14",
        fontColor: "#000000",
        BGcolor: "#000000", // Just for ientification purpose
        value: "",
        formula: "",
        children: [],
      };
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
  }
  collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
  let graphComponentMatrix = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      // Why Array --> More than 1 child relation(dependency)
      row.push([]);
    }
    graphComponentMatrix.push(row);
  }
  collectedGraphComponent.push(graphComponentMatrix);
}
