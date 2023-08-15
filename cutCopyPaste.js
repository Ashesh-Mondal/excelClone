let altKey;
document.addEventListener("keydown", (e) => {
  altKey = e.altKey;
});
document.addEventListener("keyup", (e) => {
  altKey = e.altKey;
});

for (i = 0; i < rows; i++) {
  for (j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
    handleSelectedCell(cell);
  }
}

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");

let rangeStorage = [];
function handleSelectedCell(cell) {
  cell.addEventListener("click", (e) => {
    // Select cells range work
    if (!altKey) return;
    if (rangeStorage.length >= 2) {
      defaultSelectedCellsUI();
      rangeStorage = [];
    }

    // UI
    cell.style.border = "2px solid #218c74";

    let rid = Number(cell.getAttribute("rid"));
    let cid = Number(cell.getAttribute("cid"));
    rangeStorage.push([rid, cid]);
  });
}

function defaultSelectedCellsUI() {
  for (let i = 0; i < rangeStorage.length; i++) {
    let cell = document.querySelector(
      `.cell[rid = "${rangeStorage[i][0]}"][cid = "${rangeStorage[i][1]}"]`
    );
    cell.style.border = "1px solid lightgrey";
  }
}

let copyData = [];
copyBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;
  copyData = [];
  let strow = rangeStorage[0][0];
  let stcol = rangeStorage[0][1];
  let endrow = rangeStorage[1][0];
  let endcol = rangeStorage[1][1];
  for (let i = strow; i <= endrow; i++) {
    let copyRow = [];
    for (let j = stcol; j <= endcol; j++) {
      let cellProp = sheetDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }
  defaultSelectedCellsUI();
});

pasteBtn.addEventListener("click", (e) => {
  // Paste cells data work
  if (rangeStorage.length < 2) return;

  // Difference
  let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
  let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

  // Target
  let address = addressBar.value;
  let [stRow, stCol] = decodeRIDCIDFromAddress(address);

  // r -> refers copyData row
  // c -> refers copyData column
  for (let i = stRow, r = 0; i <= stRow + rowDiff; i++, r++) {
    for (let j = stCol, c = 0; j <= stCol + colDiff; j++, c++) {
      let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
      if (!cell) continue;
      // DB changes
      let data = copyData[r][c];
      let cellProp = sheetDB[i][j];

      cellProp.value = data.value;
      cellProp.bold = data.bold;
      cellProp.italic = data.italic;
      cellProp.underline = data.underline;
      cellProp.fontSize = data.fontSize;
      cellProp.fontFamily = data.fontFamily;
      cellProp.fontColor = data.fontColor;
      cellProp.BGcolor = data.BGcolor;
      cellProp.alignment = data.alignment;

      // UI changes
      cell.click();
    }
  }
});
