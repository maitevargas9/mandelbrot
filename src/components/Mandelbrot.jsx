import { useState, useEffect } from "react";

export default function Mandelbrot() {
  const DEEP = 50;
  const WIDTH = 500;
  const HEIGHT = 500;
  const SCALE = 5;
  const [iterations, setIterations] = useState(0);

  function checkFast(ci, c) {
    let zi = 0;
    let z = 0;

    for (let i = 0; i < DEEP; i++) {
      let ziT = 2 * (z * zi);
      let zT = z * z - zi * zi;
      z = zT + c;
      zi = ziT + ci;

      if (z * z + zi * zi >= 4.0) {
        return i;
      }
    }
    return DEEP;
  }

  function getColor(iter) {
    if (iter === DEEP) return "black";
    const t = iter / DEEP;
    const r = Math.floor(9 * (1 - t) * t * t * t * 255);
    const g = Math.floor(15 * (1 - t) * (1 - t) * t * t * 255);
    const b = Math.floor(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function drawMandelbrot(ctx) {
    let totalIterations = 0;
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        let ci = (y - HEIGHT / 2) / (HEIGHT / SCALE);
        let c = (x - WIDTH / 2) / (WIDTH / SCALE);
        let iter = checkFast(ci, c);
        totalIterations += iter;
        ctx.fillStyle = getColor(iter);
        ctx.fillRect(x, y, 1, 1);
      }
    }
    setIterations(totalIterations);
  }

  useEffect(() => {
    const canvas = document.getElementById("mandelbrotCanvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      drawMandelbrot(ctx);
    }
  }, []);

  return (
    <div>
      <canvas id="mandelbrotCanvas" width={WIDTH} height={HEIGHT} />
      <p>
        Total Iterations: {iterations}
      </p>
    </div>
  );
}
