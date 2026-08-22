import "./Loading.css";

export default function Loading({
  fullScreen = true,
}) {
  return (
    <div className={`loading ${fullScreen ? "fullscreen" : ""}`}>

      <div className="loading-brand">
        <span className="loading-brand-top">TIO</span>
        <span className="loading-brand-bottom">URBAN</span>
      </div>

      <div className="loading-bar">
        <div className="loading-bar-progress"></div>
      </div>

    </div>
  );
}