import Link from 'next/link'
import Score from './Score'
import LeaderboardButton from './LeaderboardButton'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className='text-md grid grid-cols-2 grid-rows-2 border-b-[1px] border-gray-300 bg-mercadolibre-primary px-10 py-4 lg:grid-cols-4 lg:grid-rows-1 lg:text-lg'>
      {/* score */}
      <div className='col-start-1 row-start-2 flex items-center lg:row-start-1'>
        <Score />
      </div>
      {/* logo */}
      <Link
        href='/'
        className='col-span-2 row-start-1 flex items-center gap-2 font-sans lg:justify-self-center'
      >
        <Image
          src='/public/mercadogame.svg'
          alt='mercadogame logo'
          width='48' height='48'
          className='-mb-2 object-contain'
        />
        <h1 className='text-3xl text-mercadolibre-logo lg:text-[42px]'>
          mercadogame
        </h1>
      </Link>
      {/* leaderboard */}
      <div className='col-start-2 row-start-2 place-self-end self-center lg:col-start-4 lg:row-start-1'>
        <Link href='/leaderboard'>
          <LeaderboardButton />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
