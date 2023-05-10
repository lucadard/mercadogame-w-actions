import Link from 'next/link'
import { getNumberWithOrdinal } from '@/utils'
import { getLeaderboard } from '../actions'

export default async function Leaderboard () {
  const leaderboard = await getLeaderboard(20)
  return (
    <div className='mx-auto mt-5 w-full max-w-4xl px-10 pb-10 text-[#515151]'>
      <Link href='/'>
        {'<'} Volver
      </Link>
      <>
        <h2 className='my-4 text-xl font-extralight text-[#515151] lg:text-2xl'>
          High scores
        </h2>
        <table className='w-full rounded-md bg-white text-center text-xl uppercase shadow-sm outline outline-[1px] outline-gray-100 hover:shadow-lg lg:text-2xl'>
          <thead>
            <tr className='h-14 font-semibold'>
              <th>rank</th>
              <th>nombre</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody className='text-[#515151]'>
            {leaderboard.map((item, i) => (
              <tr key={i} className='h-14 border-t-[1px] border-gray-100'>
                <td>{getNumberWithOrdinal(i + 1)}</td>
                <td>{item.name}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  )
}
