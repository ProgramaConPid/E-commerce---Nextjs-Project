"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session)
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-indigo-950 via-slate-900 to-black px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20 max-w-lg"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-4xl font-bold text-white mb-4"
          >
            !Welcome to{" "}
            <span className="text-indigo-400 drop-shadow-sm">Pidcommerce</span>!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="text-gray-200 mb-6 leading-relaxed text-lg"
          >
            Register or log in to access{" "}
            <span className="font-semibold text-indigo-300">
              Incredible discounts, exclusive products
            </span>{" "}
            and much more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-4 mt-6"
          >
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="pages/login"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg"
            >
              Login
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="pages/register"
              className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/20"
            >
              Sign In
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-slate-900 via-indigo-950 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20 max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-4xl font-bold text-white mb-3"
        >
          ¡Hello,{" "}
          <span className="text-indigo-400">
            {session.user?.name || "Usuario"}
          </span>
          !
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-gray-200 mb-6 leading-relaxed text-lg"
        >
          Bienvenido de nuevo a{" "}
          <span className="font-semibold text-indigo-300">Pidcommerce</span>.  
          Here you&apos;ll find the best deals, new releases, and products
          selected especially for you.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/pages/home")}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg"
        >
          Go to Home 🛒
        </motion.button>
      </motion.div>
    </div>
  );
}
