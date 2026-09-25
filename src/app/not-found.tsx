import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page-wrap shell page-heading">
      <p className="eyebrow">404 / OFF THE FLIGHT PATH</p>
      <h1>Uncharted territory.</h1>
      <p>This page could not be found.</p>
      <Link href="/" className="button button-dark">
        Return home ↗
      </Link>
    </div>
  );
}
