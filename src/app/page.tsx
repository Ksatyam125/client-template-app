import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Client Template App
      </h1>

      <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl">
        Manage templates and clients efficiently.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link
          href="/login"
          className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}