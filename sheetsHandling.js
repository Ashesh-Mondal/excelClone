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
});
