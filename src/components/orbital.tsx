export function Orbital({
  variant = 0,
  hero = false,
}: {
  variant?: number;
  hero?: boolean;
}) {
  return (
    <div
      className={`orbital ${hero ? "orbital-hero" : ""} orbital-${variant}`}
      aria-hidden="true"
    >
      <div className="orbit-grid" />
      <div className="orbit-axis axis-x" />
      <div className="orbit-axis axis-y" />
      <div className="orbital-system">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <div className="planet">
          <div className="planet-lines" />
        </div>
        <div className="satellite" />
      </div>
      <span className="diagram-label label-top">
        {
          [
            "ORBITAL GEOMETRY",
            "SYSTEM INTERACTION",
            "ENERGY & EXPLORATION",
            "MATERIAL STRUCTURE",
          ][variant]
        }
      </span>
      <span className="diagram-label label-bottom">
        CONCEPTUAL ILLUSTRATION / {String(variant + 1).padStart(2, "0")}
      </span>
      {hero && (
        <>
          <span className="diagram-cross cross-one">+</span>
          <span className="diagram-cross cross-two">+</span>
          <span className="orbit-note">
            A different perspective.
            <br />A connected approach.
          </span>
        </>
      )}
    </div>
  );
}
