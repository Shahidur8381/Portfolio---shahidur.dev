"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#050907] text-white flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-md p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-3">Something went wrong</h2>
          <p className="text-[#8b9bb4] text-sm mb-6">
            {error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-semibold rounded-xl text-sm transition-all"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
