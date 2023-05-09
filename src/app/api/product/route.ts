import axios from 'axios'
import { NextResponse } from 'next/server'
import { getRandomElements } from '@/utils'

const ML_SECRET_KEY = process.env.VITE_ML_CLIENT_SECRET as string

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId') ?? ''
  if (!categoryId) return NextResponse.json({ products: [] })

  const { data } = await axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?category=${categoryId}`,
      { headers: { Authorization: `Bearer ${ML_SECRET_KEY}` } })
  return NextResponse.json({ products: getRandomElements(data.results, 4) })
}
