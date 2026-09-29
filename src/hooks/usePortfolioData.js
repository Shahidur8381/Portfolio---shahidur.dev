import { useState, useEffect } from "react";
import fallbackData from "../data/portfolioData.json";

export function usePortfolioData() {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPortfolio() {
      try {
        const res = await fetch("https://api.shahidur.dev/api/portfolio");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json) {
            const rawSocial = json.socialLinks || json.social_links;
            const validSocial = Array.isArray(rawSocial)
              ? rawSocial
              : Array.isArray(rawSocial?.socialLinks)
              ? rawSocial.socialLinks
              : null;

            setData((prev) => ({
              ...prev,
              personal: json.personal || prev.personal,
              education: Array.isArray(json.education) ? json.education : prev.education,
              experiences: Array.isArray(json.experiences) ? json.experiences : prev.experiences,
              projects: Array.isArray(json.projects) ? json.projects : prev.projects,
              what_i_built: Array.isArray(json.whatIBuilt)
                ? json.whatIBuilt
                : Array.isArray(json.what_i_built)
                ? json.what_i_built
                : prev.what_i_built,
              testimonials: Array.isArray(json.testimonials) ? json.testimonials : prev.testimonials,
              navLinks: Array.isArray(json.navLinks) ? json.navLinks : prev.navLinks,
              socialLinks: validSocial || prev.socialLinks,
            }));

            // Also check dedicated /api/social-links endpoint in case it's maintained separately
            try {
              const socialRes = await fetch("https://api.shahidur.dev/api/social-links");
              if (socialRes.ok) {
                const socialJson = await socialRes.json();
                const fetchedList = Array.isArray(socialJson)
                  ? socialJson
                  : Array.isArray(socialJson?.socialLinks)
                  ? socialJson.socialLinks
                  : Array.isArray(socialJson?.social_links)
                  ? socialJson.social_links
                  : null;
                if (fetchedList && isMounted) {
                  setData((prev) => ({ ...prev, socialLinks: fetchedList }));
                }
              }
            } catch {
              // Silently use existing data if dedicated endpoint is not yet ready
            }

            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch /api/portfolio, trying individual endpoints:", err);
      }

      // Fallback: try individual endpoints in parallel
      try {
        const [eduRes, expRes, perRes, projRes, socialRes] = await Promise.allSettled([
          fetch("https://api.shahidur.dev/api/education").then((r) => (r.ok ? r.json() : null)),
          fetch("https://api.shahidur.dev/api/experiences").then((r) => (r.ok ? r.json() : null)),
          fetch("https://api.shahidur.dev/api/personal").then((r) => (r.ok ? r.json() : null)),
          fetch("https://api.shahidur.dev/api/projects").then((r) => (r.ok ? r.json() : null)),
          fetch("https://api.shahidur.dev/api/social-links").then((r) => (r.ok ? r.json() : null)),
        ]);

        if (isMounted) {
          const fetchedSocial =
            socialRes.status === "fulfilled" && socialRes.value
              ? Array.isArray(socialRes.value)
                ? socialRes.value
                : Array.isArray(socialRes.value?.socialLinks)
                ? socialRes.value.socialLinks
                : Array.isArray(socialRes.value?.social_links)
                ? socialRes.value.social_links
                : null
              : null;

          setData((prev) => ({
            ...prev,
            education:
              eduRes.status === "fulfilled" && Array.isArray(eduRes.value)
                ? eduRes.value
                : prev.education,
            experiences:
              expRes.status === "fulfilled" && Array.isArray(expRes.value)
                ? expRes.value
                : prev.experiences,
            personal:
              perRes.status === "fulfilled" && perRes.value
                ? perRes.value
                : prev.personal,
            projects:
              projRes.status === "fulfilled" && Array.isArray(projRes.value)
                ? projRes.value
                : prev.projects,
            socialLinks: fetchedSocial || prev.socialLinks,
          }));
        }
      } catch (fallbackErr) {
        console.warn("Using local fallback portfolio data:", fallbackErr);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    ...data,
    socialLinks: data.socialLinks || fallbackData.socialLinks || [],
    loading,
    portfolioData: data,
  };
}
