"use client";

import { useContext, useState } from "react";
import { signIn } from "next-auth/react";
import { sendEmail } from "@/services/userLogged";
import { welcomeMail } from "@/constant/emails/logginMail";
import Link from "next/link";
import Image from "next/image";
import { myContext } from "@/context/Context";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUserLogged } = useContext(myContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Please enter your email and password!");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Incorrect credentials or user not found.");
      } else {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        if (session?.user) {
          setUserLogged({
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
          });
        }

        setTimeout(() => {
          window.location.href = "/pages/home";
        }, 150);

        sendEmail({
          email: form.email,
          asunto: "Login successfully",
          mensajeHtml: welcomeMail,
        });
      }
    } catch (err: unknown) {
      console.error("Error en el inicio de sesión:", err);
      setError("Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-indigo-950 via-slate-900 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8"
      >
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-center"
        >
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Login
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Access your account and enjoy everything it has to offer.{" "}
            <span className="text-indigo-400 font-medium">Pidcommerce</span>.
          </p>
        </motion.header>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="space-y-5"
        >
          <motion.label
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="block"
          >
            <span className="text-sm font-medium text-gray-200">Email</span>
            <input
              type="email"
              placeholder="johndoe@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </motion.label>

          <motion.label
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="block relative"
          >
            <span className="text-sm font-medium text-gray-200">Password</span>
            <div className="mt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 pr-12 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-300 hover:text-white transition"
              >
                {showPassword ? "Hide" : "Show"}
              </motion.button>
            </div>
          </motion.label>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-60"
          >
            {loading ? (
              <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </motion.svg>
            ) : null}
            <span>{loading ? "Entrando..." : "Entrar"}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signIn("google", { callbackUrl: "/pages/home" })}
            className="w-full flex items-center justify-center gap-3 border p-2 rounded bg-(--white) cursor-pointer"
          >
            <Image
              src="/icons/Logo-google-icon.png"
              alt="Google"
              width={100}
              height={100}
              className="w-5 h-5"
            />
            Login with Google
          </motion.button>
        </motion.form>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-center text-sm text-gray-300"
        >
          ¿Don&apos;t you have an account?{" "}
          <Link
            href="/pages/register"
            className="text-indigo-400 hover:underline font-medium"
          >
            Create account
          </Link>
        </motion.footer>
      </motion.div>
    </div>
  );
}
