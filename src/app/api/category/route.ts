import axios from 'axios'
import { NextResponse } from 'next/server'
import { getRandomElements } from '@/utils'
import { Category } from '@/types'

const bannedCategoriesId = ['MLA1743', 'MLA1574', 'MLA1459', 'MLA1540']

const ML_SECRET_KEY = process.env.VITE_ML_CLIENT_SECRET as string

let CATS: Category[] = []
export async function GET (request: Request) {
  if (CATS.length === 0) CATS = await fetchData()
  return NextResponse.json({ categories: getRandomElements(CATS, 3) })
}

async function fetchData () {
  const { data } = await axios.get('https://api.mercadolibre.com/sites/MLA/categories', { headers: { Authorization: `Bearer ${ML_SECRET_KEY}` } })
  const categories = data
    .filter((category: any) => !bannedCategoriesId.includes(category.id))
  return categories
}
