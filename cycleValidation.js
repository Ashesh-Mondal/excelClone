let collectedGraphComponent = [];
// Storage --> 2D Array (Basic needed)
let graphComponentMatrix = [];

// for (let i = 0; i < rows; i++) {
//   let row = [];
//   for (let j = 0; j < cols; j++) {
//     // Why Array --> More than 1 child relation(dependency)
//     row.push([]);
//   }
//   graphComponentMatrix.push(row);
// }

// True -> Cyclic, False -> Not Cyclic
// Giving us the response
function isGraphCyclic(graphComponentMatrix) {
  // Dependency -> visited, dfsVisited (2D Array)
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

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] === false) {
        let response = dfsCyclicDetection(
          graphComponentMatrix,
          i,
          j,
          visited,
          dfsVisited
        );
        // Found cyclic so return immediately, no need to explore more path
        if (response == true) return [i, j];
      }
    }
  }
  return null;
}

// Detection of the cyclic graph or not
// Start -> vis(TRUE) dfsvis(TRUE)
// End -> dfsvis(FALSE)
// If vis[i][j] -> already explored path, so go back no use to explore again
// Cycle detection condition -> if(vis[i][j] === true && dfsVis[i][j] === true) -> cyclic
// Return -> True/False
// True -> Cyclic, False -> Not Cyclic
function dfsCyclicDetection(
  graphComponentMatrix,
  srcr,
  srcc,
  visited,
  dfsVisited
) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

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
      if (response === true) return true; // Found cyclic so return immediately, no need to explore more path
    } else if (
      visited[nbrr][nbrc] === true &&
      dfsVisited[nbrr][nbrc] === true
    ) {
      // Found cyclic so return immediately, no need to explore more path
      return true;
    }
  }

  dfsVisited[srcr][srcc] = false;
  return false;
}
