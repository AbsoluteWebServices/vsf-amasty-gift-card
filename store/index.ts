import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import CartState from '@vue-storefront/core/modules/cart/types/CartState'

export const module: Module<CartState, any> = {
  actions,
  getters
}

