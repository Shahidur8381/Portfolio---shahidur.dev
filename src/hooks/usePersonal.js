import { useState, useEffect } from "react";
import { personal as fallbackPersonal } from "../data";

export function usePersonal() {
  const [personal, setPersonal] = useState(fallbackPersonal);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPersonalData() {
      try {
        const res = await fetch("https://api.shahidur.dev/api/personal");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data && data.name) {
            setPersonal(data);
            return;
          }
        }
      } catch (err) {
        console.warn("Failed to fetch /api/personal, trying /api/portfolio:", err);
      }

      try {
        const res = await fetch("https://api.shahidur.dev/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data?.personal) {
            setPersonal(data.personal);
          }
        }
      } catch (err) {
        console.warn("Using fallback personal data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPersonalData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { personal, loading };
}
