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
