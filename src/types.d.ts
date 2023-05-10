export type Category = {
  name: string
  id: string
}

export type Product = {
  id: string
  data: {
    title: string
    permalink: string
    thumbnail: string
  } | undefined
}

export type Question = {
  id: string
  text: string
  item_id: string
}

export type Score = {
  name: string
  score: number
}
