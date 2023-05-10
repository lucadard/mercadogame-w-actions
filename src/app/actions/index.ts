'use server'
import { Category, Product, Question, Score } from '@/types'
import { getRandomElements } from '@/utils'
import { revalidateTag } from 'next/cache'
import { sql } from '@vercel/postgres'
import axios from 'axios'

const API_KEY = process.env.ML_CLIENT_SECRET as string

const bannedCategoriesId = ['MLA1743', 'MLA1574', 'MLA1459', 'MLA1540']
export async function getCategories (): Promise<Category[]> {
  const res = await fetch('https://api.mercadolibre.com/sites/MLA/categories',
    {
      next: { tags: ['categories'] },
      headers: { Authorization: `Bearer ${API_KEY}` }
    })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  const categories: Category[] = data
    .filter((category: any) => !bannedCategoriesId.includes(category.id))
  return getRandomElements(categories, 3)
}

export async function getProductsId (categoryId: Category['id']): Promise<Array<Product['id']>> {
  const { data } = await axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?category=${categoryId}`,
      { headers: { Authorization: `Bearer ${API_KEY}` } })
  const selectedProducts: Product[] = getRandomElements(data.results, 4)
  return selectedProducts.map((product: { id: string }) => product.id)
}

export async function getProductsWithDetails (ids: Array<Product['id']>): Promise<Product[]> {
  const parameter = ids.reduce((str, id) => `${id},${str}`, '')
  const { data }: { data: Array<{ body: any }> } = await axios
    .get(`https://api.mercadolibre.com/items?ids=${parameter}`)
  const products: Product[] = data.map(({ body }) => ({
    id: body.id,
    data: {
      title: body.title,
      permalink: body.permalink,
      thumbnail: body.pictures?.[0].secure_url
    }
  }))
  return products
}

async function findQuestionsOfProduct (productId: Product['id']): Promise<Question[]> {
  const { data } = await axios
    .get(`https://api.mercadolibre.com/questions/search?item=${productId}`,
      { headers: { Authorization: `Bearer ${API_KEY}` } })
  const selectedQuestions: Question[] = getRandomElements(data.questions, 3)
  return selectedQuestions
}

export async function getQuestions (products: Product[]): Promise<Question[]> {
  let questions: Question[] = []
  do {
    if (products.length === 0) throw new Error('No questions found')
    const productId = getRandomElements(products, 1)[0].id
    questions = await findQuestionsOfProduct(productId)
    products = products.filter(p => p.id !== productId)
  } while (questions.length !== 3)

  return questions.map(question => ({
    id: question.id,
    item_id: question.item_id,
    text: question.text
  }))
}

export async function getLeaderboard (limit: number): Promise<Score[]> {
  const { rows } = await sql`SELECT * from SCORES ORDER BY SCORE DESC LIMIT ${limit ?? 20}`
  return rows as Score[]
}

export async function resetCategories () {
  revalidateTag('categories')
}

export async function getRoundData (id: string): Promise<{ products: Product[], questions: Question[] }> {
  const ids = await getProductsId(id)
  const products = await getProductsWithDetails(ids)
  const questions = await getQuestions(products)
  return { products, questions }
}

export async function sendScore (name: string, score: number) {
  if (!name || score === undefined) return false
  try {
    await sql`INSERT INTO SCORES (NAME,SCORE) VALUES (${name}, ${score})`
    return true
  } catch (error) {
    return false
  }
}
