import React from 'react'

export default function Footer() {
  return (
    <footer className='w-full h-14 flex items-center justify-center text-yellow-300 bg-white/10 backdrop-blur-xl shadow-[0_-4px_20px_rgba(255,255,255,0.15)]'>
      <p> &copy; {new Date().getFullYear()} Words Of Wisdom. All rights reserved.</p>
    </footer>
  )
}
