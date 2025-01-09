const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/', (req, res) => {
  const quadraticResult = handleQuadraticEquation(1, 2, 1);
  const linearResult = solveLinearEquation(1, 2);
  res.send({
    quadraticResult,
    linearResult
  });
});

function handleQuadraticEquation(a, b, c) {
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return null;
  } else if (discriminant === 0) {
    return [-b / (2 * a)];
  } else {
    const sqrtDiscriminant = Math.sqrt(discriminant);
    return [(-b + sqrtDiscriminant) / (2 * a), (-b - sqrtDiscriminant) / (2 * a)];
  }
}

const solveLinearEquation = (a, b) => {
  if (a === 0) {
    return b === 0 ? "The equation has infinitely many solutions" : "The equation has no solution";
  }
  return (-b / a).toFixed(2);
};
