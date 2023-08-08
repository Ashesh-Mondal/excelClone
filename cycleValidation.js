// Storage --> 2D Matrix (Basic needed)
let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < close; j++) {
    // Why Array --> More than 1 child relation(dependency)
    row.push([]);
  }
  graphComponentMatrix.push(row);
}
