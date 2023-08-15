let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

// Download Task
downloadBtn.addEventListener("click", (e) => {
  let jsonData = JSON.stringify([sheetDB, graphComponentMatrix]);
  let file = new Blob([jsonData], { type: "application/json" });

  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "SheetData.json";
  a.click();
});
