function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
  let [srcr, srcc] = cycleResponse;
  let visited = [];
  let dfsVisited = [];
  for (let i = 0; i < rows; i++) {
    let visitedRow = []; // Node visit trace
    let dfsVisitedRow = []; // Stack visit trace
    for (let j = 0; j < cols; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       if (visited[i][j] === false) {
  //         let response = dfsCyclicDetection(
  //           graphComponentMatrix,
  //           i,
  //           j,
  //           visited,
  //           dfsVisited
  //         );
  //         if (response == true) return true;
  //       }
  //     }
  //   }
  let response = dfsCyclicDetection(
    graphComponentMatrix,
    srcr,
    srcc,
    visited,
    dfsVisited
  );
  if (response === true) return true;
  return false;
}

// Coloring cells for traking
function dfsCyclicDetectionTracePath(
  graphComponentMatrix,
  srcr,
  srcc,
  visited,
  dfsVisited
) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  let cell = document.querySelector(`.cell[rid = "${srcr}"][cid = "${srcc}"]`);
  cell.style.backgroundColor = "lightblue";

  for (
    let children = 0;
    children < graphComponentMatrix[srcr][srcc].length;
    children++
  ) {
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
    if (visited[nbrr][nbrc] === false) {
      let response = dfsCyclicDetection(
        graphComponentMatrix,
        nbrr,
        nbrc,
        visited,
        dfsVisited
      );
      if (response === true) {
        cell.style.backgroundColor = "transparent";
        return true;
      }
    } else if (
      visited[nbrr][nbrc] === true &&
      dfsVisited[nbrr][nbrc] === true
    ) {
      let cyclicCell = document.querySelector(
        `.cell[rid = "${nbrr}"][cid = "${nbrc}"]`
      );
      cyclicCell.style.backgroundColor = "lightsalmon";
      cyclicCell.style.backgroundColor = "transparent";
      return true;
    }
  }

  dfsVisited[srcr][srcc] = false;
  return false;
}
