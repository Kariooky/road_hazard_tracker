import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <Link href="/map">
        <a className="text-white">Go to Map</a>
      </Link>
    </nav>
  );
}