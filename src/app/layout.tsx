import Navbar from '@/components/layout/navbar/Navbar'
import './globals.css'
import { Roboto } from 'next/font/google'
import Footer from '@/components/layout/footer/Footer'

const roboto = Roboto({ weight: ['400'], subsets: ['latin'] })

export const metadata = {
  title: 'Mercadogame'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        style={roboto.style}
        className='flex min-h-screen flex-col overflow-x-hidden'
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
