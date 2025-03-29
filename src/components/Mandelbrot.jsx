import { useState, useEffect, useRef } from "react";

export default function Mandelbrot() {
  const [deep, setDeep] = useState(50);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [scale, setScale] = useState(5);
  const [iterations, setIterations] = useState(0);
  const canvasRef = useRef(null);

  function checkFast(ci, c) {
    let zi = 0;
    let z = 0;

    for (let i = 0; i < deep; i++) {
      let ziT = 2 * (z * zi);
      let zT = z * z - zi * zi;
      z = zT + c;
      zi = ziT + ci;

      if (z * z + zi * zi >= 4.0) {
        return i;
      }
    }
    return deep;
  }

  function getColor(iter) {
    if (iter === deep) return "black";
    const t = iter / deep;
    const r = Math.floor(9 * (1 - t) * t * t * t * 255);
    const g = Math.floor(15 * (1 - t) * (1 - t) * t * t * 255);
    const b = Math.floor(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function drawMandelbrot(ctx) {
    let totalIterations = 0;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let ci = (y - height / 2) / (height / scale);
        let c = (x - width / 2) / (width / scale);
        let iter = checkFast(ci, c);
        totalIterations += iter;
        ctx.fillStyle = getColor(iter);
        ctx.fillRect(x, y, 1, 1);
      }
    }
    setIterations(totalIterations);
  }

  useEffect(
    () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        drawMandelbrot(ctx);
      }
    },
    [deep, width, height, scale]
  );

  function downloadImage() {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "mandelbrot.png";
      link.click();
    }
  }

  return (
    <div className="container">
      <h1>Mandelbrot Generator</h1>
      <div className="controls">
        <label>
          Depth
          <input
            type="number"
            value={deep}
            onChange={e => setDeep(Number(e.target.value))}
          />
        </label>
        <label>
          Width
          <input
            type="number"
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Height
          <input
            type="number"
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
          />
        </label>
        <label>
          Scale
          <input
            type="number"
            value={scale}
            onChange={e => setScale(Number(e.target.value))}
          />
        </label>
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="canvas"
      />
      <p>
        Total Iterations: {iterations}
      </p>
      <button onClick={downloadImage} className="download-button">
        Download Image
      </button>
    </div>
  );
}
