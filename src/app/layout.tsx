import Navbar from '@/components/layout/navbar/Navbar'
import './globals.css'
import { Roboto } from 'next/font/google'
import Footer from '@/components/layout/footer/Footer'
import Modal from '@/components/layout/Modal'

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
      <body>
        <Modal />
        <div className='flex min-h-screen flex-col'>
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
