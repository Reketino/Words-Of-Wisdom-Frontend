"use client";
import { useState } from "react";

export default function Translator({ quote }) {
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  const translateQuote = async () => {
    if (!quote) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://reketino-s-word-of-wisdom.onrender.com/translate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quote, lang: language }),
        }
      );
      const data = await res.json();
      setTranslated(data.translated || "Error translating");
    } catch (err) {
      console.error(err);
      setTranslated("Error translating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-black/70 text-yellow-200 border border-yellow-700 px-2 py-1 rounded-lg mr-2 shadow-lg backdrop-blur-sm focus:ring-2 focus:ring-yellow-500"
      >
        <option className="bg-yellow-400 text-white" value="no">
          Norwegian
        </option>
        <option className="bg-yellow-400 text-white" value="sv">
          Swedish
        </option>
        <option className="bg-yellow-400 text-white" value="fi">
          Finnish
        </option>
        <option className="bg-yellow-400 text-white" value="en">
          English
        </option>
        <option className="bg-yellow-400 text-white" value="ja">
          Japanese
        </option>
        <option className="bg-yellow-400 text-white" value="es">
          Spanish
        </option>
        <option className="bg-yellow-400 text-white" value="fr">
          French
        </option>
        <option className="bg-yellow-400 text-white" value="de">
          German
        </option>
      </select>

      <button
        onClick={translateQuote}
        className="bg-yellow-700 hover:bg-amber-800  text-white px-3 py-1 rounded"
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {translated && (
        <p className="mt-2 italic text-yellow-100">{translated}</p>
      )}
    </div>
  );
}
