import { module } from './store'

export const KEY = 'cart'
export const CartExtend = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
}
