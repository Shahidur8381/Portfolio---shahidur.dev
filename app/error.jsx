"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-red-900 z-[999999] relative">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="mt-4">{error.message}</p>
      <button
        className="mt-4 px-4 py-2 bg-white text-red-900 rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
