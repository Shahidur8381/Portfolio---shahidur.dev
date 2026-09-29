"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// Load the custom globe only on client (Three.js is browser-only)
const PersonalGlobeCanvas = dynamic(
  () => import("./canvas/PersonalGlobe"),
  { ssr: false }
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Strictly cap message to max 5000 characters (both typing and pasting)
    const finalValue = name === "message" ? value.slice(0, 5000) : value;
    setForm((prev) => ({ ...prev, [name]: finalValue }));
    // Clear error once user types
    if (status === "error") {
      setStatus(null);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const trimmedName = (form.name || "").trim();
    const trimmedEmail = (form.email || "").trim();
    const trimmedMessage = (form.message || "").trim();

    if (!trimmedName) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    if (trimmedName.length > 100) {
      setStatus("error");
      setErrorMessage("Name cannot exceed 100 characters.");
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    if (!trimmedEmail) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    if (trimmedEmail.length > 254) {
      setStatus("error");
      setErrorMessage("Email address is too long.");
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    if (!trimmedMessage) {
      setStatus("error");
      setErrorMessage("Please enter a message before sending.");
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    if (trimmedMessage.length > 5000) {
      setStatus("error");
      setErrorMessage("Message cannot exceed 5,000 characters.");
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    setLoading(true);
    setStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setLoading(false);
        setStatus("success");
        setErrorMessage("");
        setForm({ name: "", email: "", message: "", website: "" });
        setTimeout(() => setStatus(null), 5000);
      } else {
        const errorText =
          data?.error || "Something went wrong. Please try again.";
        console.error("[Contact Form] Submission error:", errorText);
        setLoading(false);
        setStatus("error");
        setErrorMessage(errorText);
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (err) {
      console.error("[Contact Form] Network error:", err);
      setLoading(false);
      setStatus("error");
      setErrorMessage(
        "Network connection error. Please try again or email directly."
      );
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">

      {/* ── LEFT: Contact Form ── */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-[#0b140f]/85 backdrop-blur-2xl p-8 rounded-2xl border border-[#10b981]/25 shadow-[0_0_40px_rgba(0,245,155,0.08)]"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6"
        >
          {/* Honeypot field for bot spam protection (hidden from humans) */}
          <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={handleChange}
            />
          </div>
          <label className="flex flex-col">
            <span className="text-white/80 text-sm font-medium mb-2">Your Name</span>
            <input
              type="text"
              name="name"
              maxLength={100}
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              required
              className="bg-[#070d09]/80 py-3.5 px-5 placeholder:text-[#475569] text-white rounded-xl outline-none border border-[#10b981]/20 focus:border-[#00f59b] focus:shadow-[0_0_12px_rgba(0,245,155,0.25)] transition-all text-sm"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white/80 text-sm font-medium mb-2">Your Email</span>
            <input
              type="email"
              name="email"
              maxLength={254}
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              required
              className="bg-[#070d09]/80 py-3.5 px-5 placeholder:text-[#475569] text-white rounded-xl outline-none border border-[#10b981]/20 focus:border-[#00f59b] focus:shadow-[0_0_12px_rgba(0,245,155,0.25)] transition-all text-sm"
            />
          </label>

          <label className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80 text-sm font-medium">Message</span>
              <span
                className={`text-xs transition-colors ${
                  form.message.length >= 5000
                    ? "text-[#00f59b] font-semibold"
                    : form.message.length > 4500
                    ? "text-amber-400 font-medium"
                    : "text-white/40"
                }`}
              >
                {form.message.length.toLocaleString()} / 5,000
              </span>
            </div>
            <textarea
              rows={6}
              name="message"
              maxLength={5000}
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to build together?"
              required
              className="bg-[#070d09]/80 py-3.5 px-5 placeholder:text-[#475569] text-white rounded-xl outline-none border border-[#10b981]/20 focus:border-[#00f59b] focus:shadow-[0_0_12px_rgba(0,245,155,0.25)] transition-all text-sm resize-none"
            />
          </label>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="relative group overflow-hidden bg-gradient-to-r from-[#00f59b] via-[#10b981] to-[#059669] py-3 px-8 rounded-xl outline-none text-[#070a08] font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,245,155,0.35)] hover:shadow-[0_0_30px_rgba(0,245,155,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="relative z-10">
                {loading ? "Sending..." : "Send Message →"}
              </span>
              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Status feedback */}
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#00f59b] text-sm font-medium"
              >
                ✓ Message sent! I'll get back to you soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                ✗ {errorMessage || (
                  <>
                    Something went wrong. Try emailing{" "}
                    <a
                      href="mailto:hello@shahidur.dev"
                      className="underline text-[#00f59b]"
                    >
                      hello@shahidur.dev
                    </a>{" "}
                    directly.
                  </>
                )}
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>

      {/* ── RIGHT: Personalized 3D Globe ── */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[380px]"
      >
        <PersonalGlobeCanvas />
      </motion.div>

    </div>
  );
};

export default SectionWrapper(Contact, "contact");
