// components/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Laptop } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="flex gap-2 bg-[#eeeeee] dark:bg-[#222] px-2 py-2 rounded-lg relative overflow-hidden">
      <button onClick={() => setTheme('light')} aria-label="Light mode">
        
        <Sun className={`w-4 h-4  md:w-5 md:h-5 ${theme === 'light' ? 'text-yellow-500 ' : 'text-gray-500'} relative z-10`} />
      </button>
      <button onClick={() => setTheme('dark')} aria-label="Dark mode">
        <Moon className={`w-4 h-4 md:w-5 md:h-5 ${theme === 'dark' ? 'text-blue-500' : 'text-gray-500'} relative z-10`} />
      </button>
      <button onClick={() => setTheme('system')} aria-label="System mode">
        <Laptop className={`w-4 h-4 md:w-5 md:h-5 ${theme === 'system' ? 'text-green-500' : 'text-gray-500'} relative z-10`} />
      </button>

      <div className={`dark:bg-[#373737] bg-[#e7e7e7] absolute p-[0.8rem] md:p-[0.9rem] top-[9%] md:top-[10%] rounded-md ${theme === 'light' ? 'left-[0.20rem]  md:left-[0.25rem]' : theme === 'dark' ? 'left-[1.68rem] md:left-[2rem]' : 'left-[3.2rem] md:left-[3.75rem]'} transition-all duration-200`}/>
    </div>
  )
}
