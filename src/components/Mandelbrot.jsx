export default function Mandelbrot() {
  const DEEP = 1000;

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

  const exampleCi = 0.355;
  const exampleC = 0.355;

  return (
    <div>
      <p>
        Example Values: ci = {exampleCi}, c = {exampleC}
      </p>
      <p>
        Iterations: {checkFast(exampleCi, exampleC)}
      </p>
    </div>
  );
}
