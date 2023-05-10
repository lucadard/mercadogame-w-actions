import { Category, Product, Question } from '@/types'
import { create } from 'zustand'

type Store = {
  modal: React.ReactNode | undefined
  setModal: (modal: React.ReactNode | undefined) => void

  round: number
  score: number

  selectedCategoryId: Category['id'] | undefined
  selectedProductId: Product['id'] | undefined
  selectCategory: (id: Category['id']) => void

  products: Product[]
  setProducts: (products: Product[]) => void

  questions: Question[]
  setQuestions: (question: Question[]) => void
  removeQuestion: () => void

  removedQuestions: number
  sendResponse: (id: Product['id']) => void

  restartGame: () => void
  restartRound: () => void
  nextRound: () => void
}

export const useGame = create<Store>((set, get) => ({
  modal: undefined,
  setModal: (modal: React.ReactNode | undefined) =>
    set((state) => ({ ...state, modal })),

  round: 1,
  score: 0,
  selectedCategoryId: undefined,
  selectedProductId: undefined,
  selectCategory: (id: string) =>
    set((state) => ({ ...state, selectedCategoryId: id })),

  products: [],
  setProducts: (products: Product[]) =>
    set((state) => ({ ...state, products })),

  questions: [],
  setQuestions: (questions: Question[]) =>
    set((state) => ({ ...state, questions })),
  removeQuestion: () =>
    set((state) => ({
      ...state,
      questions: state.questions.splice(1),
      removedQuestions: state.removedQuestions + 1
    })),

  removedQuestions: 0,
  sendResponse: (productId: string) =>
    set((state) => ({
      ...state,
      selectedProductId: productId,
      score: productId === state.questions[0].item_id
        ? state.score + (3 - state.removedQuestions)
        : state.score
    })),

  restartRound: () => set((state) => ({
    ...state,
    selectedCategoryId: undefined,
    selectedProductId: undefined,
    selectedQuestionId: undefined,
    products: [],
    questions: [],
    removedQuestions: 0
  })),
  restartGame: () => set((state) => ({
    ...state,
    round: 1,
    score: 0,
    selectedCategoryId: undefined,
    selectedProductId: undefined,
    selectedQuestionId: undefined,
    products: [],
    questions: [],
    removedQuestions: 0
  })),
  nextRound: () => set((state) => ({
    ...state,
    round: state.round + 1,
    selectedCategoryId: undefined,
    selectedProductId: undefined,
    selectedQuestionId: undefined,
    products: [],
    questions: [],
    removedQuestions: 0
  }))
}))
