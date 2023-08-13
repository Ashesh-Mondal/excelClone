let collectedSheetDB = []; // Containes all sheetDB
// Storage of individual cell
let sheetDB = [];

{
  let addSheetBtn = document.querySelector(".sheet-add-icon");
  addSheetBtn.click();
}

// for (let i = 0; i < rows; i++) {
//   let sheetRow = [];
//   for (let j = 0; j < cols; j++) {
//     let cellProp = {
//       bold: false,
//       italic: false,
//       underline: false,
//       alignment: "left",
//       fontFamily: "monospace",
//       fontSize: "14",
//       fontColor: "#000000",
//       BGcolor: "#000000", // Just for ientification purpose
//       value: "",
//       formula: "",
//       children: [],
//     };
//     sheetRow.push(cellProp);
//   }
//   sheetDB.push(sheetRow);
// }

// Selectors for cell properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");

// Background color of the icon for the UI
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// Application of two-way binding
// Attach property listeners
bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  // Modification
  cellProp.bold = !cellProp.bold; // Data Change
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI Change(Part 1)
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp; // UI Change(Part 2)
});

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  // Modification
  cellProp.italic = !cellProp.italic; // Data Change
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI Change(Part 1)
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp; // UI Change(Part 2)
});

underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  // Modification
  cellProp.underline = !cellProp.underline; // Data Change
  cell.style.textDecoration = cellProp.underline ? "underline" : "unset"; //UI Change(Part 1)
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp; // UI Change(Part 2)
});

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  // Modification
  cellProp.fontSize = fontSize.value; // Data Change
  cell.style.fontSize = cellProp.fontSize + "px"; // UI Change(Part 1)
  fontSize.value = cellProp.fontSize; // UI Change(Part 2)
});

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  // Modification
  cellProp.fontFamily = fontFamily.value; // Data Change
  cell.style.fontFamily = cellProp.fontFamily; // UI Change(Part 1)
  fontFamily.value = cellProp.fontFamily; // UI Change(Part 2)
});

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  // Modification
  cellProp.fontColor = fontColor.value; // Data Change
  cell.style.color = cellProp.fontColor; // UI Change(Part 1)
  fontColor.value = cellProp.fontColor; // UI Change(Part 2)
});

BGcolor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  // Modification
  cellProp.BGcolor = BGcolor.value; // Data Change
  cell.style.backgroundColor = cellProp.BGcolor; // UI Change(Part 1)
  BGcolor.value = cellProp.BGcolor; // UI Change(Part 2)
});

alignment.forEach((alignElem) => {
  alignElem.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification
    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue; // Data Change
    cell.style.textAlign = cellProp.alignment; // UI Change(Part 1)
    // UI CHange(Part 2)
    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

let allCells = document.querySelectorAll(".cell");
totalNumberOfCells = allCells.length;
for (let i = 0; i < totalNumberOfCells; i++) {
  addListernerToAttachCellProperties(allCells[i]);
}

function addListernerToAttachCellProperties(cell) {
  // Work
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    let cellProp = sheetDB[rid][cid];

    // Apply cell Properties
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "unset";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor =
      cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
    cell.style.textAlign = cellProp.alignment;

    // Apply properties to UI Props container
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    BGcolor.value = cellProp.BGcolor;
    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.formula;
    cell.value = cellProp.value;
  });
}

function getCellAndCellProp(address) {
  let [rid, cid] = decodeRIDCIDFromAddress(address);

  // Access cell and storage object
  let cell = document.querySelector(`.cell[rid = "${rid}"][cid = "${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
  let rid = Number(address.slice(1) - 1);
  let cid = Number(address.charCodeAt(0)) - 65;
  return [rid, cid];
}
