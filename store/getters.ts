import { GetterTree } from 'vuex'
import CartState from '@vue-storefront/core/modules/cart/types/CartState'
import RootState from '@vue-storefront/core/types/RootState'
import GiftCard from '../types/GiftCard'

const getters: GetterTree<CartState, RootState> = {
  getGiftCardCode (state, getters): GiftCard | '' {
    if (!getters.getTotals) return ''
    let giftCardSegment = getters.getTotals.find(segment => segment.code === 'amasty_giftcard')
    return giftCardSegment ? giftCardSegment.title : ''
  }
}

export default getters
