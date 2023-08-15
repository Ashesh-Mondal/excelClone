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
  });
}
