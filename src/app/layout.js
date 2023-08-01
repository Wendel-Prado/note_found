import './globals.css'
import { Dosis } from 'next/font/google'

const inter = Dosis({ subsets: ['latin'] })

export const metadata = {
  title: 'Stuune',
  description: 'Slides of musics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
