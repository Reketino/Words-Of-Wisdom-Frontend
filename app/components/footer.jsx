import React from 'react'

export default function Footer() {
  return (
    <footer className='fixed bottom-0 left-0 w-full h-5 flex items-center justify-center text-yellow-400 text-sm z-50'>
      <p> &copy; {new Date().getFullYear()} Words Of Wisdom. All rights reserved.</p>
    </footer>
  )
}
