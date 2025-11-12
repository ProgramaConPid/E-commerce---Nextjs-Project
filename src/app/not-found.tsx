import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-slate-900 via-indigo-950 to-black text-center text-white px-4">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20 max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-indigo-400">404</h1>
        <h2 className="text-2xl font-semibold mb-3">
          Oops... You’ve entered the void 👀
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          This page has vanished into the digital abyss.  
          Maybe it was never real... or maybe it just didn’t pay rent 🏚️.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-all shadow-md hover:shadow-lg"
        >
          🔙 Back to Civilization
        </Link>

        <p className="text-sm text-gray-500 mt-6 italic">
          (Next time bring snacks, the void gets lonely.)
        </p>
      </div>
    </div>
  );
}
