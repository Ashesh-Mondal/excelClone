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
