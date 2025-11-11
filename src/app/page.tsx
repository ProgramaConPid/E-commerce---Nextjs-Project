"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SimplePage from "./features/demo/SimplePage";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session)
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-indigo-950 via-slate-900 to-black px-4">
        <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20 max-w-lg">
          <h1 className="text-4xl font-bold text-white mb-4">
            !Welcome to{" "}
            <span className="text-indigo-400 drop-shadow-sm">Pidcommerce</span>!
          </h1>

          <p className="text-gray-200 mb-6 leading-relaxed text-lg">
            Register or log in to access{" "}
            <span className="font-semibold text-indigo-300">
              Incredible discounts, exclusive products
            </span>{" "}
            and much more.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <a
              href="pages/login"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-all shadow-md hover:shadow-lg"
            >
              Login
            </a>
            <a
              href="pages/register"
              className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/20 transition-all"
            >
              Sign In
            </a>
          </div>
        </div>


        <SimplePage />
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-slate-900 via-indigo-950 to-black px-4">
      <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20 max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-3">
          ¡Hello,{" "}
          <span className="text-indigo-400">
            {session.user?.name || "Usuario"}
          </span>
          !
        </h1>

        <p className="text-gray-200 mb-6 leading-relaxed text-lg">
          Bienvenido de nuevo a{" "}
          <span className="font-semibold text-indigo-300">Pidcommerce</span>.  
          Here you&apos;ll find the best deals, new releases, and products
          selected especially for you.
        </p>

        <button
          onClick={() => router.push("/pages/home")}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-all shadow-md hover:shadow-lg"
        >
          Go to Home 🛒
        </button>
      </div>
    </div>
  );
}
