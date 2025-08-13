import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

const STORAGE_KEY = 'cart:v1'

const CartContext = createContext(null)

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] }
    return { items: parsed.items }
  } catch {
    return { items: [] }
  }
}

function persistCart(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        const updated = state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
        return { items: updated }
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] }
    }
    case 'REMOVE_ITEM': {
      return { items: state.items.filter((i) => i.id !== action.payload.id) }
    }
    case 'SET_QUANTITY': {
      const { id, quantity } = action.payload
      const safeQty = Math.max(1, quantity)
      return {
        items: state.items.map((i) => (i.id === id ? { ...i, quantity: safeQty } : i)),
      }
    }
    case 'CLEAR': {
      return { items: [] }
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialCart)

  useEffect(() => {
    persistCart(state)
  }, [state])

  const addItem = useCallback((product) => {
    const { id, title, price, image } = product
    dispatch({ type: 'ADD_ITEM', payload: { id, title, price, image } })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }, [])

  const setQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } })
  }, [])

  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  )

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [state.items],
  )

  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      setQuantity,
      clear,
      totalItems,
      subtotal,
    }),
    [state.items, addItem, removeItem, setQuantity, clear, totalItems, subtotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


