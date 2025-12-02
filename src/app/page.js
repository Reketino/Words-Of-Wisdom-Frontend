"use client";

import { useEffect, useState } from "react";
import MusicPlayer from "@/components/musikk";
import Translator from "@/components/Oversetter";


export default function Home() {
  const [quote, setQuote] = useState("Loading Wisdom Of Today");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const res = await fetch(
        "https://reketino-s-word-of-wisdom.onrender.com/quote"
      );
      const data = await res.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      setQuote("Couldn't retrieve words of wisdom😅");
      setAuthor("");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    
   <main className="flex-1 
  bg-[url('/bakgrunn.jpg')] bg-cover bg-center
  flex flex-col items-center text-center
  pt-32 pb-10 gap-32">

  <h1 className="text-[12rem]  font-lotr text-yellow-300 drop-shadow-2xl text-center mt-240">
    Reketino's Words Of Wisdom
  </h1>

  <section className="
  bg-black/60
  backdrop-blur-md
  p-16
  rounded-3xl
  border border-yellow-900
  shadow-[0_0_50px_rgba(255,200,0,0.45)]
  max-w-4xl
  w-full
  flex flex-col gap-10
  ">
    
    <h2 className="text-6xl text-yellow-300 font-lotr">Wisdom Of Today</h2>

    <p className="text-5xl text-yellow-100 font-lotr">{quote}</p>
    <p className="text-4xl text-yellow-400 font-lotr">— {author}</p>

    <button 
    onClick={fetchQuote}
    className="
    bg-yellow-700
    px-10 py-4
    rounded-xl
    text-white
    font-lotr
    hover:bg-amber-800
    active:scale-95
    transition-all
    shadow-xl
    "
    >
      Get New Word Of Wisdom
    </button>
 

  
   <Translator quote={quote} />
</section>
  <div className="mt-auto">
    <MusicPlayer />
  </div>
</main>

  );
}
