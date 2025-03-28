import MandelbrotLogo from "../assets/mandelbrot.png";

export default function Header() {
  return (
    <div id="header">
      <img src={MandelbrotLogo} alt="Mandelbrot Logo" />
      <h1>Mandelbrot</h1>
    </div>
  );
}
